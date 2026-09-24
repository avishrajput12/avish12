import React from 'react';
import { ShoppingBag, Zap, Star } from 'lucide-react';
import { Product, CurrencyConfig, LanguageCode } from '../types/store';
import { TRANSLATIONS } from '../data/translations';

interface ProductCardProps {
  product: Product;
  currency: CurrencyConfig;
  lang: LanguageCode;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onInstantBuy: (product: Product) => void;
  showAuditHighlights: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  lang,
  onAddToCart,
  onQuickView,
  onInstantBuy,
  showAuditHighlights,
}) => {
  const t = TRANSLATIONS[lang];
  const localizedName = (lang !== 'en' && product.localizedNames?.[lang]) ? product.localizedNames[lang]! : product.name;

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl border border-neutral-200/90 overflow-hidden hover:border-neutral-300 hover:shadow-md transition-all duration-200">
      {/* Visual Image container (takes ~65% of top height on neutral backdrop) */}
      <div 
        onClick={() => onQuickView(product)}
        className="relative aspect-[4/3] bg-[#F8F9FA] overflow-hidden cursor-pointer flex items-center justify-center p-4"
      >
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Quiet, unboxed single status indicator or scarcity note adhering to Zero-Pill discipline */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.stockLeft <= 5 && (
            <div className="bg-amber-500 text-white text-[11px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs">
              <Zap className="w-3 h-3 fill-white" />
              <span>{t.onlyXLeft.replace('{count}', String(product.stockLeft))}</span>
            </div>
          )}

          {product.isBestseller && product.stockLeft > 5 && (
            <div className="bg-neutral-900 text-white text-[11px] font-medium px-2 py-0.5 rounded-md">
              Bestseller
            </div>
          )}
        </div>

        {/* Live viewers indicator (subtle social proof) */}
        <div className="absolute bottom-2 left-3 text-[11px] text-neutral-500 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-md flex items-center gap-1 border border-neutral-200/50">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>{product.liveViewersCount} viewing</span>
        </div>

        {/* Hover Quick View Overlay */}
        <div className="absolute inset-0 bg-neutral-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="bg-white/95 text-neutral-900 text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
            {t.viewDetails}
          </span>
        </div>
      </div>

      {/* Card Content & Action Area */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
            <span className="uppercase tracking-wider font-semibold text-[10px] text-neutral-500">
              {product.subcategory}
            </span>
            <div className="flex items-center gap-1 text-neutral-700 font-medium">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="tabular-nums">{product.rating}</span>
              <span className="text-neutral-400">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => onQuickView(product)}
            className="font-semibold text-neutral-900 text-sm hover:text-[#1a73e8] transition-colors cursor-pointer line-clamp-1"
            title={localizedName}
          >
            {localizedName}
          </h3>

          {/* Subtle description preview */}
          <p className="text-xs text-neutral-500 mt-1 line-clamp-2 leading-relaxed">
            {(lang !== 'en' && product.localizedDesc?.[lang]) ? product.localizedDesc[lang] : product.shortDesc}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-neutral-100">
          <div className="flex items-baseline justify-between mb-3">
            {/* Price formatted in user's active localized currency */}
            <div className="text-base font-bold text-neutral-900 font-mono tabular-nums">
              {currency.format(product.priceUSD)}
            </div>

            {/* In stock tag */}
            <div className="text-[11px] font-medium text-emerald-700 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>{t.inStockOnly}</span>
            </div>
          </div>

          {/* Action buttons: Quick Add + Express 1-click buy */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onAddToCart(product)}
              className="w-full py-2 px-2 text-xs font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span className="truncate">{t.addToBag}</span>
            </button>

            {/* Express Buy with Google Pay */}
            <button
              onClick={() => onInstantBuy(product)}
              className="w-full py-2 px-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              title="Instant 1-Click Guest Checkout"
            >
              <span className="font-bold text-[11px] tracking-tight">GPay</span>
              <span className="truncate">Buy Now</span>
            </button>
          </div>

          {/* Audit Note indicator */}
          {showAuditHighlights && product.bounceRateNote && (
            <div className="mt-2 text-[10px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-mono truncate">
              {product.bounceRateNote}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
