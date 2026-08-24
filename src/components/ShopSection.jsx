import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAdminData } from '../context/AdminDataContext';
import { ShoppingBag, Star, Sparkles, Heart, Check, Plus, ArrowRight, ShieldCheck, Tag, Cross } from 'lucide-react';

export const ShopSection = ({ onAddToCart, onOpenCart, onBuyNow }) => {
  const { t } = useLanguage();
  const { products, shopHeader } = useAdminData();
  const shop = { ...t.shop, ...(shopHeader || {}) };

  const activeProducts = products && products.length > 0 ? products : shop.products;

  const [activeCategory, setActiveCategory] = useState('all');
  const [recentlyAdded, setRecentlyAdded] = useState(null);

  const categories = [
    { id: 'all', label: shop.categories.all },
    { id: 'religious', label: shop.categories.religious },
    { id: 'books', label: shop.categories.books },
    { id: 'apparel', label: shop.categories.apparel },
    { id: 'accessories', label: shop.categories.accessories }
  ];

  const filteredProducts = activeCategory === 'all'
    ? activeProducts
    : activeProducts.filter(p => p.category === activeCategory);

  const handleAddToCart = (product) => {
    onAddToCart(product);
    setRecentlyAdded(product.id);
    setTimeout(() => {
      setRecentlyAdded(null);
    }, 1800);
  };

  return (
    <section 
      id="shop" 
      className="py-24 relative overflow-hidden bg-gradient-to-b from-[#fdfbf7] via-[#f5ede0] to-[#fdfaf4] border-y border-amber-200/80 shadow-inner"
    >
      {/* Subtle Sacred Artisan Pattern & Warm Candlelight Ambient Orbs */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#c88f17_1.2px,transparent_1.2px)] [background-size:28px_28px]" />
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-brand-gold/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-96 h-96 bg-brand-coral/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 left-1/3 w-80 h-80 bg-amber-200/20 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Boutique Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-950 font-black text-xs uppercase tracking-widest mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>{shop.badge}</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-slate-900 leading-tight mb-4">
            {shop.title}
          </h2>

          <p className="text-slate-700 text-base sm:text-lg leading-relaxed mb-6 font-medium">
            {shop.subtitle}
          </p>

          {/* Social Impact Banner Card */}
          <div className="inline-flex items-center gap-2.5 p-4 px-6 rounded-2xl bg-white/90 backdrop-blur-md border border-amber-300/80 shadow-lg text-slate-800 text-xs sm:text-sm font-semibold">
            <Heart className="w-4 h-4 text-brand-coral fill-brand-coral flex-shrink-0" />
            <span>{shop.supportCallout}</span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all shadow-sm ${
                activeCategory === cat.id
                  ? 'bg-slate-950 text-white shadow-md scale-105 ring-2 ring-amber-400/50'
                  : 'bg-white/90 text-slate-700 border border-amber-200/80 hover:border-amber-400 hover:bg-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-3xl overflow-hidden border border-amber-200/70 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-2"
            >
              <div>
                {/* Image Box */}
                <div className="relative h-60 overflow-hidden bg-amber-50/50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Badge */}
                  <div className="absolute top-3 left-3 bg-brand-gold text-slate-950 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    <span>{product.tag}</span>
                  </div>

                  {/* Rating */}
                  <div className="absolute top-3 right-3 bg-slate-950/75 backdrop-blur-md text-brand-gold text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3 fill-brand-gold" />
                    <span className="text-white text-[11px]">5.0</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-2">
                  <h3 className="font-display font-extrabold text-base text-slate-900 leading-snug group-hover:text-brand-teal transition-colors line-clamp-2">
                    {product.name}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 font-normal">
                    {product.desc}
                  </p>

                  {/* Pricing */}
                  <div className="flex items-baseline gap-2 pt-2">
                    <span className="font-display font-black text-xl text-slate-950">
                      ${product.price.toFixed(2)} USD
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-slate-400 line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 space-y-2">
                <button
                  onClick={() => handleAddToCart(product)}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-sm ${
                    recentlyAdded === product.id
                      ? 'bg-emerald-600 text-white'
                      : 'bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-200'
                  }`}
                >
                  {recentlyAdded === product.id ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>{shop.addedToCart}</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>{shop.addToCart}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => onBuyNow(product)}
                  className="w-full py-2.5 px-4 rounded-xl bg-brand-coral hover:bg-brand-coral-dark text-white text-xs font-extrabold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-md hover:shadow-brand-coral/30"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>{shop.buyNow}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Cart Trigger */}
        <div className="mt-16 text-center">
          <button
            onClick={onOpenCart}
            className="inline-flex items-center gap-3 bg-slate-950 hover:bg-slate-900 text-white font-bold text-sm px-8 py-4 rounded-full shadow-2xl hover:scale-105 transition-all border border-amber-300/30"
          >
            <ShoppingBag className="w-5 h-5 text-brand-gold" />
            <span>{shop.viewCart} ({shop.proceedsNotice})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
