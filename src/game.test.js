import test from "node:test";
import assert from "node:assert/strict";
import {
  SPECIALIZATIONS, buildEmptyState, createLead, executeAction, resolveDeal, nextMonth,
  defaultNegotiationState, estimateDeal, getDealChance, getNegotiationTerms,
  getStyleModifiers, UNLOCK_DEALS_REQUIRED,
} from "./game.js";

function withRandom(value, callback) {
  const original = Math.random;
  let calls = 0;
  Math.random = () => { calls += 1; return value; };
  try { return { result: callback(), calls }; } finally { Math.random = original; }
}

test("all six specializations start with a usable warm referral", () => {
  for (const path of Object.keys(SPECIALIZATIONS)) {
    const state = buildEmptyState(path);
    assert.equal(state.path, path);
    assert.equal(state.primarySpecialization, path);
    assert.equal(state.cash, 18000);
    assert.equal(state.actionsLeft, 3);
    assert.equal(state.leads.length, 1);
    assert.equal(state.leads[0].path, path);
    assert.equal(state.leads[0].monthsRemaining, 3);
    assert.equal(state.finished, false);
  }
  assert.throws(() => buildEmptyState("Condominium"), /valid specialization/);
});

test("random and selected leads always carry a valid asset class and finite economics", () => {
  const state = buildEmptyState("Office");
  for (let i = 0; i < 200; i += 1) {
    const lead = createLead(i % 2 ? null : "Industrial", state);
    assert.ok(Object.hasOwn(SPECIALIZATIONS, lead.path));
    const estimate = estimateDeal(lead, state, defaultNegotiationState());
    for (const key of ["value", "credit", "income", "grossCommission", "brokerShare"]) assert.ok(Number.isFinite(estimate[key]), key);
    assert.equal(estimate.credit, lead.creditValue);
    assert.equal(estimate.value, lead.value);
    assert.ok(lead.monthsRemaining >= 1 && lead.monthsRemaining <= 3);
  }
});

test("one roll controls result, cash, closed-deal ledger and category awards", () => {
  for (const [roll, expectedWin] of [[0, true], [0.9999, false]]) {
    const state = buildEmptyState("Retail");
    const deal = state.leads[0];
    const choices = defaultNegotiationState();
    const estimate = estimateDeal(deal, state, choices, "balanced");
    const { result: { state: next, outcome }, calls } = withRandom(roll, () => resolveDeal(state, deal.id, choices, "balanced"));
    assert.equal(calls, 1);
    assert.equal(outcome.won, expectedWin);
    assert.equal(outcome.chance, getDealChance(deal, state, choices, "balanced"));
    assert.equal(outcome.income, expectedWin ? estimate.income : 0);
    assert.equal(outcome.credit, expectedWin ? estimate.credit : 0);
    assert.equal(next.cash - state.cash, outcome.income);
    assert.equal(next.annualIncome, outcome.income);
    assert.equal(next.totalCredit, outcome.credit);
    assert.equal(next.dealsClosed.length, expectedWin ? 1 : 0);
    assert.equal(next.awardsTracker.byClass[deal.path].totalCredit, outcome.credit);
    assert.equal(next.actionsLeft, state.actionsLeft - 1);
    assert.equal(next.leads.length, 0);
    assert.equal(state.leads.length, 1, "input state is immutable");
  }
});

test("invalid and unaffordable actions preserve turns and cash", () => {
  const state = { ...buildEmptyState("Land"), cash: 0 };
  for (const [action, payload] of [["joinCID"], ["learn", "noi"], ["designation", "CCIM"], ["designation", "SIOR"], ["learn", "asset_classes"], ["learn", "unknown"], ["scholarship"], ["subsidy"], ["challenge", 0], ["challenge", -1], ["unknown"]]) {
    assert.equal(executeAction(state, action, payload), state, action);
  }
  assert.equal(resolveDeal(state, "missing", {}, "balanced").state, state);
  assert.equal(resolveDeal(state, state.leads[0].id, {}, "unknown").state, state);
  const exhausted = { ...state, actionsLeft: 0 };
  assert.equal(executeAction(exhausted, "network"), exhausted);
});

test("CID course and scholarship funding reduce education costs instead of printing cash", () => {
  const initial = buildEmptyState("Office");
  const joined = executeAction(initial, "joinCID");
  assert.equal(joined.cash, 17930);
  assert.equal(joined.educationCredit, 150);
  const learned = executeAction(joined, "learn", "nnn");
  assert.equal(learned.cash, 17580);
  assert.equal(learned.educationCredit, 0);
  assert.equal(learned.subsidyUsed, true);
  assert.equal(executeAction(learned, "learn", "nnn"), learned);
  const award = withRandom(0, () => executeAction(joined, "scholarship")).result;
  assert.equal(award.scholarshipCredit, 1500);
  assert.equal(award.cash, joined.cash);
  assert.equal(executeAction(award, "scholarship"), award);
  const designated = executeAction(award, "designation", "CCIM");
  assert.equal(designated.cash, award.cash - 10500);
  assert.equal(designated.scholarshipCredit, 0);
});

test("lead urgency defines expiration and rollover charges exactly twelve months", () => {
  let state = buildEmptyState("Office");
  const lead = { ...state.leads[0], monthsRemaining: 1, urgency: 1 };
  state = { ...state, leads: [lead] };
  state = nextMonth(state);
  assert.equal(state.month, 2);
  assert.equal(state.leads.length, 0);
  assert.equal(state.cash, 17350);
  assert.equal(state.actionsLeft, 3);
  for (let i = 0; i < 11; i += 1) state = nextMonth(state);
  assert.equal(state.month, 12);
  assert.equal(state.finished, true);
  assert.equal(state.actionsLeft, 0);
  assert.equal(state.cash, 18000 - 12 * 650);
  assert.equal(state.annualExpenses, 12 * 650);
  assert.equal(nextMonth(state), state);
  assert.equal(executeAction(state, "prospect"), state);
});

test("cash failure finishes the year without allowing further spending", () => {
  const initial = { ...buildEmptyState("Office"), cash: 649 };
  const next = nextMonth(initial);
  assert.equal(next.bankrupt, true);
  assert.equal(next.finished, true);
  assert.equal(next.actionsLeft, 0);
  assert.equal(nextMonth(next), next);
});

test("sales omit lease issues, and economics respond to price and lease term", () => {
  const state = buildEmptyState("Retail");
  const lease = withRandom(0.1, () => createLead("Retail", state)).result;
  const sale = withRandom(0.9, () => createLead("Retail", state)).result;
  assert.equal(lease.type, "Lease");
  assert.equal(sale.type, "Sale");
  assert.deepEqual(getNegotiationTerms(sale).map((term) => term.key), ["rent", "timeline", "contingencies"]);
  assert.equal(getNegotiationTerms(sale)[0].title, "Sale price");
  const base = defaultNegotiationState();
  assert.ok(estimateDeal(sale, state, { ...base, rent: 100 }).value > estimateDeal(sale, state, { ...base, rent: 0 }).value);
  assert.ok(estimateDeal(lease, state, { ...base, termLength: 100 }).credit > estimateDeal(lease, state, { ...base, termLength: 0 }).credit);
  assert.equal(getNegotiationTerms(lease).length, 6);
});

test("counterparty personality changes the best style and priorities remain valid", () => {
  const state = buildEmptyState("Land");
  const deal = state.leads[0];
  const cautious = { ...deal, personality: { ...deal.personality, name: "Cautious" } };
  const aggressive = { ...deal, personality: { ...deal.personality, name: "Aggressive" } };
  assert.ok(getStyleModifiers(cautious).conservative.score > getStyleModifiers(cautious).aggressive.score);
  assert.ok(getStyleModifiers(aggressive).aggressive.score > getStyleModifiers(aggressive).conservative.score);
  const validKeys = getNegotiationTerms(deal).map((term) => term.key);
  assert.ok(deal.personality.priorities.every((key) => validKeys.includes(key)));
});

test("three secondary closings unlock specialization and designation eligibility", () => {
  let state = { ...buildEmptyState("Land"), knowledge: 40 };
  for (let i = 0; i < UNLOCK_DEALS_REQUIRED; i += 1) {
    const deal = createLead("Industrial", state);
    state = { ...state, leads: [deal], actionsLeft: 3 };
    state = withRandom(0, () => resolveDeal(state, deal.id, defaultNegotiationState(), "balanced")).result.state;
  }
  assert.ok(state.unlockedSpecializations.includes("Industrial"));
  const funded = { ...state, cash: 20000 };
  assert.ok(executeAction(funded, "designation", "SIOR").designations.includes("SIOR"));
  assert.equal(state.closedDealsByClass.Industrial, 3);
});

test("monthly opportunities resolve once and refresh next month", () => {
  const initial = buildEmptyState("Office");
  const next = executeAction(initial, "challenge", 1);
  assert.equal(next.monthlyChallenge.resolved, true);
  assert.equal(next.monthlyChallenge.selectedOption, 1);
  assert.equal(next.actionsLeft, initial.actionsLeft - 1);
  assert.equal(executeAction(next, "challenge", 0), next);
  const following = nextMonth(next);
  assert.equal(following.monthlyChallenge.resolved, false);
  assert.notEqual(following.monthlyChallenge.id, initial.monthlyChallenge.id);
});
