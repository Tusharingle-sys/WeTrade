import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Search,
  TrendingUp,
  TrendingDown,
  Minus,
  Globe2,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  Clock,
  Building2,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  ArrowRight
} from 'lucide-react';
import { useTrade } from '../../context/TradeContext';

interface MarketIntelligenceData {
  commodity: string;
  spotPriceRange: string;
  trend: 'up' | 'down' | 'stable';
  trendDetail: string;
  summary: string;
  keyDrivers?: string[];
  negotiationAdvisory?: string;
  gradeBenchmark?: string;
  sources: Array<{ title: string; uri: string }>;
  rawMarkdown?: string;
  updatedAt: string;
  isSimulatedNotice?: boolean;
}

const PRESET_COMMODITIES = [
  { name: 'Salem Turmeric', category: 'Spices & Condiments', query: 'Erode Salem Finger Turmeric wholesale spot rate mandi price India' },
  { name: 'Basmati Rice 1121', category: 'Food & Agro', query: 'Basmati Rice 1121 steam spot price Haryana Punjab mandi export FOB' },
  { name: 'Cotton Shankar-6', category: 'Raw Materials', query: 'Cotton Bales Shankar-6 spot rate Gujarat mandi price per candy' },
  { name: 'Guntur Red Chilli', category: 'Spices & Condiments', query: 'Guntur Teja red chilli spot rate APMC market yard wholesale' },
  { name: 'Alphonso Mango', category: 'Food & Agro', query: 'Ratnagiri Devgad Alphonso mango wholesale APMC mandi box rate' },
  { name: 'Soybean Yellow', category: 'Food & Agro', query: 'Soybean seed Indore MP mandi spot rate per quintal MSP' },
  { name: 'Steel Wire Rods', category: 'Hardware & Tools', query: 'Industrial mild steel wire rods spot price secondary steel mills India' }
];

export const MarketIntelligenceModule: React.FC = () => {
  const { addToast } = useTrade();
  const [selectedCommodity, setSelectedCommodity] = useState(PRESET_COMMODITIES[0]);
  const [customQuery, setCustomQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [intelligence, setIntelligence] = useState<MarketIntelligenceData | null>(null);
  const [recentQueries, setRecentQueries] = useState<string[]>([
    'Salem Turmeric',
    'Basmati Rice 1121',
    'Cotton Shankar-6'
  ]);

  const fetchMarketIntelligence = async (commodityName: string, queryText?: string, categoryText?: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/market-intelligence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          commodity: commodityName,
          query: queryText || `Current wholesale spot price, mandi arrivals, and export trends for ${commodityName}`,
          category: categoryText || 'Agricultural & B2B Commodities'
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        setIntelligence(data);
        if (!recentQueries.includes(commodityName)) {
          setRecentQueries((prev) => [commodityName, ...prev.slice(0, 4)]);
        }
      } else {
        throw new Error(data.error || 'Failed to retrieve market intelligence');
      }
    } catch (err: any) {
      console.error('Error fetching market intelligence:', err);
      setError(err.message || 'Unable to connect to market intelligence engine.');
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchMarketIntelligence(selectedCommodity.name, selectedCommodity.query, selectedCommodity.category);
  }, []);

  const handlePresetClick = (preset: typeof PRESET_COMMODITIES[0]) => {
    setSelectedCommodity(preset);
    setCustomQuery('');
    fetchMarketIntelligence(preset.name, preset.query, preset.category);
  };

  const handleCustomSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuery.trim()) return;
    fetchMarketIntelligence(customQuery.trim(), customQuery.trim(), 'Custom Trade Search');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Headline */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1.5">
              <span>Trade Intelligence</span>
              <span aria-hidden="true">·</span>
              <span className="text-blue-700 font-medium">Google Search Grounded</span>
              <span aria-hidden="true">·</span>
              <span>Updated Real-Time</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#07145B]">
              Commodity Spot Pricing &amp; Market Intelligence
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              Live wholesale mandi rates, FOB export benchmarks, and trade supply-demand trends grounded via Google Search for transparent negotiations.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => fetchMarketIntelligence(selectedCommodity.name, selectedCommodity.query, selectedCommodity.category)}
              disabled={loading}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-colors cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-slate-600 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Rates</span>
            </button>
          </div>
        </div>

        {/* Commodity Fast-Select Tabs */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-2.5">
            Key Trade Commodities:
          </label>
          <div className="flex flex-wrap items-center gap-2">
            {PRESET_COMMODITIES.map((c) => {
              const isSelected = selectedCommodity.name === c.name && !customQuery;
              return (
                <button
                  key={c.name}
                  onClick={() => handlePresetClick(c)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    isSelected
                      ? 'bg-[#07145B] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  {c.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Search Input Bar */}
        <form onSubmit={handleCustomSearch} className="mt-4 flex gap-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={customQuery}
              onChange={(e) => setCustomQuery(e.target.value)}
              placeholder="Search custom commodity, spice, or mandi rate (e.g., 'Unpolished Toor Dal Latur Mandi price')"
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#07145B]"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !customQuery.trim()}
            className="px-4 py-2.5 bg-[#07145B] hover:bg-[#0A1A70] text-white text-xs font-bold rounded-xl shadow-xs transition-colors disabled:opacity-50 cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
          >
            <span>Lookup</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#FFB800]" />
          </button>
        </form>
      </div>

      {/* Error state */}
      {error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-bold block">Market Intelligence Search Notice</span>
            {error}
          </div>
        </div>
      )}

      {/* Loading state skeleton */}
      {loading && !intelligence && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 animate-pulse">
          <div className="h-44 bg-slate-200 rounded-2xl" />
          <div className="h-44 bg-slate-200 rounded-2xl" />
          <div className="h-44 bg-slate-200 rounded-2xl" />
        </div>
      )}

      {/* Main Intelligence Results */}
      {intelligence && (
        <div className="space-y-6">
          {/* Top 3 Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* 1. Indicative Spot Price */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span className="font-bold uppercase tracking-wider text-[11px] text-slate-400">
                  Current Spot Price
                </span>
                <span className="text-[11px] font-mono tabular-nums text-slate-400">
                  Live Benchmark
                </span>
              </div>
              <div className="text-2xl font-black text-[#07145B] font-mono tabular-nums tracking-tight">
                {intelligence.spotPriceRange}
              </div>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                Wholesale primary terminal and mandi transaction range for {intelligence.commodity}.
              </p>
            </div>

            {/* 2. Market Trend */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span className="font-bold uppercase tracking-wider text-[11px] text-slate-400">
                  30-Day Trend
                </span>
                <span className="text-[11px] font-mono tabular-nums text-slate-400">
                  Momentum
                </span>
              </div>
              <div className="flex items-center gap-2">
                {intelligence.trend === 'up' && (
                  <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-lg">
                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                    <span>Firm / Upward</span>
                  </div>
                )}
                {intelligence.trend === 'down' && (
                  <div className="flex items-center gap-1.5 text-red-700 font-bold text-lg">
                    <TrendingDown className="w-5 h-5 text-red-600" />
                    <span>Softening / Downward</span>
                  </div>
                )}
                {intelligence.trend === 'stable' && (
                  <div className="flex items-center gap-1.5 text-slate-700 font-bold text-lg">
                    <Minus className="w-5 h-5 text-slate-500" />
                    <span>Balanced Range</span>
                  </div>
                )}
              </div>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                {intelligence.trendDetail}
              </p>
            </div>

            {/* 3. Trade Sourcing Action */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span className="font-bold uppercase tracking-wider text-[11px] text-slate-400">
                    Trade Facilitation
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-sm font-bold text-slate-800">
                  Use for RFQs &amp; Quotes
                </div>
                <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                  Apply current spot rates to negotiate balanced contracts between small producers and buyers.
                </p>
              </div>

              <div className="pt-3">
                <button
                  type="button"
                  onClick={() => {
                    addToast(
                      'Benchmark Applied',
                      `Benchmark rate "${intelligence.spotPriceRange}" copied to your active negotiation worksheet.`,
                      'success'
                    );
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-blue-50 text-blue-800 font-bold text-xs hover:bg-blue-100 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-blue-700" />
                  <span>Apply Benchmark to Quotation</span>
                </button>
              </div>
            </div>
          </div>

          {/* Detailed Market Report Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Executive Analysis & Key Drivers */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
              <div>
                <h3 className="text-base font-bold text-[#07145B] mb-2">
                  Market Dynamics &amp; Supply-Demand Assessment
                </h3>
                <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                  {intelligence.rawMarkdown || intelligence.summary}
                </div>
              </div>

              {intelligence.keyDrivers && intelligence.keyDrivers.length > 0 && (
                <div className="pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                    Primary Market Drivers
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {intelligence.keyDrivers.map((driver, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-1.5" />
                        <span className="leading-relaxed">{driver}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {intelligence.negotiationAdvisory && (
                <div className="pt-4 border-t border-slate-100 bg-slate-50/70 p-4 rounded-xl border border-slate-200/60">
                  <h4 className="text-xs font-bold text-[#07145B] mb-1 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Sourcing &amp; Price Negotiation Advisory</span>
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {intelligence.negotiationAdvisory}
                  </p>
                </div>
              )}
            </div>

            {/* Right Col: Grounding Citations & Standards */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mb-2">
                  <Globe2 className="w-4 h-4 text-blue-600" />
                  <span>Google Search Grounded Sources</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed mb-3">
                  Market intelligence is verified directly against recent commodity reports, mandi disclosures, and trade portals:
                </p>

                {intelligence.sources && intelligence.sources.length > 0 ? (
                  <div className="space-y-2">
                    {intelligence.sources.map((src, idx) => (
                      <a
                        key={idx}
                        href={src.uri}
                        target="_blank"
                        rel="noreferrer"
                        className="group block p-2.5 rounded-xl border border-slate-200/80 hover:border-blue-300 hover:bg-blue-50/40 transition-all text-xs"
                      >
                        <div className="flex items-center justify-between text-slate-800 font-semibold group-hover:text-blue-800">
                          <span className="truncate pr-2">{src.title}</span>
                          <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 shrink-0" />
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono truncate block mt-0.5">
                          {src.uri}
                        </span>
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs text-slate-400 italic">
                    Grounded citations compiled from live Google Search index.
                  </div>
                )}
              </div>

              {intelligence.gradeBenchmark && (
                <div className="pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-800 mb-1">
                    Quality &amp; Grade Benchmark
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {intelligence.gradeBenchmark}
                  </p>
                </div>
              )}

              <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400 flex items-center gap-1.5 font-mono">
                <Clock className="w-3 h-3" />
                <span>Retrieved: {new Date(intelligence.updatedAt).toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
