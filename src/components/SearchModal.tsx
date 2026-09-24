import React, { useState, useMemo } from 'react';
import { Search, X, Star, ShoppingBag, ArrowRight } from 'lucide-react';
import { Product, CurrencyConfig, LanguageCode } from '../types/store';
import { PRODUCTS } from '../data/products';
import { TRANSLATIONS } from '../data/translations';

interface SearchModalProps {
  isOpen: boolean;
  currency: CurrencyConfig;
  lang: LanguageCode;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  currency,
  lang,
  onClose,
  onSelectProduct,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');
  const t = TRANSLATIONS[lang];

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return PRODUCTS.slice(0, 4); // Show top popular
    const q = query.toLowerCase();
    return PRODUCTS.filter((p) => {
      const matchName = p.name.toLowerCase().includes(q);
      const matchCat = p.category.toLowerCase().includes(q) || p.subcategory.toLowerCase().includes(q);
      const matchDesc = p.shortDesc.toLowerCase().includes(q);
      const matchLocName = p.localizedNames?.[lang]?.toLowerCase().includes(q);
      return matchName || matchCat || matchDesc || matchLocName;
    });
  }, [query, lang]);

  const quickTerms = ['Hoodie', 'Tumbler', 'Backpack', 'Organic Tee', 'Notebook'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/60 backdrop-blur-xs flex items-start justify-center p-4 pt-16 sm:pt-24 animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-neutral-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="flex-1 text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-neutral-400 hover:text-neutral-700 text-xs px-2 py-1 rounded bg-neutral-100"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-neutral-100 flex items-center justify-center text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-5 py-2.5 bg-neutral-50 border-b border-neutral-100 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-neutral-400 shrink-0">Popular:</span>
          {quickTerms.map((term) => (
            <button
              key={term}
              onClick={() => setQuery(term)}
              className="px-2.5 py-1 rounded-full bg-white border border-neutral-200 text-neutral-700 hover:border-[#1a73e8] hover:text-[#1a73e8] transition-colors shrink-0"
            >
              {term}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="max-h-96 overflow-y-auto p-4 divide-y divide-neutral-100">
          {filteredProducts.length === 0 ? (
            <div className="p-8 text-center text-neutral-500 text-xs">
              No products found matching "{query}". Try checking your spelling or searching for hoodies, tumblers, or backpacks.
            </div>
          ) : (
            filteredProducts.map((p) => {
              const localizedName = (lang !== 'en' && p.localizedNames?.[lang]) ? p.localizedNames[lang]! : p.name;
              return (
                <div
                  key={p.id}
                  className="py-3 flex items-center justify-between gap-3 hover:bg-neutral-50 rounded-xl px-2 transition-colors cursor-pointer group"
                  onClick={() => {
                    onSelectProduct(p);
                    onClose();
                  }}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={p.image}
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 object-contain bg-[#F8F9FA] rounded-lg p-1 border border-neutral-200 shrink-0"
                    />
                    <div>
                      <h4 className="font-semibold text-neutral-900 text-xs sm:text-sm group-hover:text-[#1a73e8] transition-colors">
                        {localizedName}
                      </h4>
                      <div className="flex items-center gap-2 text-[11px] text-neutral-500 mt-0.5">
                        <span className="uppercase text-[10px] tracking-wider">{p.subcategory}</span>
                        <span>·</span>
                        <div className="flex items-center gap-0.5 text-neutral-700">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span className="tabular-nums">{p.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-xs sm:text-sm text-neutral-900 tabular-nums">
                      {currency.format(p.priceUSD)}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(p);
                        onClose();
                      }}
                      className="p-2 bg-neutral-100 group-hover:bg-[#1a73e8] group-hover:text-white rounded-lg transition-colors text-neutral-700"
                      title="Add to bag"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
