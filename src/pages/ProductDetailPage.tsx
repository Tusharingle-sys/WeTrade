import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTrade } from '../context/TradeContext';
import { APP_CONFIG } from '../config/appConfig';
import {
  Package,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Building2,
  FileText,
  Truck,
  ArrowLeft,
  Send,
  AlertCircle,
  Sparkles,
  RefreshCw,
  ExternalLink,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { products } = useTrade();

  const product = products.find((p) => p.id === productId) || products[0];

  const [enquiryQuantity, setEnquiryQuantity] = useState(product ? String(product.moq) : '500');
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [destinationCity, setDestinationCity] = useState('');
  const [submittedSim, setSubmittedSim] = useState(false);
  const [spotData, setSpotData] = useState<any | null>(null);
  const [spotLoading, setSpotLoading] = useState(false);
  const [spotError, setSpotError] = useState<string | null>(null);

  const fetchSpotBenchmark = async () => {
    if (!product) return;
    setSpotLoading(true);
    setSpotError(null);
    try {
      const res = await fetch('/api/market-intelligence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          commodity: product.name,
          category: product.category,
          query: `${product.name} spot rate mandi wholesale price India`
        })
      });
      const data = await res.json();
      if (data.success) {
        setSpotData(data);
      } else {
        setSpotError(data.error || 'Failed to fetch spot benchmark');
      }
    } catch (e: any) {
      setSpotError(e.message || 'Network error');
    } finally {
      setSpotLoading(false);
    }
  };

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-slate-800">Product Not Found</h2>
        <Link to="/products" className="text-[#07145B] underline text-xs mt-2 inline-block">
          Return to catalogue
        </Link>
      </div>
    );
  }

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName || !buyerEmail) return;
    setSubmittedSim(true);
  };

  return (
    <div className="bg-[#F5F7FA] min-h-screen pb-20 space-y-12">
      
      {/* Top Breadcrumb Header */}
      <section className="bg-white border-b border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Link to="/" className="hover:text-[#07145B]">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-[#07145B]">Products</Link>
            <span>/</span>
            <span className="text-slate-900 font-semibold">{product.id}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-[#07145B]">
                  {product.category}
                </span>
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200">
                  Demo Listing
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#07145B]">
                {product.name}
              </h1>
            </div>

            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#07145B]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Catalogue</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Grid: Details + Quick Enquiry */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left 2 Cols: Technical Dossier */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Overview Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-base font-extrabold text-[#07145B] border-b pb-3">
                Product Description &amp; Origin Overview
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                {product.description}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 text-[10px] block">Indicative Price</span>
                  <span className="text-xl font-black text-[#07145B]">₹{product.indicativePrice}</span>
                  <span className="text-slate-500 text-[11px]"> / {product.unit}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Minimum Order (MOQ)</span>
                  <span className="text-sm font-bold text-slate-900">{product.moq} {product.unit}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Available Lot</span>
                  <span className="text-sm font-bold text-slate-900">{product.availableQuantity} {product.unit}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Origin Hub</span>
                  <span className="text-sm font-bold text-slate-900">{product.sellerCity}, {product.sellerState}</span>
                </div>
              </div>
            </div>

            {/* Real-time Google Search Grounded Market Benchmark */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <h3 className="text-sm font-bold text-[#07145B]">
                    Google Grounded Mandi &amp; Spot Rate Benchmark
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={fetchSpotBenchmark}
                  disabled={spotLoading}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${spotLoading ? 'animate-spin text-blue-600' : 'text-slate-500'}`} />
                  <span>{spotData ? 'Recheck Live Rates' : 'Check Live Spot Rates'}</span>
                </button>
              </div>

              {!spotData && !spotLoading && (
                <p className="text-xs text-slate-500 leading-relaxed">
                  Verify current wholesale trading benchmarks, mandi arrival volumes, and export FOB indications via live Google Search grounding.
                </p>
              )}

              {spotLoading && (
                <div className="p-4 bg-slate-50 rounded-2xl animate-pulse space-y-2">
                  <div className="h-4 bg-slate-200 rounded w-1/3" />
                  <div className="h-3 bg-slate-200 rounded w-2/3" />
                </div>
              )}

              {spotError && (
                <div className="p-3 bg-red-50 text-red-700 rounded-xl text-xs">
                  {spotError}
                </div>
              )}

              {spotData && (
                <div className="space-y-3 pt-2">
                  <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-2xl text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-mono">Spot Benchmark</span>
                      <span className="text-base font-extrabold text-[#07145B] font-mono tabular-nums">{spotData.spotPriceRange}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-mono">30-Day Momentum</span>
                      <div className="flex items-center gap-1 font-bold">
                        {spotData.trend === 'up' && <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />}
                        {spotData.trend === 'down' && <TrendingDown className="w-3.5 h-3.5 text-red-600" />}
                        {spotData.trend === 'stable' && <Minus className="w-3.5 h-3.5 text-slate-500" />}
                        <span className="capitalize">{spotData.trend} Trend</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{spotData.summary}</p>
                  {spotData.sources && spotData.sources.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-[11px]">
                      <span className="text-slate-400">Sources:</span>
                      {spotData.sources.slice(0, 3).map((s: any, idx: number) => (
                        <a key={idx} href={s.uri} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline flex items-center gap-1 font-medium">
                          <span>{s.title}</span>
                          <ExternalLink className="w-2.5 h-2.5 text-slate-400" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Specifications Table */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-base font-extrabold text-[#07145B] border-b pb-3">
                Laboratory &amp; Technical Specifications
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <tbody className="divide-y divide-slate-100">
                    {Object.entries(product.specifications).map(([key, val], idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="py-2.5 font-bold text-slate-600 w-1/3">{key}</td>
                        <td className="py-2.5 font-semibold text-slate-900">{val}</td>
                      </tr>
                    ))}
                    <tr>
                      <td className="py-2.5 font-bold text-slate-600">Packaging Format</td>
                      <td className="py-2.5 text-slate-900">{product.packagingDetails}</td>
                    </tr>
                    {product.shelfLifeOrGrade && (
                      <tr>
                        <td className="py-2.5 font-bold text-slate-600">Grade / Quality Class</td>
                        <td className="py-2.5 text-slate-900">{product.shelfLifeOrGrade}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Fictional disclaimer */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
              <strong>Demonstration Listing Notice:</strong> This product specification is for platform prototype demonstration. No actual commercial inventory is sold directly through this interface. Confidential producer identifiers are managed securely by WeTrade trade operations.
            </div>

          </div>

          {/* Right 1 Col: Quick Enquiry Widget */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xl space-y-4 sticky top-24">
              <div className="border-b pb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-900">
                  Buyer RFQ Dispatch
                </span>
                <h3 className="text-base font-extrabold text-[#07145B]">
                  Enquire About This Product
                </h3>
              </div>

              {submittedSim ? (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-800 space-y-2">
                  <div className="font-bold flex items-center gap-1.5 text-amber-900">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <span>Demo Mode — Request Captured</span>
                  </div>
                  <p>
                    Because this is an interactive prototype, your enquiry for <strong>{enquiryQuantity} {product.unit}</strong> has been simulated.
                  </p>
                  <button
                    onClick={() => setSubmittedSim(false)}
                    className="mt-2 text-xs font-bold text-[#07145B] underline"
                  >
                    Send another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Requested Quantity ({product.unit}):</label>
                    <input
                      type="number"
                      min={product.moq}
                      value={enquiryQuantity}
                      onChange={(e) => setEnquiryQuantity(e.target.value)}
                      className="w-full p-2 rounded-xl border text-xs"
                    />
                    <span className="text-[10px] text-slate-400">Min Order Quantity: {product.moq} {product.unit}</span>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Your Name / Company:</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex Wholesale"
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      className="w-full p-2 rounded-xl border text-xs"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Business Email:</label>
                    <input
                      type="email"
                      required
                      placeholder="procure@buyer.com"
                      value={buyerEmail}
                      onChange={(e) => setBuyerEmail(e.target.value)}
                      className="w-full p-2 rounded-xl border text-xs"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Destination City:</label>
                    <input
                      type="text"
                      placeholder="e.g. Bengaluru, Mumbai, Delhi"
                      value={destinationCity}
                      onChange={(e) => setDestinationCity(e.target.value)}
                      className="w-full p-2 rounded-xl border text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#07145B] hover:bg-[#0c2288] text-white font-extrabold text-xs shadow-md transition-colors flex items-center justify-center gap-1.5 mt-2"
                  >
                    <Send className="w-3.5 h-3.5 text-[#FFB800]" />
                    <span>Send Commercial Enquiry</span>
                  </button>
                </form>
              )}

              <div className="pt-3 border-t text-[11px] text-slate-500 space-y-1">
                <div>&bull; WeTrade facilitates quotes directly with verified producer.</div>
                <div>&bull; Multi-carrier freight rates provided upon request.</div>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
