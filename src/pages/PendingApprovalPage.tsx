import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { WeTradeLogo } from '../components/common/WeTradeLogo';
import { useAuth } from '../context/AuthContext';
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  Mail,
  RefreshCw,
  LogOut,
  Sparkles,
  ShieldCheck,
  Building2,
  User,
  ArrowRight
} from 'lucide-react';

export const PendingApprovalPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    currentUser,
    userProfile,
    accountRequest,
    isApproved,
    resendVerification,
    logout
  } = useAuth();

  const [resending, setResending] = useState(false);
  const [resendNotice, setResendNotice] = useState<string | null>(null);

  // If already approved, redirect to portal
  if (isApproved) {
    navigate('/portal', { replace: true });
  }

  const handleResendEmail = async () => {
    setResending(true);
    setResendNotice(null);
    try {
      await resendVerification();
      setResendNotice('Verification email sent! Please check your inbox and spam folders.');
    } catch (err: any) {
      setResendNotice(err.message || 'Could not dispatch verification email.');
    } finally {
      setResending(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  const company = userProfile?.companyName || accountRequest?.companyName || 'Your Business Entity';
  const email = currentUser?.email || 'N/A';
  const roleRequested = userProfile?.accountType || accountRequest?.requestedAccountType || 'Commercial Account';
  const submittedDate = userProfile?.createdAt
    ? new Date(userProfile.createdAt).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    : 'Recent';

  return (
    <div className="min-h-screen bg-[#F5F7FA] py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-xl mx-auto w-full">
        <div className="flex justify-center mb-6">
          <Link to="/" className="p-2.5 rounded-2xl bg-white shadow-sm border border-slate-200">
            <WeTradeLogo variant="horizontal" height={44} />
          </Link>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
          {/* Header Banner */}
          <div className="bg-[#07145B] p-6 sm:p-8 text-white relative">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-amber-500/20 text-[#FFB800] border border-amber-400/30">
                <Clock className="w-8 h-8" />
              </div>
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-300">
                  Account Status: Pending Review
                </span>
                <h1 className="text-xl sm:text-2xl font-black mt-0.5">
                  Registration Awaiting Approval
                </h1>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Primary Required Prompt Message */}
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
              “Thank you for registering with WeTrade. Your account request is awaiting review by our team. You will receive access to the Trade Portal after your account has been approved.”
            </div>

            {/* Application Summary Card */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500">Applicant Company:</span>
                <span className="font-bold text-slate-900">{company}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500">Registered Email:</span>
                <span className="font-semibold text-slate-800">{email}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500">Requested Account Type:</span>
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-[#07145B] font-bold capitalize">
                  {roleRequested}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Submitted On:</span>
                <span className="text-slate-700">{submittedDate}</span>
              </div>
            </div>

            {/* Email Verification Box */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-500" />
                  <span className="text-xs font-bold text-slate-800">Email Verification</span>
                </div>
                {currentUser?.emailVerified ? (
                  <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                  </span>
                ) : (
                  <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                    Verification Sent
                  </span>
                )}
              </div>
              {!currentUser?.emailVerified && (
                <div className="text-xs text-slate-500 flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
                  <span>Please confirm the link sent to your inbox.</span>
                  <button
                    type="button"
                    onClick={handleResendEmail}
                    disabled={resending}
                    className="text-xs font-bold text-[#07145B] hover:underline disabled:opacity-50 cursor-pointer self-start sm:self-auto"
                  >
                    {resending ? 'Sending...' : 'Resend Verification Email'}
                  </button>
                </div>
              )}
              {resendNotice && (
                <div className="text-xs p-2 rounded-lg bg-blue-50 text-blue-800">
                  {resendNotice}
                </div>
              )}
            </div>

            {/* What Happens Next Guidance */}
            <div className="space-y-2 text-xs text-slate-600">
              <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider">
                What happens next:
              </span>
              <ul className="space-y-1.5 list-disc list-inside text-slate-600">
                <li>WeTrade trade desk validates your company name &amp; location.</li>
                <li>An administrator approves your assigned account permissions.</li>
                <li>You will be able to access your company dashboard immediately upon approval.</li>
              </ul>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="flex-1 py-3 px-4 rounded-xl bg-slate-900 text-white font-bold text-xs sm:text-sm hover:bg-slate-800 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Check Status</span>
              </button>
              <Link
                to="/demo-portfolio"
                className="flex-1 py-3 px-4 rounded-xl bg-amber-100/70 text-[#07145B] font-bold text-xs sm:text-sm hover:bg-amber-100 flex items-center justify-center gap-2 transition-colors"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Explore 14-Stage Demo</span>
              </Link>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Signed in as {email}</span>
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-1 font-semibold text-red-600 hover:text-red-700 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
