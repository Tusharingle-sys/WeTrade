import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Factory,
  FileCheck2,
  Users2,
  Scale,
  BadgeCheck,
  Truck,
  PackageCheck,
  Package,
  Play,
  Pause,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface StageInfo {
  id: number;
  label: string;
  sub: string;
  icon: React.ElementType;
  role: string;
  tag: string;
}

const STAGES: StageInfo[] = [
  { id: 1, label: 'Small-Scale Seller', sub: 'Shares capacity & specs', icon: Factory, role: 'Producer Onboarding', tag: 'Stage 1' },
  { id: 2, label: 'Product Listing', sub: 'Verified catalog specs', icon: FileCheck2, role: 'Market Presentation', tag: 'Stage 2' },
  { id: 3, label: 'Buyer Matching', sub: 'Discovery & qualification', icon: Users2, role: 'Opportunity Research', tag: 'Stage 3' },
  { id: 4, label: 'Price Negotiation', sub: 'Commercial alignment', icon: Scale, role: 'Trade Facilitation', tag: 'Stage 4' },
  { id: 5, label: 'Confirmed Order', sub: 'Binding commercial terms', icon: BadgeCheck, role: 'Deal Execution', tag: 'Stage 5' },
  { id: 6, label: 'Logistics Coordination', sub: 'Pickup & transit tracking', icon: Truck, role: 'Transport Support', tag: 'Stage 6' },
  { id: 7, label: 'Final Delivery', sub: 'Destination sign-off', icon: PackageCheck, role: 'Trade Closure', tag: 'Stage 7' }
];

export const HeroTradeProcess: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-advance loop
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev >= STAGES.length ? 1 : prev + 1));
    }, 2800);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const currentStage = STAGES.find((s) => s.id === activeStep) || STAGES[0];
  const CurrentIcon = currentStage.icon;

  return (
    <div className="relative bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xl overflow-hidden">
      {/* Decorative background grid subtle pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#07145B_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.03] pointer-events-none" />

      {/* Header controls inside illustration */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 relative z-10">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#07145B] text-white">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFB800] animate-ping" />
            Interactive Flow
          </span>
          <span className="text-xs text-slate-500 hidden sm:inline">
            Step {activeStep} of {STAGES.length}: {currentStage.label}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors text-xs font-semibold flex items-center gap-1"
            title={isPlaying ? 'Pause animation' : 'Play animation'}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span className="text-[11px] hidden sm:inline">Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                <span className="text-[11px] hidden sm:inline">Play</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* SVG Connecting Flow Lines & Moving Parcel */}
      <div className="relative py-6 my-2">
        {/* Horizontal Node Track */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2 relative z-10">
          {STAGES.map((stage) => {
            const Icon = stage.icon;
            const isCurrent = stage.id === activeStep;
            const isCompleted = stage.id < activeStep;

            return (
              <button
                key={stage.id}
                onClick={() => {
                  setActiveStep(stage.id);
                  setIsPlaying(false);
                }}
                className={`flex flex-col items-center group transition-all text-left focus:outline-none ${
                  isCurrent ? 'scale-105' : 'opacity-80 hover:opacity-100'
                }`}
              >
                {/* Node Circle */}
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm relative ${
                    isCurrent
                      ? 'bg-[#07145B] text-[#FFB800] ring-4 ring-[#FFB800]/30 shadow-lg -translate-y-1'
                      : isCompleted
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                      : 'bg-slate-100 text-slate-400 border border-slate-200'
                  }`}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  {isCurrent && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#FFB800] rounded-full border-2 border-white" />
                  )}
                </div>

                {/* Node Label */}
                <div className="mt-2 text-center w-full">
                  <div
                    className={`text-[10px] sm:text-[11px] font-bold leading-tight line-clamp-2 transition-colors ${
                      isCurrent ? 'text-[#07145B]' : 'text-slate-600'
                    }`}
                  >
                    {stage.label}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Animated Connecting Rail & Moving Parcel */}
        <div className="absolute top-[20px] sm:top-[24px] left-[7%] right-[7%] h-1.5 bg-slate-100 -z-0 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#07145B] via-[#FFB800] to-[#07145B] transition-all duration-700 motion-reduce:transition-none rounded-full"
            style={{ width: `${((activeStep - 1) / (STAGES.length - 1)) * 100}%` }}
          />
        </div>

        {/* Traveling Parcel Token riding on rail */}
        <div
          className="absolute top-[10px] sm:top-[14px] -z-0 pointer-events-none transition-all duration-700 motion-reduce:transition-none"
          style={{
            left: `calc(7% + (${((activeStep - 1) / (STAGES.length - 1)) * 86}% - 12px))`,
          }}
        >
          <div className="w-6 h-6 rounded-full bg-[#07145B] text-[#FFB800] ring-2 ring-[#FFB800] shadow-md flex items-center justify-center animate-bounce motion-reduce:animate-none">
            <Package className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* Active Stage Detail Showcase Card */}
      <div className="mt-4 p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/50 border border-slate-200/90 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-2xl bg-[#07145B] text-[#FFB800] shadow-md shrink-0">
              <CurrentIcon className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#FFB800] bg-[#07145B] px-2 py-0.5 rounded-md">
                  {currentStage.tag}
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  {currentStage.role}
                </span>
              </div>
              <h3 className="text-lg font-extrabold text-[#07145B] mt-1">
                {currentStage.label}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed">
                {activeStep === 1 && 'Small-scale seller shares production specs, lot sizes, and expected pricing without requiring extensive marketing overhead.'}
                {activeStep === 2 && 'WeTrade reviews specs, samples, and compliance details to present an accurate, credible B2B listing.'}
                {activeStep === 3 && 'Proactive buyer research discovers vetted wholesalers, retail chains, and institutional procurement partners.'}
                {activeStep === 4 && 'Commercial term coordination bridges seller price expectations and buyer offers transparently.'}
                {activeStep === 5 && 'Formal purchase order confirmation, escrow/payment milestone verification, and packaging staging.'}
                {activeStep === 6 && 'Optional freight carrier quotation comparison, vehicle booking, pickup coordination, and route milestones.'}
                {activeStep === 7 && 'Destination unloading, proof-of-delivery (POD) sign-off, and organized documentation closure.'}
              </p>
            </div>
          </div>

          <div className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-200 gap-2">
            <Link
              to="/how-it-works"
              className="text-xs font-bold text-[#07145B] hover:text-[#FFB800] flex items-center gap-1 transition-colors"
            >
              <span>Explore 7-Step Model</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Gateway Callout to Full 14-Stage Demo */}
      <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-600">
          <Sparkles className="w-4 h-4 text-[#FFB800]" />
          <span>Need to see the full operational mechanics with sample contracts &amp; shipment?</span>
        </div>
        <Link
          to="/demo-portfolio"
          className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#FFB800] text-[#07145B] font-bold text-xs hover:bg-amber-400 transition-all flex items-center justify-center gap-1.5 shadow-sm"
        >
          <span>Watch 14-Stage Interactive Demo</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
