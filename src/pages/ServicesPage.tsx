import React from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Users2,
  FileSearch,
  Scale,
  BadgeCheck,
  Truck,
  MapPin,
  HelpCircle,
  Globe2,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

const SERVICES_LIST = [
  {
    id: 's1',
    title: 'Seller Onboarding & Verification',
    category: 'Sourcing & Verification',
    icon: Building2,
    desc: 'Structured initial meeting, review of production specifications, lab certificates, and factory lot capacities. We audit documentation before labelling any seller profile as Verified.',
    deliverables: ['Factory audit checklist', 'Verified product profile', 'Specification sheet hygiene'],
    ctaLink: '/for-sellers',
    ctaText: 'Seller Onboarding'
  },
  {
    id: 's2',
    title: 'Buyer Discovery & Qualification',
    category: 'Commercial Matchmaking',
    icon: Users2,
    desc: 'Active research across commercial buyer networks including wholesale distributors, hypermarket chains, and institutions. We screen procurement requirements and credit reputation.',
    deliverables: ['Target buyer shortlisting', 'Commercial interest qualification', 'Anonymized spec presentation'],
    ctaLink: '/for-buyers',
    ctaText: 'Buyer Requirements'
  },
  {
    id: 's3',
    title: 'B2B Product Presentation & Sales Support',
    category: 'Commercial Matchmaking',
    icon: FileSearch,
    desc: 'Transforming technical production sheets into clear B2B catalog entries that appeal to institutional purchasers, detailing MOQs, packaging integrity, and delivery terms.',
    deliverables: ['Standardized SKU presentation', 'Packaging spec review', 'Catalog visibility'],
    ctaLink: '/products',
    ctaText: 'View Catalogue'
  },
  {
    id: 's4',
    title: 'Quotation & Negotiation Coordination',
    category: 'Trade Facilitation',
    icon: Scale,
    desc: 'Neutral commercial coordination to align seller expected pricing with buyer volume bids. We draft itemized term sheets separating product prices, logistics, and transparent fees.',
    deliverables: ['Harmonized price discovery', 'Commercial term sheet', 'Escrow milestone scheduling'],
    ctaLink: '/contact',
    ctaText: 'Request Consultation'
  },
  {
    id: 's5',
    title: 'Order & Transaction Coordination',
    category: 'Deal Execution',
    icon: BadgeCheck,
    desc: 'Formal deal confirmation with signed Purchase Orders, milestone documentation, and production batch scheduling to ensure clarity before raw materials are committed.',
    deliverables: ['Purchase Order execution', 'Commercial terms documentation', 'Production batch tracking'],
    ctaLink: '/portal',
    ctaText: 'Inspect in Portal'
  },
  {
    id: 's6',
    title: 'Logistics Quotation & Partner Selection',
    category: 'Logistics Support',
    icon: Truck,
    desc: 'When requested by transaction principals, we invite competitive transport bids from vetted freight partners, comparing transit time, vehicle suitability, and route reliability.',
    deliverables: ['Multi-carrier quotation comparison', 'Vehicle placement scheduling', 'E-Way bill coordination'],
    ctaLink: '/logistics',
    ctaText: 'Explore Logistics'
  },
  {
    id: 's7',
    title: 'Shipment Milestone & Checkpoint Tracking',
    category: 'Logistics Support',
    icon: MapPin,
    desc: 'Coordinating milestone updates from origin loading dock to intermediate toll points and destination delivery hubs, keeping all parties informed in the Trade Portal.',
    deliverables: ['Dispatched status logging', 'Intermediate hub notices', 'Proactive delay alerts'],
    ctaLink: '/portal',
    ctaText: 'Milestone Tracking'
  },
  {
    id: 's8',
    title: 'Destination Follow-up & Issue Coordination',
    category: 'Trade Closure',
    icon: CheckCircle2,
    desc: 'Ensuring destination dock unloading runs smoothly, recording signed Proof of Delivery (POD) consignment notes, and facilitating resolution for any transit discrepancies.',
    deliverables: ['Signed Proof of Delivery (POD)', 'Unloading inspection sign-off', 'Commercial closure statement'],
    ctaLink: '/contact',
    ctaText: 'Trade Operations'
  },
  {
    id: 's9',
    title: 'Domestic & Regulated Trade Facilitation',
    category: 'Regulatory Support',
    icon: Globe2,
    desc: 'Guidance on state border compliance, GST e-invoicing documentation, FSSAI lab parameters, and basic export packing standards where applicable.',
    deliverables: ['Regulatory checklist review', 'Tax documentation structuring', 'Packaging compliance guidance'],
    ctaLink: '/contact',
    ctaText: 'Discuss Compliance'
  }
];

export const ServicesPage: React.FC = () => {
  return (
    <div className="bg-[#F5F7FA] min-h-screen pb-20 space-y-16">
      
      {/* Top Banner */}
      <section className="bg-white border-b border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Link to="/" className="hover:text-[#07145B]">Home</Link>
              <span>/</span>
              <span className="text-slate-900 font-semibold">Services</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#07145B] tracking-tight">
              Comprehensive B2B Trade &amp; Sourcing Services
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Every stage of the trade journey managed with precision: from initial seller meeting and product verification to buyer negotiations and final destination delivery.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_LIST.map((srv) => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.id}
                className="bg-white p-7 rounded-3xl border border-slate-200 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3.5 rounded-2xl bg-blue-50 text-[#07145B] group-hover:bg-[#07145B] group-hover:text-[#FFB800] transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {srv.category}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-slate-900 text-lg mb-2">
                    {srv.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {srv.desc}
                  </p>

                  <div className="space-y-1.5 pt-3 border-t border-slate-100 text-xs text-slate-500">
                    <span className="font-bold text-slate-700 text-[11px] block">Key Deliverables:</span>
                    {srv.deliverables.map((del, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100">
                  <Link
                    to={srv.ctaLink}
                    className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-[#07145B] hover:text-white text-[#07145B] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>{srv.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Process Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#07145B] rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-white">
              Watch These Services in Action
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl leading-relaxed">
              Experience our interactive 14-stage process simulation demonstrating how all these services connect into one seamless trade flow.
            </p>
          </div>
          <Link
            to="/demo-portfolio"
            className="px-6 py-3 rounded-xl bg-[#FFB800] text-[#07145B] font-extrabold text-sm hover:bg-amber-400 transition-colors shrink-0 shadow-md"
          >
            Launch Animated Process Demo
          </Link>
        </div>
      </section>

    </div>
  );
};
