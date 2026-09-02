'use client';

import React, { useState, useMemo } from 'react';
import { PRODUCTS, CATEGORIES } from '@/data/mock-data';
import { ProductCard } from '@/components/product-card';
import {
  Search,
  Filter,
  SlidersHorizontal,
  RotateCcw,
  Grid,
  List,
  ChevronRight,
  Star,
  Check,
} from 'lucide-react';

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(600);
  const [minRating, setMinRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Toggle Category selection
  const handleCategoryToggle = (slug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setMaxPrice(600);
    setMinRating(0);
    setInStockOnly(false);
    setSortBy('featured');
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Search
      if (
        searchQuery &&
        !p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      // Category
      if (selectedCategories.length > 0 && !selectedCategories.includes(p.categorySlug)) {
        return false;
      }
      // Price
      if (p.price > maxPrice) {
        return false;
      }
      // Rating
      if (p.rating < minRating) {
        return false;
      }
      // In Stock
      if (inStockOnly && !p.inStock) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [searchQuery, selectedCategories, maxPrice, minRating, inStockOnly, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb Header */}
      <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
        <a href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">
          Home
        </a>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-bold text-slate-900 dark:text-white">Workspace Catalog</span>
      </div>

      <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Workspace Catalog
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Browse our full range of commercial-grade seating, standing desks, lighting, and accessories.
          </p>
        </div>

        <button
          onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold"
        >
          <Filter className="w-4 h-4" />
          <span>Filters</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Filters matching Figma Catalog Specs */}
        <aside
          className={`lg:col-span-3 space-y-6 ${
            mobileFiltersOpen ? 'block' : 'hidden lg:block'
          }`}
        >
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters</span>
              </div>
              <button
                onClick={handleResetFilters}
                className="text-[11px] font-semibold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Search Input */}
            <div>
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
                Search Catalog
              </label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-slate-900"
                />
              </div>
            </div>

            {/* Category Checkboxes */}
            <div>
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-3">
                Categories
              </label>
              <div className="space-y-2">
                {CATEGORIES.map((cat) => {
                  const checked = selectedCategories.includes(cat.slug);
                  return (
                    <label
                      key={cat.id}
                      className="flex items-center justify-between text-xs text-slate-700 dark:text-slate-300 cursor-pointer group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          onClick={() => handleCategoryToggle(cat.slug)}
                          className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${
                            checked
                              ? 'bg-slate-900 dark:bg-white border-slate-900 dark:border-white text-white dark:text-slate-900'
                              : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800'
                          }`}
                        >
                          {checked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="group-hover:text-slate-900 dark:group-hover:text-white">
                          {cat.name}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono">
                        ({cat.itemCount})
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Price Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
                <span>Max Price</span>
                <span className="text-indigo-600 dark:text-indigo-400">${maxPrice}</span>
              </div>
              <input
                type="range"
                min="50"
                max="600"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-slate-900 dark:accent-white cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>$50</span>
                <span>$600</span>
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
                Minimum Rating
              </label>
              <div className="flex items-center gap-1">
                {[0, 4.0, 4.5, 4.8].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setMinRating(rating)}
                    className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                      minRating === rating
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {rating === 0 ? 'All' : `${rating}+ ★`}
                  </button>
                ))}
              </div>
            </div>

            {/* In Stock Toggle */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                In Stock Only
              </span>
              <button
                onClick={() => setInStockOnly(!inStockOnly)}
                className={`w-10 h-6 rounded-full transition-colors p-1 flex items-center ${
                  inStockOnly ? 'bg-slate-900 dark:bg-white justify-end' : 'bg-slate-300 dark:bg-slate-700 justify-start'
                }`}
              >
                <div className={`w-4 h-4 rounded-full shadow-md ${inStockOnly ? 'bg-white dark:bg-slate-900' : 'bg-white'}`} />
              </button>
            </div>
          </div>
        </aside>

        {/* Main Product Grid & Controls */}
        <main className="lg:col-span-9 space-y-6">
          {/* Header Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              Showing <span className="font-bold text-slate-900 dark:text-white">{filteredProducts.length}</span> of {PRODUCTS.length} products
            </span>

            <div className="flex items-center gap-3 self-end sm:self-auto">
              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-medium">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              {/* Grid / List View Toggle */}
              <div className="flex items-center bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'list'
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Product Items Display */}
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center bg-slate-50 dark:bg-slate-900/40 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
              <SlidersHorizontal className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                No matching products found
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6">
                Try adjusting your search criteria, price range, or category selection.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-4'
              }
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Pagination Controls matching Figma specs */}
          <div className="pt-8 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
            <button className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50">
              Previous
            </button>
            <div className="flex items-center gap-1 text-xs font-bold">
              <span className="w-8 h-8 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center">
                1
              </span>
              <span className="w-8 h-8 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center cursor-pointer">
                2
              </span>
              <span className="w-8 h-8 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center cursor-pointer">
                3
              </span>
            </div>
            <button className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
              Next
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
