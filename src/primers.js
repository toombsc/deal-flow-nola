const creda = { label: 'CREDA · Industry terms and definitions', url: 'https://www.credaglobal.org/education-and-career/industry-terms-and-definitions' };

// Definitions are paraphrased; worked examples are original, illustrative scenarios.
export const PRIMERS = {
  asset_classes: {
    sections: [{ title: 'The idea', text: 'Property types group buildings by use, such as retail, office, industrial, and multifamily.', sources: [creda] }],
    examples: [['Retail', 'A neighborhood storefront'], ['Office', 'A suite for a design firm'], ['Industrial', 'A distribution warehouse'], ['Land', 'An undeveloped parcel'], ['Special Purpose', 'A theater'], ['Multifamily', 'An apartment building']],
    example: 'A bakery needs customers walking past its door. A distributor needs trucks reaching its loading dock. In the game’s six specialties above, the same location can be a great fit for one client and a poor fit for another.'
  },
  nnn: {
    sections: [{ title: 'The idea', text: 'In a triple net (NNN) lease, the tenant pays property taxes, insurance, and maintenance in addition to base rent. The signed lease determines the exact responsibilities.', sources: [creda] }],
    formula: 'Annual occupancy budget = base rent + expense charges',
    example: 'For a fictional 2,000-square-foot shop, annual base rent of $24 per square foot plus $8 in expense charges totals $64,000 a year. Budgeting only the $48,000 base rent leaves a $16,000 gap.'
  },
  noi: {
    sections: [{ title: 'The idea', text: 'Net operating income measures property income after operating expenses. Property taxes and routine repairs count as expenses; mortgage payments, investor income taxes, and major capital improvements are excluded.', sources: [{ label: 'Newfi · NOI formula and included expenses', url: 'https://newfi.com/net-operating-income/' }, creda] }],
    formula: 'NOI = effective property income − operating expenses',
    example: 'Suppose a building earns $180,000 a year after vacancy and collection losses, and costs $60,000 to operate. Its NOI is $120,000. If annual loan payments are $45,000, that leaves $75,000 before other cash outlays; the NOI itself stays $120,000.'
  },
  cap_rate: {
    sections: [{ title: 'The idea', text: 'A capitalization rate compares annual NOI with a property’s price. With NOI unchanged, a higher cap rate implies a lower value.', sources: [creda] }],
    formula: 'Cap rate = annual NOI ÷ purchase price × 100%',
    example: 'A fictional property with $120,000 in annual NOI and a $2 million price has a 6% cap rate. At an 8% cap rate, that same NOI implies a $1.5 million price. This calculation does not include loan payments or a future sale.'
  },
  ti_cam: {
    sections: [
      { title: 'TI: tenant improvements', text: 'These are changes that prepare a tenant’s space for its intended use. A turnkey arrangement has the landlord deliver the agreed improvements ready for occupancy.', sources: [creda] },
      { title: 'CAM and reconciliation', text: 'Common area maintenance covers shared property upkeep. Reconciliation compares estimated charges with actual eligible expenses, then settles the difference according to the lease.', sources: [{ label: 'Fyxt · CAM charges and reconciliation', url: 'https://fyxt.com/resources/cam-reconciliation-and-cam-charges-how-to-manage-them/' }] }
    ],
    example: 'Imagine a negotiated TI allowance of $25 per square foot for 2,000 square feet: that is $50,000 toward the agreed work. Separately, if a tenant prepaid $6,000 in CAM but its eligible annual share is $6,600, reconciliation could produce a $600 bill, subject to the lease.'
  },
  flood_zoning: {
    sections: [
      { title: 'Flood: understand the exposure', text: 'Flood maps identify hazard areas, but being outside a high-risk zone does not mean zero flood risk. Elevation and building characteristics also matter.', sources: [{ label: 'FEMA / NFIP · Understanding flood risk', url: 'https://www.floodsmart.gov/flood-zones-and-maps/what-is-my-flood-risk' }] },
      { title: 'Zoning: check the proposed use', text: 'New Orleans’ Property Viewer shows zoning districts, overlays, and parcel details affecting use or development. Check the applicable rules for the actual address and intended project.', sources: [{ label: 'City of New Orleans · Zoning Administration', url: 'https://nola.gov/next/safety-and-permits/topics/zoning-administration/' }] }
    ],
    example: 'Your fictional client wants to turn a warehouse into a restaurant. Before promising a quick opening, investigate whether the use is allowed and what approvals it needs. Review flood exposure separately. A good floor plan alone does not answer either question.'
  }
};
