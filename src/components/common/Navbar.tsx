import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { WeTradeLogo } from './WeTradeLogo';
import { useAuth } from '../../context/AuthContext';
import {
  Menu,
  X,
  ChevronDown,
  Sparkles,
  LayoutDashboard,
  ShieldCheck,
  TrendingUp,
  Truck,
  ArrowRight,
  Lock,
  UserCheck
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSolutionsDropdownOpen(false);
  }, [location.pathname]);

  // Listen to window scroll for shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isSolutionsActive =
    location.pathname === '/for-sellers' ||
    location.pathname === '/for-buyers' ||
    location.pathname === '/logistics';

  const navigate = useNavigate();
  const { currentUser, userProfile, isApproved, isPending, isRejected, isSuspended } = useAuth();

  const handlePortalNavigation = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!currentUser) {
      navigate('/login');
    } else if (isPending) {
      navigate('/pending-approval');
    } else if (isRejected || isSuspended) {
      navigate('/access-restricted');
    } else if (isApproved) {
      navigate('/portal');
    } else {
      navigate('/login');
    }
  };

  return (
    <>
      {/* Top Advisory Strip */}
      <div className="bg-[#07145B] text-white text-[11px] sm:text-xs py-1.5 px-4 font-medium border-b border-navy-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#FFB800] animate-pulse" />
            <span className="text-slate-200">
              B2B Trade Facilitation Partner — Right Source, Right Buyer, Better Value
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-slate-300">
            <span className="text-amber-300 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Fictional Interactive Demo
            </span>
            <Link to="/contact" className="hover:text-white underline transition-colors">
              Enquiries &amp; Consultations
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 bg-white transition-all duration-200 ${
          scrolled ? 'shadow-md border-b border-slate-200/80 py-2.5' : 'border-b border-slate-100 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo Area */}
          <Link to="/" className="flex items-center focus:outline-none" aria-label="WeTrade Homepage">
            <div className="p-1 rounded-lg hover:opacity-95 transition-opacity">
              <WeTradeLogo variant="horizontal" height={44} />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 font-medium text-sm text-slate-700">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `px-3 py-2 rounded-md transition-colors ${
                  isActive
                    ? 'text-[#07145B] font-bold bg-slate-100/70 border-b-2 border-[#FFB800]'
                    : 'hover:text-[#07145B] hover:bg-slate-50'
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md transition-colors ${
                  isActive
                    ? 'text-[#07145B] font-bold bg-slate-100/70 border-b-2 border-[#FFB800]'
                    : 'hover:text-[#07145B] hover:bg-slate-50'
                }`
              }
            >
              About
            </NavLink>

            <NavLink
              to="/services"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md transition-colors ${
                  isActive
                    ? 'text-[#07145B] font-bold bg-slate-100/70 border-b-2 border-[#FFB800]'
                    : 'hover:text-[#07145B] hover:bg-slate-50'
                }`
              }
            >
              Services
            </NavLink>

            <NavLink
              to="/how-it-works"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md transition-colors ${
                  isActive
                    ? 'text-[#07145B] font-bold bg-slate-100/70 border-b-2 border-[#FFB800]'
                    : 'hover:text-[#07145B] hover:bg-slate-50'
                }`
              }
            >
              How It Works
            </NavLink>

            {/* Solutions Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setSolutionsDropdownOpen(true)}
              onMouseLeave={() => setSolutionsDropdownOpen(false)}
            >
              <button
                type="button"
                className={`flex items-center gap-1 px-3 py-2 rounded-md transition-colors ${
                  isSolutionsActive
                    ? 'text-[#07145B] font-bold bg-slate-100/70 border-b-2 border-[#FFB800]'
                    : 'hover:text-[#07145B] hover:bg-slate-50'
                }`}
                onClick={() => setSolutionsDropdownOpen(!solutionsDropdownOpen)}
                aria-expanded={solutionsDropdownOpen}
              >
                <span>Solutions</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${solutionsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {solutionsDropdownOpen && (
                <div className="absolute left-0 mt-1 w-72 rounded-xl bg-white shadow-xl border border-slate-200/90 py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Trade Facilitation Paths
                  </div>

                  <Link
                    to="/for-sellers"
                    className="flex items-start gap-3 px-3 py-2.5 hover:bg-slate-50 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-amber-50 text-[#FFB800] group-hover:bg-[#FFB800] group-hover:text-[#07145B] transition-colors">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 group-hover:text-[#07145B]">For Sellers</div>
                      <div className="text-xs text-slate-500">Reach buyers &amp; expand sales market</div>
                    </div>
                  </Link>

                  <Link
                    to="/for-buyers"
                    className="flex items-start gap-3 px-3 py-2.5 hover:bg-slate-50 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-blue-50 text-[#07145B] group-hover:bg-[#07145B] group-hover:text-white transition-colors">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 group-hover:text-[#07145B]">For Buyers</div>
                      <div className="text-xs text-slate-500">Source vetted producers &amp; manufacturers</div>
                    </div>
                  </Link>

                  <Link
                    to="/logistics"
                    className="flex items-start gap-3 px-3 py-2.5 hover:bg-slate-50 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <Truck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 group-hover:text-[#07145B]">Logistics Coordination</div>
                      <div className="text-xs text-slate-500">Optional transport quotes &amp; milestones</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <NavLink
              to="/products"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md transition-colors ${
                  isActive
                    ? 'text-[#07145B] font-bold bg-slate-100/70 border-b-2 border-[#FFB800]'
                    : 'hover:text-[#07145B] hover:bg-slate-50'
                }`
              }
            >
              Products
            </NavLink>

            {/* Demo Portfolio - Highlighted Item */}
            <NavLink
              to="/demo-portfolio"
              className={({ isActive }) =>
                `relative flex items-center gap-1.5 px-3.5 py-2 rounded-full font-bold transition-all ${
                  isActive
                    ? 'bg-[#FFB800] text-[#07145B] shadow-sm'
                    : 'text-[#07145B] bg-amber-50 hover:bg-amber-100/80 border border-amber-300/60'
                }`
              }
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Demo Portfolio</span>
              <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-white/80 text-[#07145B] font-extrabold ml-0.5">
                14-Stage
              </span>
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md transition-colors ${
                  isActive
                    ? 'text-[#07145B] font-bold bg-slate-100/70 border-b-2 border-[#FFB800]'
                    : 'hover:text-[#07145B] hover:bg-slate-50'
                }`
              }
            >
              Contact
            </NavLink>
          </nav>

          {/* Desktop Right Actions: Trade Portal & Business Login */}
          <div className="hidden lg:flex items-center gap-2.5 ml-4">
            <button
              onClick={handlePortalNavigation}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#07145B] text-white text-xs font-bold shadow-sm hover:bg-[#0A1A70] active:scale-[0.98] transition-all cursor-pointer"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-[#FFB800]" />
              <span>Trade Portal</span>
              {!currentUser && <Lock className="w-3 h-3 text-slate-300 ml-0.5" />}
            </button>
            {!currentUser ? (
              <Link
                to="/login"
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:text-[#07145B] hover:bg-slate-50 transition-colors"
              >
                Sign In
              </Link>
            ) : (
              <button
                onClick={handlePortalNavigation}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors cursor-pointer"
                title={`Signed in as ${currentUser.email}`}
              >
                <div className="w-5 h-5 rounded-full bg-[#07145B] text-white flex items-center justify-center text-[10px] font-bold">
                  {currentUser.email ? currentUser.email[0].toUpperCase() : 'U'}
                </div>
                <span className="max-w-[110px] truncate font-semibold">{userProfile?.companyName || currentUser.email}</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={handlePortalNavigation}
              className="px-3 py-1.5 rounded-lg bg-[#07145B] text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-[#FFB800]" />
              <span>Portal</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-1">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `px-3 py-2.5 rounded-lg text-base font-semibold ${
                    isActive ? 'bg-blue-50 text-[#07145B]' : 'text-slate-800 hover:bg-slate-50'
                  }`
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `px-3 py-2.5 rounded-lg text-base font-semibold ${
                    isActive ? 'bg-blue-50 text-[#07145B]' : 'text-slate-800 hover:bg-slate-50'
                  }`
                }
              >
                About WeTrade
              </NavLink>

              <NavLink
                to="/services"
                className={({ isActive }) =>
                  `px-3 py-2.5 rounded-lg text-base font-semibold ${
                    isActive ? 'bg-blue-50 text-[#07145B]' : 'text-slate-800 hover:bg-slate-50'
                  }`
                }
              >
                Services
              </NavLink>

              <NavLink
                to="/how-it-works"
                className={({ isActive }) =>
                  `px-3 py-2.5 rounded-lg text-base font-semibold ${
                    isActive ? 'bg-blue-50 text-[#07145B]' : 'text-slate-800 hover:bg-slate-50'
                  }`
                }
              >
                How It Works
              </NavLink>

              {/* Solutions group */}
              <div className="py-2 pl-3 border-l-2 border-slate-200 my-1 space-y-1">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Solutions
                </div>
                <NavLink
                  to="/for-sellers"
                  className={({ isActive }) =>
                    `block px-2 py-1.5 rounded-md text-sm font-medium ${
                      isActive ? 'text-[#07145B] font-bold' : 'text-slate-700'
                    }`
                  }
                >
                  For Sellers
                </NavLink>
                <NavLink
                  to="/for-buyers"
                  className={({ isActive }) =>
                    `block px-2 py-1.5 rounded-md text-sm font-medium ${
                      isActive ? 'text-[#07145B] font-bold' : 'text-slate-700'
                    }`
                  }
                >
                  For Buyers
                </NavLink>
                <NavLink
                  to="/logistics"
                  className={({ isActive }) =>
                    `block px-2 py-1.5 rounded-md text-sm font-medium ${
                      isActive ? 'text-[#07145B] font-bold' : 'text-slate-700'
                    }`
                  }
                >
                  Logistics Coordination
                </NavLink>
              </div>

              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `px-3 py-2.5 rounded-lg text-base font-semibold ${
                    isActive ? 'bg-blue-50 text-[#07145B]' : 'text-slate-800 hover:bg-slate-50'
                  }`
                }
              >
                Demo Product Catalogue
              </NavLink>

              <NavLink
                to="/demo-portfolio"
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-bold ${
                    isActive ? 'bg-[#FFB800] text-[#07145B]' : 'bg-amber-50 text-[#07145B]'
                  }`
                }
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Demo Portfolio</span>
                </span>
                <span className="text-xs bg-white/90 px-2 py-0.5 rounded-md text-[#07145B] font-bold">
                  Interactive
                </span>
              </NavLink>

              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `px-3 py-2.5 rounded-lg text-base font-semibold ${
                    isActive ? 'bg-blue-50 text-[#07145B]' : 'text-slate-800 hover:bg-slate-50'
                  }`
                }
              >
                Contact &amp; Enquiries
              </NavLink>

              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                <button
                  onClick={handlePortalNavigation}
                  className="w-full py-3 rounded-xl bg-[#07145B] text-white font-bold text-center flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <LayoutDashboard className="w-4 h-4 text-[#FFB800]" />
                  <span>Launch Secure Trade Portal</span>
                  {!currentUser && <Lock className="w-3.5 h-3.5 text-amber-300 ml-1" />}
                </button>
                {!currentUser ? (
                  <Link
                    to="/login"
                    className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-800 font-bold text-center text-xs hover:bg-slate-50 transition-colors"
                  >
                    Business Account Sign In / Request
                  </Link>
                ) : (
                  <div className="text-[11px] text-center text-slate-500">
                    Logged in: <span className="font-semibold text-slate-800">{userProfile?.companyName || currentUser.email}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
