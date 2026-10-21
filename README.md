# WeTrade — B2B Sourcing, Sales & Trade Facilitation Solutions

> **Right Source – Right Buyer – Better Value**  
> An end-to-end digital trade facilitation platform bridging small-scale manufacturers and producers with qualified buyers, streamlining price negotiations, purchase orders, logistics coordination, and milestone delivery tracking.

---

## 📌 Overview

**WeTrade** is a modern B2B trade coordination platform built for emerging producers, regional manufacturers, and commercial buyers. Unlike standard transactional marketplaces, WeTrade provides high-touch facilitation:

- **Verified Sourcing:** Vetted product listings, verified seller credentials, and quality assurance.
- **Bilateral Commercial Terms:** Direct quotation workflows, tier-based pricing, and intermediary negotiation support.
- **Order Milestone Tracking:** 7-stage lifecycle tracking from PO confirmation to final destination delivery.
- **Logistics Coordination:** Optional door-to-door freight dispatch, carrier allocation, and milestone tracking.
- **Role-Based Access Control (RBAC):** Dedicated views and permissions for **Admins**, **Sellers**, **Buyers**, and **Logistics Partners**.
- **Admin Approval Pipeline:** New business registration requests undergo administrator verification before gaining Trade Portal clearance.

---

## 🚀 Key Features

### 1. Public Trade Platform
- **Hero & Value Proposition:** Interactive trade overview and value model.
- **Interactive 14-Stage Demo Portfolio:** Visual walkthrough of the full trade facilitation mechanics.
- **Tailored Solution Hubs:** Dedicated pages for Sellers (`/for-sellers`), Buyers (`/for-buyers`), and Freight Partners (`/logistics`).
- **Product Directory:** Search, category filters, and detailed technical specifications (`/products`).
- **Company & Governance:** About Us, Trade Facilitation Services, FAQ, Contact Hub, Privacy Policy, and Intermediary Terms of Service.

### 2. Authentication & Access Management
- **Brand-Aligned Login Portal (`/login`):** Custom design with navy blue (`#07145B`) and golden yellow (`#FFB800`).
- **Multi-Method Sign-In:** Email/password authentication and **Google Sign In**.
- **Business Account Registration (`/register`):** Collects company details, contact person, location, and requested account role.
- **Account Verification & Governance:**
  - `/pending-approval`: Live status tracking while account review is pending.
  - `/access-restricted`: Explicit messaging for suspended or rejected accounts.
  - Administrative review console inside the portal for real-time approvals, role assignment, suspensions, and reinstatements.

### 3. Secure Trade Portal (`/portal`)
- **Dashboard & KPI Metrics:** Real-time trade volume, active orders, open quotes, and dispatch status.
- **Seller Management:** Profile onboarding, lot sizes, production capacity, and verification status.
- **Product Catalog Management:** Pricing tiers, inventory lots, and packaging details.
- **Buyer Leads & Matching:** Buyer demand capture, order preferences, and supplier matching.
- **Quotations & Commercial Offers:** RFQ creation, quote responses, margin calculations, and approvals.
- **Order Processing & Milestone Tracking:** 7-stage status workflow (PO Issued, Order Confirmed, Production In-Progress, Quality Inspected, Dispatched, In-Transit, Delivered).
- **Logistics Dispatch:** Freight requests, vehicle allocation, tracking numbers, and delivery confirmation.
- **Trade Analytics:** Volume and milestone charts powered by Recharts.

---

## 🛠️ Tech Stack

- **Frontend:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Dev Server:** [Vite 8](https://vitejs.dev/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Routing:** [React Router 7](https://reactrouter.com/) (HashRouter for flexible preview and hosting)
- **Database & Auth:** [Firebase v13](https://firebase.google.com/) (Cloud Firestore + Firebase Authentication)
- **Charts & Data Viz:** [Recharts](https://recharts.org/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Animations:** [Motion](https://motion.dev/)

---

## 📁 Project Structure

```text
├── .aistudio/                 # AI Studio artifacts & system configuration
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── common/            # Navbar, Footer, Logo, ProtectedRoute, Toast
│   │   ├── home/              # Hero trade process & homepage widgets
│   │   └── portal/            # Account management & portal modules
│   ├── config/                # Central app constants & contact settings (appConfig.ts)
│   ├── context/               # React Context Providers (AuthContext, TradeContext)
│   ├── data/                  # Mock data for demonstration & initial bootstrap
│   ├── lib/                   # Firebase initialization & error handlers (firebase.ts)
│   ├── pages/                 # Route pages (Home, Login, Register, Portal, etc.)
│   ├── types/                 # TypeScript interfaces (trade, auth, portal roles)
│   ├── App.tsx                # Main router & layout configuration
│   ├── index.css              # Global styles & Tailwind CSS imports
│   └── main.tsx               # React application entry point
├── firebase-applet-config.json # Firebase connection credentials
├── firebase-blueprint.json    # Schema & entity definitions for Firestore
├── firestore.rules            # Attribute-Based Access Control (ABAC) security rules
├── package.json               # Dependencies & scripts
├── tsconfig.json              # TypeScript compiler configuration
├── vite.config.ts             # Vite build & dev server configuration
└── README.md                  # Project documentation
```

---

## 💻 Getting Started

### Prerequisites
- **Node.js**: `v20.x` or later recommended
- **npm**: `v10.x` or later (or `bun` / `pnpm`)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/<your-username>/<your-repo-name>.git
   cd <your-repo-name>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment:**
   Copy the sample environment file:
   ```bash
   cp .env.example .env
   ```

4. **Firebase Configuration:**
   Ensure `firebase-applet-config.json` contains your Firebase project credentials:
   ```json
   {
     "projectId": "your-firebase-project-id",
     "appId": "your-app-id",
     "apiKey": "your-api-key",
     "authDomain": "your-project.firebaseapp.com",
     "firestoreDatabaseId": "your-firestore-database-id",
     "storageBucket": "your-project.firebasestorage.app",
     "messagingSenderId": "your-sender-id"
   }
   ```

5. **Start Development Server:**
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000`.

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the local development server at `http://localhost:3000` |
| `npm run build` | Compiles TypeScript and creates optimized production assets in `dist/` |
| `npm run preview` | Previews the production build locally |
| `npm run lint` | Runs TypeScript type checking (`tsc --noEmit`) |
| `npm run clean` | Cleans previous build artifacts and compiled distributions |

---

## 🔐 Security & Access Control

- **Firestore Security Rules (`firestore.rules`):**
  - Read/write access strictly locked behind verified session checks.
  - Non-privileged accounts cannot self-assign roles or approve themselves.
  - Profile self-edits are limited to non-sensitive contact details.
  - Dedicated admin bypass verified via secure database records (`/admins/{uid}`) and primary operator identity.
- **Route Guards (`<ProtectedRoute>`):**
  - Validates authentication state, user clearance, and role approval before rendering `/portal`.
  - Redirects unauthorized users directly to `/login`, `/pending-approval`, or `/access-restricted`.

---

## 📞 Contact & Support

- **General Inquiries:** [info@thewetrade.in](mailto:info@thewetrade.in)
- **Technical & Partner Support:** [support@thewetrade.in](mailto:support@thewetrade.in)
- **Phone Lines:** `+91 96994 84156`, `+91 93229 74966`
- **Headquarters:** Hadapsar, Saswad Rd, Pune, Maharashtra - 411028

---

## 📄 License

This project is proprietary and confidential. All rights reserved by **WeTrade**.
