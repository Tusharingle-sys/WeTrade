import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, AlertTriangle } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="bg-[#F5F7FA] min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link to="/" className="hover:text-[#07145B]">Home</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Privacy Policy</span>
        </div>

        {/* Legal Review Header Badge */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
          <div className="text-xs">
            <span className="font-bold block">Prototype Draft — Pending Legal &amp; Regulatory Review</span>
            <span>This privacy statement reflects planned policies for WeTrade platform operations and data handling.</span>
          </div>
        </div>

        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <h1 className="text-2xl sm:text-3xl font-black text-[#07145B]">
            WeTrade Privacy Policy &amp; Data Governance
          </h1>
          <p className="text-xs text-slate-400">
            Last Updated: March 2026 | Demonstration Build v1.2
          </p>

          <h2 className="text-base font-bold text-slate-900 pt-4 border-t">1. Intermediary Data Collection</h2>
          <p>
            WeTrade gathers business entity information, manufacturing capacity, contact details, product technical specifications, and laboratory test reports strictly for the purpose of facilitating commercial connections between small-scale producers and prospective wholesale buyers.
          </p>

          <h2 className="text-base font-bold text-slate-900 pt-4 border-t">2. Protection of Commercial Confidentiality</h2>
          <p>
            WeTrade does not publicly expose sensitive supplier identification, exact factory premises, or private margin expectations on public-facing catalogue views without prior authorization. Spec sheets are shared in anonymized form during initial buyer discovery.
          </p>

          <h2 className="text-base font-bold text-slate-900 pt-4 border-t">3. Demonstration Prototype Scope</h2>
          <p>
            In this demonstration build, all recorded entities, transaction codes, and shipment logs are stored in the client browser's local state for demonstration purposes only. No confidential client data should be entered into this demonstration environment.
          </p>

          <h2 className="text-base font-bold text-slate-900 pt-4 border-t">4. Production Architecture Requirements</h2>
          <p>
            When deployed to production, WeTrade will implement enterprise-grade identity authentication, encrypted document storage for tax invoices and test certificates, and strict role-based access control (RBAC).
          </p>

          <div className="pt-6 border-t flex items-center justify-between text-xs text-slate-500">
            <Link to="/terms" className="text-[#07145B] font-bold hover:underline">
              View Terms of Service &rarr;
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
