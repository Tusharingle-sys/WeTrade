import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { APP_CONFIG } from '../config/appConfig';
import {
  Mail,
  Phone,
  MapPin,
  Building2,
  Users2,
  Truck,
  MessageSquare,
  Send,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'seller' | 'buyer' | 'logistics'>('general');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    roleInterest: 'General Trade Question',
    message: ''
  });

  const [submittedSim, setSubmittedSim] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid email is required';
    if (!formData.message.trim()) errs.message = 'Message is required';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmittedSim(true);
  };

  return (
    <div className="bg-[#F5F7FA] min-h-screen pb-20 space-y-16">
      
      {/* Top Banner */}
      <section className="bg-white border-b border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Link to="/" className="hover:text-[#07145B]">Home</Link>
              <span>/</span>
              <span className="text-slate-900 font-semibold">Contact &amp; Enquiries</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#07145B] tracking-tight">
              Connect with the WeTrade Facilitation Desk
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Reach out to discuss seller product onboarding, wholesale sourcing inquiries, or logistics collaboration.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid: Contact Info + Unified Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Direct Contact Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div>
                <h3 className="text-lg font-black text-[#07145B]">Trade Coordination Office</h3>
                <p className="text-xs text-slate-500 mt-1">
                  We coordinate B2B trade facilitation for suppliers and buyers nationwide.
                </p>
              </div>

              <div className="space-y-4 text-xs text-slate-700">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <Mail className="w-5 h-5 text-[#FFB800] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block text-[11px]">Official Business Emails</span>
                    <div className="flex flex-col gap-1 mt-1 text-slate-700">
                      <a
                        href={`mailto:${APP_CONFIG.emails.info}`}
                        className="hover:text-[#07145B] transition-colors flex items-center gap-1.5"
                      >
                        <span className="font-medium text-slate-900">{APP_CONFIG.emails.info}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200/80 text-slate-600">General Enquiries</span>
                      </a>
                      <a
                        href={`mailto:${APP_CONFIG.emails.support}`}
                        className="hover:text-[#07145B] transition-colors flex items-center gap-1.5"
                      >
                        <span className="font-medium text-slate-900">{APP_CONFIG.emails.support}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">Support Desk</span>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <Phone className="w-5 h-5 text-[#FFB800] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block text-[11px]">Phone Support</span>
                    <span className="text-slate-600 flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-0.5">
                      <a
                        href="tel:+919699484156"
                        className="hover:text-[#07145B] text-slate-900 font-medium transition-colors"
                      >
                        +91 96994 84156
                      </a>
                      <span className="text-slate-300">/</span>
                      <a
                        href="tel:+919322974966"
                        className="hover:text-[#07145B] text-slate-900 font-medium transition-colors"
                      >
                        +91 93229 74966
                      </a>
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <MapPin className="w-5 h-5 text-[#FFB800] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block text-[11px]">Registered Facilitation Hub</span>
                    <span className="text-slate-600 leading-relaxed">{APP_CONFIG.address}</span>
                  </div>
                </div>
              </div>

              {/* Specialized Form Shortcuts */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Dedicated Structured Forms
                </span>
                <Link
                  to="/for-sellers"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-800 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#07145B]" />
                    <span>Sell Through WeTrade Form</span>
                  </span>
                  <span className="text-slate-400 text-[10px]">&rarr;</span>
                </Link>

                <Link
                  to="/for-buyers"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-800 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Users2 className="w-4 h-4 text-blue-600" />
                    <span>Buyer Sourcing Requirement Form</span>
                  </span>
                  <span className="text-slate-400 text-[10px]">&rarr;</span>
                </Link>

                <Link
                  to="/logistics"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-800 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-emerald-600" />
                    <span>Logistics Partner Form</span>
                  </span>
                  <span className="text-slate-400 text-[10px]">&rarr;</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Unified Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-6">
              
              {/* Perspective Tabs */}
              <div className="flex items-center gap-2 border-b border-slate-100 pb-4 overflow-x-auto">
                {[
                  { id: 'general', label: 'General Enquiry', icon: MessageSquare },
                  { id: 'seller', label: 'I Am a Seller', icon: Building2 },
                  { id: 'buyer', label: 'I Am a Buyer', icon: Users2 },
                  { id: 'logistics', label: 'Logistics Partner', icon: Truck }
                ].map((t) => {
                  const Icon = t.icon;
                  return (
                    <button
                      key={t.id}
                      onClick={() => {
                        setActiveTab(t.id as any);
                        setFormData({ ...formData, roleInterest: t.label });
                      }}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                        activeTab === t.id
                          ? 'bg-[#07145B] text-white shadow-2xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{t.label}</span>
                    </button>
                  );
                })}
              </div>

              {submittedSim ? (
                <div className="p-6 rounded-2xl bg-amber-50 border border-amber-300 space-y-4">
                  <div className="flex items-center gap-2 text-amber-900 font-extrabold text-sm">
                    <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                    <span>Prototype Demonstration Notice — Message Not Sent</span>
                  </div>
                  <p className="text-xs text-amber-800 leading-relaxed">
                    Because this is an interactive frontend demonstration prototype without a live email server, your message has <strong>not been transmitted</strong>.
                  </p>
                  <div className="text-xs text-slate-700 bg-white p-4 rounded-xl border border-amber-200 space-y-1">
                    <div><strong>From:</strong> {formData.name} ({formData.email})</div>
                    <div><strong>Topic:</strong> {formData.roleInterest}</div>
                    <div><strong>Message:</strong> {formData.message}</div>
                  </div>
                  <button
                    onClick={() => setSubmittedSim(false)}
                    className="px-4 py-2 bg-[#07145B] text-white rounded-xl text-xs font-bold"
                  >
                    Edit Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Ramesh Patel"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#07145B] focus:outline-none"
                      />
                      {errors.name && <span className="text-[11px] text-red-600 mt-1 block">{errors.name}</span>}
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Business Email *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#07145B] focus:outline-none"
                      />
                      {errors.email && <span className="text-[11px] text-red-600 mt-1 block">{errors.email}</span>}
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#07145B] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Company / Entity Name</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Your business name"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#07145B] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Your Message or Enquiry *</label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your product line, sourcing requirement, or commercial question..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#07145B] focus:outline-none"
                    />
                    {errors.message && <span className="text-[11px] text-red-600 mt-1 block">{errors.message}</span>}
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 leading-relaxed">
                    <strong>Disclaimer:</strong> {APP_CONFIG.legalDisclaimers.roleStatement} {APP_CONFIG.legalDisclaimers.formDisclaimer}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#07145B] text-white font-extrabold text-sm hover:bg-[#0c2288] transition-colors shadow-md flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4 text-[#FFB800]" />
                    <span>Send Message to WeTrade</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
