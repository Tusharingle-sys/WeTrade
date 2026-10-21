import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTrade } from '../context/TradeContext';
import { APP_CONFIG } from '../config/appConfig';
import {
  Truck,
  MapPin,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Send,
  ArrowRight,
  Sparkles,
  FileText
} from 'lucide-react';

export const LogisticsPage: React.FC = () => {
  const { logisticsPartners, shipments } = useTrade();

  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    locations: '',
    modes: 'Road Express & FTL',
    shipmentTypes: 'Containerized Cargo',
    coverage: 'Pan-India',
    details: ''
  });

  const [submittedSim, setSubmittedSim] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.companyName.trim()) errs.companyName = 'Company name is required';
    if (!formData.contactPerson.trim()) errs.contactPerson = 'Contact person is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid email is required';
    if (!formData.locations.trim()) errs.locations = 'Service locations are required';
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
              <span className="text-slate-900 font-semibold">Logistics</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#07145B] tracking-tight">
              Optional Logistics Coordination &amp; Milestone Tracking
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              When requested by transaction principals, WeTrade coordinates carrier quotations, vehicle placement, and milestone updates from pickup to destination unloading.
            </p>
          </div>
        </div>
      </section>

      {/* Illustrated SVG Route with Moving Vehicle */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-900">
                Transport Flow
              </span>
              <h2 className="text-xl font-extrabold text-[#07145B]">
                Pickup to Destination Delivery Route
              </h2>
            </div>
            <div className="text-xs px-3 py-1.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 font-medium">
              {APP_CONFIG.legalDisclaimers.noRealLiveGps}
            </div>
          </div>

          {/* Illustrated SVG Route Canvas */}
          <div className="relative p-6 bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
              
              <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Milestone 1</span>
                <h4 className="font-extrabold text-[#07145B] text-sm">Seller Facility Pickup</h4>
                <p className="text-[11px] text-slate-500">Carton staging, gross weight verification, and vehicle loading.</p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Milestone 2</span>
                <h4 className="font-extrabold text-[#07145B] text-sm">Dispatched &amp; E-Way Bill</h4>
                <p className="text-[11px] text-slate-500">Lorry receipt (LR/GR) generated, gate pass and tax invoice uploaded.</p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Milestone 3</span>
                <h4 className="font-extrabold text-[#07145B] text-sm">Interstate Transit Hub</h4>
                <p className="text-[11px] text-slate-500">National highway toll crossing &amp; intermediate hub checkpoint.</p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Milestone 4</span>
                <h4 className="font-extrabold text-[#07145B] text-sm">Out for Delivery</h4>
                <p className="text-[11px] text-slate-500">Vehicle dispatched from destination regional distribution center.</p>
              </div>

              <div className="p-4 bg-[#07145B] text-white rounded-xl shadow-sm space-y-1">
                <span className="text-[10px] font-bold text-amber-300 uppercase">Milestone 5</span>
                <h4 className="font-extrabold text-[#FFB800] text-sm">Destination POD Sign-off</h4>
                <p className="text-[11px] text-slate-300">Dock unloading, carton count check, and signed delivery acknowledgement.</p>
              </div>

            </div>

            {/* Connecting line */}
            <div className="absolute top-1/2 left-8 right-8 h-1 bg-gradient-to-r from-blue-300 via-amber-300 to-emerald-400 -z-0 hidden md:block" />
          </div>
        </div>
      </section>

      {/* Quotation Comparison Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-900">
                Carrier Quotation Comparison
              </span>
              <h3 className="text-lg font-extrabold text-[#07145B]">
                Sample Freight Quotation Benchmarking (Hassan &rarr; Mumbai Route)
              </h3>
            </div>
            <span className="text-xs text-slate-400">Illustrative Demo Quotes</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="pb-3 font-bold">Carrier Operator</th>
                  <th className="pb-3 font-bold">Vehicle Specification</th>
                  <th className="pb-3 font-bold">Transit Time</th>
                  <th className="pb-3 font-bold">Estimated Rate</th>
                  <th className="pb-3 font-bold">Insurance &amp; Coverage</th>
                  <th className="pb-3 font-bold">Demo Benchmark</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50">
                  <td className="py-3 font-bold text-[#07145B]">FastTrack Cargo &amp; Freight Demo</td>
                  <td className="py-3 text-slate-700">19ft Closed Container Chassis</td>
                  <td className="py-3 text-slate-700">3.5 Days</td>
                  <td className="py-3 font-extrabold text-slate-900">₹4,800</td>
                  <td className="py-3 text-emerald-700 font-semibold">Standard Transit Cover</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      Selected in Demo WT-DEMO-001
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3 font-bold text-slate-800">Coastal &amp; Southern Line Logistics Demo</td>
                  <td className="py-3 text-slate-700">14ft Insulated Reefer / Dry Guard</td>
                  <td className="py-3 text-slate-700">3.0 Days</td>
                  <td className="py-3 font-bold text-slate-800">₹5,400</td>
                  <td className="py-3 text-slate-600">Reefer temperature guarantee</td>
                  <td className="py-3 text-slate-400">Available Alternative</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3 font-bold text-slate-800">North-South Interstate Freightways Demo</td>
                  <td className="py-3 text-slate-700">32ft Multi-Axle Part Load (PTL)</td>
                  <td className="py-3 text-slate-700">4.5 Days</td>
                  <td className="py-3 font-bold text-slate-800">₹3,900</td>
                  <td className="py-3 text-slate-600">Basic carrier liability</td>
                  <td className="py-3 text-slate-400">Cost-Effective Option</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* LOGISTICS PARTNER COLLABORATION FORM */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-900 bg-emerald-50 px-3 py-1 rounded-md mb-2">
              <Truck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Carrier Collaboration</span>
            </div>
            <h2 className="text-2xl font-black text-[#07145B]">
              Logistics Partner Collaboration Enquiry
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Are you an overland freight provider, container transporter, or 3PL operator? Connect with our trade desk to receive verified transport quotation requests.
            </p>
          </div>

          {submittedSim ? (
            <div className="p-6 rounded-2xl bg-amber-50 border border-amber-300 space-y-4">
              <div className="flex items-center gap-2 text-amber-900 font-extrabold text-sm">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                <span>Prototype Demonstration Notice — Form Not Sent</span>
              </div>
              <p className="text-xs text-amber-800 leading-relaxed">
                Because no live email or submission backend is connected in this prototype, your partnership enquiry has <strong>not been transmitted</strong>.
              </p>
              <div className="text-xs text-slate-700 bg-white p-4 rounded-xl border border-amber-200 space-y-1">
                <strong>Simulated Data Captured:</strong>
                <div>Carrier: {formData.companyName} ({formData.contactPerson})</div>
                <div>Coverage: {formData.locations} | Fleet Modes: {formData.modes}</div>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Carrier / Fleet Company Name *</label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="e.g. Express Line Freightways"
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
                    placeholder="Transport Manager"
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
                    placeholder="freight@carrier.com"
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
                  <label className="block text-xs font-bold text-slate-700 mb-1">Operating Corridors &amp; Hub Locations *</label>
                  <input
                    type="text"
                    value={formData.locations}
                    onChange={(e) => setFormData({ ...formData, locations: e.target.value })}
                    placeholder="e.g. South India Corridors, Mumbai-Delhi NH48, Gujarat industrial belts"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#07145B] focus:outline-none"
                  />
                  {errors.locations && <span className="text-[11px] text-red-600 mt-1 block">{errors.locations}</span>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Transport Modes Supported</label>
                  <input
                    type="text"
                    value={formData.modes}
                    onChange={(e) => setFormData({ ...formData, modes: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#07145B] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Fleet Types &amp; Capacity</label>
                  <input
                    type="text"
                    value={formData.shipmentTypes}
                    onChange={(e) => setFormData({ ...formData, shipmentTypes: e.target.value })}
                    placeholder="e.g. 19ft Closed, 32ft Container, Flatbed"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#07145B] focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Collaboration Details &amp; Milestone Capabilities</label>
                  <textarea
                    rows={3}
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    placeholder="Detail transit tracking capabilities, digital POD delivery, E-Way compliance..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#07145B] focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 leading-relaxed">
                <strong>Legal Boundary:</strong> WeTrade acts as an intermediary coordinating carrier quotations when requested by transaction principals. WeTrade is not a transport operator or fleet carrier. {APP_CONFIG.legalDisclaimers.formDisclaimer}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#07145B] text-white font-extrabold text-sm hover:bg-[#0c2288] transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-[#FFB800]" />
                <span>Submit Logistics Collaboration Details</span>
              </button>
            </form>
          )}

        </div>
      </section>

    </div>
  );
};
