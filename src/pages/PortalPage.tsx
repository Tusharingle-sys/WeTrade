import React, { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTrade } from '../context/TradeContext';
import { useAuth } from '../context/AuthContext';
import { WeTradeLogo } from '../components/common/WeTradeLogo';
import { AccountManagementModule } from '../components/portal/AccountManagementModule';
import { MarketIntelligenceModule } from '../components/portal/MarketIntelligenceModule';
import { PortalRole, OrderMilestone, QuotationStatus } from '../types';
import {
  LayoutDashboard,
  Building2,
  Package,
  Users2,
  FileSpreadsheet,
  ShoppingCart,
  Truck,
  MapPin,
  FileText,
  CheckSquare,
  BarChart3,
  Settings,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ChevronRight,
  RotateCcw,
  Download,
  Eye,
  ShieldCheck,
  ChevronDown,
  Layers,
  Sparkles,
  ExternalLink,
  X,
  Menu,
  LogOut,
  UserCheck
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';

export const PortalPage: React.FC = () => {
  const {
    sellers,
    products,
    buyers,
    quotations,
    orders,
    shipments,
    logisticsPartners,
    documents,
    tasks,
    currentRole,
    setCurrentRole,
    advanceOrderMilestone,
    markOrderDelayed,
    updateQuotationStatus,
    createLogisticsRequest,
    addSeller,
    addProduct,
    addBuyerLead,
    toggleTask,
    resetDemoData,
    addToast
  } = useTrade();

  const navigate = useNavigate();
  const {
    currentUser,
    userProfile,
    isAdmin,
    isApproved,
    logout,
    accountRequests
  } = useAuth();

  // Enforce role assignment for authenticated users:
  // Non-admin accounts are strictly locked to their authorized role.
  const effectiveRole = useMemo<PortalRole>(() => {
    if (!isAdmin && userProfile?.role && userProfile.role !== 'pending') {
      return userProfile.role as PortalRole;
    }
    return currentRole;
  }, [isAdmin, userProfile, currentRole]);

  useEffect(() => {
    if (userProfile?.role && userProfile.role !== 'pending' && !isAdmin) {
      setCurrentRole(userProfile.role as PortalRole);
    }
  }, [userProfile, isAdmin, setCurrentRole]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login', { replace: true });
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const [activeModule, setActiveModule] = useState<string>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');
  
  // Modal states
  const [selectedOrderForDetail, setSelectedOrderForDetail] = useState<string | null>(null);
  const [milestoneAdvanceNote, setMilestoneAdvanceNote] = useState('');
  const [isLogisticsModalOpen, setIsLogisticsModalOpen] = useState(false);
  const [isAddSellerModalOpen, setIsAddSellerModalOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isAddBuyerModalOpen, setIsAddBuyerModalOpen] = useState(false);

  // Form states for modals
  const [newSellerData, setNewSellerData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    primaryCategory: 'Food & Agro',
    productionCapacity: '10 MT / Month',
    verificationStatus: 'Pending Review' as const,
    notes: '',
    expectedPricingModel: 'Ex-Factory base rate'
  });

  const [newProductData, setNewProductData] = useState({
    name: '',
    category: 'Food & Agro' as const,
    sellerId: 'SEL-001',
    sellerName: 'ABC Agro & Millets Pvt Ltd',
    sellerCity: 'Hassan',
    sellerState: 'Karnataka',
    description: '',
    specifications: { Grade: 'Commercial Spec' },
    indicativePrice: 100,
    unit: 'kg',
    moq: 500,
    availableQuantity: 5000,
    status: 'Available' as const,
    packagingDetails: 'Master corrugated carton'
  });

  const [newBuyerData, setNewBuyerData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    businessType: 'Wholesaler' as const,
    productInterests: ['Food & Agro'],
    targetPriceBudget: 'Wholesale Tier',
    typicalOrderQuantity: '1,000 kg',
    qualificationStatus: 'Hot Lead' as const,
    nextFollowUp: new Date(Date.now() + 7 * 86400000).toISOString().substring(0, 10),
    notes: ''
  });

  const [logisticsFormData, setLogisticsFormData] = useState({
    orderId: orders[0]?.id || '',
    partnerId: logisticsPartners[0]?.id || '',
    origin: 'Hassan, Karnataka',
    destination: 'Mumbai, Maharashtra',
    vehicleType: '19ft Closed Container',
    weightVolume: '2,000 kg / 84 Cartons',
    estimatedCost: 4800
  });

  // Filtered views according to role
  const filteredOrders = useMemo(() => {
    let list = orders;
    if (effectiveRole === 'seller') {
      list = orders.filter((o) => o.sellerId === 'SEL-001' || o.sellerId === 'SEL-002');
    } else if (effectiveRole === 'buyer') {
      list = orders.filter((o) => o.buyerId === 'BUY-001' || o.buyerId === 'BUY-002');
    } else if (effectiveRole === 'logistics') {
      list = orders.filter((o) => o.logisticsRequired);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (o) =>
          o.orderNumber.toLowerCase().includes(q) ||
          o.productName.toLowerCase().includes(q) ||
          o.sellerName.toLowerCase().includes(q) ||
          o.buyerName.toLowerCase().includes(q)
      );
    }
    return list;
  }, [orders, effectiveRole, searchQuery]);

  const filteredProducts = useMemo(() => {
    let list = products;
    if (effectiveRole === 'seller') {
      list = products.filter((p) => p.sellerId === 'SEL-001' || p.sellerId === 'SEL-002');
    }
    if (selectedCategoryFilter !== 'All') {
      list = list.filter((p) => p.category === selectedCategoryFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sellerName.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    return list;
  }, [products, currentRole, selectedCategoryFilter, searchQuery]);

  // Derived Dashboard Metrics from current reactive state
  const metrics = useMemo(() => {
    const totalOrdersCount = orders.length;
    const inTransitCount = orders.filter((o) => o.currentMilestone === 'In Transit' || o.currentMilestone === 'Picked Up' || o.currentMilestone === 'Out for Delivery').length;
    const deliveredCount = orders.filter((o) => o.currentMilestone === 'Delivered').length;
    const delayedCount = orders.filter((o) => o.isDelayed).length;
    const openQuotationsCount = quotations.filter((q) => q.status === 'Sent to Seller' || q.status === 'Under Negotiation' || q.status === 'Revised').length;
    const listedProductsCount = products.length;
    const sellerEnquiriesCount = sellers.length;
    const potentialBuyersCount = buyers.length;

    return {
      totalOrdersCount,
      inTransitCount,
      deliveredCount,
      delayedCount,
      openQuotationsCount,
      listedProductsCount,
      sellerEnquiriesCount,
      potentialBuyersCount
    };
  }, [orders, quotations, products, sellers, buyers]);

  // Chart data derived dynamically from state
  const orderMilestoneChartData = useMemo(() => {
    const counts: Record<string, number> = {
      'Confirmed': 0,
      'Preparation': 0,
      'Quality/Ready': 0,
      'In Transit': 0,
      'Delivered': 0
    };
    orders.forEach((o) => {
      if (o.currentMilestone === 'Order Confirmed') counts['Confirmed']++;
      else if (o.currentMilestone === 'Preparation') counts['Preparation']++;
      else if (o.currentMilestone === 'Quality Check' || o.currentMilestone === 'Ready for Dispatch') counts['Quality/Ready']++;
      else if (o.currentMilestone === 'Picked Up' || o.currentMilestone === 'In Transit' || o.currentMilestone === 'Out for Delivery') counts['In Transit']++;
      else if (o.currentMilestone === 'Delivered') counts['Delivered']++;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, count: value }));
  }, [orders]);

  const categoryDistributionData = useMemo(() => {
    const catMap: Record<string, number> = {};
    products.forEach((p) => {
      catMap[p.category] = (catMap[p.category] || 0) + 1;
    });
    const colors = ['#07145B', '#FFB800', '#10B981', '#3B82F6', '#8B5CF6', '#F59E0B'];
    return Object.entries(catMap).map(([name, value], i) => ({
      name,
      value,
      color: colors[i % colors.length]
    }));
  }, [products]);

  // Selected Order for Modal
  const activeOrder = orders.find((o) => o.id === selectedOrderForDetail) || orders[0];

  // CSV Export utility
  const handleExportCSV = () => {
    const headers = ['Order Number', 'Seller', 'Buyer', 'Product', 'Quantity', 'Amount (INR)', 'Milestone', 'Payment Status', 'Logistics Code'];
    const rows = orders.map((o) => [
      o.orderNumber,
      `"${o.sellerName}"`,
      `"${o.buyerName}"`,
      `"${o.productName}"`,
      `${o.quantity} ${o.unit}`,
      o.totalAmount,
      o.currentMilestone,
      o.paymentStatus,
      o.trackingNumber || 'Self-Arranged'
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `wetrade_orders_report_${new Date().toISOString().substring(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('CSV Exported', 'Order report downloaded successfully.', 'success');
  };

  interface PortalNavItem {
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number | string;
  }

  const portalNavItems = useMemo<PortalNavItem[]>(() => {
    const items: PortalNavItem[] = [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    ];

    if (isAdmin) {
      items.push(
        { id: 'marketIntelligence', label: 'Market Intelligence', icon: Sparkles },
        { id: 'accountRequests', label: 'Account Approvals', icon: ShieldCheck, badge: accountRequests.filter((r) => r.status === 'pending').length || undefined },
        { id: 'sellers', label: 'Sellers', icon: Building2 },
        { id: 'products', label: 'Products', icon: Package },
        { id: 'buyers', label: 'Buyers & Leads', icon: Users2 },
        { id: 'quotations', label: 'Quotations', icon: FileSpreadsheet },
        { id: 'orders', label: 'Orders', icon: ShoppingCart, badge: orders.length },
        { id: 'logistics', label: 'Logistics', icon: Truck },
        { id: 'tracking', label: 'Delivery Tracking', icon: MapPin },
        { id: 'documents', label: 'Documents', icon: FileText },
        { id: 'tasks', label: 'Tasks & Follow-ups', icon: CheckSquare, badge: tasks.filter((t) => !t.completed).length },
        { id: 'reports', label: 'Reports', icon: BarChart3 },
        { id: 'settings', label: 'Settings', icon: Settings },
      );
    } else if (effectiveRole === 'seller') {
      items.push(
        { id: 'marketIntelligence', label: 'Market Intelligence', icon: Sparkles },
        { id: 'products', label: 'My Products', icon: Package },
        { id: 'quotations', label: 'My Quotations', icon: FileSpreadsheet },
        { id: 'orders', label: 'My Orders', icon: ShoppingCart, badge: filteredOrders.length },
        { id: 'logistics', label: 'Logistics Requests', icon: Truck },
        { id: 'tracking', label: 'Delivery Tracking', icon: MapPin },
        { id: 'documents', label: 'Trade Documents', icon: FileText },
        { id: 'tasks', label: 'Action Items', icon: CheckSquare, badge: tasks.filter((t) => !t.completed).length },
        { id: 'reports', label: 'Performance', icon: BarChart3 },
        { id: 'settings', label: 'Profile Settings', icon: Settings },
      );
    } else if (effectiveRole === 'buyer') {
      items.push(
        { id: 'marketIntelligence', label: 'Market Intelligence', icon: Sparkles },
        { id: 'products', label: 'Product Catalogue', icon: Package },
        { id: 'quotations', label: 'My Quotations', icon: FileSpreadsheet },
        { id: 'orders', label: 'Purchase Orders', icon: ShoppingCart, badge: filteredOrders.length },
        { id: 'tracking', label: 'Track Shipments', icon: MapPin },
        { id: 'documents', label: 'Invoices & Specs', icon: FileText },
        { id: 'tasks', label: 'Follow-ups', icon: CheckSquare, badge: tasks.filter((t) => !t.completed).length },
        { id: 'settings', label: 'Profile Settings', icon: Settings },
      );
    } else if (effectiveRole === 'logistics') {
      items.push(
        { id: 'marketIntelligence', label: 'Market Intelligence', icon: Sparkles },
        { id: 'logistics', label: 'Logistics Hub', icon: Truck },
        { id: 'tracking', label: 'Consignment Milestones', icon: MapPin },
        { id: 'orders', label: 'Assigned Orders', icon: ShoppingCart, badge: filteredOrders.length },
        { id: 'documents', label: 'Waybills & LRs', icon: FileText },
        { id: 'tasks', label: 'Trip Tasks', icon: CheckSquare, badge: tasks.filter((t) => !t.completed).length },
        { id: 'settings', label: 'Fleet Settings', icon: Settings },
      );
    }
    return items;
  }, [isAdmin, effectiveRole, accountRequests, orders.length, filteredOrders.length, tasks]);

  return (
    <div className="flex h-screen bg-[#F5F7FA] overflow-hidden">
      
      {/* MOBILE DRAWER OVERLAY */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileSidebarOpen(false)}
          />

          {/* Drawer Sheet */}
          <aside className="relative flex flex-col w-72 max-w-[85vw] bg-slate-900 text-white z-50 shadow-2xl h-full animate-in slide-in-from-left duration-200">
            {/* White Header Shell with Horizontal Logo and Close Button */}
            <div className="bg-white p-3.5 border-b border-slate-200 flex items-center justify-between">
              <Link
                to="/"
                onClick={() => setMobileSidebarOpen(false)}
                className="flex items-center overflow-hidden"
              >
                <WeTradeLogo variant="horizontal" height={36} withTagline={false} />
              </Link>
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="p-1 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                title="Close Sidebar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Role perspective banner */}
            <div className="px-4 py-2.5 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-400 font-medium">Active Role:</span>
              <span className="font-bold text-[#FFB800] uppercase text-[10px] tracking-wider px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
                {currentRole}
              </span>
            </div>

            {/* Nav Items */}
            <nav className="flex-1 px-2.5 py-4 space-y-1 overflow-y-auto scrollbar-thin">
              {portalNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeModule === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveModule(item.id);
                      setMobileSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-xs transition-colors text-left ${
                      isActive
                        ? 'bg-[#07145B] text-white font-bold border-l-4 border-[#FFB800] shadow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#FFB800]' : 'text-slate-400'}`} />
                    <span className="flex-1 truncate">{item.label}</span>
                    {item.badge !== undefined && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-300 font-bold">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Bottom Back to Website Link */}
            <div className="p-3 border-t border-slate-800">
              <Link
                to="/"
                onClick={() => setMobileSidebarOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-colors w-full"
              >
                <ExternalLink className="w-4 h-4 text-[#FFB800]" />
                <span>Public Website</span>
              </Link>
            </div>
          </aside>
        </div>
      )}

      {/* DESKTOP SIDEBAR */}
      <aside
        className={`hidden md:flex bg-slate-900 text-white flex-col shrink-0 transition-all duration-300 z-30 ${
          sidebarCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* White Header Shell with Horizontal Logo */}
        <div className="bg-white p-3.5 border-b border-slate-200 flex items-center justify-between">
          <Link to="/" className="flex items-center overflow-hidden">
            {sidebarCollapsed ? (
              <WeTradeLogo variant="icon-only" height={36} />
            ) : (
              <WeTradeLogo variant="horizontal" height={36} withTagline={false} />
            )}
          </Link>
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors hidden sm:block"
            title={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            <ChevronRight className={`w-4 h-4 transition-transform ${sidebarCollapsed ? '' : 'rotate-180'}`} />
          </button>
        </div>

        {/* Role perspective banner */}
        <div className="px-4 py-2.5 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between text-xs">
          {!sidebarCollapsed && (
            <span className="text-[11px] text-slate-400 font-medium">Active Role:</span>
          )}
          <span className="font-bold text-[#FFB800] uppercase text-[10px] tracking-wider px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
            {currentRole}
          </span>
        </div>

        {/* Sidebar Nav Items */}
        <nav className="flex-1 px-2.5 py-4 space-y-1 overflow-y-auto scrollbar-thin">
          {portalNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeModule === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveModule(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-xs transition-colors text-left ${
                  isActive
                    ? 'bg-[#07145B] text-white font-bold border-l-4 border-[#FFB800] shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
                title={item.label}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#FFB800]' : 'text-slate-400'}`} />
                {!sidebarCollapsed && (
                  <span className="flex-1 truncate">{item.label}</span>
                )}
                {!sidebarCollapsed && item.badge !== undefined && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-300 font-bold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Back to Website Link */}
        <div className="p-3 border-t border-slate-800">
          <Link
            to="/"
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-colors w-full"
          >
            <ExternalLink className="w-4 h-4 text-[#FFB800]" />
            {!sidebarCollapsed && <span>Public Website</span>}
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-slate-200 px-3 sm:px-6 flex items-center justify-between shrink-0 shadow-2xs gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors shrink-0"
              aria-label="Open portal navigation"
            >
              <Menu className="w-5 h-5" />
            </button>

            <h1 className="text-xs sm:text-base md:text-lg font-black text-[#07145B] uppercase tracking-wide truncate">
              {activeModule === 'dashboard' && 'Trade Overview'}
              {activeModule === 'marketIntelligence' && 'Market Intelligence & Spot Pricing'}
              {activeModule === 'accountRequests' && 'Account Management & Approvals'}
              {activeModule === 'sellers' && 'Sellers & Producers'}
              {activeModule === 'products' && 'Product Catalogue'}
              {activeModule === 'buyers' && 'Buyers & Leads'}
              {activeModule === 'quotations' && 'Quotations & Terms'}
              {activeModule === 'orders' && 'Order Management'}
              {activeModule === 'logistics' && 'Logistics Hub'}
              {activeModule === 'tracking' && 'Delivery Tracking'}
              {activeModule === 'documents' && 'Document Archive'}
              {activeModule === 'tasks' && 'Follow-up Tasks'}
              {activeModule === 'reports' && 'Trade Analytics'}
              {activeModule === 'settings' && 'Platform Settings'}
            </h1>
            <span className="text-xs text-slate-400 hidden lg:inline">|</span>
            <span className="text-xs text-slate-500 hidden lg:inline">
              Secure B2B Commercial Desk
            </span>
          </div>

          {/* Authenticated User Profile Menu & Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Admin Perspective Simulator (Visible only to authorized Administrators) */}
            {isAdmin && (
              <div className="hidden xl:flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
                <span className="text-slate-500 px-1 font-medium text-[10px]">Preview:</span>
                {(['admin', 'seller', 'buyer', 'logistics'] as PortalRole[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      setCurrentRole(r);
                      addToast('Preview Switched', `Previewing portal as ${r.toUpperCase()}.`, 'info');
                    }}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-bold capitalize transition-all ${
                      currentRole === r
                        ? 'bg-[#07145B] text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            )}

            {/* User Profile Badge */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-[#07145B] text-[#FFB800] font-black flex items-center justify-center text-xs shadow-2xs">
                {currentUser?.email ? currentUser.email[0].toUpperCase() : 'U'}
              </div>
              <div className="hidden sm:block text-left text-xs leading-tight">
                <div className="font-bold text-slate-900 truncate max-w-[140px]">
                  {userProfile?.companyName || currentUser?.displayName || 'WeTrade Partner'}
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-extrabold capitalize ${
                    isAdmin
                      ? 'bg-amber-100 text-[#07145B]'
                      : effectiveRole === 'seller'
                      ? 'bg-emerald-100 text-emerald-800'
                      : effectiveRole === 'buyer'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-indigo-100 text-indigo-800'
                  }`}>
                    {isAdmin ? 'Administrator' : effectiveRole}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono hidden md:inline truncate max-w-[120px]">
                    {currentUser?.email}
                  </span>
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-700 text-xs font-bold transition-all flex items-center gap-1.5 border border-slate-200 hover:border-red-200 cursor-pointer"
              title="Sign Out of WeTrade Trade Portal"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </header>

        {/* Global Security & Active Session Strip */}
        <div className="bg-[#07145B] border-b border-navy-800 px-6 py-1.5 flex items-center justify-between text-xs text-slate-200">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#FFB800]" />
            <span className="font-semibold text-white">
              Authenticated Session: <span className="text-amber-300 capitalize">{isAdmin ? 'Administrator Clearance' : `${effectiveRole} Portal`}</span>
            </span>
            <span className="text-slate-400 hidden sm:inline">•</span>
            <span className="text-slate-300 hidden sm:inline">Cloud Firestore Persistent Ledger</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-mono text-slate-300">
            <span>Status:</span>
            <span className="text-emerald-400 font-bold uppercase">Approved</span>
          </div>
        </div>

        {/* SCROLLABLE MODULE VIEW */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* 1. DASHBOARD MODULE */}
          {activeModule === 'dashboard' && (
            <div className="space-y-6">
              
              {/* 8 KPI CARDS */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                <button
                  onClick={() => setActiveModule('sellers')}
                  className="p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs text-left hover:border-blue-400 transition-all group"
                >
                  <div className="text-[11px] text-slate-500 font-medium truncate">Seller Enquiries</div>
                  <div className="text-xl font-extrabold text-[#07145B] mt-1">{metrics.sellerEnquiriesCount}</div>
                  <div className="text-[9px] text-emerald-600 font-bold mt-0.5">Active Directory</div>
                </button>

                <button
                  onClick={() => setActiveModule('products')}
                  className="p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs text-left hover:border-blue-400 transition-all group"
                >
                  <div className="text-[11px] text-slate-500 font-medium truncate">Listed Products</div>
                  <div className="text-xl font-extrabold text-[#07145B] mt-1">{metrics.listedProductsCount}</div>
                  <div className="text-[9px] text-slate-400 mt-0.5">6 Categories</div>
                </button>

                <button
                  onClick={() => setActiveModule('buyers')}
                  className="p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs text-left hover:border-blue-400 transition-all group"
                >
                  <div className="text-[11px] text-slate-500 font-medium truncate">Potential Buyers</div>
                  <div className="text-xl font-extrabold text-[#07145B] mt-1">{metrics.potentialBuyersCount}</div>
                  <div className="text-[9px] text-blue-600 font-bold mt-0.5">Qualified Leads</div>
                </button>

                <button
                  onClick={() => setActiveModule('quotations')}
                  className="p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs text-left hover:border-blue-400 transition-all group"
                >
                  <div className="text-[11px] text-slate-500 font-medium truncate">Open Quotes</div>
                  <div className="text-xl font-extrabold text-amber-600 mt-1">{metrics.openQuotationsCount}</div>
                  <div className="text-[9px] text-amber-700 font-bold mt-0.5">Under Negotiation</div>
                </button>

                <button
                  onClick={() => setActiveModule('orders')}
                  className="p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs text-left hover:border-blue-400 transition-all group"
                >
                  <div className="text-[11px] text-slate-500 font-medium truncate">Total Orders</div>
                  <div className="text-xl font-extrabold text-slate-900 mt-1">{metrics.totalOrdersCount}</div>
                  <div className="text-[9px] text-slate-400 mt-0.5">All Active</div>
                </button>

                <button
                  onClick={() => setActiveModule('tracking')}
                  className="p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs text-left hover:border-blue-400 transition-all group"
                >
                  <div className="text-[11px] text-slate-500 font-medium truncate">In Transit</div>
                  <div className="text-xl font-extrabold text-blue-600 mt-1">{metrics.inTransitCount}</div>
                  <div className="text-[9px] text-blue-700 font-bold mt-0.5">Overland Freight</div>
                </button>

                <button
                  onClick={() => setActiveModule('orders')}
                  className="p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs text-left hover:border-blue-400 transition-all group"
                >
                  <div className="text-[11px] text-slate-500 font-medium truncate">Delivered</div>
                  <div className="text-xl font-extrabold text-emerald-600 mt-1">{metrics.deliveredCount}</div>
                  <div className="text-[9px] text-emerald-700 font-bold mt-0.5">POD Confirmed</div>
                </button>

                <button
                  onClick={() => setActiveModule('orders')}
                  className="p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs text-left hover:border-red-400 transition-all group"
                >
                  <div className="text-[11px] text-slate-500 font-medium truncate">Delayed</div>
                  <div className="text-xl font-extrabold text-red-600 mt-1">{metrics.delayedCount}</div>
                  <div className="text-[9px] text-red-700 font-bold mt-0.5">Needs Attention</div>
                </button>
              </div>

              {/* 2 INTERACTIVE CHARTS */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Milestone Bar Chart */}
                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-sm">Order Milestone Pipeline</h3>
                      <p className="text-xs text-slate-500">Real-time status breakdown across all demo orders</p>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-[#07145B]">
                      Dynamic Reactive State
                    </span>
                  </div>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={orderMilestoneChartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                        <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                        <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                        <Tooltip />
                        <Bar dataKey="count" fill="#07145B" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Category Distribution Pie Chart */}
                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-sm">Product Catalogue by Category</h3>
                      <p className="text-xs text-slate-500">Distribution of seller availability records</p>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800">
                      {products.length} Total SKUs
                    </span>
                  </div>
                  <div className="h-64 w-full flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryDistributionData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={85}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {categoryDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

              </div>

              {/* RECENT ORDERS & PENDING TASKS DUAL ROW */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Recent Orders Table (2 cols) */}
                <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-sm">Active Orders in Execution</h3>
                      <p className="text-xs text-slate-500">Click any order to view milestone activity or advance stage</p>
                    </div>
                    <button
                      onClick={() => setActiveModule('orders')}
                      className="text-xs font-bold text-[#07145B] hover:text-[#FFB800] flex items-center gap-1"
                    >
                      <span>View All {orders.length}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="overflow-x-auto scrollbar-thin">
                    <table className="w-full text-left text-xs min-w-[580px]">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-500">
                          <th className="pb-2 font-bold">Order ID</th>
                          <th className="pb-2 font-bold">Product</th>
                          <th className="pb-2 font-bold">Seller &rarr; Buyer</th>
                          <th className="pb-2 font-bold">Milestone</th>
                          <th className="pb-2 font-bold">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {orders.slice(0, 5).map((ord) => (
                          <tr key={ord.id} className="hover:bg-slate-50">
                            <td className="py-3 font-bold text-[#07145B]">{ord.orderNumber}</td>
                            <td className="py-3">
                              <div className="font-semibold text-slate-900 truncate max-w-[180px]">{ord.productName}</div>
                              <div className="text-[10px] text-slate-400">{ord.quantity} {ord.unit}</div>
                            </td>
                            <td className="py-3">
                              <div className="text-slate-800 truncate max-w-[160px]">{ord.sellerName}</div>
                              <div className="text-[10px] text-slate-400 truncate max-w-[160px]">&rarr; {ord.buyerName}</div>
                            </td>
                            <td className="py-3">
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                ord.currentMilestone === 'Delivered'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : ord.isDelayed
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-blue-100 text-blue-800'
                              }`}>
                                {ord.currentMilestone}
                              </span>
                            </td>
                            <td className="py-3">
                              <button
                                onClick={() => setSelectedOrderForDetail(ord.id)}
                                className="px-2 py-1 rounded-md bg-slate-100 hover:bg-[#07145B] hover:text-white text-slate-700 font-bold text-[11px] transition-colors"
                              >
                                Details
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Priority Operational Tasks (1 col) */}
                <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-sm">Follow-up Tasks</h3>
                      <p className="text-xs text-slate-500">Pending operations</p>
                    </div>
                    <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                      {tasks.filter(t => !t.completed).length} Open
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {tasks.slice(0, 5).map((t) => (
                      <div
                        key={t.id}
                        className={`p-3 rounded-2xl border transition-all text-xs flex items-start gap-3 ${
                          t.completed ? 'bg-slate-50 border-slate-200 opacity-60' : 'bg-white border-slate-200 shadow-2xs'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={t.completed}
                          onChange={() => toggleTask(t.id)}
                          className="mt-0.5 h-4 w-4 rounded text-[#07145B] focus:ring-blue-500 cursor-pointer"
                        />
                        <div className="flex-1">
                          <div className={`font-semibold ${t.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                            {t.title}
                          </div>
                          <div className="flex items-center justify-between mt-1 text-[10px] text-slate-500">
                            <span>Due: {t.dueDate}</span>
                            <span className={`px-1.5 py-0.2 rounded font-bold ${
                              t.priority === 'High' ? 'bg-red-50 text-red-700' : 'bg-slate-100 text-slate-600'
                            }`}>
                              {t.priority}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* 2. SELLERS MODULE */}
          {activeModule === 'sellers' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-extrabold text-[#07145B]">Seller &amp; Producer Directory</h2>
                  <p className="text-xs text-slate-500">Fictional small-scale manufacturers and producer collectives</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search company or state..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 pr-4 py-2 bg-white rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#07145B]"
                    />
                  </div>
                  {currentRole === 'admin' && (
                    <button
                      onClick={() => setIsAddSellerModalOpen(true)}
                      className="px-4 py-2 rounded-xl bg-[#07145B] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm hover:bg-[#0c2288]"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Onboard Seller</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sellers
                  .filter((s) => !searchQuery || s.companyName.toLowerCase().includes(searchQuery.toLowerCase()) || s.city.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((s) => (
                    <div key={s.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{s.id}</span>
                          <h4 className="font-extrabold text-slate-900 text-sm mt-0.5">{s.companyName}</h4>
                          <span className="text-xs text-slate-500">{s.city}, {s.state}</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                          s.verificationStatus === 'Verified'
                            ? 'bg-emerald-100 text-emerald-800'
                            : s.verificationStatus === 'Pending Review'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {s.verificationStatus}
                        </span>
                      </div>

                      <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                        <div><strong>Category:</strong> {s.primaryCategory}</div>
                        <div><strong>Capacity:</strong> {s.productionCapacity}</div>
                        <div><strong>Contact:</strong> {s.contactPerson} ({s.phone})</div>
                        <div><strong>Pricing Model:</strong> {s.expectedPricingModel}</div>
                      </div>

                      <p className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100 line-clamp-2">
                        {s.notes}
                      </p>

                      <div className="flex items-center justify-between pt-2 text-[11px] text-slate-400">
                        <span>Onboarded: {s.onboardingDate}</span>
                        <span className="font-bold text-[#07145B]">{s.totalOrdersFulfilled} Orders Fulfilled</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* 3. PRODUCTS MODULE */}
          {activeModule === 'products' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-extrabold text-[#07145B]">Coordinated Product Availability</h2>
                  <p className="text-xs text-slate-500">Seller-provided specifications &amp; indicative minimum order quantities</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  {/* Category filter */}
                  <select
                    value={selectedCategoryFilter}
                    onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                    className="px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs focus:outline-none"
                  >
                    <option value="All">All Categories</option>
                    <option value="Food & Agro">Food & Agro</option>
                    <option value="Textiles & Apparel">Textiles & Apparel</option>
                    <option value="Packaging & Paper">Packaging & Paper</option>
                    <option value="Hardware & Tools">Hardware & Tools</option>
                    <option value="Spices & Condiments">Spices & Condiments</option>
                    <option value="Raw Materials">Raw Materials</option>
                  </select>

                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search catalogue..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 pr-4 py-2 bg-white rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#07145B]"
                    />
                  </div>

                  {currentRole === 'admin' && (
                    <button
                      onClick={() => setIsAddProductModalOpen(true)}
                      className="px-4 py-2 rounded-xl bg-[#07145B] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm hover:bg-[#0c2288]"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Product</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map((p) => (
                  <div key={p.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-bold">{p.id}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {p.status}
                        </span>
                      </div>
                      <h4 className="font-extrabold text-slate-900 text-sm mt-2">{p.name}</h4>
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{p.description}</p>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Seller:</span>
                        <span className="font-semibold text-slate-800">{p.sellerName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Indicative Price:</span>
                        <span className="font-extrabold text-[#07145B]">₹{p.indicativePrice} / {p.unit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Minimum Order (MOQ):</span>
                        <span>{p.moq} {p.unit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Available Lot:</span>
                        <span>{p.availableQuantity} {p.unit}</span>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center gap-2">
                      <Link
                        to={`/products/${p.id}`}
                        className="flex-1 py-1.5 text-center rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                      >
                        Public Spec Sheet
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. BUYERS & LEADS MODULE */}
          {activeModule === 'buyers' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-extrabold text-[#07145B]">Buyer Pipeline &amp; Demand Leads</h2>
                  <p className="text-xs text-slate-500">Screened wholesale buyers, distributors, and institutional procurement leads</p>
                </div>
                {currentRole === 'admin' && (
                  <button
                    onClick={() => setIsAddBuyerModalOpen(true)}
                    className="px-4 py-2 rounded-xl bg-[#07145B] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Register Buyer Lead</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {buyers.map((b) => (
                  <div key={b.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-mono text-slate-400 font-bold">{b.id}</span>
                        <h4 className="font-extrabold text-slate-900 text-sm mt-0.5">{b.companyName}</h4>
                        <span className="text-xs text-slate-500">{b.city}, {b.state} ({b.businessType})</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-100 text-blue-800">
                        {b.qualificationStatus}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                      <div><strong>Contact:</strong> {b.contactPerson} ({b.phone})</div>
                      <div><strong>Budget Target:</strong> {b.targetPriceBudget}</div>
                      <div><strong>Typical Lot:</strong> {b.typicalOrderQuantity}</div>
                      <div><strong>Interests:</strong> {b.productInterests.join(', ')}</div>
                    </div>

                    <p className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      {b.notes}
                    </p>

                    <div className="flex items-center justify-between pt-2 text-[11px] text-slate-400">
                      <span>Next Follow-up: {b.nextFollowUp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. QUOTATIONS MODULE */}
          {activeModule === 'quotations' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-extrabold text-[#07145B]">Commercial Quotations &amp; Terms</h2>
                  <p className="text-xs text-slate-500">Transparent comparison of seller expectations, buyer targets, and facilitation terms</p>
                </div>
              </div>

              <div className="overflow-x-auto scrollbar-thin bg-white rounded-3xl border border-slate-200 shadow-sm p-4">
                <table className="w-full text-left text-xs min-w-[760px]">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500">
                      <th className="pb-3 font-bold">RFQ / Quote #</th>
                      <th className="pb-3 font-bold">Product &amp; Volume</th>
                      <th className="pb-3 font-bold">Seller Expectations</th>
                      <th className="pb-3 font-bold">Buyer Target</th>
                      <th className="pb-3 font-bold">Agreed Price</th>
                      <th className="pb-3 font-bold">WeTrade Fee</th>
                      <th className="pb-3 font-bold">Total Estimated</th>
                      <th className="pb-3 font-bold">Status</th>
                      <th className="pb-3 font-bold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {quotations.map((q) => (
                      <tr key={q.id} className="hover:bg-slate-50">
                        <td className="py-3 font-bold text-[#07145B]">
                          <div>{q.rfqNumber}</div>
                          <div className="text-[10px] text-slate-400">{q.id}</div>
                        </td>
                        <td className="py-3">
                          <div className="font-semibold text-slate-900">{q.productName}</div>
                          <div className="text-[10px] text-slate-500">{q.quantity} {q.unit}</div>
                        </td>
                        <td className="py-3 text-slate-700">₹{q.sellerExpectedPrice}</td>
                        <td className="py-3 text-slate-700">₹{q.buyerTargetPrice}</td>
                        <td className="py-3 font-extrabold text-blue-700">₹{q.agreedProductPrice}</td>
                        <td className="py-3 text-slate-700">
                          {currentRole === 'buyer' ? '— (B2B Price)' : `₹${q.weTradeFacilitationFee}`}
                        </td>
                        <td className="py-3 font-bold text-slate-900">₹{q.totalEstimatedValue.toLocaleString()}</td>
                        <td className="py-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                            q.status === 'Accepted'
                              ? 'bg-emerald-100 text-emerald-800'
                              : q.status === 'Under Negotiation'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-slate-100 text-slate-700'
                          }`}>
                            {q.status}
                          </span>
                        </td>
                        <td className="py-3">
                          {q.status !== 'Accepted' && currentRole === 'admin' ? (
                            <button
                              onClick={() => updateQuotationStatus(q.id, 'Accepted')}
                              className="px-2 py-1 rounded bg-[#07145B] text-white text-[10px] font-bold hover:bg-[#0c2288]"
                            >
                              Approve
                            </button>
                          ) : (
                            <span className="text-[10px] text-slate-400">Finalized</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 6. ORDERS & 8. TRACKING MODULE */}
          {(activeModule === 'orders' || activeModule === 'tracking') && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-extrabold text-[#07145B]">
                    {activeModule === 'orders' ? 'Orders in Coordination' : 'Delivery & Milestone Tracking'}
                  </h2>
                  <p className="text-xs text-slate-500">
                    Real-time transaction progression across all 8 commercial milestones
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleExportCSV}
                    className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 shadow-2xs hover:bg-slate-50"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export CSV</span>
                  </button>
                  <button
                    onClick={() => setIsLogisticsModalOpen(true)}
                    className="px-4 py-2 rounded-xl bg-[#07145B] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm hover:bg-[#0c2288]"
                  >
                    <Truck className="w-4 h-4 text-[#FFB800]" />
                    <span>Book Logistics Request</span>
                  </button>
                </div>
              </div>

              {/* Order Cards List */}
              <div className="space-y-4">
                {filteredOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs space-y-4 hover:border-blue-300 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-base text-[#07145B]">{ord.orderNumber}</span>
                          <span className="text-xs text-slate-400">({ord.id})</span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                            ord.currentMilestone === 'Delivered'
                              ? 'bg-emerald-100 text-emerald-800'
                              : ord.isDelayed
                              ? 'bg-red-100 text-red-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {ord.currentMilestone}
                          </span>
                          {ord.isDelayed && (
                            <span className="text-[10px] text-red-600 font-bold flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" /> Delayed
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-600 mt-1">
                          <strong>{ord.productName}</strong> — {ord.quantity} {ord.unit}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedOrderForDetail(ord.id)}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
                        >
                          View Activity Log
                        </button>
                        {ord.currentMilestone !== 'Delivered' && (
                          <button
                            onClick={() => advanceOrderMilestone(ord.id)}
                            className="px-3.5 py-1.5 rounded-xl bg-[#07145B] hover:bg-[#0c2288] text-white font-bold text-xs flex items-center gap-1 transition-colors shadow-2xs"
                          >
                            <span>Advance Milestone</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Milestone 8-Step Visual Line */}
                    <div className="py-2">
                      <div className="flex items-center justify-between text-[10px] text-slate-500 font-bold mb-1.5 overflow-x-auto">
                        {['Confirmed', 'Preparation', 'Quality', 'Ready', 'Picked Up', 'In Transit', 'Out for Delivery', 'Delivered'].map((step, idx) => (
                          <span key={step} className="text-center truncate px-1">
                            {step}
                          </span>
                        ))}
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#07145B] via-[#FFB800] to-emerald-600 rounded-full transition-all duration-500"
                          style={{
                            width:
                              ord.currentMilestone === 'Order Confirmed' ? '12%' :
                              ord.currentMilestone === 'Preparation' ? '25%' :
                              ord.currentMilestone === 'Quality Check' ? '38%' :
                              ord.currentMilestone === 'Ready for Dispatch' ? '50%' :
                              ord.currentMilestone === 'Picked Up' ? '63%' :
                              ord.currentMilestone === 'In Transit' ? '75%' :
                              ord.currentMilestone === 'Out for Delivery' ? '88%' : '100%'
                          }}
                        />
                      </div>
                    </div>

                    {/* Metadata strip */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      <div>
                        <span className="text-slate-400 text-[10px]">Seller:</span>
                        <div className="font-semibold text-slate-800 truncate">{ord.sellerName}</div>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px]">Buyer:</span>
                        <div className="font-semibold text-slate-800 truncate">{ord.buyerName}</div>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px]">Payment:</span>
                        <div className="font-semibold text-emerald-700">{ord.paymentStatus}</div>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px]">Logistics:</span>
                        <div className="font-semibold text-slate-800">
                          {ord.trackingNumber ? `${ord.trackingNumber} (${ord.logisticsPartnerName})` : 'Self-Arranged Transport'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 7. LOGISTICS MODULE */}
          {activeModule === 'logistics' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-extrabold text-[#07145B]">Logistics Coordination Hub</h2>
                  <p className="text-xs text-slate-500">Vetted transport operators, milestone tracking, and quotation comparisons</p>
                </div>
                <button
                  onClick={() => setIsLogisticsModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-[#07145B] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Request Transport Quote</span>
                </button>
              </div>

              {/* Partner Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {logisticsPartners.map((lp) => (
                  <div key={lp.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-slate-400 font-bold">{lp.id}</span>
                        <h4 className="font-extrabold text-slate-900 text-sm">{lp.name}</h4>
                        <span className="text-[11px] text-amber-600 font-bold">Rating: {lp.rating} / 5.0</span>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                        {lp.activeShipmentsCount} In Transit
                      </span>
                    </div>

                    <div className="space-y-1 text-xs text-slate-600">
                      <div><strong>Modes:</strong> {lp.modes.join(', ')}</div>
                      <div><strong>Fleet:</strong> {lp.fleetSizeEstimate}</div>
                      <div><strong>Coverage:</strong> {lp.coverageZones.join(', ')}</div>
                      <div><strong>Contact:</strong> {lp.contactPerson} ({lp.phone})</div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-400">
                      Fictional Partner Profile for Prototype Demonstration
                    </div>
                  </div>
                ))}
              </div>

              {/* Active Shipments Table */}
              <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-4">
                <h3 className="font-extrabold text-slate-900 text-sm">Active Coordinated Shipments</h3>
                <div className="overflow-x-auto scrollbar-thin">
                  <table className="w-full text-left text-xs min-w-[700px]">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500">
                        <th className="pb-3 font-bold">Shipment Code</th>
                        <th className="pb-3 font-bold">Order #</th>
                        <th className="pb-3 font-bold">Route (Origin &rarr; Destination)</th>
                        <th className="pb-3 font-bold">Partner &amp; Vehicle</th>
                        <th className="pb-3 font-bold">Status</th>
                        <th className="pb-3 font-bold">Last Checkpoint</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {shipments.map((s) => (
                        <tr key={s.id} className="hover:bg-slate-50">
                          <td className="py-3 font-bold text-[#07145B]">{s.shipmentCode}</td>
                          <td className="py-3">{s.orderNumber}</td>
                          <td className="py-3">
                            <span className="font-medium text-slate-800">{s.origin}</span>
                            <span className="text-slate-400"> &rarr; </span>
                            <span className="font-medium text-slate-800">{s.destination}</span>
                          </td>
                          <td className="py-3 text-slate-600">{s.partnerName} ({s.vehicleType})</td>
                          <td className="py-3">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              s.status === 'Delivered'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {s.status}
                            </span>
                          </td>
                          <td className="py-3 text-slate-500 font-mono text-[11px]">{s.currentLocationName}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 9. DOCUMENTS MODULE */}
          {activeModule === 'documents' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-extrabold text-[#07145B]">Commercial Document Reference Archive</h2>
                <p className="text-xs text-slate-500">Structured reference records for quotations, POs, quality certificates, and waybills</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {documents.map((doc) => (
                  <div key={doc.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                    <div className="flex items-start justify-between">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-[#07145B] font-bold">
                        {doc.format}
                      </span>
                      <span className="text-[10px] text-slate-400">{doc.dateGenerated}</span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-xs leading-snug">{doc.title}</h4>
                    <div className="text-[11px] text-slate-500">
                      <div><strong>Type:</strong> {doc.type}</div>
                      <div><strong>Entity:</strong> {doc.relatedEntity}</div>
                    </div>
                    <div className="pt-2 border-t border-slate-100 text-[10px] text-amber-700 font-semibold">
                      Fictional Document Reference Record
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 10. TASKS MODULE */}
          {activeModule === 'tasks' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-extrabold text-[#07145B]">Operational Follow-ups &amp; Action Items</h2>
                <p className="text-xs text-slate-500">Pending seller verifications, buyer communications, and milestone checks</p>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3">
                {tasks.map((t) => (
                  <div
                    key={t.id}
                    className={`p-4 rounded-2xl border flex items-center justify-between gap-4 transition-all ${
                      t.completed ? 'bg-slate-50 border-slate-200 opacity-60' : 'bg-white border-slate-200 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={t.completed}
                        onChange={() => toggleTask(t.id)}
                        className="h-5 w-5 rounded text-[#07145B] focus:ring-blue-500 cursor-pointer"
                      />
                      <div>
                        <div className={`text-sm font-bold ${t.completed ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                          {t.title}
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          Category: <strong>{t.category}</strong> | Assigned: {t.assignedRole} | Ref: {t.relatedId}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-slate-400 font-mono">Due: {t.dueDate}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-extrabold ${
                        t.priority === 'High' ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {t.priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 11. REPORTS MODULE */}
          {activeModule === 'reports' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-extrabold text-[#07145B]">Analytics &amp; Trade Performance Reports</h2>
                  <p className="text-xs text-slate-500">Summary statistics derived directly from current prototype records</p>
                </div>
                <button
                  onClick={handleExportCSV}
                  className="px-4 py-2 rounded-xl bg-[#07145B] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                >
                  <Download className="w-4 h-4 text-[#FFB800]" />
                  <span>Download Full CSV Export</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-2">
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Gross Trade Value Facilitated</span>
                  <div className="text-2xl font-black text-[#07145B]">
                    ₹{orders.reduce((acc, o) => acc + o.totalAmount, 0).toLocaleString()}
                  </div>
                  <p className="text-xs text-slate-500">Sum of all confirmed demo order amounts (INR)</p>
                </div>

                <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-2">
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">On-Time Fulfillment Rate</span>
                  <div className="text-2xl font-black text-emerald-600">
                    {Math.round(((orders.length - orders.filter(o => o.isDelayed).length) / orders.length) * 100)}%
                  </div>
                  <p className="text-xs text-slate-500">{orders.filter(o => o.isDelayed).length} order currently flagged with transit delay</p>
                </div>

                <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-2">
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Average Order Value</span>
                  <div className="text-2xl font-black text-blue-700">
                    ₹{Math.round(orders.reduce((acc, o) => acc + o.totalAmount, 0) / orders.length).toLocaleString()}
                  </div>
                  <p className="text-xs text-slate-500">Across {orders.length} active trade transactions</p>
                </div>
              </div>

              {/* Monthly Trend Bar Chart */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="font-extrabold text-slate-900 text-sm mb-4">Pipeline Distribution by Category</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categoryDistributionData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                      <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                      <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Bar dataKey="value" fill="#FFB800" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* 12. SETTINGS MODULE */}
          {activeModule === 'settings' && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <h2 className="text-xl font-extrabold text-[#07145B]">Trade Portal Settings &amp; Environment</h2>
                <p className="text-xs text-slate-500">Configure demonstration simulation parameters</p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Demonstration Role Selection</h4>
                  <p className="text-xs text-slate-500 mb-3">
                    Switching roles demonstrates how data is surfaced conditionally. (In production, strict RBAC is enforced by backend security rules).
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {(['admin', 'seller', 'buyer', 'logistics'] as PortalRole[]).map((r) => (
                      <button
                        key={r}
                        onClick={() => setCurrentRole(r)}
                        className={`p-3 rounded-2xl border text-center transition-all ${
                          currentRole === r
                            ? 'bg-[#07145B] text-white border-[#07145B] shadow-sm font-bold'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 font-medium'
                        }`}
                      >
                        <div className="capitalize text-xs">{r}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 space-y-3">
                  <h4 className="font-bold text-slate-900 text-sm">Reset Demo Records</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Restore all 12 sellers, 20 products, 15 buyers, 14 orders, and 8 shipments to the default pristine factory demonstration state.
                  </p>
                  <button
                    onClick={resetDemoData}
                    className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Restore Initial Demo Data</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 13. ACCOUNT MANAGEMENT & APPROVALS (ADMINISTRATOR ONLY) */}
          {activeModule === 'accountRequests' && (
            <AccountManagementModule />
          )}

          {/* 14. MARKET INTELLIGENCE MODULE (SEARCH GROUNDED) */}
          {activeModule === 'marketIntelligence' && (
            <MarketIntelligenceModule />
          )}

        </main>
      </div>

      {/* MODAL: ORDER DETAIL & ADVANCE MILESTONE */}
      {selectedOrderForDetail && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs font-mono text-slate-400">Transaction Detail</span>
                <h3 className="text-lg font-black text-[#07145B]">{activeOrder.orderNumber}</h3>
              </div>
              <button
                onClick={() => setSelectedOrderForDetail(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3.5 rounded-2xl border">
              <div><strong>Product:</strong> {activeOrder.productName}</div>
              <div><strong>Quantity:</strong> {activeOrder.quantity} {activeOrder.unit}</div>
              <div><strong>Seller:</strong> {activeOrder.sellerName}</div>
              <div><strong>Buyer:</strong> {activeOrder.buyerName}</div>
              <div><strong>Current Stage:</strong> <span className="font-bold text-blue-700">{activeOrder.currentMilestone}</span></div>
              <div><strong>Total Value:</strong> ₹{activeOrder.totalAmount.toLocaleString()}</div>
            </div>

            {/* Advance Milestone Controls */}
            {activeOrder.currentMilestone !== 'Delivered' && (
              <div className="p-4 bg-blue-50/70 rounded-2xl border border-blue-200 space-y-3">
                <div className="font-bold text-[#07145B] text-xs">Advance to Next Milestone:</div>
                <input
                  type="text"
                  placeholder="Optional milestone note (e.g. Batch lab report verified, vehicle loaded)..."
                  value={milestoneAdvanceNote}
                  onChange={(e) => setMilestoneAdvanceNote(e.target.value)}
                  className="w-full px-3 py-2 bg-white rounded-xl border text-xs focus:outline-none"
                />
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      advanceOrderMilestone(activeOrder.id, milestoneAdvanceNote);
                      setMilestoneAdvanceNote('');
                    }}
                    className="px-4 py-2 rounded-xl bg-[#07145B] text-white font-bold text-xs hover:bg-[#0c2288]"
                  >
                    Confirm Stage Progression
                  </button>
                  {!activeOrder.isDelayed && (
                    <button
                      onClick={() => markOrderDelayed(activeOrder.id, 'Transit delay logged in Trade Portal.')}
                      className="px-3 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs"
                    >
                      Flag Delay
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Activity History Timeline */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 text-xs">Activity Milestone History</h4>
              <div className="space-y-2">
                {activeOrder.activities.map((act) => (
                  <div key={act.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex items-start gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1 shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">{act.milestone}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{act.timestamp}</span>
                      </div>
                      <p className="text-slate-600 mt-0.5">{act.note}</p>
                      <span className="text-[10px] text-slate-400">By {act.updatedBy}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: LOGISTICS BOOKING REQUEST */}
      {isLogisticsModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-[#07145B] flex items-center gap-2">
                <Truck className="w-5 h-5 text-[#FFB800]" />
                <span>Request Logistics Coordination</span>
              </h3>
              <button
                onClick={() => setIsLogisticsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Select Order to Transport:</label>
                <select
                  value={logisticsFormData.orderId}
                  onChange={(e) => setLogisticsFormData({ ...logisticsFormData, orderId: e.target.value })}
                  className="w-full p-2.5 rounded-xl border bg-slate-50"
                >
                  {orders.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.orderNumber} - {o.productName} ({o.sellerName})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Select Logistics Operator:</label>
                <select
                  value={logisticsFormData.partnerId}
                  onChange={(e) => setLogisticsFormData({ ...logisticsFormData, partnerId: e.target.value })}
                  className="w-full p-2.5 rounded-xl border bg-slate-50"
                >
                  {logisticsPartners.map((lp) => (
                    <option key={lp.id} value={lp.id}>
                      {lp.name} (Rating {lp.rating})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Origin City:</label>
                  <input
                    type="text"
                    value={logisticsFormData.origin}
                    onChange={(e) => setLogisticsFormData({ ...logisticsFormData, origin: e.target.value })}
                    className="w-full p-2 rounded-xl border"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Destination:</label>
                  <input
                    type="text"
                    value={logisticsFormData.destination}
                    onChange={(e) => setLogisticsFormData({ ...logisticsFormData, destination: e.target.value })}
                    className="w-full p-2 rounded-xl border"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Vehicle Specification:</label>
                <input
                  type="text"
                  value={logisticsFormData.vehicleType}
                  onChange={(e) => setLogisticsFormData({ ...logisticsFormData, vehicleType: e.target.value })}
                  className="w-full p-2 rounded-xl border"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Estimated Freight Cost (INR):</label>
                <input
                  type="number"
                  value={logisticsFormData.estimatedCost}
                  onChange={(e) => setLogisticsFormData({ ...logisticsFormData, estimatedCost: Number(e.target.value) })}
                  className="w-full p-2 rounded-xl border"
                />
              </div>
            </div>

            <div className="pt-3 border-t flex items-center justify-end gap-2">
              <button
                onClick={() => setIsLogisticsModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  createLogisticsRequest(logisticsFormData);
                  setIsLogisticsModalOpen(false);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#07145B] hover:bg-[#0c2288] text-white font-bold text-xs"
              >
                Generate Shipment Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD SELLER */}
      {isAddSellerModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-[#07145B]">Onboard Fictional Producer</h3>
              <button onClick={() => setIsAddSellerModalOpen(false)} className="p-1 rounded-lg text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Company / Collective Name:</label>
                <input
                  type="text"
                  value={newSellerData.companyName}
                  onChange={(e) => setNewSellerData({ ...newSellerData, companyName: e.target.value })}
                  placeholder="e.g. Sahyadri Organic Producers"
                  className="w-full p-2 rounded-xl border"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Contact Person:</label>
                  <input
                    type="text"
                    value={newSellerData.contactPerson}
                    onChange={(e) => setNewSellerData({ ...newSellerData, contactPerson: e.target.value })}
                    placeholder="Contact name"
                    className="w-full p-2 rounded-xl border"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Phone Number:</label>
                  <input
                    type="text"
                    value={newSellerData.phone}
                    onChange={(e) => setNewSellerData({ ...newSellerData, phone: e.target.value })}
                    placeholder="+91 98..."
                    className="w-full p-2 rounded-xl border"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">City:</label>
                  <input
                    type="text"
                    value={newSellerData.city}
                    onChange={(e) => setNewSellerData({ ...newSellerData, city: e.target.value })}
                    className="w-full p-2 rounded-xl border"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">State:</label>
                  <input
                    type="text"
                    value={newSellerData.state}
                    onChange={(e) => setNewSellerData({ ...newSellerData, state: e.target.value })}
                    className="w-full p-2 rounded-xl border"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Production Capacity:</label>
                <input
                  type="text"
                  value={newSellerData.productionCapacity}
                  onChange={(e) => setNewSellerData({ ...newSellerData, productionCapacity: e.target.value })}
                  className="w-full p-2 rounded-xl border"
                />
              </div>
            </div>

            <div className="pt-3 border-t flex justify-end gap-2">
              <button onClick={() => setIsAddSellerModalOpen(false)} className="px-4 py-2 text-xs font-semibold text-slate-600">
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!newSellerData.companyName) return;
                  addSeller({
                    ...newSellerData,
                    email: `${newSellerData.companyName.toLowerCase().replace(/[^a-z0-9]/g, '')}@seller.demo`
                  });
                  setIsAddSellerModalOpen(false);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#07145B] text-white font-bold text-xs"
              >
                Save Seller
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD PRODUCT */}
      {isAddProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-[#07145B]">List Product SKU</h3>
              <button onClick={() => setIsAddProductModalOpen(false)} className="p-1 rounded-lg text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Product Title:</label>
                <input
                  type="text"
                  value={newProductData.name}
                  onChange={(e) => setNewProductData({ ...newProductData, name: e.target.value })}
                  placeholder="e.g. Cold-Pressed Sesame Oil 1L"
                  className="w-full p-2 rounded-xl border"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Indicative Price (INR):</label>
                  <input
                    type="number"
                    value={newProductData.indicativePrice}
                    onChange={(e) => setNewProductData({ ...newProductData, indicativePrice: Number(e.target.value) })}
                    className="w-full p-2 rounded-xl border"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Unit:</label>
                  <input
                    type="text"
                    value={newProductData.unit}
                    onChange={(e) => setNewProductData({ ...newProductData, unit: e.target.value })}
                    className="w-full p-2 rounded-xl border"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">MOQ:</label>
                  <input
                    type="number"
                    value={newProductData.moq}
                    onChange={(e) => setNewProductData({ ...newProductData, moq: Number(e.target.value) })}
                    className="w-full p-2 rounded-xl border"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Available Quantity:</label>
                  <input
                    type="number"
                    value={newProductData.availableQuantity}
                    onChange={(e) => setNewProductData({ ...newProductData, availableQuantity: Number(e.target.value) })}
                    className="w-full p-2 rounded-xl border"
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t flex justify-end gap-2">
              <button onClick={() => setIsAddProductModalOpen(false)} className="px-4 py-2 text-xs font-semibold text-slate-600">
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!newProductData.name) return;
                  addProduct(newProductData);
                  setIsAddProductModalOpen(false);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#07145B] text-white font-bold text-xs"
              >
                Save Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD BUYER */}
      {isAddBuyerModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-[#07145B]">Register Buyer Commercial Lead</h3>
              <button onClick={() => setIsAddBuyerModalOpen(false)} className="p-1 rounded-lg text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Company / Wholesale Buyer:</label>
                <input
                  type="text"
                  value={newBuyerData.companyName}
                  onChange={(e) => setNewBuyerData({ ...newBuyerData, companyName: e.target.value })}
                  placeholder="e.g. Southern Supermarkets Alliance"
                  className="w-full p-2 rounded-xl border"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Contact Person:</label>
                  <input
                    type="text"
                    value={newBuyerData.contactPerson}
                    onChange={(e) => setNewBuyerData({ ...newBuyerData, contactPerson: e.target.value })}
                    className="w-full p-2 rounded-xl border"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">City:</label>
                  <input
                    type="text"
                    value={newBuyerData.city}
                    onChange={(e) => setNewBuyerData({ ...newBuyerData, city: e.target.value })}
                    className="w-full p-2 rounded-xl border"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Target Price / Budget:</label>
                <input
                  type="text"
                  value={newBuyerData.targetPriceBudget}
                  onChange={(e) => setNewBuyerData({ ...newBuyerData, targetPriceBudget: e.target.value })}
                  className="w-full p-2 rounded-xl border"
                />
              </div>
            </div>

            <div className="pt-3 border-t flex justify-end gap-2">
              <button onClick={() => setIsAddBuyerModalOpen(false)} className="px-4 py-2 text-xs font-semibold text-slate-600">
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!newBuyerData.companyName) return;
                  addBuyerLead({
                    ...newBuyerData,
                    email: 'procure@buyer.demo',
                    phone: '+91 98000 00000',
                    state: 'Karnataka'
                  });
                  setIsAddBuyerModalOpen(false);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#07145B] text-white font-bold text-xs"
              >
                Record Lead
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
