'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { PRODUCTS, CUSTOMER_REVIEWS, Product } from '@/data/mock-data';
import { useCart } from '@/context/cart-context';
import { ReviewModal } from '@/components/review-modal';
import { ProductCard } from '@/components/product-card';
import {
  Star,
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  ChevronRight,
  Plus,
  Minus,
  Check,
  Share2,
  ThumbsUp,
  MessageSquare,
} from 'lucide-react';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const productId = resolvedParams?.id || 'p1';
  
  const product: Product =
    PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];

  const { addToCart, wishlist, toggleWishlist } = useCart();
  const isWishlisted = wishlist.includes(product.id);

  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors[0]?.name || 'Standard'
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'features' | 'specs' | 'shipping'>('features');
  const [reviewsList, setReviewsList] = useState(CUSTOMER_REVIEWS);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const handleAddReview = (newRev: { author: string; rating: number; title: string; content: string }) => {
    setReviewsList((prev) => [
      {
        id: 'rev_' + Date.now(),
        author: newRev.author,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
        rating: newRev.rating,
        date: 'Just now',
        title: newRev.title,
        content: newRev.content,
        verified: true,
      },
      ...prev,
    ]);
  };

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/catalog" className="hover:text-slate-900 dark:hover:text-white transition-colors">
          Catalog
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-500">{product.category}</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-bold text-slate-900 dark:text-white truncate max-w-xs">
          {product.name}
        </span>
      </div>

      {/* Main PDP Grid: Gallery (Left) vs Controls (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Side: Product Gallery Viewer matching Figma Specs */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-4/3 w-full rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-lg">
            <img
              src={activeImage}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-all duration-300"
            />
            {product.isBestSeller && (
              <span className="absolute top-4 left-4 bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md">
                Best Seller
              </span>
            )}
          </div>

          {/* Thumbnail Strip */}
          {product.gallery && product.gallery.length > 0 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.gallery.map((imgUrl, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(imgUrl)}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                    activeImage === imgUrl
                      ? 'border-slate-900 dark:border-white ring-2 ring-slate-900/20'
                      : 'border-slate-200 dark:border-slate-800 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Product Metadata & Purchasing Controls */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center justify-between gap-4">
              <span className="inline-block px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                {product.category}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-2 rounded-full border transition-all ${
                    isWishlisted
                      ? 'bg-rose-500 text-white border-rose-500'
                      : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:text-rose-500'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
                <button className="p-2 rounded-full border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
              {product.name}
            </h1>

            {/* Rating Stars & In Stock Status */}
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating) ? 'fill-current' : 'text-slate-300 dark:text-slate-700'
                    }`}
                  />
                ))}
                <span className="text-xs font-bold text-slate-900 dark:text-white ml-1">
                  {product.rating}
                </span>
                <span className="text-xs text-slate-400 font-normal">
                  ({product.reviewCount} reviews)
                </span>
              </div>

              <span className="text-slate-300 dark:text-slate-700">•</span>

              <span
                className={`text-xs font-bold flex items-center gap-1 ${
                  product.inStock ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                {product.inStock ? 'In Stock (Ready to Ship)' : 'Out of Stock'}
              </span>
            </div>

            {/* Pricing */}
            <div className="flex items-baseline gap-3 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <span className="text-3xl font-black text-slate-900 dark:text-white">
                ${product.price}.00
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-base text-slate-400 line-through">
                    ${product.originalPrice}.00
                  </span>
                  <span className="bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 text-xs font-bold px-2.5 py-0.5 rounded-full">
                    Save ${product.originalPrice - product.price}
                  </span>
                </>
              )}
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Color Selector Swatches matching Figma Specs */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-slate-900 dark:text-white">Select Color Variant:</span>
                <span className="font-semibold text-slate-500">{selectedColor}</span>
              </div>
              <div className="flex items-center gap-3">
                {product.colors.map((col) => {
                  const isSelected = selectedColor === col.name;
                  return (
                    <button
                      key={col.name}
                      onClick={() => setSelectedColor(col.name)}
                      className={`relative w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${
                        isSelected
                          ? 'border-slate-900 dark:border-white ring-2 ring-slate-900/20 scale-110'
                          : 'border-transparent hover:scale-105'
                      }`}
                      style={{ backgroundColor: col.hex }}
                      title={col.name}
                    >
                      {isSelected && (
                        <Check
                          className={`w-4 h-4 ${
                            col.hex === '#f9fafb' || col.hex === '#e4e4e7' ? 'text-slate-900' : 'text-white'
                          }`}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity Selector & Action CTAs */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 rounded-lg"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-bold text-slate-900 dark:text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 rounded-lg"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => addToCart(product, quantity, selectedColor)}
                disabled={!product.inStock}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs shadow-lg hover:opacity-95 transition-all disabled:opacity-50 active:scale-[0.99]"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart (${product.price * quantity})</span>
              </button>
            </div>
          </div>

          {/* Guarantee Badges */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <Truck className="w-4 h-4 text-indigo-500 shrink-0" />
              <span>Ships in 24 Hours</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>5-Year Commercial Warranty</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section: Features, Specs, Shipping */}
      <div className="pt-8">
        <div className="flex border-b border-slate-200 dark:border-slate-800 gap-8">
          <button
            onClick={() => setActiveTab('features')}
            className={`pb-3 text-xs font-bold transition-all relative ${
              activeTab === 'features'
                ? 'text-slate-900 dark:text-white border-b-2 border-slate-900 dark:border-white'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Key Ergonomic Features
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-3 text-xs font-bold transition-all relative ${
              activeTab === 'specs'
                ? 'text-slate-900 dark:text-white border-b-2 border-slate-900 dark:border-white'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Technical Specifications
          </button>
          <button
            onClick={() => setActiveTab('shipping')}
            className={`pb-3 text-xs font-bold transition-all relative ${
              activeTab === 'shipping'
                ? 'text-slate-900 dark:text-white border-b-2 border-slate-900 dark:border-white'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Delivery & White-Glove Setup
          </button>
        </div>

        <div className="py-6">
          {activeTab === 'features' && (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.features?.map((feat, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300"
                >
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          )}

          {activeTab === 'specs' && (
            <div className="max-w-xl rounded-xl border border-slate-200 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {Object.entries(product.specs || {}).map(([key, val]) => (
                <div key={key} className="flex justify-between p-3">
                  <span className="font-semibold text-slate-500">{key}</span>
                  <span className="font-bold text-slate-900 dark:text-white">{val}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400 max-w-2xl">
              <p>
                <strong>Standard Express Ground:</strong> Delivered via FedEx/UPS in 2-4 business days. Free on all orders over $99.
              </p>
              <p>
                <strong>White-Glove In-Room Assembly:</strong> Includes unboxing, professional ergonomics adjustment, and packing material disposal ($49 add-on at checkout).
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Customer Reviews & Rating Summary Section */}
      <section className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Customer Reviews ({reviewsList.length})
            </h2>
            <p className="text-xs text-slate-500">
              Read verified feedback from ergonomics specialists & remote professionals
            </p>
          </div>

          <button
            onClick={() => setIsReviewModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold shadow-xs hover:opacity-90 transition-opacity"
          >
            Write a Review
          </button>
        </div>

        {/* Rating Breakdown Card */}
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-4 text-center md:text-left space-y-1">
            <span className="text-4xl font-black text-slate-900 dark:text-white">4.9</span>
            <div className="flex items-center justify-center md:justify-start gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-xs text-slate-500 font-medium">Based on 128 verified purchases</p>
          </div>

          <div className="md:col-span-8 space-y-2">
            {[
              { stars: 5, pct: 88 },
              { stars: 4, pct: 10 },
              { stars: 3, pct: 2 },
              { stars: 2, pct: 0 },
              { stars: 1, pct: 0 },
            ].map((row) => (
              <div key={row.stars} className="flex items-center gap-3 text-xs">
                <span className="w-12 font-bold text-slate-600 dark:text-slate-400">
                  {row.stars} Stars
                </span>
                <div className="flex-1 h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full"
                    style={{ width: `${row.pct}%` }}
                  />
                </div>
                <span className="w-8 text-right font-mono text-slate-400">{row.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {reviewsList.map((rev) => (
            <div
              key={rev.id}
              className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 bg-white dark:bg-slate-900 space-y-3 shadow-xs"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={rev.avatar}
                    alt={rev.author}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {rev.author}
                      </span>
                      {rev.verified && (
                        <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Verified Buyer
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400">{rev.date}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < rev.rating ? 'fill-current' : 'text-slate-300 dark:text-slate-700'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <h4 className="text-xs font-bold text-slate-900 dark:text-white">{rev.title}</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {rev.content}
              </p>

              <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1">
                <button className="flex items-center gap-1 hover:text-slate-600">
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Helpful (14)</span>
                </button>
                <button className="flex items-center gap-1 hover:text-slate-600">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Reply</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Review Modal Form */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        productName={product.name}
        onAddReview={handleAddReview}
      />

      {/* You Might Also Like / Related Products */}
      <section className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Frequently Bought Together
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
