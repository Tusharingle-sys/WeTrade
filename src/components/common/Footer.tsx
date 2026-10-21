import React from 'react';
import { Link } from 'react-router-dom';
import { WeTradeLogo } from './WeTradeLogo';
import { APP_CONFIG } from '../../config/appConfig';
import {
  Mail,
  Phone,
  MapPin,
  ShieldAlert,
  ArrowUpRight,
  Sparkles,
  LayoutDashboard
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intermediary Regulatory Notice Banner */}
        <div className="mb-12 p-4 sm:p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-xs sm:text-sm text-slate-300 leading-relaxed flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-[#FFB800] shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="font-bold text-white text-xs uppercase tracking-wider mb-0.5">
              Role &amp; Responsibilities Boundary Notice
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              {APP_CONFIG.legalDisclaimers.roleStatement}{' '}
              {APP_CONFIG.legalDisclaimers.noGuaranteeNotice}
            </p>
          </div>
        </div>

        {/* 4-Column Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-slate-800">
          {/* Brand Info Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white p-3.5 rounded-xl inline-block shadow-sm">
              <WeTradeLogo variant="horizontal" height={42} />
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Connecting small-scale producers, manufacturers, and sellers with verified buyers. End-to-end commercial facilitation from initial meeting to final delivery.
            </p>
            <div className="pt-2 space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-[#FFB800] shrink-0 mt-0.5" />
                <div className="flex flex-col gap-0.5">
                  <a
                    href={`mailto:${APP_CONFIG.emails.info}`}
                    className="hover:text-amber-400 text-slate-300 transition-colors"
                  >
                    <span>{APP_CONFIG.emails.info}</span>
                  </a>
                  <a
                    href={`mailto:${APP_CONFIG.emails.support}`}
                    className="hover:text-amber-400 text-slate-300 transition-colors"
                  >
                    <span>{APP_CONFIG.emails.support}</span>
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-[#FFB800] shrink-0 mt-0.5" />
                <div className="flex flex-col gap-0.5">
                  <a
                    href="tel:+919699484156"
                    className="hover:text-amber-400 text-slate-300 transition-colors"
                  >
                    <span>+91 96994 84156</span>
                  </a>
                  <a
                    href="tel:+919322974966"
                    className="hover:text-amber-400 text-slate-300 transition-colors"
                  >
                    <span>+91 93229 74966</span>
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#FFB800] shrink-0 mt-0.5" />
                <span>{APP_CONFIG.address}</span>
              </div>
            </div>
          </div>

          {/* Solutions Column */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">
              Solutions
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/for-sellers" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <span>For Sellers</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </Link>
              </li>
              <li>
                <Link to="/for-buyers" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <span>For Buyers</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </Link>
              </li>
              <li>
                <Link to="/logistics" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <span>Logistics Coordination</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-amber-400 transition-colors">
                  Product Catalogue
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-amber-400 transition-colors">
                  Trade Process Timeline
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">
              Resources &amp; Demos
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  to="/demo-portfolio"
                  className="text-amber-300 font-semibold hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#FFB800]" />
                  <span>14-Stage Animated Demo</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/portal"
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <LayoutDashboard className="w-3.5 h-3.5 text-[#FFB800]" />
                  <span>Secure Trade Portal</span>
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-amber-400 transition-colors">
                  Business Sign In
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-amber-400 transition-colors">
                  Request Business Account
                </Link>
              </li>
              <li>
                <Link to="/platform" className="hover:text-amber-400 transition-colors">
                  ERP Platform Overview
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-amber-400 transition-colors">
                  FAQ &amp; Trade Guidance
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-amber-400 transition-colors">
                  Consultation Requests
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Governance Column */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">
              Governance &amp; Legal
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/terms" className="hover:text-amber-400 transition-colors">
                  Terms &amp; Service Scope
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-amber-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-amber-400 transition-colors">
                  About WeTrade Model
                </Link>
              </li>
              <li>
                <span className="inline-block text-[11px] px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700">
                  Demo Build v1.2
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            &copy; {new Date().getFullYear()} WeTrade Solutions. Right Source – Right Buyer – Better Value.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Fictional Prototype Environment</span>
            <span>&bull;</span>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms &amp; Disclaimers
            </Link>
            <span>&bull;</span>
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
