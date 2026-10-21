import React from 'react';
import { Link } from 'react-router-dom';
import { WeTradeLogo } from '../components/common/WeTradeLogo';
import { ArrowLeft, Home, Sparkles, LayoutDashboard } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center space-y-6">
        <div className="flex justify-center">
          <WeTradeLogo variant="stacked" height={70} />
        </div>

        <div className="space-y-2">
          <span className="text-4xl font-black text-[#07145B]">404</span>
          <h1 className="text-xl font-extrabold text-slate-900">Page Not Found</h1>
          <p className="text-xs text-slate-500 leading-relaxed">
            The page or resource you requested could not be located in the WeTrade trade platform.
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-2.5 text-xs font-bold">
          <Link
            to="/"
            className="w-full py-3 rounded-xl bg-[#07145B] text-white hover:bg-[#0c2288] flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <Home className="w-4 h-4 text-[#FFB800]" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            to="/demo-portfolio"
            className="w-full py-3 rounded-xl bg-amber-50 text-[#07145B] border border-amber-300 hover:bg-amber-100 flex items-center justify-center gap-2 transition-colors"
          >
            <Sparkles className="w-4 h-4 text-amber-700" />
            <span>Watch 14-Stage Trade Demo</span>
          </Link>

          <Link
            to="/portal"
            className="w-full py-3 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 flex items-center justify-center gap-2 transition-colors"
          >
            <LayoutDashboard className="w-4 h-4 text-slate-600" />
            <span>Open ERP Trade Portal</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
