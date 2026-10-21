import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTrade } from '../context/TradeContext';
import {
  Package,
  Search,
  Filter,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Building2,
  MapPin,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

export const ProductsPage: React.FC = () => {
  const { products } = useTrade();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const categories = ['All', 'Food & Agro', 'Textiles & Apparel', 'Packaging & Paper', 'Hardware & Tools', 'Spices & Condiments', 'Raw Materials'];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        searchQuery === '' ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sellerCity.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesStatus = selectedStatus === 'All' || p.status === selectedStatus;

      return matchesSearch && matchesCat && matchesStatus;
    });
  }, [products, searchQuery, selectedCategory, selectedStatus]);

  return (
    <div className="bg-[#F5F7FA] min-h-screen pb-20 space-y-12">
      
      {/* Top Banner */}
      <section className="bg-white border-b border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Link to="/" className="hover:text-[#07145B]">Home</Link>
              <span>/</span>
              <span className="text-slate-900 font-semibold">Demo Product Catalogue</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>Demonstration Product Catalogue — Fictional Sample Specifications</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#07145B] tracking-tight">
              Coordinated B2B Product Catalogue
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Explore verified product availability from regional producers across food grains, natural fibers, industrial packaging, and technical hardware.
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search products, regions, or specs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#07145B] focus:outline-none"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">Status:</span>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none"
              >
                <option value="All">All Statuses</option>
                <option value="Available">Available</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Made to Order">Made to Order</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin pt-2 border-t border-slate-100">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#07145B] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
            <Package className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No products match your criteria</h3>
            <p className="text-xs text-slate-500">Try adjusting your search terms or category filter.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedStatus('All');
              }}
              className="px-4 py-2 bg-[#07145B] text-white rounded-xl text-xs font-bold mt-2"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-2xs hover:shadow-lg transition-all overflow-hidden flex flex-col justify-between group"
              >
                <div className="p-6 space-y-4">
                  {/* Top Badge & Demo Tag */}
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-bold">
                      {prod.id}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200">
                        Demo Product
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        prod.status === 'Available'
                          ? 'bg-emerald-50 text-emerald-800'
                          : 'bg-blue-50 text-blue-800'
                      }`}>
                        {prod.status}
                      </span>
                    </div>
                  </div>

                  {/* Title & Desc */}
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      {prod.category}
                    </span>
                    <h3 className="font-extrabold text-slate-900 text-base leading-snug group-hover:text-[#07145B] transition-colors">
                      {prod.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                      {prod.description}
                    </p>
                  </div>

                  {/* Pricing & MOQ Grid */}
                  <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs">
                    <div>
                      <span className="text-slate-400 text-[10px] block">Indicative Price</span>
                      <span className="font-black text-[#07145B] text-base">₹{prod.indicativePrice}</span>
                      <span className="text-[10px] text-slate-500"> / {prod.unit}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block">Min Order (MOQ)</span>
                      <span className="font-bold text-slate-800 text-sm">{prod.moq} {prod.unit}</span>
                    </div>
                  </div>

                  {/* Producer Region */}
                  <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{prod.sellerCity}, {prod.sellerState}</span>
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Lot: {prod.availableQuantity} {prod.unit}
                    </span>
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center gap-2">
                  <Link
                    to={`/products/${prod.id}`}
                    className="flex-1 py-2 text-center rounded-xl bg-white border border-slate-200 text-slate-800 hover:bg-slate-100 text-xs font-bold transition-colors shadow-2xs"
                  >
                    View Specifications
                  </Link>
                  <Link
                    to="/for-buyers"
                    className="px-4 py-2 rounded-xl bg-[#07145B] hover:bg-[#0c2288] text-white text-xs font-bold transition-colors shadow-sm"
                  >
                    Send Enquiry
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
};
