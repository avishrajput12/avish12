import React, { useState } from 'react';
import { X, Lock, ShieldCheck, CheckCircle2, CreditCard, ChevronRight, Zap } from 'lucide-react';
import { CartItem, CurrencyConfig, LanguageCode, RegionConfig } from '../types/store';
import { TRANSLATIONS } from '../data/translations';

interface CheckoutModalProps {
  isOpen: boolean;
  items: CartItem[];
  currency: CurrencyConfig;
  lang: LanguageCode;
  region: RegionConfig;
  isPromoApplied: boolean;
  onClose: () => void;
  onCompleteOrder: (orderDetails: any) => void;
  showAuditHighlights: boolean;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  items,
  currency,
  lang,
  region,
  isPromoApplied,
  onClose,
  onCompleteOrder,
  showAuditHighlights,
}) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS[lang];

  // Form states initialized with realistic default guest values for smooth checkout
  const [email, setEmail] = useState('shopper@gmail.com');
  const [fullName, setFullName] = useState(region.id === 'jp-tokyo' ? 'Kenji Sato' : 'Alex Mercer');
  const [address, setAddress] = useState(
    region.id === 'jp-tokyo' ? '2-15-1 Minami-Ikebukuro, Toshima-ku' : '1600 Amphitheatre Parkway'
  );
  const [city, setCity] = useState(region.id === 'jp-tokyo' ? 'Tokyo' : 'Mountain View');
  const [postalCode, setPostalCode] = useState(region.id === 'jp-tokyo' ? '171-0022' : '94043');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'gpay' | 'card'>('gpay');

  const subtotalUSD = items.reduce((sum, item) => sum + item.product.priceUSD * item.quantity, 0);
  const discountUSD = isPromoApplied ? subtotalUSD * 0.15 : 0;
  const discountedSubtotalUSD = Math.max(0, subtotalUSD - discountUSD);
  const isFreeShipping = (discountedSubtotalUSD * currency.rateFromUSD) >= currency.freeShippingThreshold;
  const shippingFeeUSD = isFreeShipping ? 0 : 12;
  const totalUSD = discountedSubtotalUSD + shippingFeeUSD;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      onCompleteOrder({
        orderNumber: 'GOOG-' + Math.floor(100000 + Math.random() * 900000),
        items,
        totalFormatted: currency.format(totalUSD),
        email,
        fullName,
        destination: `${address}, ${city}, ${region.country}`,
        carrier: region.shippingCarrier,
        deliveryEstimate: region.estimatedDelivery,
      });
    }, 1200);
  };

  const handleQuickFillSample = (type: 'tokyo' | 'us') => {
    if (type === 'tokyo') {
      setEmail('kenji.sato@example.jp');
      setFullName('Kenji Sato');
      setAddress('3-1-1 Roppongi, Minato-ku');
      setCity('Tokyo');
      setPostalCode('106-0032');
    } else {
      setEmail('alex.mercer@gmail.com');
      setFullName('Alex Mercer');
      setAddress('1600 Amphitheatre Pkwy');
      setCity('Mountain View');
      setPostalCode('94043');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-blue-50 text-[#1a73e8] flex items-center justify-center font-bold">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-neutral-900">
                {t.guestCheckoutTitle}
              </h2>
              <p className="text-xs text-neutral-500">
                {t.guestCheckoutSubtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-neutral-200/80 flex items-center justify-center text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Audit Callout if active */}
        {showAuditHighlights && (
          <div className="px-5 py-2.5 bg-blue-50/80 border-b border-blue-200/70 text-xs text-blue-900 flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              <strong>Operational Change #4:</strong> Frictionless Guest Checkout eliminates mandatory account creation for the 80.9% unknown demographic, capturing the $197k checkout revenue funnel with zero drop-off.
            </span>
          </div>
        )}

        {/* Content Body */}
        <form onSubmit={handlePlaceOrder} className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Column: Form Details (7 cols) */}
          <div className="md:col-span-7 space-y-4">
            {/* Express Pay Header */}
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                {t.expressCheckoutHeader}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('gpay')}
                  className={`py-2.5 px-3 rounded-xl border flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    paymentMethod === 'gpay'
                      ? 'border-neutral-900 bg-neutral-900 text-white shadow-xs font-bold'
                      : 'border-neutral-300 bg-white text-neutral-800 hover:border-neutral-400'
                  }`}
                >
                  <span className="font-bold text-sm tracking-tight">Google Pay</span>
                  {paymentMethod === 'gpay' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`py-2.5 px-3 rounded-xl border flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'border-[#1a73e8] bg-blue-50 text-[#1a73e8] shadow-xs font-bold'
                      : 'border-neutral-300 bg-white text-neutral-800 hover:border-neutral-400'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span className="text-xs font-medium">Credit / Debit Card</span>
                </button>
              </div>
            </div>

            {/* Quick autofill sample buttons for rapid evaluation */}
            <div className="flex items-center gap-2 text-[11px] text-neutral-500 bg-neutral-50 p-2 rounded-lg border border-neutral-200">
              <span className="font-semibold text-neutral-700">Autofill Demo:</span>
              <button
                type="button"
                onClick={() => handleQuickFillSample('tokyo')}
                className="text-[#1a73e8] hover:underline font-medium cursor-pointer"
              >
                Tokyo Address (🇯🇵)
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => handleQuickFillSample('us')}
                className="text-[#1a73e8] hover:underline font-medium cursor-pointer"
              >
                US Address (🇺🇸)
              </button>
            </div>

            {/* Contact Email */}
            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1">
                {t.emailLabel}
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#1a73e8] focus:border-[#1a73e8]"
                placeholder="name@example.com"
              />
            </div>

            {/* Recipient Full Name */}
            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1">
                {t.fullNameLabel}
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#1a73e8] focus:border-[#1a73e8]"
              />
            </div>

            {/* Street Address */}
            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1">
                {t.addressLabel}
              </label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#1a73e8] focus:border-[#1a73e8]"
              />
            </div>

            {/* City & Postal Code */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">
                  {t.cityLabel}
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#1a73e8] focus:border-[#1a73e8]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">
                  {t.postalCodeLabel}
                </label>
                <input
                  type="text"
                  required
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#1a73e8] focus:border-[#1a73e8]"
                />
              </div>
            </div>

            {/* Regional Delivery Guarantee Notice */}
            <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-200 text-xs text-neutral-700">
              <div className="font-semibold text-neutral-900 flex items-center gap-1.5 mb-0.5">
                <span>{region.flag}</span>
                <span>{region.name} Delivery Guarantee</span>
              </div>
              <p className="text-[11px] text-neutral-600">
                {region.shippingCarrier} · Estimated: {region.estimatedDelivery}. {region.customsPolicy}
              </p>
            </div>
          </div>

          {/* Right Column: Order Summary (5 cols) */}
          <div className="md:col-span-5 bg-neutral-50 rounded-2xl p-4 sm:p-5 flex flex-col justify-between border border-neutral-200/80">
            <div>
              <h3 className="font-bold text-neutral-900 text-sm mb-3">
                Order Summary ({items.reduce((a, b) => a + b.quantity, 0)} items)
              </h3>

              {/* Items summary */}
              <div className="max-h-48 overflow-y-auto space-y-2.5 pr-1 divide-y divide-neutral-200/60">
                {items.map((i) => (
                  <div key={i.product.id} className="pt-2 first:pt-0 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <img
                        src={i.product.image}
                        alt={i.product.name}
                        referrerPolicy="no-referrer"
                        className="w-9 h-9 object-contain bg-white rounded-lg p-0.5 border border-neutral-200 shrink-0"
                      />
                      <div className="truncate">
                        <p className="font-medium text-neutral-900 truncate">{i.product.name}</p>
                        <p className="text-neutral-500 text-[10px]">Qty: {i.quantity}</p>
                      </div>
                    </div>
                    <span className="font-mono tabular-nums font-semibold text-neutral-900 ml-2 shrink-0">
                      {currency.format(i.product.priceUSD * i.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Cost Breakdown */}
              <div className="mt-4 pt-3 border-t border-neutral-200 space-y-2 text-xs">
                <div className="flex justify-between text-neutral-600">
                  <span>{t.subtotal}</span>
                  <span className="font-mono tabular-nums">{currency.format(subtotalUSD)}</span>
                </div>

                {isPromoApplied && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>15% Welcome Discount</span>
                    <span className="font-mono tabular-nums">-{currency.format(discountUSD)}</span>
                  </div>
                )}

                <div className="flex justify-between text-neutral-600">
                  <span>{t.shipping}</span>
                  <span className="font-mono tabular-nums font-semibold text-emerald-700">
                    {isFreeShipping ? t.free : currency.format(shippingFeeUSD)}
                  </span>
                </div>

                <div className="flex justify-between text-neutral-500 text-[11px]">
                  <span>{t.estimatedTax}</span>
                  <span className="text-emerald-700 font-medium">Included / Pre-paid</span>
                </div>

                <div className="pt-2 border-t border-neutral-300 flex justify-between font-bold text-base text-neutral-900">
                  <span>{t.total}</span>
                  <span className="font-mono tabular-nums">{currency.format(totalUSD)}</span>
                </div>
              </div>
            </div>

            {/* Place Order CTA */}
            <div className="mt-6 pt-3 border-t border-neutral-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#1a73e8] hover:bg-[#174ea6] text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>{t.orderProcessing}</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>{t.placeOrderBtn} ({currency.format(totalUSD)})</span>
                  </>
                )}
              </button>

              <div className="mt-3 flex items-center justify-center gap-2 text-[10px] text-neutral-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>256-Bit SSL Encrypted · 30-Day Money Back Guarantee</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
