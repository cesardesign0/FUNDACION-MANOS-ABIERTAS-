import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X, Trash2, Plus, Minus, ShoppingBag, Heart, CheckCircle2, ShieldCheck, ArrowRight, Truck } from 'lucide-react';
import confetti from 'canvas-confetti';

export const CartModal = ({ isOpen, onClose, cart, onUpdateQuantity, onRemoveItem, onClearCart }) => {
  const { t } = useLanguage();
  const { cart: cartTexts } = t;

  const [step, setStep] = useState('cart'); // 'cart', 'checkout', 'success'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [orderNumber, setOrderNumber] = useState('');

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    const generatedOrder = `MA-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(generatedOrder);
    
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    setStep('success');
    onClearCart();
  };

  const handleClose = () => {
    setStep('cart');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden relative border border-slate-100 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 relative flex-shrink-0 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-coral flex items-center justify-center text-white">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-black text-xl text-white">
                {cartTexts.title}
              </h3>
              <p className="text-xs text-slate-400">
                {cartTexts.subtitle}
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {step === 'success' ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h4 className="font-display font-black text-2xl text-slate-900">
                {cartTexts.successTitle}
              </h4>

              <div className="inline-block bg-brand-teal-light text-brand-teal px-4 py-2 rounded-xl text-xs font-bold font-mono">
                {cartTexts.orderNumber}: #{orderNumber}
              </div>

              <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                {cartTexts.successDesc}
              </p>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium flex items-center gap-2 text-left">
                <Heart className="w-4 h-4 text-brand-coral flex-shrink-0 fill-brand-coral" />
                <span>Gracias por tu apoyo. Tu compra financia directamente la obra de Manos Abiertas de Jesús y María.</span>
              </div>

              <button
                onClick={handleClose}
                className="w-full py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md"
              >
                {cartTexts.btnContinue}
              </button>
            </div>
          ) : step === 'checkout' ? (
            <form onSubmit={handleCheckoutSubmit} className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h4 className="font-display font-bold text-base text-slate-900">
                  {cartTexts.customerInfo}
                </h4>
                <button
                  type="button"
                  onClick={() => setStep('cart')}
                  className="text-xs text-brand-teal font-semibold hover:underline"
                >
                  ← Volver al Carrito
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">{cartTexts.fullName}</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Juan Pérez"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-brand-teal outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">{cartTexts.email}</label>
                  <input
                    type="email"
                    required
                    placeholder="correo@ejemplo.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-brand-teal outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">{cartTexts.phone}</label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-brand-teal outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">{cartTexts.address}</label>
                <textarea
                  rows="2"
                  required
                  placeholder="Calle, número, ciudad, código postal..."
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-brand-teal outline-none resize-none"
                />
              </div>

              {/* Summary */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>{cartTexts.subtotal}</span>
                  <span className="font-bold">${subtotal.toFixed(2)} USD</span>
                </div>
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>{cartTexts.donationGift}</span>
                  <span>100% Solidario</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-extrabold text-slate-900">
                  <span>{cartTexts.total}</span>
                  <span>${subtotal.toFixed(2)} USD</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-brand-coral hover:bg-brand-coral-dark text-white font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-brand-coral/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>{cartTexts.btnCheckout} (${subtotal.toFixed(2)})</span>
              </button>

              <div className="text-center text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>{cartTexts.shippingNotice}</span>
              </div>
            </form>
          ) : (
            <div>
              {cart.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h4 className="font-display font-bold text-lg text-slate-800">
                    {cartTexts.emptyTitle}
                  </h4>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    {cartTexts.emptyDesc}
                  </p>
                  <button
                    onClick={handleClose}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-brand-teal text-white text-xs font-bold shadow-md hover:bg-brand-teal-dark transition-all mt-2"
                  >
                    <span>{cartTexts.btnContinue}</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Items List */}
                  <div className="space-y-3 divide-y divide-slate-100">
                    {cart.map((item) => (
                      <div key={item.id} className="pt-3 first:pt-0 flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-xl object-cover border border-slate-200 flex-shrink-0"
                        />
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="font-display font-bold text-xs sm:text-sm text-slate-900 truncate">
                            {item.name}
                          </h4>
                          <div className="text-xs font-extrabold text-brand-teal mt-0.5">
                            ${item.price.toFixed(2)} USD
                          </div>

                          {/* Quantity control */}
                          <div className="flex items-center gap-2 mt-1.5">
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 rounded-md bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 text-xs font-bold"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold px-2">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 rounded-md bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 text-xs font-bold"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Summary & Checkout CTA */}
                  <div className="pt-4 border-t border-slate-200 space-y-3">
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">{cartTexts.total}:</span>
                      <span className="font-display font-black text-2xl text-slate-900">${subtotal.toFixed(2)} USD</span>
                    </div>

                    <div className="p-3 rounded-xl bg-amber-50 text-amber-900 text-xs font-medium flex items-center gap-2">
                      <Heart className="w-4 h-4 text-brand-coral flex-shrink-0 fill-brand-coral" />
                      <span>Con esta compra estás apoyando directamente a Manos Abiertas de Jesús y María.</span>
                    </div>

                    <button
                      onClick={() => setStep('checkout')}
                      className="w-full py-4 rounded-2xl bg-brand-coral hover:bg-brand-coral-dark text-white font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-brand-coral/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                    >
                      <span>{cartTexts.btnCheckout}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
