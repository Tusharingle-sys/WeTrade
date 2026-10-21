import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { WeTradeLogo } from '../components/common/WeTradeLogo';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, AlertOctagon, Mail, Phone, LogOut, ArrowLeft } from 'lucide-react';
import { APP_CONFIG } from '../config/appConfig';

export const AccessRestrictedPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, userProfile, isSuspended, isRejected, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  const isSuspendedAccount = isSuspended;
  const statusTitle = isSuspendedAccount ? 'Account Access Suspended' : 'Application Not Approved';
  const notes = userProfile?.reviewNotes || 'Administrative review concluded that additional documentation or accreditation is required.';

  return (
    <div className="min-h-screen bg-[#F5F7FA] py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-lg mx-auto w-full">
        <div className="flex justify-center mb-6">
          <Link to="/" className="p-2.5 rounded-2xl bg-white shadow-sm border border-slate-200">
            <WeTradeLogo variant="horizontal" height={44} />
          </Link>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
          <div className="bg-red-900 p-6 sm:p-8 text-white">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-white/10 text-red-200 border border-white/20">
                <AlertOctagon className="w-8 h-8" />
              </div>
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-red-300">
                  {isSuspendedAccount ? 'Status: Suspended' : 'Status: Rejected'}
                </span>
                <h1 className="text-xl sm:text-2xl font-black mt-0.5">
                  {statusTitle}
                </h1>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-900 leading-relaxed">
              <span className="font-bold block mb-1">Administrative Decision Notice</span>
              {notes}
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2 text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Registered Email:</span>
                <span className="font-semibold text-slate-900">{currentUser?.email || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Company Name:</span>
                <span className="font-semibold text-slate-900">{userProfile?.companyName || 'N/A'}</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold text-slate-900 block">
                Have questions or need account reinstatement?
              </span>
              <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Email: <a href="mailto:support@thewetrade.in" className="font-semibold text-[#07145B] underline">support@thewetrade.in</a></span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Phone: <a href="tel:+919699484156" className="font-semibold text-[#07145B]">{APP_CONFIG.phone}</a></span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleLogout}
                className="flex-1 py-3 px-4 rounded-xl bg-slate-900 text-white font-bold text-xs sm:text-sm hover:bg-slate-800 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
              <Link
                to="/"
                className="flex-1 py-3 px-4 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs sm:text-sm hover:bg-slate-50 flex items-center justify-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Home</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
