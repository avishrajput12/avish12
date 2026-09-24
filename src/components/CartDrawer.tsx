import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { CartItem, CurrencyConfig, LanguageCode, RegionConfig } from '../types/store';
import { TRANSLATIONS } from '../data/translations';

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  currency: CurrencyConfig;
  lang: LanguageCode;
  region: RegionConfig;
  promoCode: string;
  isPromoApplied: boolean;
  onClose: () => void;
  onUpdateQty: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
  onExpressGPay: () => void;
  showAuditHighlights: boolean;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  items,
  currency,
  lang,
  region,
  promoCode,
  isPromoApplied,
  onClose,
  onUpdateQty,
  onRemoveItem,
  onProceedToCheckout,
  onExpressGPay,
  showAuditHighlights,
}) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS[lang];

  const subtotalUSD = items.reduce((sum, item) => sum + item.product.priceUSD * item.quantity, 0);
  const discountUSD = isPromoApplied ? subtotalUSD * 0.15 : 0;
  const discountedSubtotalUSD = Math.max(0, subtotalUSD - discountUSD);

  const freeThresholdLocal = currency.freeShippingThreshold;
  const currentSubtotalLocal = discountedSubtotalUSD * currency.rateFromUSD;
  const isFreeShipping = currentSubtotalLocal >= freeThresholdLocal;
  const amountNeededUSD = Math.max(0, (freeThresholdLocal / currency.rateFromUSD) - discountedSubtotalUSD);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-neutral-900/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-neutral-900">
              {t.cartTitle}
            </h2>
            <span className="text-xs font-mono font-semibold bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-full">
              {items.reduce((acc, i) => acc + i.quantity, 0)}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-neutral-100 flex items-center justify-center text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress bar */}
        <div className="px-5 py-3 bg-neutral-50 border-b border-neutral-200/80 text-xs">
          {isFreeShipping ? (
            <div className="text-emerald-700 font-semibold flex items-center gap-1.5">
              <span>{t.freeShippingQualified}</span>
            </div>
          ) : (
            <div>
              <p className="text-neutral-600 font-medium mb-1.5">
                {t.freeShippingAddMore.replace('{amount}', currency.format(amountNeededUSD))}
              </p>
              <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (currentSubtotalLocal / freeThresholdLocal) * 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Items list */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-neutral-100">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 mb-3">
                <X className="w-8 h-8" />
              </div>
              <p className="text-neutral-600 font-medium text-sm">
                {t.cartEmpty}
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-4 py-2 bg-neutral-900 text-white rounded-xl text-xs font-semibold hover:bg-neutral-800 transition-colors"
              >
                {t.cartEmptyAction}
              </button>
            </div>
          ) : (
            items.map((item) => {
              const localizedName = (lang !== 'en' && item.product.localizedNames?.[lang])
                ? item.product.localizedNames[lang]
                : item.product.name;

              return (
                <div key={item.product.id} className="py-3.5 flex gap-3.5">
                  <div className="w-20 h-20 bg-neutral-50 rounded-xl border border-neutral-200 p-1.5 flex items-center justify-center shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h3 className="font-semibold text-neutral-900 text-xs sm:text-sm line-clamp-1">
                          {localizedName}
                        </h3>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-neutral-400 hover:text-red-500 transition-colors p-0.5"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-neutral-500 mt-0.5 flex items-center gap-2">
                        {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                        {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-neutral-200 rounded-lg">
                        <button
                          onClick={() => onUpdateQty(item.product.id, -1)}
                          className="w-6 h-6 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 rounded-l-lg transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center font-mono text-xs font-semibold tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQty(item.product.id, 1)}
                          className="w-6 h-6 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 rounded-r-lg transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price in active currency */}
                      <div className="text-right font-mono font-bold text-xs sm:text-sm text-neutral-900 tabular-nums">
                        {currency.format(item.product.priceUSD * item.quantity)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer / Express Checkout Section */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-neutral-200 bg-white">
            {/* Promo code badge if applied */}
            {isPromoApplied && (
              <div className="mb-3 p-2 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-between text-xs text-emerald-800">
                <span className="font-medium">15% Welcome Discount (GOOGLECPC15)</span>
                <span className="font-mono font-bold">-{currency.format(discountUSD)}</span>
              </div>
            )}

            {/* Calculations breakdown */}
            <div className="space-y-1.5 text-xs text-neutral-600 mb-4">
              <div className="flex items-center justify-between">
                <span>{t.subtotal}</span>
                <span className="font-mono tabular-nums text-neutral-900">
                  {currency.format(discountedSubtotalUSD)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>{t.shipping} ({region.country})</span>
                <span className="font-mono tabular-nums font-semibold text-emerald-700">
                  {isFreeShipping ? t.free : currency.format(12)}
                </span>
              </div>
              <div className="flex items-center justify-between text-neutral-500 text-[11px]">
                <span>{t.estimatedTax}</span>
                <span>Pre-calculated</span>
              </div>
              <div className="pt-2 border-t border-neutral-100 flex items-center justify-between font-bold text-base text-neutral-900">
                <span>{t.total}</span>
                <span className="font-mono tabular-nums">
                  {currency.format(discountedSubtotalUSD + (isFreeShipping ? 0 : 12))}
                </span>
              </div>
            </div>

            {/* Operational Change #4: Express One-Click Checkout with Google Pay */}
            <div className="space-y-2">
              <button
                onClick={onExpressGPay}
                className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
              >
                <span className="font-bold text-base tracking-tight">Google Pay</span>
                <span className="text-neutral-400">|</span>
                <span>Express One-Click</span>
              </button>

              <button
                onClick={onProceedToCheckout}
                className="w-full py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>{t.guestCheckoutTitle}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Trust note */}
            <p className="mt-3 text-[10px] text-center text-neutral-400 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>Zero account creation required · Instant Guest Checkout</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
