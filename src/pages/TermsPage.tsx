import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, AlertCircle, CheckCircle2 } from 'lucide-react';
import { APP_CONFIG } from '../config/appConfig';

export const TermsPage: React.FC = () => {
  return (
    <div className="bg-[#F5F7FA] min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link to="/" className="hover:text-[#07145B]">Home</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Terms &amp; Service Responsibilities</span>
        </div>

        {/* Legal Review Header Badge */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 flex items-center gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
          <div className="text-xs">
            <span className="font-bold block">Prototype Notice — Pending Legal &amp; Commercial Review</span>
            <span>These operational terms delineate WeTrade's intermediary responsibilities and bilateral commercial obligations.</span>
          </div>
        </div>

        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <h1 className="text-2xl sm:text-3xl font-black text-[#07145B]">
            WeTrade Terms of Service &amp; Trade Facilitation Scope
          </h1>
          <p className="text-xs text-slate-400">
            Last Updated: March 2026 | Demonstration Build v1.2
          </p>

          <h2 className="text-base font-bold text-slate-900 pt-4 border-t">1. Intermediary Role and Commercial Boundaries</h2>
          <p>
            {APP_CONFIG.legalDisclaimers.roleStatement} WeTrade facilitates communication, specification auditing, buyer outreach, and quotation harmonization. WeTrade does not hold physical title, ownership, or custody of goods unless explicitly agreed under a separate warehousing arrangement.
          </p>

          <h2 className="text-base font-bold text-slate-900 pt-4 border-t">2. Absence of Warranties and Guarantees</h2>
          <p>
            {APP_CONFIG.legalDisclaimers.noGuaranteeNotice} While WeTrade exercises commercial care in screening producers and qualifying buyers, each commercial principal must independently verify contract suitability prior to signing binding purchase orders.
          </p>

          <h2 className="text-base font-bold text-slate-900 pt-4 border-t">3. Verification Standards</h2>
          <p>
            {APP_CONFIG.legalDisclaimers.verificationNotice} Verification does not constitute an insurance policy or third-party guarantee against product defects or transit damage.
          </p>

          <h2 className="text-base font-bold text-slate-900 pt-4 border-t">4. Logistics Coordination Terms</h2>
          <p>
            Logistics coordination provided by WeTrade is purely optional. When contracted freight carriers are engaged, the carrier’s standard consignment conditions, transit liabilities, and demurrage clauses govern the movement of cargo.
          </p>

          <h2 className="text-base font-bold text-slate-900 pt-4 border-t">5. Facilitation Fees and Remuneration</h2>
          <p>
            WeTrade’s trade facilitation fee or commission is established transparently per transaction and agreed upon prior to deal confirmation. Fees are earned for trade coordination services provided.
          </p>

          <div className="pt-6 border-t flex items-center justify-between text-xs text-slate-500">
            <Link to="/privacy" className="text-[#07145B] font-bold hover:underline">
              View Privacy Policy &rarr;
            </Link>
            <Link to="/" className="text-slate-500 hover:text-slate-900">
              Return Home
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
