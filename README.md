# 🧠 Synapse Platform | Web3 Milestone Funding Escrow

> **Submission for the "Mind the Product: Everyone Ships Now" Hackathon**  
> Deployed Interactive Sandbox: [Live Vercel Production Preview](https://vercel.app)

Synapse is an intelligent decentralized workflow platform that connects live product development milestones with secure on-chain token escrow contract releases. Built to eliminate funding fragmentation, moving target metrics, and communication overhead for independent builders and grant committees.

---

## 🛠️ Unified System Repository Mapping

*   **`/components/AgreementSigner.tsx`**: Phase 0 Deal Formation engine managing template layouts, split multi-party text states, and wallet cryptographic signature mock variables.
*   **`/SynapseEscrow.sol`**: Deployed Solidity milestone funding smart contract featuring locked capital parameters and index-bound payout validation rules.
*   **`/Schema.sql`**: PostgreSQL database relational definitions hosting user profiles, case-insensitive address lookups, specific workspace roles, project rows, and cryptographic agreement fields.
*   **`/app/layout.tsx`**: Base app layout shell containing global script context configurations and mandatory **Novus.ai SDK telemetry integration hooks** (`pageview`).
*   **`/components/WalletProvider.tsx`**: AppKit Web3 adapter context initialization block managing cheap EVM L2 testnet variables (Arbitrum/Base Sepolia).
*   **`/components/SubmitMilestoneForm.tsx` & `/api/milestones/submit/`**: Functional client-side forms and API endpoints capturing builder proof URLs and mutating tracking states.
*   **`/components/InvestorReviewConsole.tsx` & `/api/milestones/review/`**: Fund manager audit consoles enforcing the **50-character mandatory dispute feedback constraint** to stop blind rejections.
*   **`/app/page.tsx`**: Live presentation landing component connecting states, mock environments, and workspace panels.

---

## 🚀 Native Hackathon Instrumentation (Novus.ai)

In compliance with track rule structures, Synapse actively monitors and logs application lifecycle events through the global **Novus.ai SDK layer**:
1. `user_authenticated`: Fired upon successful Web3 wallet cryptographic profile handshakes.
2. `agreement_signed_locally`: Triggered immediately when an investor or developer executes a text signature.
3. `escrow_contract_initialized`: Logs the transaction deployment event when both signature paths clear.
4. `milestone_submitted`: Emitted instantly when a developer uploads proof of work variables.
5. `milestone_approved` / `milestone_rejected`: Logs investor audit evaluations and dispute parameters.

---

## 🧑‍💻 Local Production Getting Started

```bash
# Clone the hackathon repository
git clone https://github.com

# Install dependencies 
npm install

# Set up local tracking variables (.env.local)
NEXT_PUBLIC_NOVUS_PROJECT_TOKEN=HACKATHON_MIND_THE_PRODUCT_2026
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=YOUR_PROJECT_ID

# Run the local development server
npm run dev
```
*   **`/app/layout.tsx`**: Base app layout shell containing global script context configurations and mandatory **Novus.ai SDK telemetry integration hooks** (`pageview`).
*   **`/components/WalletProvider.tsx`**: AppKit Web3 adapter context initialization block managing cheap EVM L2 testnet variables (Arbitrum/Base Sepolia).
*   **`/components/SubmitMilestoneForm.tsx` & `/api/milestones/submit/`**: Functional client-side forms and API endpoints capturing builder proof URLs and mutating tracking states.
*   **`/components/InvestorReviewConsole.tsx` & `/api/milestones/review/`**: Fund manager audit consoles enforcing the **50-character mandatory dispute feedback constraint** to stop blind rejections.
*   **`/app/page.tsx`**: Live presentation landing component connecting states, mock environments, and workspace panels.

---

## 🚀 Native Hackathon Instrumentation (Novus.ai)

In compliance with track rule structures, Synapse actively monitors and logs application lifecycle events through the global **Novus.ai SDK layer**:
1. `user_authenticated`: Fired upon successful Web3 wallet cryptographic profile handshakes.
2. `milestone_submitted`: Emitted instantly when a developer uploads proof of work variables.
3. `milestone_approved` / `milestone_rejected`: Logs investor audit evaluations and dispute parameters.

---

## 🧑‍💻 Local Production Getting Started

```bash
# Clone the hackathon repository
git clone https://github.com

# Install dependencies 
npm install

# Set up local tracking variables (.env.local)
NEXT_PUBLIC_NOVUS_PROJECT_TOKEN=HACKATHON_MIND_THE_PRODUCT_2026
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=YOUR_PROJECT_ID

# Run the local development server
npm run dev
```
