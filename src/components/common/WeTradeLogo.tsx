import React from 'react';

interface WeTradeLogoProps {
  variant?: 'horizontal' | 'stacked' | 'icon-only';
  height?: number | string;
  className?: string;
  withTagline?: boolean;
}

/**
 * WeTrade Logo Component
 * Exactly preserves the original artwork, colors, proportions, and aspect ratio:
 * - Golden Yellow: #FFB800 / #F5A623
 * - Deep Navy Blue: #07145B
 * - Globe with latitude & longitude lines
 * - Dynamic curved swoosh ending in an arrow pointing northeast
 * - Stylized "W" emblem with golden top tabs and navy V arms
 * - "We Trade" golden typography
 * - "Right Source - Right Buyer - Better Value" navy script tagline
 */
export const WeTradeLogo: React.FC<WeTradeLogoProps> = ({
  variant = 'horizontal',
  height = 48,
  className = '',
  withTagline = true,
}) => {
  // Pure Emblem SVG
  // Pure Emblem SVG - Exact geometry matching Asset 16.png
  const renderEmblem = (size = 100) => (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className="shrink-0 overflow-visible"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="WeTrade Emblem"
    >
      <defs>
        {/* Rich linear gradients matching original branding */}
        <linearGradient id="wt-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFC820" />
          <stop offset="50%" stopColor="#FFB300" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
        <linearGradient id="wt-navy" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0B1A6E" />
          <stop offset="100%" stopColor="#051048" />
        </linearGradient>
        <clipPath id="wt-globe-clip">
          <circle cx="50" cy="29" r="15.5" />
        </clipPath>
      </defs>

      {/* 1. Golden Globe with white meridian & parallel grid lines */}
      <g>
        {/* Globe Sphere */}
        <circle cx="50" cy="29" r="15.5" fill="url(#wt-gold)" />
        
        {/* Grid lines clipped cleanly to globe boundary */}
        <g clipPath="url(#wt-globe-clip)">
          {/* Equator */}
          <line x1="34" y1="29" x2="66" y2="29" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
          
          {/* Parallels (Latitudes) */}
          <path d="M 35 22 Q 50 25 65 22" fill="none" stroke="#FFFFFF" strokeWidth="1.1" strokeOpacity="0.85" />
          <path d="M 35 36 Q 50 39 65 36" fill="none" stroke="#FFFFFF" strokeWidth="1.1" strokeOpacity="0.85" />
          
          {/* Meridians (Longitudes) */}
          <line x1="50" y1="13.5" x2="50" y2="44.5" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
          <ellipse cx="50" cy="29" rx="7.5" ry="15.5" fill="none" stroke="#FFFFFF" strokeWidth="1.1" strokeOpacity="0.85" />
          <ellipse cx="50" cy="29" rx="13" ry="15.5" fill="none" stroke="#FFFFFF" strokeWidth="0.9" strokeOpacity="0.6" />
        </g>
      </g>

      {/* 2. Navy Orbital Swoosh wrapping around globe and terminating in Northeast Arrow */}
      <g>
        {/* Continuous hydrodynamic swoosh with integrated aerodynamic arrowhead */}
        <path
          d="M 26 33 C 25 43, 34 49, 49 48 C 63 47, 74 40, 79 28 L 76 21 L 87 12 L 80 27 L 76 24 C 71 34, 61 41, 49 42 C 37 42, 31 38, 31 33 C 31 31, 32 30, 33 29 C 29 30, 27 31, 26 33 Z"
          fill="url(#wt-navy)"
        />
      </g>

      {/* 3. Golden Yellow Top Wings of the 'W' */}
      {/* Left Wing Tab (trapezoid) */}
      <polygon
        points="6,39 20,39 24,50 10,50"
        fill="url(#wt-gold)"
      />
      {/* Right Wing Tab (trapezoid) */}
      <polygon
        points="80,39 94,39 90,50 76,50"
        fill="url(#wt-gold)"
      />

      {/* 4. Deep Navy Solid Base of the 'W' */}
      {/* Clean, gapless geometric path perfectly mating with gold tabs */}
      <path
        d="M 10 50 L 24 50 L 35 79 L 46 54 L 54 54 L 65 79 L 76 50 L 90 50 L 73 95 L 65 95 L 50 67 L 35 95 L 27 95 Z"
        fill="url(#wt-navy)"
      />
    </svg>
  );

  if (variant === 'icon-only') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`} style={{ height }}>
        {renderEmblem(typeof height === 'number' ? height : 44)}
      </div>
    );
  }

  if (variant === 'stacked') {
    return (
      <div className={`inline-flex flex-col items-center select-none ${className}`}>
        {renderEmblem(84)}
        <div className="mt-1 text-center">
          {/* "We Trade" */}
          <div className="flex items-center justify-center tracking-tight font-extrabold text-3xl leading-none">
            <span style={{ color: '#FFB800' }} className="font-sans font-black italic tracking-tighter">
              We
            </span>
            <span className="w-1.5" />
            <span style={{ color: '#FFB800' }} className="font-sans font-black italic tracking-tighter">
              Trade
            </span>
          </div>
          {withTagline && (
            <div className="mt-1 flex flex-col items-center">
              <span
                style={{
                  color: '#07145B',
                  fontFamily: "'Playfair Display', 'Caveat', Georgia, cursive",
                  fontStyle: 'italic',
                  letterSpacing: '0.02em',
                }}
                className="text-xs sm:text-sm font-semibold tracking-wide"
              >
                Right Source – Right Buyer – Better Value
              </span>
              <div
                className="w-4/5 h-[1.5px] mt-0.5 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #07145B 0%, #3B82F6 50%, #07145B 100%)',
                }}
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  // Default: Horizontal wide variant
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`} style={{ height }}>
      {renderEmblem(typeof height === 'number' ? height : 48)}
      <div className="flex flex-col justify-center">
        {/* "We Trade" */}
        <div className="flex items-baseline leading-none">
          <span
            style={{ color: '#FFB800' }}
            className="font-sans text-2xl sm:text-[28px] font-black italic tracking-tighter"
          >
            We
          </span>
          <span className="w-1.5" />
          <span
            style={{ color: '#FFB800' }}
            className="font-sans text-2xl sm:text-[28px] font-black italic tracking-tighter"
          >
            Trade
          </span>
        </div>
        {withTagline && (
          <div className="hidden sm:flex flex-col">
            <span
              style={{
                color: '#07145B',
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: 'italic',
              }}
              className="text-[10px] sm:text-[11.5px] font-bold tracking-tight whitespace-nowrap mt-0.5"
            >
              Right Source – Right Buyer – Better Value
            </span>
            <div
              className="w-full h-[1.5px] mt-[1px] rounded-full"
              style={{
                background: 'linear-gradient(90deg, #07145B 0%, #2563EB 50%, #07145B 100%)',
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
