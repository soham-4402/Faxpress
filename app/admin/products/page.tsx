'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PRODUCTS, Product } from '@/data/mock-data';
import {
  ShieldAlert,
  Plus,
  Search,
  Trash2,
  Edit,
  X,
  CheckCircle2,
  Package,
  ArrowLeft,
} from 'lucide-react';

export default function AdminProductsPage() {
  const [productList, setProductList] = useState<Product[]>(PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Chairs & Seating');
  const [price, setPrice] = useState(199);
  const [image, setImage] = useState(
    'https://images.unsplash.com/photo-1580481072645-022f9a6d1274?auto=format&fit=crop&w=600&q=80'
  );
  const [description, setDescription] = useState('');
  const [inStock, setInStock] = useState(true);

  const filteredProducts = productList.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;

    const newProd: Product = {
      id: 'p_' + Date.now(),
      name,
      category,
      categorySlug: category.toLowerCase().split(' ')[0],
      price: Number(price),
      rating: 5.0,
      reviewCount: 1,
      inStock,
      isNew: true,
      image: image || 'https://images.unsplash.com/photo-1580481072645-022f9a6d1274?auto=format&fit=crop&w=600&q=80',
      gallery: [image],
      description: description || 'New workspace item.',
      features: ['High quality materials', 'Commercial grade warranty'],
      specs: { Material: 'Steel & Mesh' },
      colors: [{ name: 'Black', hex: '#111827' }],
    };

    setProductList([newProd, ...productList]);
    setIsAddModalOpen(false);
    // Reset form
    setName('');
    setPrice(199);
    setDescription('');
  };

  const handleDeleteProduct = (id: string) => {
    setProductList(productList.filter((p) => p.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Admin Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldAlert className="w-4 h-4" />
            <span>Product Inventory Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Product Admin Panel
          </h1>
          <p className="text-xs text-slate-500">
            Add new workspace items, modify inventory prices, and toggle stock availability.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold shadow-md hover:opacity-90"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* Search & Stats Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search inventory by title or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-4 text-xs font-bold text-slate-600 dark:text-slate-400">
          <span>Total Products: <strong className="text-slate-900 dark:text-white">{productList.length}</strong></span>
          <span>In Stock: <strong className="text-emerald-600">{productList.filter(p => p.inStock).length}</strong></span>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-400 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-4">Product Details</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Rating</th>
                <th className="p-4">Stock Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-12 h-12 rounded-lg object-cover bg-slate-100 shrink-0"
                      />
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white line-clamp-1">
                          {p.name}
                        </p>
                        <p className="text-[10px] text-slate-400 font-mono">ID: {p.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-slate-600 dark:text-slate-300 font-medium">
                    {p.category}
                  </td>
                  <td className="p-4 font-black text-slate-900 dark:text-white">
                    ${p.price}.00
                  </td>
                  <td className="p-4 text-amber-500 font-bold">
                    ★ {p.rating} ({p.reviewCount})
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        p.inStock
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-rose-100 text-rose-700'
                      }`}
                    >
                      {p.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/catalog/${p.id}`}
                        className="p-1.5 text-slate-400 hover:text-slate-700"
                        title="View Product"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDeleteProduct(p.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setIsAddModalOpen(false)}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
          />

          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 z-10">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
              Add New Product
            </h3>
            <p className="text-xs text-slate-500 mb-6">Fill in details to list a new item in the catalog</p>

            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ergonomic Footrest Cushion"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option>Chairs & Seating</option>
                    <option>Desks & Tables</option>
                    <option>Lighting</option>
                    <option>Decor & Storage</option>
                    <option>Workspace Accessories</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  required
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detailed description of features..."
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="inStock"
                  checked={inStock}
                  onChange={(e) => setInStock(e.target.checked)}
                  className="rounded-md text-slate-900"
                />
                <label htmlFor="inStock" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Mark as Available In Stock
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-xl shadow-md hover:opacity-90"
              >
                Create Product Item
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
