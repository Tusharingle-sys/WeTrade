import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { APP_CONFIG } from '../config/appConfig';
import {
  Users2,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  Send,
  Building2,
  HelpCircle
} from 'lucide-react';

export const ForBuyersPage: React.FC = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    businessType: 'Distributor',
    requiredProduct: '',
    specifications: '',
    quantity: '',
    targetPrice: '',
    destination: '',
    requiredDate: ''
  });

  const [submittedSim, setSubmittedSim] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.companyName.trim()) errs.companyName = 'Company name is required';
    if (!formData.contactPerson.trim()) errs.contactPerson = 'Contact person is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid email is required';
    if (!formData.requiredProduct.trim()) errs.requiredProduct = 'Product requirement is required';
    if (!formData.destination.trim()) errs.destination = 'Delivery destination is required';
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
              <span className="text-slate-900 font-semibold">For Buyers</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#07145B] tracking-tight">
              Source Directly from Vetted Regional Producers
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              We connect wholesale distributors, supermarkets, and commercial buyers with verified small-scale manufacturers and producer collectives across India.
            </p>
          </div>
        </div>
      </section>

      {/* Sourcing Advantages */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-2">
            <ShieldCheck className="w-6 h-6 text-blue-700" />
            <h3 className="font-extrabold text-slate-900 text-sm">Audited Origin &amp; Test Certificates</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We verify lab parameters, FSSAI compliance, and packaging strength before recommending lots for commercial purchase.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-2">
            <FileSpreadsheet className="w-6 h-6 text-[#FFB800]" />
            <h3 className="font-extrabold text-slate-900 text-sm">Harmonized Quotations</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Transparent price breakdown separating base product price, optional logistics freight, and statutory taxes.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-2">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            <h3 className="font-extrabold text-slate-900 text-sm">Milestone-Linked Payments</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Structured terms ensure pre-dispatch quality verification and final release upon signed Proof of Delivery (POD).
            </p>
          </div>
        </div>
      </section>

      {/* BUYER SOURCING ENQUIRY FORM */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-900 bg-blue-50 px-3 py-1 rounded-md mb-2">
              <Users2 className="w-3.5 h-3.5" />
              <span>Buyer Sourcing Request</span>
            </div>
            <h2 className="text-2xl font-black text-[#07145B]">
              Submit Your Product Requirement
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Share your target specifications and destination. We will match your requirement against vetted producer availability.
            </p>
          </div>

          {submittedSim ? (
            <div className="p-6 rounded-2xl bg-amber-50 border border-amber-300 space-y-4">
              <div className="flex items-center gap-2 text-amber-900 font-extrabold text-sm">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                <span>Prototype Demonstration Notice — Form Not Sent</span>
              </div>
              <p className="text-xs text-amber-800 leading-relaxed">
                Because no live email or submission backend is connected in this prototype, your sourcing enquiry has <strong>not been transmitted to a live database</strong>.
              </p>
              <div className="text-xs text-slate-700 bg-white p-4 rounded-xl border border-amber-200 space-y-1">
                <strong>Simulated Data Captured:</strong>
                <div>Company: {formData.companyName} ({formData.businessType})</div>
                <div>Required Product: {formData.requiredProduct}</div>
                <div>Destination: {formData.destination}</div>
                <div>Target Price / Budget: {formData.targetPrice || 'Standard wholesale'}</div>
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
              
              {/* Buyer Contact Group */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-800 border-b pb-2">1. Buyer Entity &amp; Contact</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Company / Business Name *</label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="e.g. Metro Food Distributors LLP"
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
                      placeholder="Procurement Manager name"
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
                      placeholder="procure@buyer.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#07145B] focus:outline-none"
                    />
                    {errors.email && <span className="text-[11px] text-red-600 mt-1 block">{errors.email}</span>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#07145B] focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">Business Type</label>
                    <select
                      value={formData.businessType}
                      onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none"
                    >
                      <option value="Distributor">Wholesale Distributor</option>
                      <option value="Retail Chain">Retail Supermarket Chain</option>
                      <option value="Manufacturer">Manufacturer (Raw Material)</option>
                      <option value="Institutional Buyer">Institutional / Hospitality Buyer</option>
                      <option value="Exporter">Merchant Exporter</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Requirement Specifications Group */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-800 border-b pb-2">2. Product Sourcing Specifications</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Required Product *</label>
                    <input
                      type="text"
                      value={formData.requiredProduct}
                      onChange={(e) => setFormData({ ...formData, requiredProduct: e.target.value })}
                      placeholder="e.g. Unpolished Ragi Flour 1kg pack"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#07145B] focus:outline-none"
                    />
                    {errors.requiredProduct && <span className="text-[11px] text-red-600 mt-1 block">{errors.requiredProduct}</span>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Required Quantity / Lot Size</label>
                    <input
                      type="text"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      placeholder="e.g. 2,000 kg monthly or 500 units"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#07145B] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Target Price or Budget (INR)</label>
                    <input
                      type="text"
                      value={formData.targetPrice}
                      onChange={(e) => setFormData({ ...formData, targetPrice: e.target.value })}
                      placeholder="e.g. ₹52 / kg delivered"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#07145B] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Required Delivery Date</label>
                    <input
                      type="date"
                      value={formData.requiredDate}
                      onChange={(e) => setFormData({ ...formData, requiredDate: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#07145B] focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">Delivery Destination Warehouse *</label>
                    <input
                      type="text"
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      placeholder="City, District, Pin Code, Warehouse Complex"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#07145B] focus:outline-none"
                    />
                    {errors.destination && <span className="text-[11px] text-red-600 mt-1 block">{errors.destination}</span>}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">Quality Specifications &amp; Tolerances</label>
                    <textarea
                      rows={3}
                      value={formData.specifications}
                      onChange={(e) => setFormData({ ...formData, specifications: e.target.value })}
                      placeholder="Detail certifications, moisture limits, packaging tolerances, or brand requirements..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#07145B] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Intermediary Role Notice */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 leading-relaxed">
                <strong>Important Notice:</strong> WeTrade acts as an intermediary facilitating quotations and seller connections. WeTrade is not the product seller or product manufacturer. {APP_CONFIG.legalDisclaimers.formDisclaimer}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#07145B] text-white font-extrabold text-sm hover:bg-[#0c2288] transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-[#FFB800]" />
                <span>Submit Sourcing Requirement</span>
              </button>
            </form>
          )}

        </div>
      </section>

    </div>
  );
};
