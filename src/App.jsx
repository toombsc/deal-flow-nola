import React, { useMemo, useState } from "react";
import {
  Briefcase,
  Building2,
  Factory,
  Landmark,
  Map,
  Trophy,
  Users,
  DollarSign,
  GraduationCap,
  FileText,
  CircleHelp,
} from "lucide-react";

const BRAND = {
  red: "#B5121B",
  teal: "#16697A",
  silver: "#C0C9CD",
  gulf: "#000F42",
  grey: "#817C82",
  paper: "#F8F7F4",
  white: "#FFFFFF",
};

const SPECIALIZATIONS = {
  Retail: {
    icon: Building2,
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
    icon: Briefcase,
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
    icon: Factory,
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
    icon: Map,
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
    icon: Landmark,
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
    icon: Building2,
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

const DESIGNATIONS = {
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

const CONCEPTS = [
  {
    key: "asset_classes",
    name: "Asset Classes",
    description: "Understand the differences between Retail, Office, Industrial, Land, Special Purpose, and Multifamily.",
    cost: 0,
    knowledge: 8,
    bonus: "General deal confidence improves.",
  },
  {
    key: "nnn",
    name: "Triple Net Leases",
    description: "Learn how taxes, insurance, and maintenance shift in NNN structures.",
    cost: 500,
    knowledge: 7,
    bonus: "Retail and Office lease negotiations become easier.",
  },
  {
    key: "noi",
    name: "Net Operating Income",
    description: "A core metric for valuing income-producing real estate before debt service and taxes.",
    cost: 750,
    knowledge: 8,
    bonus: "Improves pricing decisions for Retail, Office, Special Purpose, and Multifamily deals.",
  },
  {
    key: "cap_rate",
    name: "Cap Rate",
    description: "Learn to connect NOI to value and compare returns across assets.",
    cost: 750,
    knowledge: 8,
    bonus: "Helps avoid underpricing and improves investor pitch success.",
  },
  {
    key: "ti_cam",
    name: "TI, CAM, and Expense Reconciliations",
    description: "Tenant improvements, common area maintenance, and the little phrases that become very large conversations.",
    cost: 1000,
    knowledge: 10,
    bonus: "Raises lease confidence across Retail, Office, and Industrial.",
  },
  {
    key: "flood_zoning",
    name: "Flood, Zoning, and Louisiana Site Risk",
    description: "Critical local knowledge for New Orleans area land and development work.",
    cost: 1000,
    knowledge: 10,
    bonus: "Improves Land and Special Purpose deal quality in the region.",
  },
];

const NEGOTIATION_TERMS = {
  rent: {
    title: "Rent",
    text: "Rent is the base amount the tenant pays. In commercial deals, the real fight is often about the effective economics after concessions, not just the quoted number.",
  },
  ti: {
    title: "TI Allowance",
    text: "TI means tenant improvement allowance. It is money the landlord contributes toward buildout. More TI can help win a tenant, but it cuts into the landlord's economics.",
  },
  cam: {
    title: "CAM / Expense Pass-Throughs",
    text: "CAM stands for common area maintenance. Expense pass-throughs shift operating costs like maintenance, taxes, and insurance depending on the lease structure.",
  },
  termLength: {
    title: "Term Length",
    text: "Term length is the base lease term or deal time horizon. Longer terms can stabilize income, but they also make users and buyers more cautious if the future feels shaky.",
  },
  timeline: {
    title: "Closing Timeline",
    text: "Timeline is how quickly the parties need to execute documents, finish diligence, and close or commence the lease. Shorter timelines increase pressure and execution risk.",
  },
  contingencies: {
    title: "Contingencies",
    text: "Contingencies are conditions that must be satisfied before a deal becomes fully binding or closes. Common examples include financing, inspection, zoning, permitting, and board approval.",
  },
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
  {
    name: "CID Lunch & Learn",
    network: 8,
    reputation: 3,
    text: "You pick up market chatter, two business cards, and one lead that may or may not be real. So, a strong showing.",
  },
  {
    name: "Economic Forecast Symposium",
    network: 7,
    knowledge: 6,
    reputation: 2,
    text: "You leave with sharper talking points and a new opinion about where cap rates are going.",
  },
  {
    name: "Coffee with a local developer",
    network: 6,
    reputation: 4,
    text: "A real conversation. Rare. Valuable. Slightly miraculous.",
  },
  {
    name: "Industrial site tour near the river",
    network: 5,
    knowledge: 7,
    text: "Seeing product in person helps. So does sounding like you know what clear height means.",
  },
  {
    name: "Retail corridor tour",
    network: 5,
    knowledge: 6,
    text: "You learn who is expanding, who is quietly leaving, and which parking ratio fights never truly end.",
  },
];

const MARKET_EVENTS = [
  {
    name: "Port activity increases industrial demand",
    effect: { Industrial: 1.18 },
    text: "Industrial users get more active as regional logistics momentum picks up.",
  },
  {
    name: "Insurance costs squeeze underwriting",
    effect: { Retail: 0.94, Office: 0.93, Multifamily: 0.95, "Special Purpose": 0.94 },
    text: "Buyers and landlords rework assumptions as expenses rise.",
  },
  {
    name: "Tourism rebound lifts hospitality-adjacent assets",
    effect: { Retail: 1.08, "Special Purpose": 1.12 },
    text: "Foot traffic and hospitality confidence improve.",
  },
  {
    name: "Flood-risk concerns complicate land deals",
    effect: { Land: 0.88 },
    text: "Site due diligence matters even more than usual.",
  },
  {
    name: "Corporate downsizing pressures office demand",
    effect: { Office: 0.9 },
    text: "Office users get choosier and timelines stretch.",
  },
  {
    name: "Apartment demand remains steady",
    effect: { Multifamily: 1.08 },
    text: "Multifamily investors stay engaged despite broader uncertainty.",
  },
];

const CLIENT_TYPES = {
  Retail: ["Local retailer", "Regional chain", "Shopping center owner", "Restaurant operator"],
  Office: ["Medical office user", "Law firm", "Professional services tenant", "Office investor"],
  Industrial: ["Logistics operator", "Fabricator", "Warehouse investor", "Port-adjacent user"],
  Land: ["Developer", "Homebuilder", "Investor", "Assemblage buyer"],
  "Special Purpose": ["Hotel owner", "School operator", "Church board", "Healthcare user"],
  Multifamily: ["Private investor", "Syndicator", "Value-add buyer", "Apartment owner"],
};

const START_LOG = [
  "Welcome to New Orleans commercial real estate. The coffee is strong, the timelines are not, and your pipeline is currently a rumor.",
  "Your goal: build a book of business, learn the language, close deals, and cross $2,000,000 in annual credit volume to unlock CID Awards eligibility.",
  "Sales credit counts as sale price. Lease credit counts as fixed rent over the initial term only. Co-brokered deals split credit.",
  "Join CID to unlock education funding options like a $150 education subsidy and a $1,500 scholarship that can help offset designation costs.",
];

const NEGOTIATION_SLIDERS = [
  ["rent", "Rent"],
  ["ti", "TI allowance"],
  ["cam", "CAM / expense pass-throughs"],
  ["termLength", "Term length"],
  ["timeline", "Closing timeline"],
  ["contingencies", "Contingencies"],
];

const STYLES = `
:root {
  font-family: Montserrat, Arial, Helvetica, sans-serif;
  color: ${BRAND.gulf};
  background: ${BRAND.paper};
}
* { box-sizing: border-box; }
html, body, #root { margin: 0; min-height: 100%; }
body { background: linear-gradient(180deg, ${BRAND.gulf} 0%, ${BRAND.paper} 18%, ${BRAND.paper} 100%); }
button, select, input { font: inherit; }
.app-shell { min-height: 100vh; padding: 24px; }
.container { max-width: 1280px; margin: 0 auto; }
.card {
  background: ${BRAND.white};
  border: 1px solid ${BRAND.silver};
  border-radius: 28px;
  box-shadow: 0 1px 3px rgba(0,0,0,.06);
}
.card-pad { padding: 24px; }
.card-pad-lg { padding: 32px; }
.heading-serif { font-family: Georgia, "Times New Roman", serif; }
.kicker {
  display: inline-flex;
  border-radius: 999px;
  padding: 6px 12px;
  font-size: 12px;
  letter-spacing: .18em;
  text-transform: uppercase;
  background: ${BRAND.teal};
  color: ${BRAND.white};
}
.hero-grid, .content-grid, .stats-grid, .detail-grid, .button-grid, .tab-grid, .summary-grid { display: grid; gap: 24px; }
.hero-grid { grid-template-columns: 1.1fr .9fr; }
.content-grid { grid-template-columns: 1.05fr .95fr; }
.stats-grid { grid-template-columns: repeat(5, 1fr); gap: 16px; }
.two-grid { display: grid; gap: 12px; grid-template-columns: repeat(2, 1fr); }
.button-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
.tab-grid { grid-template-columns: repeat(5, 1fr); gap: 6px; }
.summary-grid { grid-template-columns: repeat(3, 1fr); gap: 8px; }
.detail-grid { grid-template-columns: repeat(2, 1fr); gap: 8px; }
.section-title { font-size: 1.35rem; font-weight: 600; letter-spacing: .01em; color: ${BRAND.gulf}; }
.btn {
  border-radius: 18px;
  border: 1px solid transparent;
  padding: 12px 16px;
  cursor: pointer;
  font-weight: 600;
}
.btn:disabled { opacity: .55; cursor: not-allowed; }
.btn-primary { background: ${BRAND.red}; color: ${BRAND.white}; border-color: ${BRAND.red}; }
.btn-secondary { background: ${BRAND.gulf}; color: ${BRAND.white}; border-color: ${BRAND.gulf}; }
.btn-teal { background: ${BRAND.teal}; color: ${BRAND.white}; border-color: ${BRAND.teal}; }
.btn-outline { background: ${BRAND.white}; color: ${BRAND.gulf}; border-color: ${BRAND.gulf}; }
.btn-muted { background: ${BRAND.silver}; color: ${BRAND.gulf}; border-color: ${BRAND.silver}; }
.icon-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 999px;
  background: ${BRAND.red};
  color: ${BRAND.white};
}
.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border-radius: 999px;
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 600;
}
.badge-red { background: ${BRAND.red}; color: ${BRAND.white}; }
.badge-teal { background: ${BRAND.teal}; color: ${BRAND.white}; }
.badge-silver { background: ${BRAND.silver}; color: ${BRAND.gulf}; }
.subtle-box {
  border: 1px solid ${BRAND.silver};
  border-radius: 22px;
  background: ${BRAND.paper};
  padding: 16px;
}
.stat-card {
  border: 1px solid ${BRAND.silver};
  border-radius: 24px;
  background: ${BRAND.white};
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,.06);
}
.progress-track { margin-top: 12px; height: 8px; border-radius: 999px; background: ${BRAND.silver}; overflow: hidden; }
.progress-fill { height: 100%; border-radius: 999px; }
.tabs-wrap {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 6px;
  background: ${BRAND.white};
  border: 1px solid ${BRAND.silver};
  border-radius: 22px;
  padding: 6px;
}
.tab-btn {
  border: none;
  background: transparent;
  color: ${BRAND.gulf};
  border-radius: 16px;
  padding: 10px 12px;
  font-weight: 600;
  cursor: pointer;
}
.tab-btn.active { background: ${BRAND.gulf}; color: ${BRAND.white}; }
.panel-stack > * + * { margin-top: 12px; }
.scroll-box { max-height: 320px; overflow: auto; padding-right: 8px; }
.range { width: 100%; accent-color: ${BRAND.red}; }
.text-muted { color: ${BRAND.grey}; }
.text-strong { color: ${BRAND.gulf}; font-weight: 600; }
.row { display: flex; gap: 16px; }
.row-between { display: flex; justify-content: space-between; gap: 16px; }
.row-wrap { display: flex; flex-wrap: wrap; gap: 8px; }
.align-center { align-items: center; }
.stack-sm > * + * { margin-top: 8px; }
.stack-md > * + * { margin-top: 12px; }
.stack-lg > * + * { margin-top: 16px; }
.mt-1 { margin-top: 4px; }
.mt-2 { margin-top: 8px; }
.mt-3 { margin-top: 12px; }
.mt-4 { margin-top: 16px; }
.w-full { width: 100%; }
.text-sm { font-size: 14px; }
.text-xs { font-size: 12px; }
.text-lg { font-size: 18px; }
.text-xl { font-size: 20px; }
.text-4xl { font-size: 40px; }
.font-semibold { font-weight: 600; }
.font-bold { font-weight: 700; }
.negotiation-card { border: 2px solid ${BRAND.red}; }
.term-card { border: 2px solid ${BRAND.teal}; }
.summary-card { border: 2px solid ${BRAND.teal}; }
.loss-card { border: 2px solid ${BRAND.red}; }
@media (max-width: 1100px) {
  .hero-grid, .content-grid { grid-template-columns: 1fr; }
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 720px) {
  .stats-grid, .two-grid, .button-grid, .detail-grid, .summary-grid, .tab-grid, .tabs-wrap { grid-template-columns: 1fr; }
  .row-between { flex-direction: column; }
  .text-4xl { font-size: 30px; }
}
`;

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function formatMoney(v) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(v);
}

function getAwardTier(credit) {
  if (credit >= 15000000) return "Diamond";
  if (credit >= 10000000) return "Platinum";
  if (credit >= 5000000) return "Gold";
  if (credit >= 2500000) return "Silver";
  if (credit >= 2000000) return "Bronze";
  return null;
}

function defaultNegotiationState() {
  return {
    rent: 50,
    ti: 50,
    cam: 50,
    termLength: 50,
    timeline: 50,
    contingencies: 50,
  };
}

function buildEmptyState(pathName) {
  return {
    month: 1,
    path: pathName,
    cash: SPECIALIZATIONS[pathName].cash,
    reputation: SPECIALIZATIONS[pathName].reputation,
    network: SPECIALIZATIONS[pathName].network,
    knowledge: SPECIALIZATIONS[pathName].knowledge,
    totalCredit: 0,
    annualIncome: 0,
    actionsLeft: 2,
    cidMember: false,
    subsidyUsed: false,
    scholarshipUsed: false,
    designations: [],
    learned: { asset_classes: true },
    leads: [],
    dealsClosed: [],
    log: [...START_LOG],
    marketMultiplier: Object.fromEntries(Object.keys(SPECIALIZATIONS).map((k) => [k, 1])),
    creditByClass: Object.fromEntries(Object.keys(SPECIALIZATIONS).map((k) => [k, 0])),
    awardsTracker: {
      byClass: Object.fromEntries(
        Object.keys(SPECIALIZATIONS).map((k) => [k, { totalCredit: 0, bestSale: 0, bestLease: 0 }]),
      ),
    },
  };
}

function createLead(pathName, state) {
  const spec = SPECIALIZATIONS[pathName];
  const market = state.marketMultiplier[pathName] ?? 1;
  const isLease = Math.random() < spec.leasingBias;
  const base = spec.avgDeal;
  const knowledgeFactor = 1 + state.knowledge / 200;
  const networkFactor = 1 + state.network / 250;
  const variance = 0.7 + Math.random() * 0.9;
  const value = Math.round(base * variance * market * knowledgeFactor * networkFactor);

  const client = randomFrom(CLIENT_TYPES[pathName]);
  const side = Math.random() < 0.5 ? "listing/landlord" : "buyer/tenant";
  const coBrokered = Math.random() < 0.55;
  const yourShare = coBrokered ? 0.5 : 1;
  const submarket = randomFrom(SUBMARKETS[pathName]);

  let difficulty = isLease ? 48 : 52;
  if (pathName === "Land") difficulty += 6;
  if (pathName === "Industrial") difficulty += 4;
  if (pathName === "Multifamily") difficulty += 3;

  const profile = {
    rent: { target: 55 + Math.floor(Math.random() * 25), flexibility: 10 + Math.floor(Math.random() * 8), weight: isLease ? 4 : 2 },
    ti: { target: isLease ? 45 + Math.floor(Math.random() * 30) : 50, flexibility: 10 + Math.floor(Math.random() * 8), weight: isLease ? 3 : 1 },
    cam: { target: isLease ? 50 + Math.floor(Math.random() * 25) : 50, flexibility: 8 + Math.floor(Math.random() * 8), weight: isLease ? 3 : 1 },
    termLength: { target: 45 + Math.floor(Math.random() * 30), flexibility: 10 + Math.floor(Math.random() * 8), weight: isLease ? 3 : 2 },
    timeline: { target: 40 + Math.floor(Math.random() * 35), flexibility: 8 + Math.floor(Math.random() * 8), weight: 2 },
    contingencies: { target: 40 + Math.floor(Math.random() * 35), flexibility: 10 + Math.floor(Math.random() * 8), weight: 3 },
  };

  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    client,
    path: pathName,
    submarket,
    type: isLease ? "Lease" : "Sale",
    value,
    creditValue: Math.round(value * yourShare),
    coBrokered,
    yourShare,
    difficulty,
    side,
    monthsActive: 0,
    summary: `${client} needs help on a ${isLease ? "lease" : "sale"} in ${pathName.toLowerCase()} in ${submarket}.`,
    negotiationProfile: profile,
    negotiationState: defaultNegotiationState(),
  };
}

function successChanceForDeal(deal, state) {
  let chance = 35;
  chance += state.reputation * 0.8;
  chance += state.network * 0.35;
  chance += state.knowledge * 0.7;
  chance -= deal.difficulty;

  if (state.learned.asset_classes) chance += 5;
  if (state.learned.nnn && ["Retail", "Office"].includes(deal.path) && deal.type === "Lease") chance += 8;
  if (state.learned.noi && ["Retail", "Office", "Special Purpose", "Multifamily"].includes(deal.path) && deal.type === "Sale") chance += 7;
  if (state.learned.cap_rate && ["Retail", "Office", "Special Purpose", "Multifamily"].includes(deal.path)) chance += 6;
  if (state.learned.ti_cam && ["Retail", "Office", "Industrial"].includes(deal.path) && deal.type === "Lease") chance += 6;
  if (state.learned.flood_zoning && ["Land", "Special Purpose"].includes(deal.path)) chance += 7;

  state.designations.forEach((d) => {
    chance += 5;
    if (d === "SIOR" && ["Office", "Industrial"].includes(deal.path)) chance += 8;
    if (d === "ALC" && deal.path === "Land") chance += 8;
    if (d === "CPM" && ["Retail", "Office", "Special Purpose", "Multifamily"].includes(deal.path)) chance += 6;
    if (d === "CCIM") chance += 6;
  });

  return clamp(Math.round(chance), 10, 95);
}

function calculateNegotiationOutcome(deal, state, choices) {
  let score = 0;
  const notes = [];

  Object.entries(deal.negotiationProfile).forEach(([key, config]) => {
    const chosen = choices[key] ?? 50;
    const diff = Math.abs(chosen - config.target);
    const tolerance = config.flexibility;

    if (diff <= tolerance) {
      score += 4 * config.weight;
      notes.push(`${NEGOTIATION_TERMS[key].title}: well aligned`);
    } else if (diff <= tolerance + 10) {
      score += 1 * config.weight;
      notes.push(`${NEGOTIATION_TERMS[key].title}: workable`);
    } else if (diff <= tolerance + 20) {
      score -= 2 * config.weight;
      notes.push(`${NEGOTIATION_TERMS[key].title}: friction`);
    } else {
      score -= 5 * config.weight;
      notes.push(`${NEGOTIATION_TERMS[key].title}: major obstacle`);
    }
  });

  if (state.learned.nnn && deal.type === "Lease" && ["Retail", "Office"].includes(deal.path)) score += 5;
  if (state.learned.ti_cam && deal.type === "Lease") score += 6;
  if (state.learned.noi && deal.type === "Sale") score += 4;
  if (state.learned.cap_rate && ["Retail", "Office", "Special Purpose", "Multifamily"].includes(deal.path)) score += 4;
  if (state.learned.flood_zoning && ["Land", "Special Purpose"].includes(deal.path)) score += 4;

  return { score, notes };
}

function closeDeal(state, deal, negotiationScore = 0) {
  const chance = clamp(successChanceForDeal(deal, state) + negotiationScore, 5, 98);
  const roll = Math.floor(Math.random() * 100) + 1;
  const win = roll <= chance;

  if (!win) {
    return {
      ...state,
      leads: state.leads.filter((d) => d.id !== deal.id),
      reputation: clamp(state.reputation + 1, 0, 100),
      log: [
        `Deal lost: ${deal.client} went another direction on the ${deal.type.toLowerCase()} in ${deal.submarket}. That will happen. Frequently.`,
        ...state.log,
      ].slice(0, 60),
    };
  }

  const grossRate = deal.type === "Sale" ? 0.03 : 0.04;
  const incomeBoost = state.designations.reduce((acc, d) => {
    const item = DESIGNATIONS[d];
    return acc + (item ? item.incomeBoost : 0);
  }, 0);
  const grossCommission = deal.value * grossRate * (1 + incomeBoost);
  const income = Math.round(grossCommission * 0.35 * deal.yourShare);
  const credit = deal.creditValue;

  const creditByClass = {
    ...state.creditByClass,
    [deal.path]: (state.creditByClass[deal.path] || 0) + credit,
  };

  const awardsTracker = {
    ...state.awardsTracker,
    byClass: {
      ...state.awardsTracker.byClass,
      [deal.path]: {
        totalCredit: (state.awardsTracker.byClass[deal.path]?.totalCredit || 0) + credit,
        bestSale:
          deal.type === "Sale"
            ? Math.max(state.awardsTracker.byClass[deal.path]?.bestSale || 0, credit)
            : state.awardsTracker.byClass[deal.path]?.bestSale || 0,
        bestLease:
          deal.type === "Lease"
            ? Math.max(state.awardsTracker.byClass[deal.path]?.bestLease || 0, credit)
            : state.awardsTracker.byClass[deal.path]?.bestLease || 0,
      },
    },
  };

  return {
    ...state,
    cash: state.cash + income,
    reputation: clamp(state.reputation + 4, 0, 100),
    network: clamp(state.network + 2, 0, 100),
    totalCredit: state.totalCredit + credit,
    annualIncome: state.annualIncome + income,
    dealsClosed: [...state.dealsClosed, { ...deal, income, credit, monthClosed: state.month }],
    leads: state.leads.filter((d) => d.id !== deal.id),
    creditByClass,
    awardsTracker,
    log: [
      `Deal closed: ${deal.type} in ${deal.path} (${deal.submarket}) for ${formatMoney(deal.value)}. Your credit: ${formatMoney(credit)}. Estimated income earned: ${formatMoney(income)}.`,
      ...state.log,
    ].slice(0, 60),
  };
}

function nextMonth(state) {
  const month = state.month + 1;
  const marketEvent = randomFrom(MARKET_EVENTS);
  const marketMultiplier = Object.fromEntries(
    Object.keys(SPECIALIZATIONS).map((k) => [k, marketEvent.effect[k] || 1]),
  );

  const agedLeads = state.leads.map((deal) => ({
    ...deal,
    monthsActive: deal.monthsActive + 1,
    difficulty: deal.difficulty + 2,
  }));
  const leads = agedLeads.filter((d) => d.monthsActive < 4);
  const expired = agedLeads.length - leads.length;
  const log = [...state.log];

  if (expired > 0) {
    log.unshift(`${expired} stale lead${expired > 1 ? "s" : ""} fell apart after too much delay. Commercial real estate remains committed to the bit.`);
  }
  log.unshift(`Month ${month} begins. Market shift: ${marketEvent.name}. ${marketEvent.text}`);

  return {
    ...state,
    month,
    actionsLeft: 2,
    marketMultiplier,
    leads,
    log: log.slice(0, 60),
  };
}

function runSanityChecks() {
  const checks = [
    () => defaultNegotiationState().rent === 50,
    () => getAwardTier(2000000) === "Bronze",
    () => getAwardTier(15000000) === "Diamond",
    () => clamp(120, 0, 100) === 100,
    () => clamp(-10, 0, 100) === 0,
    () => formatMoney(1000).includes("1,000"),
  ];

  const failed = checks.findIndex((fn) => !fn());
  if (failed !== -1) {
    throw new Error(`Sanity check failed at index ${failed}`);
  }
}

runSanityChecks();

function ProgressBar({ value, color = BRAND.red }) {
  const clamped = clamp(value, 0, 100);
  return (
    <div className="progress-track">
      <div className="progress-fill" style={{ width: `${clamped}%`, backgroundColor: color }} />
    </div>
  );
}

function Stat({ label, value, icon: Icon, money = false }) {
  return (
    <div className="stat-card">
      <div className="row align-center text-sm text-muted">
        <Icon size={16} color={BRAND.teal} />
        <span>{label}</span>
      </div>
      <div className="mt-2 text-xl font-semibold" style={{ color: BRAND.gulf }}>
        {money ? formatMoney(value) : value}
      </div>
    </div>
  );
}

function ({ key }) => (
  <div
    onMouseEnter={() => setHoverTerm(key)}
    onMouseLeave={() => setHoverTerm(null)}
    style={{ position: 'relative', display: 'inline-flex' }}
  >
    <button className="btn btn-outline" style={{ padding: 8, width: 36, height: 36 }}>
      <CircleHelp size={16} />
    </button>
    {hoverTerm === key && (
      <div style={{
        position: 'absolute',
        top: '120%',
        left: 0,
        zIndex: 10,
        width: 260,
        background: BRAND.white,
        border: `1px solid ${BRAND.silver}`,
        borderRadius: 12,
        padding: 10,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}>
        <div style={{ fontWeight: 600, color: BRAND.gulf, marginBottom: 4 }}>
          {NEGOTIATION_TERMS[key].title}
        </div>
        <div style={{ fontSize: 12, color: BRAND.grey }}>
          {NEGOTIATION_TERMS[key].text}
        </div>
      </div>
    )}
  </div>
) {
  return (
    <button className="btn btn-outline" style={{ padding: 8, width: 36, height: 36 }} onClick={onClick}>
      <CircleHelp size={16} />
    </button>
  );
}

export default function App() {
  const [pathChoice, setPathChoice] = useState("Office");
  const [started, setStarted] = useState(false);
  const [state, setState] = useState(null);
  const [activeTab, setActiveTab] = useState("actions");
  const [hoverTerm, setHoverTerm] = useState(null);
  const [negotiationDealId, setNegotiationDealId] = useState(null);
  const [negotiationChoices, setNegotiationChoices] = useState(defaultNegotiationState());

  const startGame = () => {
    setState(buildEmptyState(pathChoice));
    setStarted(true);
    setNegotiationDealId(null);
    setHoverTerm(null);
    setNegotiationChoices(defaultNegotiationState());
  };

  const awardTier = useMemo(() => (state ? getAwardTier(state.totalCredit) : null), [state]);
  const gameOver = state ? state.month > 12 : false;
  const lossState = state
    ? state.cash <= 0 && state.dealsClosed.length === 0 && state.month >= 6
      ? "You ran out of cash before building a viable business."
      : null
    : null;
  const activeNegotiation = state ? state.leads.find((d) => d.id === negotiationDealId) || null : null;
  const awardSummary = useMemo(() => {
    if (!state) return [];
    return Object.entries(state.awardsTracker.byClass).map(([asset, data]) => ({
      asset,
      agentOfYear: data.totalCredit,
      saleOfYear: data.bestSale,
      leaseOfYear: data.bestLease,
    }));
  }, [state]);

  const useAction = (updater) => {
    if (!state || gameOver || lossState || state.actionsLeft <= 0) return;
    const next = updater(state);
    setState({ ...next, actionsLeft: next.actionsLeft - 1 });
  };

  const doProspect = () => {
    useAction((s) => {
      const lead = createLead(s.path, s);
      return {
        ...s,
        leads: [lead, ...s.leads].slice(0, 12),
        network: clamp(s.network + 2, 0, 100),
        reputation: clamp(s.reputation + 1, 0, 100),
        log: [`New lead found: ${lead.summary} Potential credit: ${formatMoney(lead.creditValue)}.`, ...s.log].slice(0, 60),
      };
    });
  };

  const doNetwork = () => {
    useAction((s) => {
      const event = randomFrom(NETWORK_EVENTS);
      const bonusLead = Math.random() < 0.45 ? createLead(s.path, s) : null;
      return {
        ...s,
        network: clamp(s.network + (event.network || 0), 0, 100),
        reputation: clamp(s.reputation + (event.reputation || 0), 0, 100),
        knowledge: clamp(s.knowledge + (event.knowledge || 0), 0, 100),
        leads: bonusLead ? [bonusLead, ...s.leads].slice(0, 12) : s.leads,
        log: [
          `${event.name}: ${event.text}${bonusLead ? ` You also picked up a new lead worth roughly ${formatMoney(bonusLead.creditValue)} in credit.` : ""}`,
          ...s.log,
        ].slice(0, 60),
      };
    });
  };

  const joinCID = () => {
    useAction((s) => {
      if (s.cidMember) return s;
      return {
        ...s,
        cidMember: true,
        reputation: clamp(s.reputation + 5, 0, 100),
        network: clamp(s.network + 6, 0, 100),
        log: [
          "You joined CID. You now have access to CID-only networking plus an education subsidy option and a scholarship option for designation costs.",
          ...s.log,
        ].slice(0, 60),
      };
    });
  };

  const applySubsidy = () => {
    useAction((s) => {
      if (!s.cidMember || s.subsidyUsed) return s;
      return {
        ...s,
        cash: s.cash + 150,
        subsidyUsed: true,
        log: ["CID education subsidy approved: +$150 toward your professional development budget.", ...s.log].slice(0, 60),
      };
    });
  };

  const applyScholarship = () => {
    useAction((s) => {
      if (!s.cidMember || s.scholarshipUsed) return s;
      const chance = clamp(35 + s.reputation / 2 + s.knowledge / 3, 20, 90);
      const roll = Math.floor(Math.random() * 100) + 1;
      if (roll > chance) {
        return {
          ...s,
          scholarshipUsed: true,
          log: [`CID scholarship application declined this cycle. Your odds were ${chance}%.`, ...s.log].slice(0, 60),
        };
      }
      return {
        ...s,
        cash: s.cash + 1500,
        scholarshipUsed: true,
        log: ["CID scholarship awarded: +$1,500 added to your budget for designation pursuit.", ...s.log].slice(0, 60),
      };
    });
  };

  const learnConcept = (concept) => {
    useAction((s) => {
      if (s.learned[concept.key]) return s;
      if (s.cash < concept.cost) {
        return {
          ...s,
          log: [`Not enough cash to study ${concept.name}. Knowledge is noble. Invoices remain undefeated.`, ...s.log].slice(0, 60),
        };
      }
      return {
        ...s,
        cash: s.cash - concept.cost,
        knowledge: clamp(s.knowledge + concept.knowledge, 0, 100),
        learned: { ...s.learned, [concept.key]: true },
        log: [`Concept learned: ${concept.name}. ${concept.bonus}`, ...s.log].slice(0, 60),
      };
    });
  };

  const buyDesignation = (name) => {
    useAction((s) => {
      const allowed = SPECIALIZATIONS[s.path].designationOptions.includes(name);
      if (!allowed || s.designations.includes(name)) return s;
      const d = DESIGNATIONS[name];
      if (!d) return s;
      if (s.cash < d.cost) {
        return { ...s, log: [`You cannot afford ${name} yet. Professional prestige remains on layaway.`, ...s.log].slice(0, 60) };
      }
      if (s.knowledge < 30 && name !== "CCIM") {
        return { ...s, log: [`You need more market knowledge before pursuing ${name}.`, ...s.log].slice(0, 60) };
      }
      return {
        ...s,
        cash: s.cash - d.cost,
        knowledge: clamp(s.knowledge + d.knowledge, 0, 100),
        reputation: clamp(s.reputation + d.reputation, 0, 100),
        network: clamp(s.network + d.network, 0, 100),
        designations: [...s.designations, name],
        log: [`Designation earned: ${name}. ${d.description}`, ...s.log].slice(0, 60),
      };
    });
  };

  const workLead = (deal) => {
    if (!state || state.actionsLeft <= 0 || gameOver || lossState) return;
    setNegotiationDealId(deal.id);
    setNegotiationChoices(deal.negotiationState || defaultNegotiationState());
  };

  const resolveNegotiation = (style) => {
    if (!activeNegotiation || !state || state.actionsLeft <= 0) return;

    const styleMods = {
      aggressive: { score: 4, rep: -1, text: "You pushed hard on economics and timing." },
      balanced: { score: 8, rep: 1, text: "You balanced economics, relationship, and structure." },
      conservative: { score: 2, rep: 2, text: "You protected trust, but gave up a bit of leverage." },
    };

    const mod = styleMods[style];
    const negotiation = calculateNegotiationOutcome(activeNegotiation, state, negotiationChoices);
    const updatedLead = { ...activeNegotiation, negotiationState: { ...negotiationChoices } };
    const result = closeDeal(
      { ...state, reputation: clamp(state.reputation + mod.rep, 0, 100) },
      updatedLead,
      mod.score + negotiation.score,
    );

    setState({
      ...result,
      actionsLeft: result.actionsLeft - 1,
      log: [
        `Negotiation approach: ${style}. ${mod.text}`,
        `Negotiation issues: ${negotiation.notes.join(" • ")}.`,
        ...result.log,
      ].slice(0, 60),
    });
    setNegotiationDealId(null);
  };

  const endMonth = () => {
    if (!state || state.actionsLeft > 0 || gameOver || lossState) return;
    setState(nextMonth(state));
    setNegotiationDealId(null);
  };

  const reset = () => {
    setStarted(false);
    setState(null);
    setActiveTab("actions");
    setHoverTerm(null);
    setNegotiationDealId(null);
    setNegotiationChoices(defaultNegotiationState());
  };

  const renderStart = () => (
    <div className="container stack-lg">
      <div className="card card-pad-lg">
        <div className="row align-center">
          <div className="icon-pill"><Trophy size={28} /></div>
          <div>
            <div className="kicker">commercial investment division</div>
            <h1 className="heading-serif text-4xl font-semibold" style={{ color: BRAND.gulf, margin: "8px 0 0 0" }}>Deal Flow</h1>
            <p className="mt-2" style={{ maxWidth: 780, color: BRAND.grey }}>
              A CID-branded career sim for new agents. Pick a specialization, learn commercial real estate concepts,
              negotiate sales and leases, build annual credit volume, and chase CID Awards eligibility.
            </p>
          </div>
        </div>
      </div>

      <div className="hero-grid">
        <div className="card card-pad">
          <div className="heading-serif section-title">Choose your path</div>
          <div className="stack-md mt-3">
            <select className="btn btn-outline w-full" value={pathChoice} onChange={(e) => setPathChoice(e.target.value)}>
              {Object.keys(SPECIALIZATIONS).map((path) => (
                <option key={path} value={path}>{path}</option>
              ))}
            </select>

            <div className="subtle-box">
              <div className="row align-center">
                <div className="icon-pill" style={{ background: BRAND.gulf }}>
                  {React.createElement(SPECIALIZATIONS[pathChoice].icon, { size: 24 })}
                </div>
                <div className="heading-serif text-xl font-semibold" style={{ color: BRAND.gulf }}>{pathChoice}</div>
              </div>
              <p className="mt-3 text-sm text-muted">{SPECIALIZATIONS[pathChoice].description}</p>
              <div className="row-wrap mt-3">
                {SPECIALIZATIONS[pathChoice].designationOptions.map((d) => (
                  <span key={d} className="badge badge-red">{d}</span>
                ))}
              </div>
            </div>

            <div className="two-grid">
              <div className="subtle-box" style={{ background: BRAND.white }}>
                <div className="text-sm text-muted">Starting cash</div>
                <div className="text-lg font-semibold mt-1" style={{ color: BRAND.gulf }}>{formatMoney(SPECIALIZATIONS[pathChoice].cash)}</div>
              </div>
              <div className="subtle-box" style={{ background: BRAND.white }}>
                <div className="text-sm text-muted">Average deal size</div>
                <div className="text-lg font-semibold mt-1" style={{ color: BRAND.gulf }}>{formatMoney(SPECIALIZATIONS[pathChoice].avgDeal)}</div>
              </div>
            </div>

            <button className="btn btn-primary" onClick={startGame}>start game</button>
          </div>
        </div>

        <div className="card card-pad">
          <div className="heading-serif section-title">How the sim works</div>
          <div className="stack-md mt-3 text-sm text-muted">
            <p>Each month, you get 2 actions. Prospect, network, learn, join CID, pursue designations, and negotiate deals.</p>
            <p>Sales credit counts as sale price. Lease credit counts as fixed rent over the initial term only. Co-brokered deals split credit.</p>
            <p>Cross {formatMoney(2000000)} in annual credit volume to unlock CID Awards eligibility. Bronze starts at {formatMoney(2000000)}, then Silver, Gold, Platinum, and Diamond.</p>
            <p>Negotiations happen issue by issue with rent, TI allowance, CAM, term length, closing timeline, and contingencies.</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabs = () => (
    <div className="tabs-wrap">
      {[
        ["actions", "actions"],
        ["leads", "leads"],
        ["learn", "learn"],
        ["career", "career"],
        ["awards", "awards"],
      ].map(([key, label]) => (
        <button
          key={key}
          className={`tab-btn ${activeTab === key ? "active" : ""}`}
          onClick={() => setActiveTab(key)}
        >
          {label}
        </button>
      ))}
    </div>
  );

  const renderActions = () => (
    <div className="card card-pad">
      <div className="heading-serif section-title">Monthly actions</div>
      <div className="button-grid mt-3">
        <button className="btn btn-primary" disabled={state.actionsLeft <= 0 || gameOver || Boolean(lossState)} onClick={doProspect}>prospect for leads</button>
        <button className="btn btn-secondary" disabled={state.actionsLeft <= 0 || gameOver || Boolean(lossState)} onClick={doNetwork}>network in the market</button>
        <button className={`btn ${state.cidMember ? "btn-muted" : "btn-teal"}`} disabled={state.actionsLeft <= 0 || state.cidMember || gameOver || Boolean(lossState)} onClick={joinCID}>join CID</button>
        <button className="btn btn-outline" disabled={state.actionsLeft <= 0 || !state.cidMember || state.subsidyUsed || gameOver || Boolean(lossState)} onClick={applySubsidy}>apply for $150 subsidy</button>
        <button className="btn btn-outline" disabled={state.actionsLeft <= 0 || !state.cidMember || state.scholarshipUsed || gameOver || Boolean(lossState)} onClick={applyScholarship}>apply for $1,500 scholarship</button>
      </div>
      <div className="subtle-box mt-3 text-sm text-muted">
        You get 2 actions per month. Join CID to unlock education funding. When you use both actions, end the month to advance the market and age your pipeline.
      </div>
      <div className="mt-3">
        <button className="btn btn-outline w-full" disabled={state.actionsLeft > 0 || gameOver || Boolean(lossState)} onClick={endMonth}>
          {gameOver ? "year complete" : "end month"}
        </button>
      </div>
    </div>
  );

  const renderLeads = () => (
    <div className="card card-pad">
      <div className="heading-serif section-title">Active leads</div>
      <div className="panel-stack mt-3">
        {state.leads.length === 0 ? (
          <div className="subtle-box text-sm text-muted">No active leads yet. Time to meet people, make calls, and become professionally annoying in a strategic way.</div>
        ) : (
          state.leads.map((deal) => {
            const chance = successChanceForDeal(deal, state);
            return (
              <div key={deal.id} className="subtle-box" style={{ background: BRAND.white }}>
                <div className="row-between">
                  <div className="stack-sm">
                    <div className="row-wrap align-center">
                      <div className="heading-serif font-semibold" style={{ color: BRAND.gulf }}>{deal.client}</div>
                      <span className="badge badge-teal">{deal.path}</span>
                      <span className="badge badge-silver">{deal.type}</span>
                    </div>
                    <div className="text-sm text-muted">{deal.summary}</div>
                    <div className="detail-grid text-sm text-muted mt-2">
                      <div>Deal value: <span className="text-strong">{formatMoney(deal.value)}</span></div>
                      <div>Your credit: <span className="text-strong">{formatMoney(deal.creditValue)}</span></div>
                      <div>Representation: <span className="text-strong">{deal.side}</span></div>
                      <div>Submarket: <span className="text-strong">{deal.submarket}</span></div>
                      <div>Estimated close chance: <span className="text-strong">{chance}%</span></div>
                    </div>
                  </div>
                  <div>
                    <button className="btn btn-primary" disabled={state.actionsLeft <= 0 || gameOver || Boolean(lossState)} onClick={() => workLead(deal)}>negotiate deal</button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );

  const renderLearn = () => (
    <div className="card card-pad">
      <div className="heading-serif section-title">Learn commercial real estate concepts</div>
      <div className="panel-stack mt-3">
        {CONCEPTS.map((concept) => {
          const learned = !!state.learned[concept.key];
          return (
            <div key={concept.key} className="subtle-box" style={{ background: BRAND.white }}>
              <div className="row-between">
                <div className="stack-sm">
                  <div className="row-wrap align-center">
                    <div className="heading-serif font-semibold" style={{ color: BRAND.gulf }}>{concept.name}</div>
                    {learned && <span className="badge badge-red">learned</span>}
                  </div>
                  <div className="text-sm text-muted">{concept.description}</div>
                  <div className="text-sm" style={{ color: BRAND.teal }}>Bonus: {concept.bonus}</div>
                </div>
                <div className="row-wrap">
                  <button className="btn btn-outline" onClick={() => setHoverTerm({ name: concept.name, description: concept.description, bonus: concept.bonus })}>details</button>
                  <button className={`btn ${learned ? "btn-muted" : "btn-primary"}`} disabled={learned || state.actionsLeft <= 0 || gameOver || Boolean(lossState)} onClick={() => learnConcept(concept)}>
                    {learned ? "completed" : concept.cost === 0 ? "learn" : `learn for ${formatMoney(concept.cost)}`}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderCareer = () => (
    <div className="card card-pad">
      <div className="heading-serif section-title">Designations and career growth</div>
      <div className="subtle-box mt-3 text-sm text-muted">
        CID membership status: <span className="text-strong">{state.cidMember ? "active" : "not joined"}</span>
      </div>
      <div className="panel-stack mt-3">
        {SPECIALIZATIONS[state.path].designationOptions.map((name) => {
          const d = DESIGNATIONS[name];
          const owned = state.designations.includes(name);
          return (
            <div key={name} className="subtle-box" style={{ background: BRAND.white }}>
              <div className="row-between">
                <div className="stack-sm">
                  <div className="row-wrap align-center">
                    <div className="heading-serif font-semibold" style={{ color: BRAND.gulf }}>{name}</div>
                    {owned && <span className="badge badge-red">earned</span>}
                  </div>
                  <div className="text-sm text-muted">{d.description}</div>
                  <div className="text-sm" style={{ color: BRAND.teal }}>Cost: {formatMoney(d.cost)}</div>
                </div>
                <div>
                  <button className={`btn ${owned ? "btn-muted" : "btn-secondary"}`} disabled={owned || state.actionsLeft <= 0 || gameOver || Boolean(lossState)} onClick={() => buyDesignation(name)}>
                    {owned ? "owned" : `pursue ${name}`}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderAwards = () => (
    <div className="card card-pad">
      <div className="heading-serif section-title">CID awards tracking</div>
      <div className="subtle-box mt-3 text-sm text-muted">
        Achievement Awards unlock at $2,000,000+ in annual credit volume. Category tracking below reflects your current standing by asset class for Commercial Agent of the Year, Sale of the Year, and Lease of the Year logic.
      </div>
      <div className="panel-stack mt-3">
        {awardSummary.map((row) => (
          <div key={row.asset} className="subtle-box" style={{ background: BRAND.white }}>
            <div className="heading-serif font-semibold" style={{ color: BRAND.gulf }}>{row.asset}</div>
            <div className="summary-grid text-sm text-muted mt-2">
              <div>Agent of the Year volume: <span className="text-strong">{formatMoney(row.agentOfYear)}</span></div>
              <div>Best sale credit: <span className="text-strong">{formatMoney(row.saleOfYear)}</span></div>
              <div>Best lease credit: <span className="text-strong">{formatMoney(row.leaseOfYear)}</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (!started) {
    return (
      <>
        <style>{STYLES}</style>
        <div className="app-shell">{renderStart()}</div>
      </>
    );
  }

  if (!state) return null;

  return (
    <>
      <style>{STYLES}</style>
      <div className="app-shell">
        <div className="container stack-lg">
          <div className="card card-pad">
            <div className="row-between align-center">
              <div>
                <div className="kicker">CID career simulator</div>
                <h1 className="heading-serif text-4xl font-semibold" style={{ color: BRAND.gulf, margin: "8px 0 0 0" }}>
                  Deal Flow: New Orleans Commercial Real Estate
                </h1>
                <p className="mt-2 text-muted">
                  Month {Math.min(state.month, 12)} of 12 • Path: <span className="text-strong">{state.path}</span> • Actions left this month: <span className="text-strong">{Math.max(state.actionsLeft, 0)}</span>
                </p>
              </div>
              <div className="row-wrap">
                {awardTier ? (
                  <span className="badge badge-red">CID Achievement Tier: {awardTier}</span>
                ) : (
                  <span className="badge badge-silver">CID Awards eligibility locked</span>
                )}
                <button className="btn btn-outline" onClick={reset}>new game</button>
              </div>
            </div>
          </div>

          <div className="stats-grid">
            <Stat label="Cash" value={state.cash} icon={DollarSign} money />
            <Stat label="Annual income" value={state.annualIncome} icon={DollarSign} money />
            <Stat label="Annual credit volume" value={state.totalCredit} icon={Trophy} money />
            <Stat label="Reputation" value={state.reputation} icon={Users} />
            <Stat label="Knowledge" value={state.knowledge} icon={GraduationCap} />
          </div>

          <div className="content-grid">
            <div className="stack-lg">
              <div className="card card-pad">
                <div className="heading-serif section-title">Progress toward CID Awards eligibility</div>
                <div className="mt-3 text-sm text-muted">
                  {state.totalCredit >= 2000000
                    ? `You crossed the $2,000,000 threshold. Current tier: ${awardTier}.`
                    : `${formatMoney(2000000 - state.totalCredit)} in additional credit needed to reach Bronze eligibility.`}
                </div>
                <ProgressBar value={(state.totalCredit / 2000000) * 100} color={BRAND.red} />
              </div>

              {renderTabs()}
              {activeTab === "actions" && renderActions()}
              {activeTab === "leads" && renderLeads()}
              {activeTab === "learn" && renderLearn()}
              {activeTab === "career" && renderCareer()}
              {activeTab === "awards" && renderAwards()}
            </div>

            <div className="stack-lg">
              <div className="card card-pad">
                <div className="heading-serif section-title">Production by asset class</div>
                <div className="panel-stack mt-3">
                  {Object.keys(state.creditByClass).map((k) => (
                    <div key={k}>
                      <div className="row-between text-sm text-muted">
                        <span>{k}</span>
                        <span className="text-strong">{formatMoney(state.creditByClass[k])}</span>
                      </div>
                      <ProgressBar value={state.totalCredit > 0 ? (state.creditByClass[k] / state.totalCredit) * 100 : 0} color={BRAND.teal} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="card card-pad">
                <div className="heading-serif section-title">Closed deals</div>
                <div className="scroll-box mt-3 panel-stack">
                  {state.dealsClosed.length === 0 ? (
                    <div className="subtle-box text-sm text-muted">No closings yet. A humbling but temporary condition.</div>
                  ) : (
                    [...state.dealsClosed].reverse().map((deal) => (
                      <div key={deal.id} className="subtle-box" style={{ background: BRAND.white }}>
                        <div className="row-between align-center">
                          <div className="font-semibold" style={{ color: BRAND.gulf }}>{deal.type} • {deal.path}</div>
                          <span className="badge badge-teal">month {deal.monthClosed}</span>
                        </div>
                        <div className="mt-2 text-sm text-muted">{deal.client} • {deal.submarket}</div>
                        <div className="detail-grid text-sm text-muted mt-2">
                          <div>Value: <span className="text-strong">{formatMoney(deal.value)}</span></div>
                          <div>Credit: <span className="text-strong">{formatMoney(deal.credit)}</span></div>
                          <div>Income: <span className="text-strong">{formatMoney(deal.income)}</span></div>
                          <div>Share: <span className="text-strong">{Math.round(deal.yourShare * 100)}%</span></div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="card card-pad">
                <div className="heading-serif section-title">Market log</div>
                <div className="scroll-box mt-3 panel-stack">
                  {state.log.map((entry, i) => (
                    <div key={i} className="subtle-box text-sm text-muted">
                      <div className="row">
                        <FileText size={16} color={BRAND.teal} style={{ marginTop: 3, flexShrink: 0 }} />
                        <span>{entry}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {activeNegotiation && (
                <div className="card card-pad negotiation-card">
                  <div className="heading-serif section-title">Negotiation in progress</div>
                  <div className="mt-3 text-sm text-muted">
                    <span className="text-strong">{activeNegotiation.client}</span> • {activeNegotiation.type} • {activeNegotiation.path} • {activeNegotiation.submarket}
                  </div>
                  <div className="mt-2 text-sm text-muted">
                    Set your position on each issue, then choose a negotiation style. Closer alignment to the other side's priorities improves your odds.
                  </div>
                  <div className="panel-stack mt-3">
                    {NEGOTIATION_SLIDERS.map(([key, label]) => (
                      <div key={key} className="subtle-box">
                        <div className="row-between align-center">
                          <div className="row align-center">
                            <span className="font-semibold" style={{ color: BRAND.gulf }}>{label}</span>
                            <IconButton
                              onClick={() =>
                                setHoverTerm({
                                  name: NEGOTIATION_TERMS[key].title,
                                  description: NEGOTIATION_TERMS[key].text,
                                  bonus: "Use this concept to make smarter tradeoffs in negotiations.",
                                })
                              }
                            />
                          </div>
                          <span className="text-xs text-muted">Your position: {negotiationChoices[key]}</span>
                        </div>
                        <input
                          className="range mt-2"
                          type="range"
                          min="0"
                          max="100"
                          value={negotiationChoices[key]}
                          onChange={(e) =>
                            setNegotiationChoices((prev) => ({
                              ...prev,
                              [key]: Number(e.target.value),
                            }))
                          }
                        />
                        <div className="row-between text-xs text-muted mt-2">
                          <span>client-favorable</span>
                          <span>balanced</span>
                          <span>your side-favorable</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="button-grid mt-3">
                    <button className="btn btn-primary" onClick={() => resolveNegotiation("aggressive")}>aggressive</button>
                    <button className="btn btn-secondary" onClick={() => resolveNegotiation("balanced")}>balanced</button>
                    <button className="btn btn-teal" onClick={() => resolveNegotiation("conservative")}>conservative</button>
                  </div>
                </div>
              )}

              {hoverTerm && (
                <div className="card card-pad term-card">
                  <div className="heading-serif section-title">{hoverTerm.name}</div>
                  <div className="stack-md mt-3 text-sm text-muted">
                    <div>{hoverTerm.description}</div>
                    <div style={{ color: BRAND.teal }}>{hoverTerm.bonus}</div>
                    <div>
                      <button className="btn btn-outline" onClick={() => setHoverTerm(null)}>close</button>
                    </div>
                  </div>
                </div>
              )}

              {lossState && (
                <div className="card card-pad loss-card">
                  <div className="heading-serif section-title">Game over</div>
                  <div className="stack-md mt-3 text-sm text-muted">
                    <div>{lossState}</div>
                    <div>You can restart and try a different specialization, pursue CID earlier, or invest in education faster.</div>
                  </div>
                </div>
              )}

              {gameOver && (
                <div className="card card-pad summary-card">
                  <div className="heading-serif section-title">Year-end summary</div>
                  <div className="stack-md mt-3 text-sm text-muted">
                    <div>Total income earned: <span className="text-strong">{formatMoney(state.annualIncome)}</span></div>
                    <div>Total credit volume: <span className="text-strong">{formatMoney(state.totalCredit)}</span></div>
                    <div>CID result: <span className="text-strong">{awardTier ? `${awardTier} Achievement tier unlocked` : "below CID Achievement threshold"}</span></div>
                    <div>Win condition check: <span className="text-strong">{awardTier || state.designations.length >= 2 || state.dealsClosed.length >= 6 ? "successful first-year career launch" : "development year, not yet dominant"}</span></div>
                    <div>Designations earned: <span className="text-strong">{state.designations.length ? state.designations.join(", ") : "none"}</span></div>
                    <div>Deals closed: <span className="text-strong">{state.dealsClosed.length}</span></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
