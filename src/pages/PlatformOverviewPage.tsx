import React from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Layers,
  Building2,
  Package,
  Users2,
  FileSpreadsheet,
  ShoppingCart,
  Truck,
  MapPin,
  FileText,
  BarChart3,
  ShieldCheck,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

export const PlatformOverviewPage: React.FC = () => {
  return (
    <div className="bg-[#F5F7FA] min-h-screen pb-20 space-y-16">
      
      {/* Top Banner */}
      <section className="bg-white border-b border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Link to="/" className="hover:text-[#07145B]">Home</Link>
              <span>/</span>
              <span className="text-slate-900 font-semibold">Trade Portal Platform</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#07145B] tracking-tight">
              Enterprise Trade Management Architecture
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Designed as a professional B2B SaaS system connecting producers, commercial buyers, and freight partners through one authoritative data model.
            </p>
            <div className="pt-2">
              <Link
                to="/portal"
                className="px-6 py-3.5 rounded-xl bg-[#07145B] text-white hover:bg-[#0c2288] font-bold text-sm shadow-md inline-flex items-center gap-2"
              >
                <span>Launch Interactive Demo Portal</span>
                <ArrowRight className="w-4 h-4 text-[#FFB800]" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 12 Modules Architecture Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-2.5 py-1 rounded-md">
            System Modules
          </span>
          <h2 className="text-2xl font-black text-[#07145B] mt-2">
            The Twelve Core Trade Modules
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            Every transaction entity is tracked across synchronized data relationships.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: 'Dashboard', desc: 'KPI counters, real-time milestone charts, and operational follow-up alerts.', icon: LayoutDashboard },
            { name: 'Sellers Directory', desc: 'Detailed onboarding records, production capacity, and verification status.', icon: Building2 },
            { name: 'Products Catalogue', desc: 'Seller-provided specifications, MOQs, available lots, and packaging details.', icon: Package },
            { name: 'Buyers & Leads', desc: 'Procurement requirement tracking, budget limits, and qualification CRM.', icon: Users2 },
            { name: 'Quotations', desc: 'Harmonized price comparison with separate product price, freight, and WeTrade fees.', icon: FileSpreadsheet },
            { name: 'Orders Management', desc: 'Commercial Purchase Orders, payment escrow status, and binding agreement terms.', icon: ShoppingCart },
            { name: 'Logistics Desk', desc: 'Vetted freight partner profiles, transit quotations, and carrier vehicle booking.', icon: Truck },
            { name: 'Delivery Tracking', desc: '8-step milestone progression from order confirmation to final POD sign-off.', icon: MapPin },
            { name: 'Document Archive', desc: 'Structured references for test certificates, E-Way bills, and signed receipts.', icon: FileText },
            { name: 'Tasks & Follow-ups', desc: 'Prioritized checklist for seller verifications, buyer calls, and dispatch checks.', icon: ShieldCheck },
            { name: 'Reports & Analytics', desc: 'Category volume distribution, trade value facilitated, and CSV data export.', icon: BarChart3 },
            { name: 'Environment Settings', desc: 'Role switching simulator (Admin, Seller, Buyer, Logistics) and data restore.', icon: Layers }
          ].map((m, i) => {
            const Icon = m.icon;
            return (
              <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-2">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#07145B] flex items-center justify-center mb-2">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-sm">{m.name}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{m.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Role Perspectives */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#FFB800]">
              Role-Based Access Simulation
            </span>
            <h2 className="text-2xl font-black text-white mt-1">
              Multi-Role Perspective Demonstrations
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
              In our demonstration portal, you can switch roles on the fly to see how views adapt for each trade stakeholder:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700 space-y-2">
              <span className="font-extrabold text-[#FFB800] block text-sm">WeTrade Admin</span>
              <p className="text-slate-300">Full visibility into all sellers, buyers, internal fee structures, and milestone advancement controls.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700 space-y-2">
              <span className="font-extrabold text-[#FFB800] block text-sm">Producer / Seller</span>
              <p className="text-slate-300">View own listed SKUs, factory orders, staging requests, and confirmed ex-factory payment milestones.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700 space-y-2">
              <span className="font-extrabold text-[#FFB800] block text-sm">Wholesale Buyer</span>
              <p className="text-slate-300">Track purchase orders, transit milestones, and clean delivered prices without internal commission details.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700 space-y-2">
              <span className="font-extrabold text-[#FFB800] block text-sm">Logistics Partner</span>
              <p className="text-slate-300">View assigned shipments, input milestone updates, vehicle codes, and delivery confirmation notes.</p>
            </div>
          </div>

          <div className="pt-2">
            <Link
              to="/portal"
              className="px-6 py-3 rounded-xl bg-[#FFB800] text-[#07145B] font-extrabold text-xs inline-flex items-center gap-1.5 hover:bg-amber-400"
            >
              <span>Test Role Perspectives in Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
