import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { APP_CONFIG } from '../config/appConfig';
import {
  TrendingUp,
  ShieldCheck,
  Building2,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  FileCheck2,
  Send,
  Info
} from 'lucide-react';

export const ForSellersPage: React.FC = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    location: '',
    productName: '',
    category: 'Food & Agro',
    specifications: '',
    capacity: '',
    expectedPrice: '',
    moq: '',
    logisticsRequired: 'yes'
  });

  const [submittedSim, setSubmittedSim] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.companyName.trim()) errs.companyName = 'Company name is required';
    if (!formData.contactPerson.trim()) errs.contactPerson = 'Contact person is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid email is required';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    if (!formData.productName.trim()) errs.productName = 'Product name is required';
    if (!formData.expectedPrice.trim()) errs.expectedPrice = 'Expected price is required';
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
              <span className="text-slate-900 font-semibold">For Sellers</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#07145B] tracking-tight">
              Expand Your B2B Market Reach Through WeTrade
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              We help small-scale producers, regional manufacturers, and mills present products directly to qualified wholesale buyers with structured commercial terms.
            </p>
          </div>
        </div>
      </section>

      {/* 4 Benefits Without Unrealistic Claims */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Targeted Buyer Outreach',
              desc: 'We research wholesale buyers and distributors whose purchase criteria match your production capacity.'
            },
            {
              title: 'Verified Listing Dossier',
              desc: 'We assist in organizing test reports and packaging specifications to establish trust with buyers.'
            },
            {
              title: 'Fair Price Negotiation',
              desc: 'We facilitate commercial discussions transparently, protecting your baseline ex-factory margins.'
            },
            {
              title: 'Optional Logistics Support',
              desc: 'When requested, we help compare freight quotes and track vehicle milestones from pickup to destination.'
            }
          ].map((b, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-2">
              <CheckCircle2 className="w-6 h-6 text-[#FFB800]" />
              <h3 className="font-extrabold text-slate-900 text-sm">{b.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SELLER ENQUIRY FORM */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-900 bg-blue-50 px-3 py-1 rounded-md mb-2">
              <Building2 className="w-3.5 h-3.5" />
              <span>Seller Consultation Request</span>
            </div>
            <h2 className="text-2xl font-black text-[#07145B]">
              Sell Your Products Through WeTrade
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Provide your manufacturing specifications below. Our trade desk will review your details for potential buyer matchmaking.
            </p>
          </div>

          {submittedSim ? (
            <div className="p-6 rounded-2xl bg-amber-50 border border-amber-300 space-y-4">
              <div className="flex items-center gap-2 text-amber-900 font-extrabold text-sm">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                <span>Prototype Demonstration Notice — Form Not Sent</span>
              </div>
              <p className="text-xs text-amber-800 leading-relaxed">
                Because no live email or submission backend is connected in this prototype, your submission has <strong>not been transmitted or stored on a live server</strong>.
              </p>
              <div className="text-xs text-slate-700 bg-white p-4 rounded-xl border border-amber-200 space-y-1">
                <strong>Simulated Data Captured:</strong>
                <div>Company: {formData.companyName} ({formData.contactPerson})</div>
                <div>Product: {formData.productName} ({formData.category})</div>
                <div>Expected Selling Price: {formData.expectedPrice}</div>
              </div>
              <button
                onClick={() => setSubmittedSim(false)}
                className="px-4 py-2 bg-[#07145B] text-white rounded-xl text-xs font-bold hover:bg-[#0c2288]"
              >
                Reset &amp; Edit Form
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Group 1: Business Details */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-800 border-b pb-2">1. Company &amp; Contact Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Company / Mill Name *</label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="e.g. Sahyadri Agro Collective"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#07145B] focus:outline-none"
                    />
                    {errors.companyName && <span className="text-[11px] text-red-600 mt-1 block">{errors.companyName}</span>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Contact Person *</label>
                    <input
                      type="text"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      placeholder="Your full name"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#07145B] focus:outline-none"
                    />
                    {errors.contactPerson && <span className="text-[11px] text-red-600 mt-1 block">{errors.contactPerson}</span>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Business Email *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="trade@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#07145B] focus:outline-none"
                    />
                    {errors.email && <span className="text-[11px] text-red-600 mt-1 block">{errors.email}</span>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#07145B] focus:outline-none"
                    />
                    {errors.phone && <span className="text-[11px] text-red-600 mt-1 block">{errors.phone}</span>}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">Factory / Warehouse Location</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="City, District, State"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#07145B] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Group 2: Product Specifications */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-800 border-b pb-2">2. Product Specifications &amp; Pricing</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Product Name *</label>
                    <input
                      type="text"
                      value={formData.productName}
                      onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                      placeholder="e.g. Organic Finger Millet Flour 1kg"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#07145B] focus:outline-none"
                    />
                    {errors.productName && <span className="text-[11px] text-red-600 mt-1 block">{errors.productName}</span>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Product Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none"
                    >
                      <option value="Food & Agro">Food &amp; Agro</option>
                      <option value="Textiles & Apparel">Textiles &amp; Apparel</option>
                      <option value="Packaging & Paper">Packaging &amp; Paper</option>
                      <option value="Hardware & Tools">Hardware &amp; Tools</option>
                      <option value="Spices & Condiments">Spices &amp; Condiments</option>
                      <option value="Raw Materials">Raw Materials</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Monthly Production Capacity</label>
                    <input
                      type="text"
                      value={formData.capacity}
                      onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                      placeholder="e.g. 30 MT / Month or 20,000 units"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#07145B] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Expected Selling Price (INR) *</label>
                    <input
                      type="text"
                      value={formData.expectedPrice}
                      onChange={(e) => setFormData({ ...formData, expectedPrice: e.target.value })}
                      placeholder="e.g. ₹58 / kg Ex-Factory"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#07145B] focus:outline-none"
                    />
                    {errors.expectedPrice && <span className="text-[11px] text-red-600 mt-1 block">{errors.expectedPrice}</span>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Minimum Order Quantity (MOQ)</label>
                    <input
                      type="text"
                      value={formData.moq}
                      onChange={(e) => setFormData({ ...formData, moq: e.target.value })}
                      placeholder="e.g. 500 kg"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#07145B] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Logistics Support Needed?</label>
                    <select
                      value={formData.logisticsRequired}
                      onChange={(e) => setFormData({ ...formData, logisticsRequired: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none"
                    >
                      <option value="yes">Yes, coordinate carrier transport</option>
                      <option value="no">No, we have our own transport arrangement</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">Specifications &amp; Packaging Notes</label>
                    <textarea
                      rows={3}
                      value={formData.specifications}
                      onChange={(e) => setFormData({ ...formData, specifications: e.target.value })}
                      placeholder="Detail batch sizes, moisture levels, test certificates, and carton packaging..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#07145B] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Privacy and Intermediary Notice */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 leading-relaxed space-y-1">
                <strong>Demonstration Boundary Notice:</strong> {APP_CONFIG.legalDisclaimers.noGuaranteeNotice}{' '}
                {APP_CONFIG.legalDisclaimers.formDisclaimer}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#07145B] text-white font-extrabold text-sm hover:bg-[#0c2288] transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-[#FFB800]" />
                <span>Submit Product for Trade Review</span>
              </button>
            </form>
          )}

        </div>
      </section>

    </div>
  );
};
