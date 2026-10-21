import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  FileCheck2,
  Users2,
  Scale,
  BadgeCheck,
  Truck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  FileText,
  Sparkles,
  Info
} from 'lucide-react';

interface SevenStageData {
  id: number;
  title: string;
  shortLabel: string;
  icon: React.ElementType;
  whatHappens: string;
  whoIsInvolved: string;
  whatWeTradeDoes: string;
  documentsRequired: string;
  stageOutcome: string;
  nextStep: string;
  operationalContext: string;
}

const SEVEN_STAGES: SevenStageData[] = [
  {
    id: 1,
    title: 'Stage 1: Seller Registration & Needs Assessment',
    shortLabel: 'Registration',
    icon: Building2,
    whatHappens: 'A producer or small-scale manufacturer registers their business with WeTrade, detailing production capacity, facility location, and pricing expectations.',
    whoIsInvolved: 'Seller Representative & WeTrade Sourcing Desk',
    whatWeTradeDoes: 'Conducts an initial orientation meeting to understand business constraints, factory capacity, and commercial expectations.',
    documentsRequired: 'Seller Profile Questionnaire, Business Registration copy, basic specification sheet',
    stageOutcome: 'Complete profile establishing seller readiness and production limits.',
    nextStep: 'Proceed to sample review and physical/documentary verification.',
    operationalContext: 'Covers Seller Enquiry, Initial Meeting, and Needs Assessment.'
  },
  {
    id: 2,
    title: 'Stage 2: Product Verification & Catalogue Listing',
    shortLabel: 'Verification',
    icon: FileCheck2,
    whatHappens: 'Products are audited for compliance, quality grades, lab test reports (e.g. FSSAI, moisture, tensile strength), and packaging durability.',
    whoIsInvolved: 'WeTrade Quality Desk & Seller Operations',
    whatWeTradeDoes: 'Audits certificates, confirms sample consistency, and creates a standardized digital SKU listing in the Trade Portal.',
    documentsRequired: 'Laboratory Test Certificates, Batch Analysis, Master Carton Spec',
    stageOutcome: 'Verified listing tagged with clear MOQs and indicative pricing.',
    nextStep: 'Initiate targeted buyer discovery and wholesale market outreach.',
    operationalContext: 'Covers Product Verification, Catalogue Hygiene, and Market Research.'
  },
  {
    id: 3,
    title: 'Stage 3: Buyer Discovery & Matchmaking',
    shortLabel: 'Discovery',
    icon: Users2,
    whatHappens: 'WeTrade identifies screened wholesale distributors, institutional purchasers, and retail chains whose sourcing criteria match the seller’s product.',
    whoIsInvolved: 'WeTrade Sales Desk & Prospective Buyer Procurement Teams',
    whatWeTradeDoes: 'Presents verified specifications without revealing confidential supplier details prematurely, qualifying commercial intent.',
    documentsRequired: 'Buyer RFQ Brief, Specification Match Dossier, Delivery Guidelines',
    stageOutcome: 'Confirmed purchase interest and formal Request for Quotation (RFQ).',
    nextStep: 'Commence commercial negotiation and quotation harmonization.',
    operationalContext: 'Covers Buyer Discovery, Requirement Matching, and Inbound RFQs.'
  },
  {
    id: 4,
    title: 'Stage 4: Negotiation & Quotation Harmonization',
    shortLabel: 'Negotiation',
    icon: Scale,
    whatHappens: 'Transparent facilitation between seller expected ex-factory pricing and buyer target delivered pricing to reach a mutually profitable deal.',
    whoIsInvolved: 'Seller, Buyer, and WeTrade Commercial Coordinator',
    whatWeTradeDoes: 'Drafts transparent term sheets separating goods price, logistics estimates, and transparent facilitation fees.',
    documentsRequired: 'Comparative Quotation Sheet, Mutual Term Sheet Draft',
    stageOutcome: 'Consensus on unit price, payment terms, and delivery milestones.',
    nextStep: 'Formalize agreement in binding purchase order and deal confirmation.',
    operationalContext: 'Covers Price Negotiation, Fee Transparency, and Payment Escrow Structuring.'
  },
  {
    id: 5,
    title: 'Stage 5: Deal Confirmation & Order Processing',
    shortLabel: 'Confirmation',
    icon: BadgeCheck,
    whatHappens: 'Principals execute the formal Purchase Order. Seller schedules dedicated production run or stages ready inventory in master cartons.',
    whoIsInvolved: 'Seller, Buyer, and WeTrade Trade Operations',
    whatWeTradeDoes: 'Records order in Trade Portal, confirms milestone payment deposits, and establishes pre-dispatch inspection protocols.',
    documentsRequired: 'Purchase Order, Commercial Trade Agreement, Batch Packing List',
    stageOutcome: 'Binding order acknowledgment and production batch lock-in.',
    nextStep: 'Coordinate logistics quotations or verify buyer pickup arrangements.',
    operationalContext: 'Covers Deal Confirmation, Escrow Funding, and Production Staging.'
  },
  {
    id: 6,
    title: 'Stage 6: Logistics Coordination & Dispatch',
    shortLabel: 'Logistics',
    icon: Truck,
    whatHappens: 'If transport coordination is requested, WeTrade obtains carrier quotes, coordinates vehicle placement, and oversees pickup staging.',
    whoIsInvolved: 'Contracted Freight Carrier, Seller Dispatch Dock, WeTrade Logistics Desk',
    whatWeTradeDoes: 'Validates driver details, E-Way bills, gate passes, and updates consignment milestone in Trade Portal.',
    documentsRequired: 'E-Way Bill, Lorry Receipt (LR/GR), Tax Invoice, Delivery Challan',
    stageOutcome: 'Goods safely loaded and dispatched on overland transit corridor.',
    nextStep: 'Monitor transit progress through intermediate checkpoints.',
    operationalContext: 'Covers Carrier Selection, Dispatch Loading, and Milestone Transit Tracking.'
  },
  {
    id: 7,
    title: 'Stage 7: Destination Delivery & Trade Settlement',
    shortLabel: 'Settlement',
    icon: CheckCircle2,
    whatHappens: 'Consignment arrives at buyer destination warehouse, undergoing outer carton inspection and piece-count verification.',
    whoIsInvolved: 'Buyer Receiving Team, Delivery Driver, WeTrade Operations',
    whatWeTradeDoes: 'Secures signed Proof of Delivery (POD), verifies goods acceptance, and coordinates commercial settlement release.',
    documentsRequired: 'Signed Proof of Delivery (POD), Goods Received Note (GRN), Settlement Statement',
    stageOutcome: 'Successful order fulfillment with clean commercial closure.',
    nextStep: 'Repeat order forecasting and continuous relationship management.',
    operationalContext: 'Covers Destination Unloading, POD Verification, Payment Release, and Archival.'
  }
];

export const HowItWorksPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);
  const current = SEVEN_STAGES.find((s) => s.id === activeStep) || SEVEN_STAGES[0];
  const CurrentIcon = current.icon;

  return (
    <div className="bg-[#F5F7FA] min-h-screen pb-20 space-y-16">
      
      {/* Top Banner */}
      <section className="bg-white border-b border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Link to="/" className="hover:text-[#07145B]">Home</Link>
              <span>/</span>
              <span className="text-slate-900 font-semibold">How It Works</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#07145B] tracking-tight">
              Our Seven-Stage Trade Facilitation Process
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              From the initial introductory meeting to destination warehouse sign-off: explore how each milestone is coordinated with full transparency.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive 7-Stage Timeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-8">
          
          {/* Timeline Nav Strip */}
          <div className="relative">
            {/* Background Track */}
            <div className="absolute top-6 left-6 right-6 h-1 bg-slate-100 -z-0 rounded-full hidden md:block">
              <div
                className="h-full bg-gradient-to-r from-[#07145B] via-[#FFB800] to-emerald-600 transition-all duration-300 rounded-full"
                style={{ width: `${((activeStep - 1) / (SEVEN_STAGES.length - 1)) * 100}%` }}
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 relative z-10">
              {SEVEN_STAGES.map((s) => {
                const isSelected = s.id === activeStep;
                const isPast = s.id < activeStep;
                const Icon = s.icon;

                return (
                  <button
                    key={s.id}
                    onClick={() => setActiveStep(s.id)}
                    className={`flex flex-col items-center p-3 rounded-2xl transition-all text-center focus:outline-none ${
                      isSelected
                        ? 'bg-[#07145B] text-white shadow-lg scale-105'
                        : isPast
                        ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100/80 border border-emerald-200'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-1.5 ${
                      isSelected ? 'text-[#FFB800]' : isPast ? 'text-emerald-600' : 'text-slate-500'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider block opacity-75">
                      Stage {s.id}
                    </span>
                    <span className="text-xs font-extrabold truncate w-full">
                      {s.shortLabel}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Stage Detail Panel */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-[#07145B] text-[#FFB800] shadow-md">
                  <CurrentIcon className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-900">
                    Step {current.id} of 7
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-[#07145B]">
                    {current.title}
                  </h2>
                </div>
              </div>

              {/* Prev / Next Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveStep((p) => Math.max(1, p - 1))}
                  disabled={activeStep <= 1}
                  className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-40 transition-colors flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
                <button
                  onClick={() => setActiveStep((p) => Math.min(7, p + 1))}
                  disabled={activeStep >= 7}
                  className="px-4 py-2 rounded-xl bg-[#07145B] text-white text-xs font-bold hover:bg-[#0c2288] disabled:opacity-40 transition-colors flex items-center gap-1"
                >
                  <span>Next Step</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Stage Description */}
            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              {current.whatHappens}
            </p>

            {/* 4 Detail Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-1">
                <span className="font-bold text-[#07145B] block uppercase tracking-wider text-[10px]">What WeTrade Does</span>
                <p className="text-slate-600 leading-relaxed">{current.whatWeTradeDoes}</p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-1">
                <span className="font-bold text-[#07145B] block uppercase tracking-wider text-[10px]">Participants Involved</span>
                <p className="text-slate-600 leading-relaxed">{current.whoIsInvolved}</p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-1">
                <span className="font-bold text-[#07145B] block uppercase tracking-wider text-[10px]">Information / Documents Required</span>
                <p className="text-slate-600 leading-relaxed font-mono text-[11px]">{current.documentsRequired}</p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-1">
                <span className="font-bold text-emerald-800 block uppercase tracking-wider text-[10px]">Stage Outcome &amp; Next Action</span>
                <p className="text-slate-600 leading-relaxed">
                  <strong>Outcome:</strong> {current.stageOutcome} <br />
                  <strong>Next:</strong> {current.nextStep}
                </p>
              </div>
            </div>

            {/* Operational Context note */}
            <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200 text-xs text-blue-900 flex items-center gap-2">
              <Info className="w-4 h-4 shrink-0 text-blue-600" />
              <span>Full Operational Model: {current.operationalContext}</span>
            </div>

          </div>

          {/* Demo Portfolio Callout */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              Want to see this process illustrated with moving cargo and quotation negotiations?
            </div>
            <Link
              to="/demo-portfolio"
              className="px-5 py-2.5 rounded-xl bg-[#FFB800] text-[#07145B] font-extrabold text-xs hover:bg-amber-400 transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Watch 14-Stage Demonstration</span>
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
};
