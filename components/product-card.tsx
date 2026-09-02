'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/data/mock-data';
import { useCart } from '@/context/cart-context';
import { Star, ShoppingBag, Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const isWishlisted = wishlist.includes(product.id);

  return (
    <div className="group relative flex flex-col rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Product Image Container */}
      <div className="relative aspect-4/3 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <Link href={`/catalog/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isBestSeller && (
            <span className="bg-slate-900/90 dark:bg-white/90 text-white dark:text-slate-900 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-xs">
              Best Seller
            </span>
          )}
          {product.isNew && (
            <span className="bg-indigo-600/90 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-xs">
              New Arrival
            </span>
          )}
          {product.originalPrice && (
            <span className="bg-rose-500/90 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-xs">
              Save ${product.originalPrice - product.price}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all z-10 ${
            isWishlisted
              ? 'bg-rose-500 text-white shadow-md'
              : 'bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 hover:text-rose-500 dark:hover:text-rose-400'
          }`}
          aria-label="Save product"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {!product.inStock && (
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center">
            <span className="bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Product Content Details */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1.5">
          <span className="font-medium truncate">{product.category}</span>
          <div className="flex items-center gap-1 text-amber-500 font-semibold shrink-0">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>{product.rating}</span>
            <span className="text-slate-400 font-normal">({product.reviewCount})</span>
          </div>
        </div>

        <Link href={`/catalog/${product.id}`} className="group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          <h3 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white line-clamp-1">
            {product.name}
          </h3>
        </Link>

        {/* Color Swatch Dots */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-1.5 mt-2.5">
            {product.colors.map((color, idx) => (
              <span
                key={idx}
                className="w-3 h-3 rounded-full border border-slate-300 dark:border-slate-700 shadow-xs"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        )}

        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product)}
            disabled={!product.inStock}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              product.inStock
                ? 'bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 shadow-xs active:scale-95'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
