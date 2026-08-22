import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X, Heart, ShieldCheck, CheckCircle2, DollarSign, CreditCard, Copy, Check, QrCode, Building, ExternalLink, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const DonationModal = ({ isOpen, onClose, preselectedCause }) => {
  const { language, t } = useLanguage();
  const { donationModal } = t;

  // Selected Payment Method: 'stripe', 'paypal', 'zelle', 'bank'
  const [paymentMethod, setPaymentMethod] = useState('stripe');

  const [frequency, setFrequency] = useState('monthly');
  const [amount, setAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState('');
  const [cause, setCause] = useState(preselectedCause || 'all');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedZelle, setCopiedZelle] = useState(false);

  useEffect(() => {
    if (preselectedCause) {
      setCause(preselectedCause);
    }
  }, [preselectedCause]);

  if (!isOpen) return null;

  const presetAmounts = [15, 30, 50, 100, 250];

  const handleAmountSelect = (val) => {
    setAmount(val);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    const val = e.target.value;
    setCustomAmount(val);
    if (val) {
      setAmount(Number(val));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
    setIsSuccess(true);
  };

  const handleCopyZelle = () => {
    navigator.clipboard.writeText('donaciones@fundacionmanosabiertas.org');
    setCopiedZelle(true);
    setTimeout(() => setCopiedZelle(false), 2500);
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden relative border border-slate-100 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-brand-teal-dark text-white p-6 sm:p-7 relative flex-shrink-0">
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 mb-2">
            <Heart className="w-5 h-5 fill-brand-coral text-brand-coral" />
            <span className="text-xs uppercase font-bold tracking-wider text-teal-200">
              {language === 'es' ? 'Fundación Manos Abiertas de Jesús & María' : 'Manos Abiertas de Jesús & María Foundation'}
            </span>
          </div>

          <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
            {donationModal.title}
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-md">
            {donationModal.subtitle}
          </p>
        </div>

        {/* Payment Method Selector Tabs */}
        <div className="grid grid-cols-4 p-1.5 bg-slate-100 border-b border-slate-200 text-xs font-black uppercase tracking-wider flex-shrink-0">
          <button
            type="button"
            onClick={() => setPaymentMethod('stripe')}
            className={`py-2.5 px-1 rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center gap-1 text-center ${
              paymentMethod === 'stripe'
                ? 'bg-white text-brand-teal shadow-md font-black scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span className="text-[10px] sm:text-xs">Tarjeta / Apple</span>
          </button>

          <button
            type="button"
            onClick={() => setPaymentMethod('paypal')}
            className={`py-2.5 px-1 rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center gap-1 text-center ${
              paymentMethod === 'paypal'
                ? 'bg-white text-blue-600 shadow-md font-black scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="text-[11px] font-black text-blue-600">P</span>
            <span className="text-[10px] sm:text-xs">PayPal / Venmo</span>
          </button>

          <button
            type="button"
            onClick={() => setPaymentMethod('zelle')}
            className={`py-2.5 px-1 rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center gap-1 text-center ${
              paymentMethod === 'zelle'
                ? 'bg-white text-purple-700 shadow-md font-black scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="text-[10px] font-black bg-purple-600 text-white rounded-md px-1 leading-tight">Z</span>
            <span className="text-[10px] sm:text-xs">Zelle (0%)</span>
          </button>

          <button
            type="button"
            onClick={() => setPaymentMethod('bank')}
            className={`py-2.5 px-1 rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center gap-1 text-center ${
              paymentMethod === 'bank'
                ? 'bg-white text-slate-900 shadow-md font-black scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span className="text-[10px] sm:text-xs">Banco Directo</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {isSuccess ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="font-display font-bold text-2xl text-slate-900">
                {donationModal.successTitle}
              </h4>
              <p className="text-slate-600 text-sm max-w-sm mx-auto">
                {donationModal.successDesc}
              </p>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-1.5">
                <div><strong>Monto:</strong> ${amount} USD ({frequency === 'monthly' ? 'Mensual' : 'Único'})</div>
                <div><strong>Método:</strong> {paymentMethod.toUpperCase()}</div>
                <div><strong>Donante:</strong> {donorName || 'Hermano(a) en Cristo'}</div>
                <div><strong>Causa:</strong> {cause}</div>
              </div>
              <button
                onClick={handleClose}
                className="w-full py-3.5 rounded-full bg-brand-teal hover:bg-brand-teal-dark text-white font-bold text-sm shadow-md"
              >
                {donationModal.close}
              </button>
            </div>
          ) : (
            <div>
              {/* ========================================================================= */}
              {/* METODO 1: STRIPE / TARJETAS / APPLE PAY */}
              {/* ========================================================================= */}
              {paymentMethod === 'stripe' && (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Frequency Toggle */}
                  <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl">
                    <button
                      type="button"
                      onClick={() => setFrequency('onetime')}
                      className={`py-2 text-xs font-bold rounded-xl transition-all ${
                        frequency === 'onetime'
                          ? 'bg-white text-brand-teal shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {donationModal.frequencyOneTime}
                    </button>
                    <button
                      type="button"
                      onClick={() => setFrequency('monthly')}
                      className={`py-2 text-xs font-bold rounded-xl transition-all ${
                        frequency === 'monthly'
                          ? 'bg-brand-teal text-white shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      ✨ {donationModal.frequencyMonthly}
                    </button>
                  </div>

                  {/* Amount Presets */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Selecciona el Monto ($ USD)
                    </label>
                    <div className="grid grid-cols-5 gap-2 mb-3">
                      {presetAmounts.map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => handleAmountSelect(val)}
                          className={`py-2.5 rounded-xl font-display font-extrabold text-sm border transition-all ${
                            amount === val && !customAmount
                              ? 'border-brand-teal bg-teal-50 text-brand-teal shadow-sm scale-105 font-black'
                              : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          ${val}
                        </button>
                      ))}
                    </div>

                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                      <input
                        type="number"
                        min="1"
                        placeholder={donationModal.customAmount}
                        value={customAmount}
                        onChange={handleCustomAmountChange}
                        className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none font-medium"
                      />
                    </div>
                  </div>

                  {/* Cause Selection */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      {donationModal.selectCause}
                    </label>
                    <select
                      value={cause}
                      onChange={(e) => setCause(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-brand-teal outline-none bg-white text-slate-700 font-medium"
                    >
                      <option value="all">{donationModal.causeAll}</option>
                      <option value="food">{donationModal.causeFood}</option>
                      <option value="housing">{donationModal.causeHousing}</option>
                      <option value="health">{donationModal.causeHealth}</option>
                    </select>
                  </div>

                  {/* Donor info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">{donationModal.name}</label>
                      <input
                        type="text"
                        required
                        placeholder="Ej. Carmen Mendoza"
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:border-brand-teal outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">{donationModal.email}</label>
                      <input
                        type="email"
                        required
                        placeholder="carmen@ejemplo.com"
                        value={donorEmail}
                        onChange={(e) => setDonorEmail(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:border-brand-teal outline-none"
                      />
                    </div>
                  </div>

                  {/* Card Simulation */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Tarjeta Débito / Crédito / Apple Pay</label>
                    <div className="relative">
                      <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        placeholder="4000 1234 5678 9010"
                        maxLength="19"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-sm focus:border-brand-teal outline-none font-mono"
                      />
                    </div>
                  </div>

                  {/* Submit via Stripe */}
                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl bg-brand-coral hover:bg-brand-coral-dark text-white font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-brand-coral/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                  >
                    <Heart className="w-4 h-4 fill-white" />
                    <span>Donar con Stripe • ${amount} USD</span>
                  </button>

                  <div className="text-center text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>🔒 Procesamiento encriptado SSL con Stripe para organizaciones benéficas.</span>
                  </div>
                </form>
              )}

              {/* ========================================================================= */}
              {/* METODO 2: PAYPAL & VENMO */}
              {/* ========================================================================= */}
              {paymentMethod === 'paypal' && (
                <div className="space-y-5">
                  <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-lg flex-shrink-0">
                      P
                    </div>
                    <div className="text-xs text-blue-950">
                      <strong className="block text-sm text-blue-900 font-bold">Donación Directa por PayPal & Venmo</strong>
                      Donaciones instantáneas con tu cuenta de PayPal o app de Venmo con tarifa reducida para ONG.
                    </div>
                  </div>

                  {/* Amount Presets */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Selecciona el Monto ($ USD)
                    </label>
                    <div className="grid grid-cols-5 gap-2 mb-3">
                      {presetAmounts.map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => handleAmountSelect(val)}
                          className={`py-2.5 rounded-xl font-display font-extrabold text-sm border transition-all ${
                            amount === val && !customAmount
                              ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm scale-105 font-black'
                              : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          ${val}
                        </button>
                      ))}
                    </div>

                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                      <input
                        type="number"
                        min="1"
                        placeholder="Otro monto en USD"
                        value={customAmount}
                        onChange={handleCustomAmountChange}
                        className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-blue-600 outline-none font-medium"
                      />
                    </div>
                  </div>

                  {/* Cause Selection */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      {donationModal.selectCause}
                    </label>
                    <select
                      value={cause}
                      onChange={(e) => setCause(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-blue-600 outline-none bg-white text-slate-700 font-medium"
                    >
                      <option value="all">{donationModal.causeAll}</option>
                      <option value="food">{donationModal.causeFood}</option>
                      <option value="housing">{donationModal.causeHousing}</option>
                      <option value="health">{donationModal.causeHealth}</option>
                    </select>
                  </div>

                  {/* PayPal & Venmo Smart Buttons */}
                  <div className="space-y-2.5 pt-2">
                    <button
                      onClick={handleSubmit}
                      className="w-full py-4 rounded-2xl bg-[#0070BA] hover:bg-[#005ea6] text-white font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                    >
                      <span>🅿️ Donar ${amount} USD con PayPal</span>
                    </button>

                    <button
                      onClick={handleSubmit}
                      className="w-full py-3.5 rounded-2xl bg-[#008CFF] hover:bg-[#0077db] text-white font-extrabold text-sm uppercase tracking-wider shadow-md hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                    >
                      <span>💙 Donar con Venmo</span>
                    </button>
                  </div>

                  <div className="text-center text-[11px] text-slate-500">
                    🔒 Protección al donante y recibo inmediato de PayPal Giving Fund.
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* METODO 3: ZELLE (0% COMISIÓN) */}
              {/* ========================================================================= */}
              {paymentMethod === 'zelle' && (
                <div className="space-y-5">
                  <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 text-xs text-purple-950 flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-purple-700 text-white flex items-center justify-center font-black text-lg flex-shrink-0">
                      Z
                    </span>
                    <div>
                      <strong className="block text-sm text-purple-900 font-bold">Zelle: 0% Comisión Bancaria</strong>
                      El 100% de tu donación llega directamente a las obras de misericordia y retiros sin comisiones de intermediarios.
                    </div>
                  </div>

                  {/* Zelle Information Box */}
                  <div className="p-5 rounded-3xl bg-slate-900 text-white space-y-3.5 shadow-xl border border-slate-800">
                    <div className="flex items-center justify-between text-xs text-purple-300 font-bold uppercase tracking-wider pb-2 border-b border-slate-800">
                      <span>Datos Oficiales para Transferir por Zelle</span>
                      <span className="bg-purple-900/60 text-purple-300 px-2 py-0.5 rounded-full text-[10px]">EE.UU.</span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Correo Electrónico Registrado:</span>
                        <span className="font-mono text-sm font-black text-brand-gold select-all">
                          donaciones@fundacionmanosabiertas.org
                        </span>
                      </div>

                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Teléfono / WhatsApp Oficial:</span>
                        <span className="font-mono text-sm font-bold text-white">
                          +1 (718) 378-1734
                        </span>
                      </div>

                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Titular de la Cuenta:</span>
                        <span className="font-bold text-slate-200">
                          Fundación Manos Abiertas de Jesús & María / Centro Carismático Católico
                        </span>
                      </div>
                    </div>

                    {/* Copy Button */}
                    <button
                      type="button"
                      onClick={handleCopyZelle}
                      className={`w-full py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                        copiedZelle
                          ? 'bg-emerald-600 text-white shadow-md'
                          : 'bg-purple-600 hover:bg-purple-500 text-white shadow-md'
                      }`}
                    >
                      {copiedZelle ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedZelle ? '¡Correo Copiado al Portapapeles!' : 'Copiar Correo de Zelle'}</span>
                    </button>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                    <strong>💡 Instrucción para tu app del banco:</strong>
                    <p className="text-[11px] leading-relaxed">
                      Abre tu aplicación bancaria (Chase, Bank of America, Wells Fargo, etc.), selecciona <em>Send Money with Zelle</em>, pega el correo o teléfono y coloca en el motivo/memo: <strong>Donación Manos Abiertas</strong>.
                    </p>
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider shadow-md hover:scale-[1.02] transition-all"
                  >
                    <span>Ya realicé mi transferencia por Zelle ✓</span>
                  </button>
                </div>
              )}

              {/* ========================================================================= */}
              {/* METODO 4: TRANSFERENCIA BANCARIA DIRECTA (WIRE / ACH) */}
              {/* ========================================================================= */}
              {paymentMethod === 'bank' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                    <strong className="block text-sm text-slate-900 font-bold mb-1">Transferencia Bancaria Directa (ACH / Wire)</strong>
                    Ideal para donaciones institucionales, diezmos comunitarios o aportes desde cualquier banco de EE.UU. o internacional.
                  </div>

                  <div className="p-5 rounded-3xl bg-slate-900 text-white space-y-3 text-xs border border-slate-800">
                    <div className="flex justify-between pb-2 border-b border-slate-800 text-slate-400 font-bold uppercase text-[10px]">
                      <span>Datos Bancarios Oficiales</span>
                      <span className="text-brand-gold">JPMorgan Chase Bank</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Banco:</span>
                        <span className="font-bold text-white">Chase Bank NY, N.A.</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Titular:</span>
                        <span className="font-bold text-white">Fundación Manos Abiertas</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Routing / Ruta (ABA):</span>
                        <span className="font-mono font-bold text-brand-gold">021000021</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Número de Cuenta:</span>
                        <span className="font-mono font-bold text-white">XXXXXXXX-4921</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 text-center">
                    Si necesitas el número de cuenta completo o certificado de exención fiscal 501(c)(3), escríbenos a <strong>contacto@manosabiertas.org</strong>.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
