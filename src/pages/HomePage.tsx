import React from 'react';
import { Link } from 'react-router-dom';
import { HeroTradeProcess } from '../components/home/HeroTradeProcess';
import { useTrade } from '../context/TradeContext';
import {
  ArrowRight,
  Sparkles,
  Building2,
  Users2,
  Truck,
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
  FileSpreadsheet,
  Layers,
  ChevronRight,
  HelpCircle,
  Scale
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { products, orders } = useTrade();
  const sampleProducts = products.slice(0, 4);

  return (
    <div className="bg-[#F5F7FA] overflow-hidden space-y-20 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 lg:pt-16 pb-12 bg-gradient-to-b from-white via-slate-50/50 to-[#F5F7FA] border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Headline & CTAs (7 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-blue-50 border border-blue-200 text-[#07145B] text-xs font-extrabold">
                  <span className="w-2 h-2 rounded-full bg-[#FFB800] animate-pulse" />
                  <span>B2B Sourcing, Sales &amp; Trade Facilitation Solutions</span>
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#07145B] tracking-tight leading-[1.08]">
                From the Right Source to the Right Buyer.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                WeTrade helps small businesses reach suitable buyers, negotiate better commercial terms, coordinate orders, and manage delivery through trade and logistics connections.
              </p>

              {/* 3 Call to Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  to="/for-sellers"
                  className="px-6 py-3.5 rounded-xl bg-[#07145B] text-white hover:bg-[#0c2288] font-bold text-sm shadow-md hover:shadow-lg transition-all text-center"
                >
                  Sell Through WeTrade
                </Link>

                <Link
                  to="/how-it-works"
                  className="px-6 py-3.5 rounded-xl bg-white border border-slate-300 text-slate-800 hover:bg-slate-50 font-bold text-sm transition-all text-center"
                >
                  Explore Our Trade Process
                </Link>

                <Link
                  to="/demo-portfolio"
                  className="px-5 py-3.5 rounded-xl bg-[#FFB800] text-[#07145B] hover:bg-amber-400 font-extrabold text-sm shadow-sm transition-all flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4 text-amber-800" />
                  <span>Watch How WeTrade Works</span>
                </Link>
              </div>

              {/* Quick Trust Attributes */}
              <div className="pt-4 grid grid-cols-3 gap-4 border-t border-slate-200/80 text-xs text-slate-600">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Verified Listings</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Bilateral Terms</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Optional Freight</span>
                </div>
              </div>
            </div>

            {/* Right: Custom Animated Motion Graphic (5 cols) */}
            <div className="lg:col-span-6">
              <HeroTradeProcess />
            </div>

          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM WETRADE SOLVES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-2.5 py-1 rounded-md">
              Market Realities
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#07145B] mt-2">
              The Challenge for Small-Scale Producers &amp; Buyers
            </h2>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Small-scale manufacturers, farmers, and regional suppliers face severe market friction: limited buyer reach, high sales overheads, opaque price discovery, and complex freight coordination.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                01
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">Limited Market Access</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Producers often lack dedicated sales desks or connections with verified buyers in major commercial distribution centers.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#07145B] flex items-center justify-center font-bold">
                02
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">Unbalanced Negotiations</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Without transparent pricing benchmarks and neutral trade facilitation, small sellers frequently face pressured margins and delayed terms.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                03
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">Logistics &amp; Milestone Gaps</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Coordinating transport quotes, gate passes, freight waybills, and milestone tracking drains valuable management time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE SERVICES OVERVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-900">
              End-to-End Trade Facilitation
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#07145B] mt-1">
              How We Coordinate Your Trade
            </h2>
          </div>
          <Link
            to="/services"
            className="text-xs font-bold text-[#07145B] hover:text-[#FFB800] flex items-center gap-1"
          >
            <span>View All Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Seller Onboarding & Verification',
              desc: 'Physical checks, spec auditing, and packaging review to prepare verified dossiers for buyers.',
              icon: Building2,
              link: '/for-sellers'
            },
            {
              title: 'Buyer Discovery & Matching',
              desc: 'Proactive research matching your lot sizes, prices, and grades with screened wholesale buyers.',
              icon: Users2,
              link: '/for-buyers'
            },
            {
              title: 'Commercial Term Harmonization',
              desc: 'Neutral facilitation of quotes, revisions, payment escrow milestones, and binding terms.',
              icon: Scale,
              link: '/how-it-works'
            },
            {
              title: 'Logistics & Milestone Follow-up',
              desc: 'Optional freight quotation comparison, pickup coordination, and destination delivery tracking.',
              icon: Truck,
              link: '/logistics'
            }
          ].map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="p-3 rounded-2xl bg-slate-50 text-[#07145B] inline-block mb-4 border border-slate-100">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-base mb-2">{srv.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{srv.desc}</p>
                </div>
                <div className="pt-4 border-t border-slate-100 mt-4">
                  <Link
                    to={srv.link}
                    className="text-xs font-bold text-[#07145B] hover:text-[#FFB800] flex items-center gap-1"
                  >
                    <span>Learn More</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4 & 5. SELLER & BUYER VALUE PROPOSITION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Seller Box */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50/40 p-8 rounded-3xl border border-amber-200/80 shadow-2xs space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-[#FFB800] text-[#07145B]">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-900">For Producers &amp; Sellers</span>
                <h3 className="text-xl font-black text-slate-900">Expand Your B2B Reach</h3>
              </div>
            </div>

            <ul className="space-y-3 text-xs text-slate-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>Gain direct access to screened wholesale distributors and institutional buyers.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>Keep your focus on production while WeTrade handles matchmaking &amp; enquiries.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>Structured milestone terms reduce payment friction and clarify responsibilities.</span>
              </li>
            </ul>

            <div className="pt-2">
              <Link
                to="/for-sellers"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#07145B] text-white font-bold text-xs hover:bg-[#0c2288] transition-colors"
              >
                <span>Submit Product For Onboarding</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Buyer Box */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50/40 p-8 rounded-3xl border border-blue-200/80 shadow-2xs space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-[#07145B] text-white">
                <ShieldCheck className="w-6 h-6 text-[#FFB800]" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-900">For Buyers &amp; Distributors</span>
                <h3 className="text-xl font-black text-slate-900">Source Vetted Manufacturers</h3>
              </div>
            </div>

            <ul className="space-y-3 text-xs text-slate-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>Access verified producers with confirmed capacities and batch lab certificates.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>Clear commercial term coordination with transparent pricing breakdown.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>Proactive milestone updates from dispatch staging to destination warehouse unloading.</span>
              </li>
            </ul>

            <div className="pt-2">
              <Link
                to="/for-buyers"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-colors"
              >
                <span>Submit Sourcing Requirement</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 8. PRODUCT CATALOGUE PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-900">
                Sample Availability
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                Demo Listings
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#07145B] mt-1">
              Coordinated Product Catalogue
            </h2>
          </div>
          <Link
            to="/products"
            className="text-xs font-bold text-[#07145B] hover:text-[#FFB800] flex items-center gap-1"
          >
            <span>Explore All 20 Catalogue SKUs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sampleProducts.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-2xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
            >
              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-bold">
                    {p.id}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {p.status}
                  </span>
                </div>

                <h3 className="font-extrabold text-slate-900 text-sm leading-snug line-clamp-2">
                  {p.name}
                </h3>

                <div className="text-xs text-slate-500">
                  <span>{p.sellerCity}, {p.sellerState}</span>
                </div>

                <div className="pt-2 border-t border-slate-100 text-xs">
                  <div className="text-slate-400 text-[10px]">Indicative Price:</div>
                  <div className="text-lg font-black text-[#07145B]">
                    ₹{p.indicativePrice} <span className="text-xs font-normal text-slate-500">/ {p.unit}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    MOQ: {p.moq} {p.unit}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center gap-2">
                <Link
                  to={`/products/${p.id}`}
                  className="flex-1 py-2 text-center rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-100 transition-colors"
                >
                  View Details
                </Link>
                <Link
                  to="/for-buyers"
                  className="px-3 py-2 rounded-xl bg-[#07145B] text-white text-xs font-bold hover:bg-[#0c2288] transition-colors"
                >
                  Enquire
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9 & 10. TRADE PORTAL & DEMO PORTFOLIO HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#07145B] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFB800]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFB800] text-[#07145B] text-xs font-black">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Interactive Platform Experience</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              Explore Our Trade Portal &amp; 14-Stage Demonstration
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              We provide both an animated journey from initial seller meeting to destination delivery, plus a functional ERP-style Trade Portal where you can simulate admin, seller, buyer, and logistics workflows.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/demo-portfolio"
                className="px-6 py-3.5 rounded-xl bg-[#FFB800] text-[#07145B] font-extrabold text-sm hover:bg-amber-400 transition-all shadow-md flex items-center gap-2"
              >
                <span>Launch 14-Stage Animated Demo</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/portal"
                className="px-6 py-3.5 rounded-xl bg-slate-800 text-white font-bold text-sm hover:bg-slate-700 border border-slate-700 transition-all flex items-center gap-2"
              >
                <span>Open ERP Trade Portal</span>
                <Layers className="w-4 h-4 text-[#FFB800]" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 11. FAQ PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-900">
              Common Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#07145B] mt-1">
              Understanding the WeTrade Facilitation Model
            </h2>
          </div>
          <Link
            to="/faq"
            className="text-xs font-bold text-[#07145B] hover:text-[#FFB800] flex items-center gap-1"
          >
            <span>Read All Questions</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              q: 'Is WeTrade a buyer, a seller, or a transport company?',
              a: 'Neither. WeTrade operates strictly as an intermediary and trade facilitation partner between sellers and suitable buyers. We coordinate communication, product presentation, commercial negotiations, and optional logistics.'
            },
            {
              q: 'Does WeTrade guarantee product sales or fixed prices?',
              a: 'No. WeTrade does not guarantee a sale, the highest possible price, buyer payment, or delivery. Commercial principals remain responsible for the obligations in their mutual contract.'
            },
            {
              q: 'Is logistics coordination mandatory for every deal?',
              a: 'No. Logistics support is optional. Parties may choose to arrange pickup and freight themselves, or request WeTrade to obtain competitive carrier quotes.'
            },
            {
              q: 'How does WeTrade earn its revenue?',
              a: 'WeTrade agrees on a transparent service fee or trade facilitation margin per transaction, clearly documented before deal confirmation.'
            }
          ].map((faq, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-2">
              <h3 className="font-extrabold text-[#07145B] text-sm flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-[#FFB800] shrink-0 mt-0.5" />
                <span>{faq.q}</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed pl-6">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 12. CONTACT / GET STARTED CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 to-[#07145B] rounded-3xl p-8 sm:p-12 text-white border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Ready to Explore Trade Facilitation?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Whether you are a manufacturer with available capacity, a distributor seeking verified producers, or a logistics provider looking to collaborate, let’s begin a conversation.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <Link
              to="/contact"
              className="px-6 py-3 rounded-xl bg-[#FFB800] text-[#07145B] font-extrabold text-sm text-center hover:bg-amber-400 transition-colors shadow-md"
            >
              Get In Touch
            </Link>
            <Link
              to="/about"
              className="px-6 py-3 rounded-xl bg-slate-800 text-white font-bold text-sm text-center hover:bg-slate-700 border border-slate-700 transition-colors"
            >
              About Our Model
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
