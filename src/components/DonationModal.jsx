import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAdminData } from '../context/AdminDataContext';
import { X, Heart, ShieldCheck, CheckCircle2, DollarSign, Copy, Check, QrCode, ExternalLink, Sparkles, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

export const DonationModal = ({ isOpen, onClose, preselectedCause }) => {
  const { language, t } = useLanguage();
  const { settings } = useAdminData();
  const { donationModal } = t;

  // Selected Payment Method: 'paypal' or 'zelle' ONLY as requested
  const [paymentMethod, setPaymentMethod] = useState('paypal');

  const [frequency, setFrequency] = useState('onetime');
  const [amount, setAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState('');
  const [cause, setCause] = useState(preselectedCause || 'all');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedZelle, setCopiedZelle] = useState(false);

  // Zelle email (from admin settings or default)
  const zelleEmail = settings?.donationsEmail || 'donaciones@fundacionmanosabiertas.org';

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
    navigator.clipboard.writeText(zelleEmail);
    setCopiedZelle(true);
    setTimeout(() => setCopiedZelle(false), 2500);
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden relative border border-slate-100 max-h-[92vh] flex flex-col">
        
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

        {/* 2 Payment Method Selector Tabs: PayPal and Zelle Only */}
        <div className="grid grid-cols-2 p-1.5 bg-slate-100 border-b border-slate-200 text-xs font-black uppercase tracking-wider flex-shrink-0">
          <button
            type="button"
            onClick={() => setPaymentMethod('paypal')}
            className={`py-3 px-3 rounded-xl transition-all flex items-center justify-center gap-2 text-center ${
              paymentMethod === 'paypal'
                ? 'bg-white text-blue-600 shadow-md font-black scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="text-sm font-black text-blue-600">P</span>
            <span className="text-xs">PayPal</span>
          </button>

          <button
            type="button"
            onClick={() => setPaymentMethod('zelle')}
            className={`py-3 px-3 rounded-xl transition-all flex items-center justify-center gap-2 text-center ${
              paymentMethod === 'zelle'
                ? 'bg-white text-purple-700 shadow-md font-black scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="text-xs font-black bg-purple-600 text-white rounded-md px-1.5 py-0.5 leading-tight">Z</span>
            <span className="text-xs">Zelle (0% Comisión)</span>
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
                {donationModal.successTitle || '¡Dios bendiga tu generosidad!'}
              </h4>
              <p className="text-slate-600 text-sm max-w-sm mx-auto">
                {donationModal.successDesc || 'Tu aporte ya ha sido registrado y transformará vidas.'}
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
                {donationModal.close || 'Cerrar'}
              </button>
            </div>
          ) : (
            <div>
              {/* ========================================================================= */}
              {/* METODO 1: PAYPAL */}
              {/* ========================================================================= */}
              {paymentMethod === 'paypal' && (
                <div className="space-y-5">
                  <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200/80 flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-lg flex-shrink-0">
                      P
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-blue-950">
                        Donación Directa y Segura por PayPal
                      </h4>
                      <p className="text-xs text-blue-800/80 mt-0.5 leading-relaxed">
                        Donaciones instantáneas con tu saldo de PayPal, tarjeta de débito o crédito respaldadas por PayPal Giving Fund.
                      </p>
                    </div>
                  </div>

                  {/* Frequency Toggle */}
                  <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl">
                    <button
                      type="button"
                      onClick={() => setFrequency('onetime')}
                      className={`py-2 text-xs font-bold rounded-xl transition-all ${
                        frequency === 'onetime'
                          ? 'bg-white text-blue-600 shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {donationModal.frequencyOneTime || 'Donación Única'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setFrequency('monthly')}
                      className={`py-2 text-xs font-bold rounded-xl transition-all ${
                        frequency === 'monthly'
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      ✨ {donationModal.frequencyMonthly || 'Donación Mensual'}
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
                              ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-sm ring-2 ring-blue-600/20'
                              : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                          }`}
                        >
                          ${val}
                        </button>
                      ))}
                    </div>

                    {/* Custom Amount */}
                    <div className="relative">
                      <DollarSign className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="number"
                        placeholder="Otro monto en USD"
                        value={customAmount}
                        onChange={handleCustomAmountChange}
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
                      />
                    </div>
                  </div>

                  {/* Cause Selection */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Destinar donación a:
                    </label>
                    <select
                      value={cause}
                      onChange={(e) => setCause(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="all">Donde más se necesite (Misión General)</option>
                      <option value="Alimentos para Familias Vulnerables">Alimentos para Familias Vulnerables</option>
                      <option value="Retiros de Sanación Espiritual e Isha Bethel">Retiros de Sanación Espiritual e Isha Bethel</option>
                      <option value="Casa de Ayuda y Centro Carismático Bronx">Casa de Ayuda y Centro Carismático Bronx</option>
                      <option value="Sostenimiento Pastoral y Caridad">Sostenimiento Pastoral y Caridad</option>
                    </select>
                  </div>

                  {/* Submit to PayPal */}
                  <div className="space-y-2 pt-2">
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-extrabold text-sm uppercase tracking-wider transition-all shadow-lg shadow-blue-500/20 hover:scale-[1.01] flex items-center justify-center gap-2"
                    >
                      <span className="font-black text-base">P</span>
                      <span>Donar ${amount} USD con PayPal</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-slate-400 text-[11px] font-medium pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Protección al donante y recibo oficial de PayPal Giving Fund</span>
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* METODO 2: ZELLE (0% FEE) */}
              {/* ========================================================================= */}
              {paymentMethod === 'zelle' && (
                <div className="space-y-5">
                  <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-700 text-white flex items-center justify-center font-black text-lg flex-shrink-0">
                      Z
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-purple-950">
                          Transferencia Inmediata vía Zelle
                        </h4>
                        <span className="bg-purple-200 text-purple-900 text-[10px] font-black px-2 py-0.5 rounded-full">
                          0% COMISIÓN
                        </span>
                      </div>
                      <p className="text-xs text-purple-900/80 mt-0.5 leading-relaxed">
                        El 100% de tu donación llega íntegro a las familias y retiros sin descuento de comisiones bancarias.
                      </p>
                    </div>
                  </div>

                  {/* Zelle Email Box */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                      Correo Oficial de la Fundación para Zelle:
                    </span>
                    <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200">
                      <span className="font-mono font-black text-slate-900 text-xs sm:text-sm select-all break-all">
                        {zelleEmail}
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyZelle}
                        className={`ml-2 px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all flex items-center gap-1.5 flex-shrink-0 ${
                          copiedZelle
                            ? 'bg-emerald-600 text-white'
                            : 'bg-purple-600 hover:bg-purple-700 text-white'
                        }`}
                      >
                        {copiedZelle ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedZelle ? '¡Copiado!' : 'Copiar'}</span>
                      </button>
                    </div>
                    <span className="text-[10px] text-slate-500 block">
                      Nombre registrado: <strong>Fundación Manos Abiertas de Jesús y María Inc.</strong>
                    </span>
                  </div>

                  {/* Simple Instructions */}
                  <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                    <span className="font-bold text-slate-900 block mb-1">
                      Pasos para enviar por Zelle:
                    </span>
                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-800 font-bold flex items-center justify-center flex-shrink-0 text-[10px]">1</span>
                      <span>Abre la app de tu banco estadounidense (Chase, Bank of America, Wells Fargo, etc.) y ve a <strong>Zelle</strong>.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-800 font-bold flex items-center justify-center flex-shrink-0 text-[10px]">2</span>
                      <span>Pega el correo <strong>{zelleEmail}</strong> e ingresa el monto que deseas donar.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-800 font-bold flex items-center justify-center flex-shrink-0 text-[10px]">3</span>
                      <span>En el mensaje o nota opcional puedes colocar tu nombre o intención de oración.</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full py-3.5 rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    <span>Ya realicé mi transferencia por Zelle</span>
                  </button>
                </div>
              )}

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
