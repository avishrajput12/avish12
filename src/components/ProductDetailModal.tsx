import React, { useState } from 'react';
import { X, Star, ShoppingBag, ShieldCheck, Truck, RotateCcw, Zap, Globe, Check } from 'lucide-react';
import { Product, CurrencyConfig, LanguageCode, RegionConfig } from '../types/store';
import { TRANSLATIONS } from '../data/translations';

interface ProductDetailModalProps {
  product: Product | null;
  currency: CurrencyConfig;
  lang: LanguageCode;
  region: RegionConfig;
  onClose: () => void;
  onAddToCart: (product: Product, size?: string, color?: string) => void;
  onInstantBuy: (product: Product, size?: string, color?: string) => void;
  showAuditHighlights: boolean;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  currency,
  lang,
  region,
  onClose,
  onAddToCart,
  onInstantBuy,
  showAuditHighlights,
}) => {
  if (!product) return null;

  const t = TRANSLATIONS[lang];
  const localizedName = (lang !== 'en' && product.localizedNames?.[lang]) ? product.localizedNames[lang]! : product.name;
  const localizedDesc = (lang !== 'en' && product.localizedDesc?.[lang]) ? product.localizedDesc[lang]! : product.shortDesc;

  const [selectedSize, setSelectedSize] = useState<string | undefined>(product.sizes ? product.sizes[0] : undefined);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || '');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col md:flex-row max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-neutral-100 flex items-center justify-center text-neutral-500 hover:text-neutral-900 border border-neutral-200 shadow-xs transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Gallery / Left Side */}
        <div className="w-full md:w-1/2 bg-[#F8F9FA] p-6 sm:p-8 flex flex-col items-center justify-center relative border-b md:border-b-0 md:border-r border-neutral-200">
          <div className="relative w-full aspect-square max-w-sm flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="max-h-full max-w-full object-contain drop-shadow-md hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Social Proof & Live Viewers */}
          <div className="mt-4 flex items-center gap-2 bg-white/95 px-3 py-1.5 rounded-full border border-neutral-200 text-xs text-neutral-600 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{t.activeShoppers.replace('{count}', String(product.liveViewersCount))}</span>
          </div>
        </div>

        {/* Purchase Module / Right Side (Contiguous purchase module per reference guidelines) */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between">
          <div>
            {/* Category & Rating */}
            <div className="flex items-center justify-between text-xs text-neutral-500 mb-2">
              <span className="uppercase tracking-wider font-semibold text-[11px] text-neutral-600">
                {product.subcategory}
              </span>
              <div className="flex items-center gap-1 font-medium text-neutral-800">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="tabular-nums font-semibold">{product.rating}</span>
                <span className="text-neutral-400">({product.reviewsCount} reviews)</span>
              </div>
            </div>

            {/* Product Title */}
            <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight leading-snug">
              {localizedName}
            </h1>

            {/* Price in localized currency */}
            <div className="mt-3 flex items-baseline gap-3">
              <span className="text-2xl font-bold font-mono text-neutral-900 tabular-nums">
                {currency.format(product.priceUSD)}
              </span>
              <span className="text-xs text-neutral-500">
                ({currency.code})
              </span>
            </div>

            {/* Operational Change #4: Real-time stock scarcity trigger */}
            <div className="mt-3 p-2.5 bg-amber-50/80 border border-amber-200 rounded-xl flex items-center justify-between text-xs text-amber-900">
              <div className="flex items-center gap-2 font-semibold">
                <Zap className="w-4 h-4 text-amber-600 fill-amber-500" />
                <span>{t.onlyXLeft.replace('{count}', String(product.stockLeft))}</span>
              </div>
              <span className="text-[11px] text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded">
                High Demand
              </span>
            </div>

            {/* Description */}
            <p className="mt-4 text-sm text-neutral-600 leading-relaxed">
              {localizedDesc}
            </p>

            {/* Color selection if available */}
            {product.colors && product.colors.length > 0 && (
              <div className="mt-5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                  {t.selectColor}: <span className="text-neutral-900 normal-case">{selectedColor}</span>
                </label>
                <div className="flex items-center gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-7 h-7 rounded-full border-2 transition-all cursor-pointer flex items-center justify-center ${
                        selectedColor === c.name
                          ? 'border-[#1a73e8] ring-2 ring-[#1a73e8]/30 scale-110'
                          : 'border-neutral-300 hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {selectedColor === c.name && (
                        <Check className={`w-3.5 h-3.5 ${c.hex === '#F3F4F6' || c.hex === '#F9FAFB' || c.hex === '#FFFFFF' ? 'text-black' : 'text-white'}`} />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size selection if clothing */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mt-5">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    {t.selectSize}
                  </label>
                  <span className="text-[11px] text-neutral-400">Standard Unisex Fit</span>
                </div>
                <div className="grid grid-cols-6 gap-1.5">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`py-2 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                        selectedSize === s
                          ? 'border-[#1a73e8] bg-blue-50 text-[#1a73e8] font-bold shadow-xs'
                          : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Operational Change #3: Explicit International Shipping & Customs Notice */}
            <div className="mt-5 p-3 rounded-xl bg-neutral-50 border border-neutral-200/80 text-xs">
              <div className="flex items-start gap-2.5">
                <Truck className="w-4 h-4 text-neutral-700 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-neutral-900 flex items-center gap-1.5">
                    <span>{region.flag} {t.estimatedDeliveryLabel}: {region.estimatedDelivery}</span>
                  </div>
                  <p className="text-neutral-500 text-[11px] mt-0.5 leading-snug">
                    Carrier: {region.shippingCarrier}. {region.customsPolicy}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buy Buttons */}
          <div className="mt-6 pt-4 border-t border-neutral-200">
            {/* Operational Change #4: Express 1-click Google Pay */}
            <button
              onClick={() => {
                onInstantBuy(product, selectedSize, selectedColor);
                onClose();
              }}
              className="w-full py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md mb-2.5"
            >
              <div className="flex items-center gap-1 font-bold">
                <span className="tracking-tight text-base">Google Pay</span>
              </div>
              <span className="text-neutral-400">|</span>
              <span>Express 1-Click Checkout</span>
            </button>

            {/* Add to Bag button */}
            <button
              onClick={() => {
                onAddToCart(product, selectedSize, selectedColor);
                onClose();
              }}
              className="w-full py-3 bg-[#1a73e8] hover:bg-[#174ea6] text-white rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{t.addToBag}</span>
            </button>

            {/* Trust Badges */}
            <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] text-neutral-500 pt-3 border-t border-neutral-100">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate">{t.trustAuthentic}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <RotateCcw className="w-3.5 h-3.5 text-[#1a73e8] shrink-0" />
                <span className="truncate">{t.trustReturns}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
