# WeTrade: Live Search-Grounded Market Intelligence & Full Firebase Cloud Persistence

Empower small-scale sellers, producers, and buyers with real-time, search-grounded commodity spot pricing and trade intelligence powered by `gemini-3.8-flash` alongside full Firestore cloud synchronization for orders, RFQs, quotations, and seamless Google Authentication.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following architectural decisions were aligned during Phase 1 interactive clarification:

- **Confirmed Decision 1 (Google Search Grounding)**: Surfaced as a dedicated **Market Intelligence & Commodity Spot Pricing** module in the Trade Portal and Sourcing Hub. Powered server-side by `gemini-3.8-flash` with the `googleSearch` tool, extracting real-time agricultural/industrial commodity benchmarks, mandi/wholesale rates, export trends, and authentic web citation chunks.
- **Confirmed Decision 2 (Firebase Cloud Persistence Scope)**: End-to-end synchronization across Firestore collections (`users`, `orders`, `quotations`, `inquiries`, `products`, and `admins`), replacing temporary local state with live bi-directional snapshots (`onSnapshot`) while maintaining offline fallback resilience.
- **Confirmed Decision 3 (Streamlined Google Authentication)**: One-click Google Sign-In with instant role selection (Seller, Buyer, Logistics Partner) and instant profile creation, while automatically assigning full administrator rights to `ti1590091@gmail.com`.

---

## 1. Overview & Core Concept

WeTrade connects small-scale sellers, agricultural producers, and manufacturers with qualified enterprise buyers. This update integrates:

1. **Google Search Grounded Market Intelligence**:
   - Spot price discovery for major agro & manufacturing commodities (Turmeric, Basmati Rice, Alphonso Mango, Cotton, Steel, Spices, Pulses).
   - Real-time mandi rates, FOB export pricing, port logistics bottlenecks, and tariff/regulatory updates retrieved directly via Google Search Grounding.
   - Direct web citation links with domain titles for verifiable sourcing intelligence.
2. **Robust Firestore Persistence & Security**:
   - Cloud synchronization of all Trade Portal records: active orders with milestone progression, buyer RFQs, multi-tier quotations, product listings, and partner profiles.
   - Full alignment with `firebase-blueprint.json` and hardened `firestore.rules` enforcing role-based permissions (`admin`, `seller`, `buyer`, `logistics`).
3. **Frictionless Google Authentication**:
   - Google Sign-In via `signInWithPopup`, allowing immediate onboarding with company details, phone, and role designation without cumbersome email validation queues.

---

## 2. User Experience & Visual Design

### Key User Flows

1. **Market Intelligence Discovery Flow**:
   - User navigates to the new **"Market Intelligence"** tab in the Trade Portal or clicks **"Check Live Spot Prices"** on any product card.
   - Selects a commodity category or inputs a custom search query (e.g., *"Erode Salem Finger Turmeric wholesale spot rate and export demand Q2 2026"*).
   - Server queries `gemini-3.8-flash` with `{ googleSearch: {} }`, streaming back structured price ranges, recent percentage shifts, market drivers, and verifiable web source URLs.
   - Quick "Apply Benchmark to Quotation" button allows sellers/buyers to pre-fill pricing into RFQ quotes.

2. **Google Sign-In & Role Selection Flow**:
   - User clicks **"Continue with Google"** on the Navbar or Auth modal.
   - Firebase Google popup authenticates `ti1590091@gmail.com` or new user.
   - If first-time login: a lightweight modal captures Company Name, Operating Location, Phone, and Trading Role (Buyer, Seller, Logistics).
   - User profile is immediately committed to Firestore (`/users/{uid}`) with status `approved` and instantaneous portal access.

3. **Live Trade Operations Flow**:
   - Sellers post products or respond to buyer RFQs; quotations and purchase orders are synced to Firestore.
   - Order milestone advances (e.g. *Order Confirmed* $\rightarrow$ *Quality Check* $\rightarrow$ *Picked Up* $\rightarrow$ *Delivered*) update live in Firestore with server timestamps.

### Visual Identity & Theme (SaaS & Trade Portal)

- **Aesthetic Direction**: High-utility B2B enterprise trade terminal. Clean, sharp, trustworthy, with deep navy anchors and crisp warm neutral canvas.
- **Color Palette**:
  - Dominant Neutral Canvas: `#F8FAFC` (Slate 50) / `#FFFFFF`
  - Deep Anchor: `#07145B` (WeTrade Navy)
  - Structural Surface: `#FFFFFF` with hairline borders (`#E2E8F0`)
  - Accent / Primary CTA: `#2563EB` (Electric Royal Blue) and `#0D9488` (Teal)
  - Semantic Status: Emerald `#16A34A` (Delivered/Normal), Amber `#D97706` (In Transit/Pending), Crimson `#DC2626` (Delayed/Critical)
- **Typography & Hierarchy**:
  - Headings & Brand: `Plus Jakarta Sans`, font-weight 700/800
  - Body & Form Controls: `Plus Jakarta Sans` / `Noto Sans`, 14px–15px
  - Financial & Tabular Telemetry: `tabular-nums font-mono` for weights, quotes, tracking codes, and spot price metrics
- **Interactive Feedback**:
  - Subtle hover transitions (150ms settling), shimmer skeletons for AI search queries, clear empty states with prompt shortcuts.

---

## 3. Key Product Decisions & Trade-Offs

- **Server-Side Gemini Search Grounding (`server.ts`)**:
  - *Chosen Approach*: Implement an Express endpoint `/api/market-intelligence` leveraging `@google/genai` on the server using `process.env.GEMINI_API_KEY`.
  - *Why*: Eliminates client-side key exposure, complies strictly with AI Studio build runtime standards, and allows formatting grounding chunks and metadata cleanly before client consumption.
- **Hybrid Firestore Realtime Sync with Seed Guarantee**:
  - *Chosen Approach*: `TradeContext` connects to Firestore collections with real-time listeners (`onSnapshot`). When a collection is empty, it automatically seeds initial verified catalog and order templates to Firestore.
  - *Why*: Provides instant collaborative live syncing across multiple devices/tabs while ensuring new accounts immediately experience a populated, realistic trade environment.
- **Instant Role Onboarding over Approval Queue for Google Sign-in**:
  - *Chosen Approach*: New Google users immediately choose their active role and enter company details, granting immediate portal capability without administrative lock-out, while preserving role-based boundaries.

---

## 4. Technical Architecture & Data Strategy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT (React SPA)                             │
├────────────────────────────────┬────────────────────────────────────────────┤
│           Public Views         │             Trade Portal                   │
│   - HomePage & Catalog         │   - Market Intelligence Tab (Grounded AI)  │
│   - Product Detail (Live Spot) │   - Orders & Milestones (Live Firestore)   │
│   - Instant Google Auth Modal  │   - RFQs, Quotes & Logistics Management    │
└───────────────┬────────────────┴─────────────────────┬──────────────────────┘
                │                                      │
       REST API (Search)                       Firestore SDK (Live Sync)
                ▼                                      ▼
┌───────────────────────────────┐     ┌───────────────────────────────────────┐
│     Express Proxy Backend     │     │           Firebase Cloud              │
│         (server.ts)           │     ├───────────────────────────────────────┤
│  POST /api/market-intelligence │     │ • users/{uid}                         │
│  - @google/genai SDK          │     │ • orders/{orderId}                    │
│  - gemini-3.8-flash           │     │ • quotations/{quoteId}                │
│  - googleSearch tool          │     │ • inquiries/{inquiryId}               │
│  - Grounding metadata chunks  │     │ • products/{productId}                │
└───────────────────────────────┘     └───────────────────────────────────────┘
```

### Data Entities & Schema Updates

1. **`market_intelligence_query` (Ephemeral & Saved)**:
   - `query`: string, `category`: string, `commodity`: string
   - `summary`: string, `spotPriceRange`: string, `trend`: `'up' | 'down' | 'stable'`
   - `groundingSources`: `Array<{ title: string; uri: string }>`
   - `timestamp`: string
2. **`orders` (Firestore Collection)**:
   - `id`, `orderNumber`, `buyerId`, `sellerId`, `productName`, `quantity`, `totalValue`, `currentMilestone`, `activities`, `updatedAt`
3. **`quotations` (Firestore Collection)**:
   - `id`, `rfqNumber`, `buyerName`, `sellerName`, `unitPrice`, `status`, `revisionsCount`
4. **`inquiries` / `buyer_leads` (Firestore Collection)**:
   - `id`, `companyName`, `productInterest`, `targetVolume`, `status`, `lastFollowUp`

### Step-by-Step Implementation Strategy

1. **Backend Server Setup (`server.ts`)**:
   - Create Express server mounting Vite middlewares in dev mode.
   - Configure `@google/genai` with `gemini-3.8-flash` and `tools: [{ googleSearch: {} }]`.
   - Expose `/api/market-intelligence` endpoint handling search queries, structured parsing, and grounding chunk extraction with fallback handling.
2. **Frontend Market Intelligence Module**:
   - Build `MarketIntelligenceView` component in the portal with pre-set commodity chips (Turmeric, Rice, Cotton, Onions, Spices, Steel), custom search, and real-time spot price cards.
   - Display verified Google Search source links and export insights with copy/quote action buttons.
3. **Firestore Cloud Synchronization (`TradeContext.tsx`)**:
   - Upgrade `TradeContext` to sync `orders`, `quotations`, `inquiries`, and `products` with Firestore using `onSnapshot`, `setDoc`, and `updateDoc` with error handlers.
   - Provide seamless offline fallback and automatic initial data seeding if collections are empty.
4. **Auth Flow Refinement (`AuthContext.tsx` & `LoginPage.tsx`)**:
   - Streamline Google Sign-In with instant role selection dialog for newly registered Google users.
   - Preserve bootstrap admin provisioning for `ti1590091@gmail.com`.
5. **Validation & Verification**:
   - Deploy/verify rules and run `compile_applet` and `lint_applet` to confirm build health.
