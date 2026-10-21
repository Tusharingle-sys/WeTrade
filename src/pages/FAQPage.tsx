import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, HelpCircle, ArrowRight, ShieldCheck, Mail } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
  category: 'Model & Boundaries' | 'Sellers' | 'Buyers' | 'Logistics' | 'Pricing & Commercials';
}

const FAQ_DATA: FAQItem[] = [
  {
    category: 'Model & Boundaries',
    q: 'What is WeTrade and what role does it play in a transaction?',
    a: 'WeTrade acts strictly as an intermediary and trade facilitation partner between small-scale sellers (producers, manufacturers, mills) and suitable wholesale buyers. We coordinate introductory meetings, review product specifications, identify buyer opportunities, facilitate price negotiations, and support logistics tracking. WeTrade is not the product seller, buyer, product owner, or transport operator.'
  },
  {
    category: 'Model & Boundaries',
    q: 'Does WeTrade guarantee a sale or a fixed selling price?',
    a: 'No. WeTrade does not guarantee a sale, the highest possible price, buyer payment, or delivery schedules. The seller and buyer enter into a commercial agreement, and each party remains responsible for the obligations assigned to them in that contract.'
  },
  {
    category: 'Model & Boundaries',
    q: 'What does "Verified Seller" or "Verified Product" mean?',
    a: 'A seller or product is labelled "Verified" only after physical or documentary checks (such as FSSAI registration, factory capacity questionnaires, and batch laboratory test reports) have been performed by the WeTrade trade operations team.'
  },
  {
    category: 'Sellers',
    q: 'How does a small producer onboard their products with WeTrade?',
    a: 'Sellers submit their manufacturing specifications, monthly capacity, packaging details, and expected ex-factory pricing through the Sell Through WeTrade form. Our sourcing desk conducts an initial meeting, reviews quality test certificates, and builds a verified product listing in our Trade Portal.'
  },
  {
    category: 'Sellers',
    q: 'Does WeTrade require an upfront listing fee?',
    a: 'WeTrade works on a transparent transaction facilitation basis agreed mutually before deal confirmation. We do not impose opaque subscription locks on small producers.'
  },
  {
    category: 'Sellers',
    q: 'What happens if a buyer requests a sample?',
    a: 'WeTrade coordinates sample requests between the seller and buyer, ensuring the buyer is qualified and that sample dispatch details and test parameters are clearly documented.'
  },
  {
    category: 'Buyers',
    q: 'How does WeTrade verify product quality for commercial buyers?',
    a: 'Before presenting products to buyers, our quality desk reviews manufacturer lab reports (such as moisture, ash value, chemical composition, or tensile strength) and packing specifications. We encourage pre-dispatch batch inspections prior to final release.'
  },
  {
    category: 'Buyers',
    q: 'Can buyers negotiate prices through WeTrade?',
    a: 'Yes. WeTrade facilitates neutral commercial discussions between the seller’s baseline price expectations and the buyer’s volume budget, working towards mutually agreed terms that protect both parties.'
  },
  {
    category: 'Buyers',
    q: 'What payment terms are typically supported?',
    a: 'Commercial terms are agreed bilaterally between seller and buyer. Common structures include milestone escrow deposits (e.g., 50% upon Purchase Order and batch verification, balance upon signed Proof of Delivery).'
  },
  {
    category: 'Logistics',
    q: 'Is logistics coordination mandatory for every deal?',
    a: 'No. Logistics support is completely optional. If the buyer or seller already has their own transport arrangements, they are free to manage pickup directly. When requested, WeTrade obtains multi-carrier freight quotes and assists with milestone tracking.'
  },
  {
    category: 'Logistics',
    q: 'Does WeTrade own a fleet of transport vehicles?',
    a: 'No. WeTrade does not operate trucks or transport fleets. We collaborate with vetted third-party logistics companies and carrier networks that provide dedicated overland freight and container vehicles.'
  },
  {
    category: 'Logistics',
    q: 'How are shipment milestones tracked?',
    a: 'Consignment milestones are manually updated by logistics coordinators and dispatchers in the Trade Portal based on checkpoint reports and toll manifests. We do not claim live GPS satellite feeds.'
  },
  {
    category: 'Pricing & Commercials',
    q: 'How are WeTrade’s facilitation fees calculated?',
    a: 'WeTrade agrees transparently on a modest service fee or trade facilitation margin per transaction, which is itemized clearly on term sheets before the purchase order is signed. There are no surprise deductions.'
  },
  {
    category: 'Pricing & Commercials',
    q: 'Are statutory taxes like GST included in product prices?',
    a: 'Quotations in the Trade Portal itemize base goods prices, applicable freight estimates, and GST or statutory taxes separately so that all commercial calculations remain completely transparent.'
  }
];

export const FAQPage: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Model & Boundaries', 'Sellers', 'Buyers', 'Logistics', 'Pricing & Commercials'];

  const filteredFaqs = activeCategory === 'All'
    ? FAQ_DATA
    : FAQ_DATA.filter((item) => item.category === activeCategory);

  return (
    <div className="bg-[#F5F7FA] min-h-screen pb-20 space-y-12">
      
      {/* Top Banner */}
      <section className="bg-white border-b border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Link to="/" className="hover:text-[#07145B]">Home</Link>
              <span>/</span>
              <span className="text-slate-900 font-semibold">FAQ</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#07145B] tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Clear answers regarding WeTrade's intermediary model, seller onboarding, buyer matchmaking, and logistics coordination.
            </p>
          </div>
        </div>
      </section>

      {/* Category Pills */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-[#07145B] text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Accordion List */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {filteredFaqs.map((faq, index) => {
          const isOpen = openIdx === index;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : index)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
              >
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-[#FFB800] shrink-0 mt-0.5" />
                  <span className="font-extrabold text-[#07145B] text-sm sm:text-base leading-snug">
                    {faq.q}
                  </span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-[#07145B]' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed pl-11 border-t border-slate-100 pt-3 animate-in fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </section>

      {/* Contact CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 text-white text-center space-y-4 border border-slate-800">
          <h3 className="text-xl font-bold">Have a specific question about your product or order?</h3>
          <p className="text-xs text-slate-300 max-w-lg mx-auto">
            Our trade operations team is ready to discuss your production capacity or sourcing requirements.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FFB800] text-[#07145B] font-bold text-xs hover:bg-amber-400"
          >
            <Mail className="w-4 h-4" />
            <span>Contact Trade Facilitator</span>
          </Link>
        </div>
      </section>

    </div>
  );
};
