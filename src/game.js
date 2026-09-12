// Pure game rules. All money and production values are simulated.
export const ACTIONS_PER_MONTH = 3;
export const MONTHLY_COST = 650;
export const UNLOCK_DEALS_REQUIRED = 3;

export const SPECIALIZATIONS = {
  Retail: {
    cash: 18000,
    reputation: 8,
    network: 12,
    knowledge: 10,
    leasingBias: 0.7,
    avgDeal: 240000,
    description: "Tenant rep, landlord rep, shopping centers, street retail, and the eternal mystery of co-tenancy clauses.",
    designationOptions: ["CCIM", "CPM"],
  },
  Office: {
    cash: 18000,
    reputation: 8,
    network: 10,
    knowledge: 10,
    leasingBias: 0.6,
    avgDeal: 420000,
    description: "CBD towers, suburban office, medical office, renewals, expansions, and occupancy drama.",
    designationOptions: ["CCIM", "SIOR", "CPM"],
  },
  Industrial: {
    cash: 18000,
    reputation: 6,
    network: 10,
    knowledge: 12,
    leasingBias: 0.55,
    avgDeal: 650000,
    description: "Warehouses, port-related users, logistics, flex space, and bigger numbers with longer cycles.",
    designationOptions: ["CCIM", "SIOR"],
  },
  Land: {
    cash: 18000,
    reputation: 6,
    network: 9,
    knowledge: 11,
    leasingBias: 0.05,
    avgDeal: 500000,
    description: "Assemblages, development sites, dirt with potential, and arguments about zoning and flood risk.",
    designationOptions: ["CCIM", "ALC"],
  },
  "Special Purpose": {
    cash: 18000,
    reputation: 7,
    network: 11,
    knowledge: 11,
    leasingBias: 0.3,
    avgDeal: 540000,
    description: "Hotels, schools, churches, hospitals, parking, and the things that refuse to fit in neat boxes.",
    designationOptions: ["CCIM", "CPM"],
  },
  Multifamily: {
    cash: 18000,
    reputation: 8,
    network: 10,
    knowledge: 10,
    leasingBias: 0.1,
    avgDeal: 780000,
    description: "5+ units only. Investors, cap rates, NOI, value-add plans, and spreadsheet-flavored charm.",
    designationOptions: ["CCIM", "CPM"],
  },
};

export const DESIGNATIONS = {
  CCIM: {
    cost: 12000,
    knowledge: 15,
    reputation: 12,
    network: 8,
    incomeBoost: 0.12,
    description: "Available to all paths. Strong boost to analysis, credibility, and investor confidence.",
  },
  SIOR: {
    cost: 15000,
    knowledge: 10,
    reputation: 16,
    network: 10,
    incomeBoost: 0.15,
    description: "Office and Industrial only. Strong institutional credibility and bigger-client access.",
  },
  ALC: {
    cost: 9000,
    knowledge: 10,
    reputation: 12,
    network: 8,
    incomeBoost: 0.1,
    description: "Land only. Improves land opportunities and site-selection credibility.",
  },
  CPM: {
    cost: 10000,
    knowledge: 10,
    reputation: 10,
    network: 8,
    incomeBoost: 0.1,
    description: "Retail, Office, Special Purpose, and Multifamily. Adds management-minded credibility and steadier income options.",
  },
};

export const CONCEPTS = [
  { key: "asset_classes", name: "Asset Classes", description: "Understand the differences between Retail, Office, Industrial, Land, Special Purpose, and Multifamily.", cost: 0, knowledge: 8, bonus: "General deal confidence improves." },
  { key: "nnn", name: "Triple Net Leases", description: "Learn how taxes, insurance, and maintenance shift in NNN structures.", cost: 500, knowledge: 7, bonus: "Retail and Office lease negotiations become easier." },
  { key: "noi", name: "Net Operating Income", description: "A core metric for valuing income-producing real estate before debt service and income taxes.", cost: 750, knowledge: 8, bonus: "Improves pricing decisions for Retail, Office, Special Purpose, and Multifamily deals." },
  { key: "cap_rate", name: "Cap Rate", description: "Learn to connect NOI to value and compare returns across assets.", cost: 750, knowledge: 8, bonus: "Helps avoid underpricing and improves investor pitch success." },
  { key: "ti_cam", name: "TI, CAM, and Expense Reconciliations", description: "Tenant improvements, common area maintenance, and the little phrases that become very large conversations.", cost: 1000, knowledge: 10, bonus: "Raises lease confidence across Retail, Office, and Industrial." },
  { key: "flood_zoning", name: "Flood, Zoning, and Louisiana Site Risk", description: "Critical local knowledge for New Orleans area land and development work.", cost: 1000, knowledge: 10, bonus: "Improves Land and Special Purpose deal quality in the region." },
];

export const NEGOTIATION_TERMS = {
  rent: { title: "Rent", text: "Rent is the base amount the tenant pays. In commercial deals, the real fight is often about the effective economics after concessions, not just the quoted number." },
  ti: { title: "TI Allowance", text: "TI means tenant improvement allowance. It is money the landlord contributes toward buildout. More TI can help win a tenant, but it cuts into the landlord's economics." },
  cam: { title: "CAM / Expense Pass-Throughs", text: "CAM stands for common area maintenance. Expense pass-throughs shift operating costs like maintenance, taxes, and insurance depending on the lease structure." },
  termLength: { title: "Term Length", text: "Term length is the base lease term or deal time horizon. Longer terms can stabilize income, but they also make users and buyers more cautious if the future feels shaky." },
  timeline: { title: "Closing Timeline", text: "Timeline is how quickly the parties need to execute documents, finish diligence, and close or commence the lease. Shorter timelines increase pressure and execution risk." },
  contingencies: { title: "Contingencies", text: "Contingencies are conditions that must be satisfied before a deal becomes fully binding or closes. Common examples include financing, inspection, zoning, permitting, and board approval." },
};

const SUBMARKETS = {
  Retail: ["CBD", "Metairie", "Elmwood", "Northshore", "Veterans Corridor", "Westbank"],
  Office: ["CBD", "Metairie", "Elmwood", "Northshore", "Westbank", "Causeway Corridor"],
  Industrial: ["Port Corridor", "Elmwood", "Harahan", "Jefferson Parish", "St. Bernard", "River Parishes"],
  Land: ["Northshore", "St. Tammany", "Tangipahoa", "Westbank", "River Parishes", "Jefferson Parish"],
  "Special Purpose": ["French Quarter", "CBD", "Warehouse District", "Metairie", "Northshore", "Westbank"],
  Multifamily: ["Mid-City", "CBD", "Metairie", "Northshore", "Algiers", "Jefferson Parish"],
};

const NETWORK_EVENTS = [
  { name: "CID Lunch & Learn", network: 8, reputation: 3, text: "You pick up market chatter, two business cards, and one lead that may or may not be real. So, a strong showing." },
  { name: "Economic Forecast Symposium", network: 7, knowledge: 6, reputation: 2, text: "You leave with sharper talking points and a new opinion about where cap rates are going." },
  { name: "Coffee with a local developer", network: 6, reputation: 4, text: "A real conversation. Rare. Valuable. Slightly miraculous." },
  { name: "Industrial site tour near the river", network: 5, knowledge: 7, text: "Seeing product in person helps. So does sounding like you know what clear height means." },
  { name: "Retail corridor tour", network: 5, knowledge: 6, text: "You learn who is expanding, who is quietly leaving, and which parking ratio fights never truly end." },
];

const MARKET_EVENTS = [
  { name: "Port activity increases industrial demand", effect: { Industrial: 1.18 }, text: "Industrial users get more active as regional logistics momentum picks up." },
  { name: "Insurance costs squeeze underwriting", effect: { Retail: 0.94, Office: 0.93, Multifamily: 0.95, "Special Purpose": 0.94 }, text: "Buyers and landlords rework assumptions as expenses rise." },
  { name: "Tourism rebound lifts hospitality-adjacent assets", effect: { Retail: 1.08, "Special Purpose": 1.12 }, text: "Foot traffic and hospitality confidence improve." },
  { name: "Flood-risk concerns complicate land deals", effect: { Land: 0.88 }, text: "Site due diligence matters even more than usual." },
  { name: "Corporate downsizing pressures office demand", effect: { Office: 0.9 }, text: "Office users get choosier and timelines stretch." },
  { name: "Apartment demand remains steady", effect: { Multifamily: 1.08 }, text: "Multifamily investors stay engaged despite broader uncertainty." },
];

const CLIENT_TYPES = {
  Retail: ["Local retailer", "Regional chain", "Shopping center owner", "Restaurant operator"],
  Office: ["Medical office user", "Law firm", "Professional services tenant", "Office investor"],
  Industrial: ["Logistics operator", "Fabricator", "Warehouse investor", "Port-adjacent user"],
  Land: ["Developer", "Homebuilder", "Investor", "Assemblage buyer"],
  "Special Purpose": ["Hotel owner", "School operator", "Church board", "Healthcare user"],
  Multifamily: ["Private investor", "Syndicator", "Value-add buyer", "Apartment owner"],
};

const PERSONALITIES = [
  { name: "Aggressive", text: "Pushes hard and values economics over comfort.", priorities: ["rent", "timeline"] },
  { name: "Cautious", text: "Wants protection, optionality, and fewer surprises.", priorities: ["contingencies", "timeline"] },
  { name: "Relationship-driven", text: "Will compromise if the structure feels fair.", priorities: ["termLength", "ti"] },
  { name: "Institutional", text: "Cares about structure, certainty, and clean language.", priorities: ["cam", "termLength"] },
];

const START_LOG = [
  "Welcome to New Orleans commercial real estate. The coffee is strong, the timelines are not, and your first warm referral is ready.",
  "Your goal: build a book of business, learn the language, close deals, and cross $2,000,000 in annual credit volume to reach your first game production milestone.",
  "Sales credit counts as sale price. Lease credit counts as fixed rent over the initial term only. Co-brokered deals split credit.",
  "Join CID to unlock education funding options like a $150 education subsidy and a $1,500 scholarship that can help offset designation costs.",
];

export function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }
export function formatMoney(value) { return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value); }
export function getAwardTier(credit) { return credit >= 15000000 ? "Diamond" : credit >= 10000000 ? "Platinum" : credit >= 5000000 ? "Gold" : credit >= 2500000 ? "Silver" : credit >= 2000000 ? "Bronze" : null; }
export function defaultNegotiationState() { return { rent: 50, ti: 50, cam: 50, termLength: 50, timeline: 50, contingencies: 50 }; }
const randomFrom = (items) => items[Math.floor(Math.random() * items.length)];
const byClass = (value) => Object.fromEntries(Object.keys(SPECIALIZATIONS).map((key) => [key, typeof value === "function" ? value() : value]));
const appendLog = (state, ...entries) => ({ ...state, log: [...entries, ...state.log].slice(0, 60) });
const canAct = (state) => !!state && !state.finished && !state.bankrupt && state.actionsLeft > 0;
const choicesFor = (choices = {}) => Object.fromEntries(Object.entries(defaultNegotiationState()).map(([key, fallback]) => [key, Number.isFinite(choices[key]) ? clamp(choices[key], 0, 100) : fallback]));

const MONTHLY_CHALLENGES = [
  { title: "The coffee meeting", description: "A developer has twenty minutes and a site nobody else has seen. Your calendar has opinions.", options: [
    { label: "Meet the developer", description: "$120 • +6 network and a land lead", cost: 120, network: 6, leadPath: "Land" },
    { label: "Research the submarket", description: "Free • +7 knowledge and +2 reputation", cost: 0, knowledge: 7, reputation: 2 },
  ] },
  { title: "The corridor is changing", description: "A neighborhood retailer wants your take on the next hot block. You could wing it. You could also walk the block.", options: [
    { label: "Take a corridor tour", description: "$180 • +5 knowledge and a retail lead", cost: 180, knowledge: 5, leadPath: "Retail" },
    { label: "Host a market conversation", description: "Free • +7 network and +2 reputation", cost: 0, network: 7, reputation: 2 },
  ] },
  { title: "A very full inbox", description: "Two opportunities arrive at once: meet an investor, or build credibility with a useful market briefing.", options: [
    { label: "Meet the investor", description: "$100 • +4 network and a multifamily lead", cost: 100, network: 4, leadPath: "Multifamily" },
    { label: "Publish the briefing", description: "Free • +6 reputation and +4 knowledge", cost: 0, reputation: 6, knowledge: 4 },
  ] },
  { title: "Port-side possibilities", description: "A warehouse tour has a last-minute opening. Meanwhile, your client needs help making sense of insurance costs.", options: [
    { label: "Go on the site tour", description: "$150 • +5 knowledge and an industrial lead", cost: 150, knowledge: 5, leadPath: "Industrial" },
    { label: "Help your client underwrite", description: "Free • +5 reputation and +5 knowledge", cost: 0, reputation: 5, knowledge: 5 },
  ] },
];
function createChallenge(month) {
  const challenge = MONTHLY_CHALLENGES[(month - 1) % MONTHLY_CHALLENGES.length];
  return { ...challenge, id: `month-${month}`, options: challenge.options.map((option) => ({ ...option })), resolved: false, selectedOption: null };
}

export function buildEmptyState(pathName) {
  if (!SPECIALIZATIONS[pathName]) throw new Error("Choose a valid specialization.");
  const spec = SPECIALIZATIONS[pathName];
  const state = {
    version: 2, month: 1, finished: false, bankrupt: false, path: pathName, primarySpecialization: pathName,
    unlockedSpecializations: [pathName], cash: spec.cash, reputation: spec.reputation, network: spec.network,
    knowledge: spec.knowledge, totalCredit: 0, annualIncome: 0, annualExpenses: 0, actionsLeft: ACTIONS_PER_MONTH,
    monthlyCost: MONTHLY_COST, cidMember: false, subsidyUsed: false, scholarshipUsed: false,
    educationCredit: 0, scholarshipCredit: 0, scholarshipResult: null, designations: [], learned: { asset_classes: true },
    leads: [], dealsClosed: [], dealsLost: 0, log: [...START_LOG], marketMultiplier: byClass(1),
    marketEvent: { name: "A fresh start in the market", text: "Your first referral is waiting. Open the deal room, read the brief, and find workable terms.", effect: {} },
    monthlyChallenge: createChallenge(1), creditByClass: byClass(0), closedDealsByClass: byClass(0),
    awardsTracker: { byClass: byClass(() => ({ totalCredit: 0, bestSale: 0, bestLease: 0 })) },
  };
  const starter = createLead(pathName, state);
  starter.difficulty = Math.max(34, starter.difficulty - 10);
  starter.urgency = 3;
  starter.monthsRemaining = 3;
  return appendLog({ ...state, leads: [starter] }, "A warm referral is ready in your pipeline. Your first deal has a little extra breathing room.");
}

function chooseLeadPath(state) {
  const bag = [];
  Object.keys(SPECIALIZATIONS).forEach((path) => {
    const weight = path === state.primarySpecialization ? 5 : state.unlockedSpecializations.includes(path) ? 3 : 1;
    for (let i = 0; i < weight; i += 1) bag.push(path);
  });
  return randomFrom(bag);
}

export function getNegotiationTerms(deal) {
  const lease = deal.type === "Lease";
  const keys = lease ? ["rent", "ti", "cam", "termLength", "timeline", "contingencies"] : ["rent", "timeline", "contingencies"];
  const labels = {
    rent: { title: lease ? "Base rent" : "Sale price", left: lease ? "Lower rent" : "Lower price", right: lease ? "Higher rent" : "Higher price" },
    ti: { left: "Less landlord funding", right: "More landlord funding" },
    cam: { left: "Landlord carries costs", right: "Tenant carries costs" },
    termLength: { left: "Shorter lease", right: "Longer lease" },
    timeline: { left: "More time", right: "Faster close" },
    contingencies: { left: "Fewer protections", right: "More protections" },
  };
  return keys.map((key) => ({ key, ...NEGOTIATION_TERMS[key], ...labels[key], ...(key === "rent" && !lease ? { text: "The negotiated sale price is the transaction value. Lower pricing favors the buyer; higher pricing favors the seller. Your production credit reflects your share of that price." } : {}) }));
}

export function createLead(pathName, state) {
  const path = SPECIALIZATIONS[pathName] ? pathName : chooseLeadPath(state);
  const spec = SPECIALIZATIONS[path];
  const lease = Math.random() < spec.leasingBias;
  const type = lease ? "Lease" : "Sale";
  const value = Math.round(spec.avgDeal * (0.8 + Math.random() * 0.8) * (state.marketMultiplier[path] || 1) * (1 + state.knowledge / 300) * (1 + state.network / 350));
  const coBrokered = Math.random() < 0.55;
  const yourShare = coBrokered ? 0.5 : 1;
  const side = Math.random() < 0.5 ? "listing/landlord" : "buyer/tenant";
  const originalPersonality = randomFrom(PERSONALITIES);
  const available = getNegotiationTerms({ type }).map((term) => term.key);
  const priorityFallback = ["rent", "timeline", "contingencies"];
  const priorities = [...new Set([...originalPersonality.priorities.filter((key) => available.includes(key)), ...priorityFallback])].slice(0, 2);
  const personality = { ...originalPersonality, priorities };
  const negotiationProfile = Object.fromEntries(available.map((key) => [key, {
    target: 18 + Math.floor(Math.random() * 65), flexibility: 9 + Math.floor(Math.random() * 8),
    weight: priorities.includes(key) ? 3 : 1,
  }]));
  const urgency = 1 + Math.floor(Math.random() * 3);
  const client = randomFrom(CLIENT_TYPES[path]);
  const submarket = randomFrom(SUBMARKETS[path]);
  const baseTermYears = lease ? randomFrom([3, 5, 7]) : null;
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`, client, path, submarket, type, value, baseValue: value,
    baseTermYears, annualRent: lease ? value / baseTermYears : null,
    creditValue: Math.round(value * yourShare), coBrokered, yourShare, side,
    difficulty: (lease ? 45 : 48) + (path === "Land" ? 4 : path === "Industrial" ? 2 : 0),
    monthsActive: 0, monthsRemaining: urgency, urgency, negotiationProfile,
    negotiationState: defaultNegotiationState(), personality,
    summary: `${client} needs help on a ${type.toLowerCase()} in ${submarket}.`,
  };
}

export function successChanceForDeal(deal, state) {
  let chance = 65 - deal.difficulty + state.reputation * 0.2 + state.network * 0.18 + state.knowledge * 0.25;
  chance += deal.path === state.primarySpecialization ? 10 : state.unlockedSpecializations.includes(deal.path) ? 6 : 0;
  if (state.learned.asset_classes) chance += 5;
  if (state.learned.nnn && deal.type === "Lease" && ["Retail", "Office"].includes(deal.path)) chance += 4;
  if (state.learned.noi && deal.type === "Sale") chance += 4;
  if (state.learned.cap_rate && ["Retail", "Office", "Multifamily", "Special Purpose"].includes(deal.path)) chance += 3;
  if (state.learned.ti_cam && deal.type === "Lease") chance += 4;
  if (state.learned.flood_zoning && ["Land", "Special Purpose"].includes(deal.path)) chance += 5;
  chance += state.designations.reduce((sum, name) => sum + (SPECIALIZATIONS[deal.path].designationOptions.includes(name) ? 6 : 2), 0);
  return clamp(Math.round(chance), 12, 88);
}

export function calculateNegotiationOutcome(deal, state, choices) {
  const safeChoices = choicesFor(choices);
  const terms = getNegotiationTerms(deal);
  let score = 0;
  let totalWeight = 0;
  const notes = [];
  terms.forEach(({ key, title }) => {
    const config = deal.negotiationProfile[key];
    if (!config) return;
    const diff = Math.abs(safeChoices[key] - config.target);
    const aligned = diff <= config.flexibility;
    const workable = diff <= config.flexibility + 12;
    const friction = diff <= config.flexibility + 24;
    const contribution = aligned ? 25 : workable ? 7 : friction ? -15 : -32;
    score += contribution * config.weight;
    totalWeight += config.weight;
    const direction = safeChoices[key] < config.target ? "Try moving higher." : "Try moving lower.";
    notes.push(`${title}: ${aligned ? "well aligned" : workable ? "workable" : friction ? "friction" : "major obstacle"}.${aligned ? "" : ` ${direction}`}`);
  });
  const keySupport = deal.side === "listing/landlord" ? safeChoices.rent : 100 - safeChoices.rent;
  return { score: totalWeight ? Math.round(score / totalWeight) : 0, notes, clientSupport: Math.round(keySupport) };
}

export function getStyleModifiers(deal) {
  const scores = {
    Aggressive: { aggressive: 12, balanced: 6, conservative: -4 },
    Cautious: { aggressive: -7, balanced: 6, conservative: 14 },
    "Relationship-driven": { aggressive: -5, balanced: 12, conservative: 7 },
    Institutional: { aggressive: 0, balanced: 10, conservative: 8 },
  }[deal.personality.name] || { aggressive: 2, balanced: 8, conservative: 5 };
  return {
    aggressive: { label: "Push the economics", score: scores.aggressive, rep: -1, incomeMultiplier: 1.1, text: "10% more simulated commission if you win; -1 reputation. Works best with an aggressive counterparty." },
    balanced: { label: "Find common ground", score: scores.balanced, rep: 1, incomeMultiplier: 1, text: "No adjustment to this deal’s simulated commission; +1 reputation. Strong with relationship-driven and institutional parties." },
    conservative: { label: "Protect the relationship", score: scores.conservative, rep: 2, incomeMultiplier: 0.92, text: "8% less simulated commission if you win; +2 reputation. Reassures cautious counterparties." },
  };
}

export function getDealChance(deal, state, choices, style = "balanced") {
  const mod = getStyleModifiers(deal)[style] || getStyleModifiers(deal).balanced;
  return clamp(Math.round(successChanceForDeal(deal, state) + calculateNegotiationOutcome(deal, state, choices).score + mod.score), 5, 95);
}

export function estimateDeal(deal, state, choices, style = "balanced") {
  const safeChoices = choicesFor(choices);
  const mod = getStyleModifiers(deal)[style] || getStyleModifiers(deal).balanced;
  const priceFactor = 0.9 + safeChoices.rent / 500;
  const termYears = deal.type === "Lease" ? Math.max(1, deal.baseTermYears + Math.round((safeChoices.termLength - 50) / 25)) : null;
  const annualRent = deal.type === "Lease" ? (deal.annualRent || deal.baseValue / deal.baseTermYears) * priceFactor : null;
  const value = Math.round(deal.type === "Lease" ? annualRent * termYears : deal.baseValue * priceFactor);
  const credit = Math.round(value * deal.yourShare);
  const designationBoost = state.designations.reduce((sum, name) => sum + (DESIGNATIONS[name]?.incomeBoost || 0), 0);
  const grossCommission = value * (deal.type === "Lease" ? 0.04 : 0.03) * (1 + designationBoost) * mod.incomeMultiplier;
  const brokerShare = grossCommission * deal.yourShare;
  const income = Math.round(brokerShare * 0.35);
  return { value, credit, income, grossCommission, brokerShare, termYears, annualRent };
}

export function resolveDeal(state, dealId, choices, style = "balanced") {
  const deal = state?.leads.find((item) => item.id === dealId);
  if (!canAct(state) || !deal || !getStyleModifiers(deal)[style]) return { state, outcome: null };
  const mod = getStyleModifiers(deal)[style];
  const chance = getDealChance(deal, state, choices, style);
  const won = Math.random() * 100 < chance;
  const terms = calculateNegotiationOutcome(deal, state, choices);
  const estimate = estimateDeal(deal, state, choices, style);
  const updatedDeal = { ...deal, value: estimate.value, creditValue: estimate.credit, termYears: estimate.termYears, negotiatedAnnualRent: estimate.annualRent, negotiationState: choicesFor(choices) };
  let next = { ...state, actionsLeft: state.actionsLeft - 1, leads: state.leads.filter((item) => item.id !== deal.id), reputation: clamp(state.reputation + mod.rep + (won ? 4 : 0), 0, 100) };
  let newlyUnlocked = false;
  if (won) {
    const priorTier = getAwardTier(state.totalCredit);
    const prior = state.awardsTracker.byClass[deal.path];
    const closedDealsByClass = { ...state.closedDealsByClass, [deal.path]: state.closedDealsByClass[deal.path] + 1 };
    newlyUnlocked = !state.unlockedSpecializations.includes(deal.path) && closedDealsByClass[deal.path] >= UNLOCK_DEALS_REQUIRED;
    next = {
      ...next, cash: state.cash + estimate.income, annualIncome: state.annualIncome + estimate.income,
      totalCredit: state.totalCredit + estimate.credit, network: clamp(state.network + 2, 0, 100),
      dealsClosed: [...state.dealsClosed, { ...updatedDeal, income: estimate.income, credit: estimate.credit, monthClosed: state.month }],
      closedDealsByClass, creditByClass: { ...state.creditByClass, [deal.path]: state.creditByClass[deal.path] + estimate.credit },
      unlockedSpecializations: newlyUnlocked ? [...state.unlockedSpecializations, deal.path] : state.unlockedSpecializations,
      awardsTracker: { byClass: { ...state.awardsTracker.byClass, [deal.path]: {
        totalCredit: prior.totalCredit + estimate.credit,
        bestSale: deal.type === "Sale" ? Math.max(prior.bestSale, estimate.credit) : prior.bestSale,
        bestLease: deal.type === "Lease" ? Math.max(prior.bestLease, estimate.credit) : prior.bestLease,
      } } },
    };
    next = appendLog(next, `Closed: ${deal.type} in ${deal.submarket}. ${formatMoney(estimate.credit)} production credit; ${formatMoney(estimate.income)} commission earned.`);
    if (state.dealsClosed.length === 0) next = appendLog(next, "First closing! Your pipeline is officially more than a rumor.");
    if (newlyUnlocked) next = appendLog(next, `${deal.path} specialization unlocked after ${UNLOCK_DEALS_REQUIRED} closings. New designation options and better close odds are now available.`);
    if (getAwardTier(next.totalCredit) !== priorTier) next = appendLog(next, `${getAwardTier(next.totalCredit)} production milestone reached!`);
  } else {
    next = appendLog({ ...next, dealsLost: state.dealsLost + 1 }, `Deal lost: ${deal.client} in ${deal.submarket}. No commission or production credit earned. Your next opportunity is still out there.`);
  }
  return { state: next, outcome: {
    won, chance, style, notes: terms.notes, deal: updatedDeal, income: won ? estimate.income : 0,
    credit: won ? estimate.credit : 0, commission: won ? estimate.grossCommission : 0, newlyUnlocked,
    explanation: won ? "The parties reached workable terms and the deal closed." : "The deal did not close. Even a strong offer carries execution risk; compare the term readout and counterparty style before your next submission.",
  } };
}

export function executeAction(state, action, payload) {
  if (!canAct(state)) return state;
  let next = state;
  if (action === "prospect") {
    const desiredPath = typeof payload === "string" ? payload : payload?.path;
    const lead = createLead(desiredPath, state);
    next = appendLog({ ...state, leads: [lead, ...state.leads].slice(0, 12), network: clamp(state.network + 2, 0, 100), reputation: clamp(state.reputation + 1, 0, 100) }, `New lead: ${lead.client}, ${lead.path}, ${lead.submarket}. ${lead.monthsRemaining} month${lead.monthsRemaining === 1 ? "" : "s"} to act.`);
  } else if (action === "network") {
    const event = randomFrom(NETWORK_EVENTS);
    const lead = Math.random() < (state.cidMember ? 0.75 : 0.5) ? createLead(null, state) : null;
    next = appendLog({ ...state, network: clamp(state.network + (event.network || 0) + (state.cidMember ? 2 : 0), 0, 100), reputation: clamp(state.reputation + (event.reputation || 0), 0, 100), knowledge: clamp(state.knowledge + (event.knowledge || 0), 0, 100), leads: lead ? [lead, ...state.leads].slice(0, 12) : state.leads }, `${event.name}: ${event.text}${lead ? ` New ${lead.path.toLowerCase()} referral added to your pipeline.` : ""}`);
  } else if (action === "joinCID") {
    if (state.cidMember || state.cash < 70) return state;
    next = appendLog({ ...state, cidMember: true, cash: state.cash - 70, annualExpenses: state.annualExpenses + 70, reputation: clamp(state.reputation + 5, 0, 100), network: clamp(state.network + 6, 0, 100), educationCredit: 150 }, "Joined CID for $70. A $150 course credit is ready to apply automatically; networking referral odds improve.");
  } else if (action === "subsidy") {
    // The subsidy is applied to the next eligible course automatically, never a cash payout.
    return state;
  } else if (action === "scholarship") {
    if (!state.cidMember || state.scholarshipUsed) return state;
    const chance = clamp(Math.round(45 + state.reputation / 3 + state.knowledge / 4), 45, 90);
    const awarded = Math.random() * 100 < chance;
    next = appendLog({ ...state, scholarshipUsed: true, scholarshipCredit: awarded ? 1500 : 0, scholarshipResult: { awarded, chance } }, awarded ? "Scholarship awarded: $1,500 will be applied to your next designation. This is restricted education funding, not a cash payout." : `Scholarship declined this year (${chance}% chance). You can continue pursuing a designation using your cash budget.`);
  } else if (action === "learn") {
    const key = typeof payload === "string" ? payload : payload?.key;
    const concept = CONCEPTS.find((item) => item.key === key);
    if (!concept || state.learned[key]) return state;
    const subsidy = Math.min(state.educationCredit, concept.cost);
    const cost = concept.cost - subsidy;
    if (state.cash < cost) return state;
    next = appendLog({ ...state, cash: state.cash - cost, annualExpenses: state.annualExpenses + cost, educationCredit: state.educationCredit - subsidy, subsidyUsed: state.subsidyUsed || subsidy > 0, learned: { ...state.learned, [key]: true }, knowledge: clamp(state.knowledge + concept.knowledge, 0, 100) }, `Learned ${concept.name} for ${formatMoney(cost)}${subsidy ? ` after ${formatMoney(subsidy)} in CID course funding` : ""}. ${concept.bonus}`);
  } else if (action === "designation") {
    const name = typeof payload === "string" ? payload : payload?.name;
    const designation = DESIGNATIONS[name];
    const allowed = state.unlockedSpecializations.some((path) => SPECIALIZATIONS[path].designationOptions.includes(name));
    if (!designation || !allowed || state.designations.includes(name) || (state.knowledge < 30 && name !== "CCIM")) return state;
    const scholarship = Math.min(state.scholarshipCredit, designation.cost);
    const cost = designation.cost - scholarship;
    if (state.cash < cost) return state;
    next = appendLog({ ...state, cash: state.cash - cost, annualExpenses: state.annualExpenses + cost, scholarshipCredit: state.scholarshipCredit - scholarship, designations: [...state.designations, name], knowledge: clamp(state.knowledge + designation.knowledge, 0, 100), network: clamp(state.network + designation.network, 0, 100), reputation: clamp(state.reputation + designation.reputation, 0, 100) }, `${name} earned for ${formatMoney(cost)}${scholarship ? ` with ${formatMoney(scholarship)} in scholarship support` : ""}. Your expertise opens doors.`);
  } else if (action === "challenge") {
    const index = typeof payload === "number" ? payload : payload?.index;
    const challenge = state.monthlyChallenge;
    const option = Number.isInteger(index) ? challenge?.options[index] : null;
    if (!option || challenge.resolved || state.cash < option.cost) return state;
    const lead = option.leadPath ? createLead(option.leadPath, state) : null;
    next = appendLog({ ...state, cash: state.cash - option.cost, annualExpenses: state.annualExpenses + option.cost, knowledge: clamp(state.knowledge + (option.knowledge || 0), 0, 100), reputation: clamp(state.reputation + (option.reputation || 0), 0, 100), network: clamp(state.network + (option.network || 0), 0, 100), leads: lead ? [lead, ...state.leads].slice(0, 12) : state.leads, monthlyChallenge: { ...challenge, resolved: true, selectedOption: index } }, `${challenge.title}: ${option.label}. ${option.description}${lead ? ` ${lead.client} is now in your pipeline.` : ""}`);
  } else return state;
  return { ...next, actionsLeft: state.actionsLeft - 1 };
}

export function nextMonth(state) {
  if (!state || state.finished || state.bankrupt) return state;
  const cash = state.cash - MONTHLY_COST;
  const annualExpenses = state.annualExpenses + MONTHLY_COST;
  if (state.month >= 12) return appendLog({ ...state, cash, annualExpenses, month: 12, actionsLeft: 0, finished: true, bankrupt: cash < 0 }, `Year complete. Final monthly overhead: ${formatMoney(MONTHLY_COST)}. You closed ${state.dealsClosed.length} deal${state.dealsClosed.length === 1 ? "" : "s"} and earned ${formatMoney(state.annualIncome)} in commission.`);
  if (cash < 0) return appendLog({ ...state, cash, annualExpenses, actionsLeft: 0, bankrupt: true, finished: true }, `Your business ran out of cash after ${formatMoney(MONTHLY_COST)} in monthly overhead. Try protecting your runway and working your warm leads earlier.`);
  const month = state.month + 1;
  const aged = state.leads.map((lead) => ({ ...lead, monthsActive: lead.monthsActive + 1, monthsRemaining: lead.monthsRemaining - 1, difficulty: lead.difficulty + 2 }));
  const leads = aged.filter((lead) => lead.monthsRemaining > 0);
  const expired = aged.length - leads.length;
  const marketEvent = randomFrom(MARKET_EVENTS);
  const next = { ...state, cash, annualExpenses, month, actionsLeft: ACTIONS_PER_MONTH, leads, marketEvent, marketMultiplier: Object.fromEntries(Object.keys(SPECIALIZATIONS).map((path) => [path, marketEvent.effect[path] || 1])), monthlyChallenge: createChallenge(month) };
  return appendLog(next, `Month ${month}: ${marketEvent.name}. ${formatMoney(MONTHLY_COST)} overhead paid.${expired ? ` ${expired} lead${expired === 1 ? "" : "s"} expired.` : ""}`, marketEvent.text);
}
