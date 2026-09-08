# Deal Flow: New Orleans

A browser-based commercial real estate career game. Choose one of six asset classes, build a pipeline, negotiate deals, learn market concepts, and see how your business finishes its first year.

## Run locally

```sh
npm ci
npm run dev
```

`npm test` checks the pure game engine. `npm run build` creates the production site in `dist/`. Vercel can use the existing Vite preset with no environment variables or backend.

## Playing

- Start with $18,000, one warm referral, and three actions per month.
- Prospect, network, take on a monthly opportunity, study, join CID, or submit an offer. Reading a brief and adjusting terms are free.
- Negotiate sale price, timing, and contingencies on sales. Leases also include base rent, TI, CAM, and the initial lease term. Counterparty priorities change the importance of each issue; personality changes the relative strengths of closing approaches.
- Price and lease term change transaction value, commission, and credit. One roll determines the outcome everywhere.
- Leads expire on their visible deadlines. Each month charges $650 in overhead, including December. A cash deficit ends the run.
- CID membership costs $70 and unlocks a $150 credit against a course. A successful scholarship application provides $1,500 against a designation, not spendable cash.
- Three closings in an additional asset class unlock its specialization bonus and designation options.
- Progress, active negotiation terms, and outcomes are saved in this browser. Use Resume to continue. Starting a new career replaces the prior save after confirmation. Saves do not sync across devices; no player data is sent to a backend.

All market events, costs, commission models, and achievement tiers are fictional game assumptions. Actual designation requirements, compensation arrangements, and awards eligibility are not established by this simulation.

## Structure

- `src/game.js`: pure state transitions, lead generation, negotiation estimates and outcomes.
- `src/game.test.js`: regression checks for the game loop and economics.
- `src/App.jsx`: responsive screens and versioned local save/resume.
- `src/styles.css`: responsive interface, keyboard focus, and reduced-motion support.

## Bugs fixed in this revision

The original start handler referenced an undefined variable. Random leads discarded their selected asset class. The result screen used a separate random roll from the ledger, allowing a displayed win to record as a loss. Invalid purchases could consume actions; sale negotiations included lease terms; advertised urgency and personality did not affect the mechanics. These paths now share validated engine functions and regression coverage.
