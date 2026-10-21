import React from 'react';
import { Link } from 'react-router-dom';
import { APP_CONFIG } from '../config/appConfig';
import { WeTradeLogo } from '../components/common/WeTradeLogo';
import {
  ShieldCheck,
  Building2,
  Users2,
  TrendingUp,
  Target,
  Compass,
  CheckCircle2,
  Scale,
  Sparkles,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-[#F5F7FA] min-h-screen pb-20 space-y-16">
      
      {/* Top Hero */}
      <section className="bg-white border-b border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-4 max-w-2xl">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Link to="/" className="hover:text-[#07145B]">Home</Link>
                  <span>/</span>
                  <span className="text-slate-900 font-semibold">About WeTrade</span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#07145B] tracking-tight">
                  B2B Trade Facilitation Built for Smaller Producers &amp; Discerning Buyers
                </h1>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                  WeTrade operates as a dedicated intermediary, bridging small-scale manufacturers and producers with verified buyers across commercial corridors.
                </p>
              </div>
              <div className="shrink-0 p-4 bg-white rounded-3xl border border-slate-200 shadow-sm">
                <WeTradeLogo variant="stacked" height={100} />
              </div>
            </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="p-3.5 rounded-2xl bg-amber-50 text-[#FFB800] inline-block border border-amber-200">
              <Target className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-extrabold text-[#07145B]">Our Mission</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              To empower small-scale producers, regional manufacturers, and artisanal enterprises by giving them access to wider commercial distribution, transparent commercial discussions, and coordinated fulfillment support.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="p-3.5 rounded-2xl bg-blue-50 text-[#07145B] inline-block border border-blue-200">
              <Compass className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-extrabold text-[#07145B]">Our Vision</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              A transparent B2B trading ecosystem where quality goods move directly from verified origins to reliable commercial buyers with complete clarity on pricing, specifications, and execution milestones.
            </p>
          </div>

        </div>
      </section>

      {/* Business Boundaries & Intermediary Role */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 to-[#07145B] rounded-3xl p-8 sm:p-12 text-white shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#FFB800] text-[#07145B]">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">Governance &amp; Clarity</span>
              <h2 className="text-2xl font-black text-white">Our Intermediary Role &amp; Boundaries</h2>
            </div>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed max-w-3xl">
            {APP_CONFIG.legalDisclaimers.roleStatement}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs">
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-1">
              <span className="font-bold text-amber-400">Principals Remain Responsible</span>
              <p className="text-slate-300">The seller, buyer, and any selected logistics carrier remain solely responsible for the obligations assigned in their commercial agreement.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-1">
              <span className="font-bold text-amber-400">No False Guarantees</span>
              <p className="text-slate-300">{APP_CONFIG.legalDisclaimers.noGuaranteeNotice}</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-1">
              <span className="font-bold text-amber-400">Transparent Compensation</span>
              <p className="text-slate-300">WeTrade agrees on a clear facilitation fee or commission rate mutually per transaction, avoiding hidden markups.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Work With */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-2.5 py-1 rounded-md">
            Target Ecosystem
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#07145B] mt-2">
            Who We Work With
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">Small-Scale Producers &amp; Mills</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Manufacturers of agro products, food grains, textiles, hardware, and packaging who need market reach without investing in dedicated sales teams.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-800 flex items-center justify-center">
              <Users2 className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">Wholesalers &amp; Distributors</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Commercial distributors, retail chains, and food ingredient manufacturers seeking direct farm or factory origins with verifiable quality certificates.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">Logistics &amp; Transport Carriers</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Reliable overland freight and container transporters who can provide predictable transit timelines and signed Proof of Delivery (POD) confirmations.
            </p>
          </div>
        </div>
      </section>

      {/* Explore Process CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
        <Link
          to="/how-it-works"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#07145B] text-white font-bold text-sm hover:bg-[#0c2288] transition-colors shadow-md"
        >
          <span>See How WeTrade Operates Step-by-Step</span>
          <ArrowRight className="w-4 h-4 text-[#FFB800]" />
        </Link>
      </section>

    </div>
  );
};
