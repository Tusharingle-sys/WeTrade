import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { WeTradeLogo } from '../components/common/WeTradeLogo';
import { useAuth } from '../context/AuthContext';
import { RequestedAccountType } from '../types/auth';
import {
  Building2,
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  FileText,
  ShieldCheck,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Truck,
  ShoppingCart,
  Factory
} from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { registerAccount, authError, clearAuthError, loading } = useAuth();

  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    businessLocation: '',
    requestedAccountType: 'seller' as RequestedAccountType,
    businessDescription: '',
    acceptedPrivacy: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successSubmitted, setSuccessSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    clearAuthError();

    if (!formData.companyName.trim()) {
      setValidationError('Company name is required.');
      return;
    }
    if (!formData.contactPerson.trim()) {
      setValidationError('Contact person name is required.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setValidationError('A valid business email address is required.');
      return;
    }
    if (formData.password.length < 6) {
      setValidationError('Password must be at least 6 characters.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setValidationError('Passwords do not match.');
      return;
    }
    if (!formData.phone.trim()) {
      setValidationError('Phone number is required.');
      return;
    }
    if (!formData.businessLocation.trim()) {
      setValidationError('Business location (City, State) is required.');
      return;
    }
    if (!formData.acceptedPrivacy) {
      setValidationError('Please review and accept the Privacy Policy & Intermediary Terms.');
      return;
    }

    setIsSubmitting(true);
    try {
      await registerAccount({
        companyName: formData.companyName,
        contactPerson: formData.contactPerson,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        businessLocation: formData.businessLocation,
        requestedAccountType: formData.requestedAccountType,
        businessDescription: formData.businessDescription,
        acceptedPrivacy: formData.acceptedPrivacy
      });
      setSuccessSubmitted(true);
    } catch (err) {
      // handled in context authError
    } finally {
      setIsSubmitting(false);
    }
  };

  if (successSubmitted) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-lg">
          <div className="flex justify-center mb-6">
            <Link to="/" className="p-2.5 rounded-2xl bg-white shadow-sm border border-slate-200">
              <WeTradeLogo variant="horizontal" height={44} />
            </Link>
          </div>

          <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-slate-200 text-center space-y-6 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#07145B]">
                Account Request Submitted
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
                “Thank you for registering with WeTrade. Your account request is awaiting review by our team. You will receive access to the Trade Portal after your account has been approved.”
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2 text-slate-700">
              <div className="flex justify-between border-b pb-1.5">
                <span className="text-slate-500 font-medium">Company:</span>
                <span className="font-bold text-slate-900">{formData.companyName}</span>
              </div>
              <div className="flex justify-between border-b pb-1.5">
                <span className="text-slate-500 font-medium">Email:</span>
                <span className="font-bold text-slate-900">{formData.email}</span>
              </div>
              <div className="flex justify-between border-b pb-1.5">
                <span className="text-slate-500 font-medium">Role Requested:</span>
                <span className="font-bold text-[#07145B] capitalize">{formData.requestedAccountType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Initial Status:</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[11px]">
                  Pending Approval
                </span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => navigate('/pending-approval')}
                className="flex-1 py-3 px-4 rounded-xl bg-[#07145B] text-white font-bold text-xs sm:text-sm hover:bg-[#0A1A70] shadow-md transition-all"
              >
                Go to Status Dashboard &rarr;
              </button>
              <Link
                to="/demo-portfolio"
                className="flex-1 py-3 px-4 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs sm:text-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Explore Demo Workflow</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block p-2 rounded-2xl bg-white shadow-sm border border-slate-200 mb-4">
            <WeTradeLogo variant="horizontal" height={44} />
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-[#07145B]">
            Request a Business Account
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            Register your enterprise for verified access to the WeTrade B2B Sourcing, Sales &amp; Trade Facilitation Portal.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200">
          
          {/* Security Notice */}
          <div className="mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <span className="font-bold text-slate-900 block">Vetted Business Network</span>
              To safeguard commercial terms, all registrations undergo administrative review and accreditation checks before portal access is granted.
            </div>
          </div>

          {(validationError || authError) && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-3 animate-in fade-in">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                {validationError || authError}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Account Type Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-900 mb-2">
                Select Account Classification <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, requestedAccountType: 'seller' })}
                  className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    formData.requestedAccountType === 'seller'
                      ? 'border-[#07145B] bg-blue-50/70 ring-2 ring-[#07145B]'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <Factory className={`w-5 h-5 mb-2 ${formData.requestedAccountType === 'seller' ? 'text-[#07145B]' : 'text-slate-400'}`} />
                  <div>
                    <div className="font-bold text-xs text-slate-900">Seller / Producer</div>
                    <div className="text-[11px] text-slate-500 leading-tight mt-0.5">Manufacturers &amp; Small Scale Suppliers</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, requestedAccountType: 'buyer' })}
                  className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    formData.requestedAccountType === 'buyer'
                      ? 'border-[#07145B] bg-blue-50/70 ring-2 ring-[#07145B]'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <ShoppingCart className={`w-5 h-5 mb-2 ${formData.requestedAccountType === 'buyer' ? 'text-[#07145B]' : 'text-slate-400'}`} />
                  <div>
                    <div className="font-bold text-xs text-slate-900">Buyer</div>
                    <div className="text-[11px] text-slate-500 leading-tight mt-0.5">Wholesalers, Retail Chains &amp; Exporters</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, requestedAccountType: 'logistics' })}
                  className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    formData.requestedAccountType === 'logistics'
                      ? 'border-[#07145B] bg-blue-50/70 ring-2 ring-[#07145B]'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <Truck className={`w-5 h-5 mb-2 ${formData.requestedAccountType === 'logistics' ? 'text-[#07145B]' : 'text-slate-400'}`} />
                  <div>
                    <div className="font-bold text-xs text-slate-900">Logistics Partner</div>
                    <div className="text-[11px] text-slate-500 leading-tight mt-0.5">Fleet Operators &amp; Freight Transporters</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Two column grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Company Name */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Registered Company / Entity Name <span className="text-red-500">*</span>
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="e.g. Apex Agri Products Pvt Ltd"
                    className="block w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#07145B]"
                  />
                </div>
              </div>

              {/* Contact Person */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Authorized Contact Person <span className="text-red-500">*</span>
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    placeholder="e.g. Rajesh Sharma"
                    className="block w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#07145B]"
                  />
                </div>
              </div>
            </div>

            {/* Email and Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Business Email */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Official Business Email <span className="text-red-500">*</span>
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="block w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#07145B]"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Phone / WhatsApp Contact <span className="text-red-500">*</span>
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="block w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#07145B]"
                  />
                </div>
              </div>
            </div>

            {/* Business Location */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Business Location (City, State / Region) <span className="text-red-500">*</span>
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={formData.businessLocation}
                  onChange={(e) => setFormData({ ...formData, businessLocation: e.target.value })}
                  placeholder="e.g. Pune, Maharashtra"
                  className="block w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#07145B]"
                />
              </div>
            </div>

            {/* Passwords */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Create Password <span className="text-red-500">*</span>
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Min 6 characters"
                    className="block w-full pl-9 pr-9 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#07145B]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-700 focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="Repeat password"
                    className="block w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#07145B]"
                  />
                </div>
              </div>
            </div>

            {/* Optional Description */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Business Description &amp; Trade Capabilities <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <textarea
                rows={3}
                value={formData.businessDescription}
                onChange={(e) => setFormData({ ...formData, businessDescription: e.target.value })}
                placeholder="Mention product categories, production capacity, monthly procurement requirements, or fleet size..."
                className="block w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#07145B]"
              />
            </div>

            {/* Privacy acceptance */}
            <div className="flex items-start gap-2.5 pt-2">
              <input
                id="privacy"
                type="checkbox"
                required
                checked={formData.acceptedPrivacy}
                onChange={(e) => setFormData({ ...formData, acceptedPrivacy: e.target.checked })}
                className="w-4 h-4 mt-0.5 rounded text-[#07145B] focus:ring-[#07145B] border-slate-300"
              />
              <label htmlFor="privacy" className="text-xs text-slate-600 leading-relaxed">
                I agree to the{' '}
                <Link to="/terms" target="_blank" className="text-[#07145B] font-bold underline">
                  Terms of Service &amp; Intermediary Scope
                </Link>{' '}
                and understand that account activation requires administrative vetting and verification by the WeTrade trade desk.
              </label>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting || loading}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl shadow-md text-sm font-bold text-white bg-[#07145B] hover:bg-[#0A1A70] active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Submitting Request...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Account Request</span>
                    <ArrowRight className="w-4 h-4 text-[#FFB800]" />
                  </>
                )}
              </button>
            </div>

            {/* Back to sign in */}
            <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
              Already have an approved account?{' '}
              <Link to="/login" className="font-bold text-[#07145B] hover:underline">
                Sign In here &rarr;
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
