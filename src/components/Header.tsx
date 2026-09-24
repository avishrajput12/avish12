import React, { useState } from 'react';
import { Search, ShoppingBag, Globe, Sparkles, ChevronDown, Check } from 'lucide-react';
import { CurrencyCode, LanguageCode, RegionConfig } from '../types/store';
import { CURRENCIES, REGIONS } from '../data/currencies';
import { TRANSLATIONS } from '../data/translations';

interface HeaderProps {
  currentLang: LanguageCode;
  currentCurrency: CurrencyCode;
  currentRegion: RegionConfig;
  cartCount: number;
  activeCategory: string;
  isCpcActive: boolean;
  onSelectCategory: (cat: string) => void;
  onChangeRegion: (region: RegionConfig) => void;
  onChangeCurrency: (currency: CurrencyCode) => void;
  onChangeLang: (lang: LanguageCode) => void;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  showAuditHighlights: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  currentCurrency,
  currentRegion,
  cartCount,
  activeCategory,
  isCpcActive,
  onSelectCategory,
  onChangeRegion,
  onChangeCurrency,
  onChangeLang,
  onOpenCart,
  onOpenSearch,
  showAuditHighlights,
}) => {
  const [isRegionMenuOpen, setIsRegionMenuOpen] = useState(false);
  const t = TRANSLATIONS[currentLang];

  const navItems = [
    { id: 'all', label: t.navAll },
    { id: 'apparel', label: t.navApparel },
    { id: 'drinkware', label: t.navDrinkware },
    { id: 'bags', label: t.navBags },
    { id: 'campus', label: t.navCampus },
    { id: 'bestseller', label: t.navBestsellers },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200">
      {/* Top localized banner - addresses Operational Change #3 (Tokyo / APAC friction) & #2 (CPC) */}
      <div className="bg-[#202124] text-white px-4 py-2 text-xs font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            {isCpcActive ? (
              <span className="flex items-center gap-1.5 text-amber-300 font-semibold">
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span>{t.cpcBannerTitle}:</span>
                <span className="text-white font-normal truncate">{t.cpcPromoCode}</span>
              </span>
            ) : currentRegion.id === 'jp-tokyo' ? (
              <span className="flex items-center gap-1.5 text-emerald-300 font-semibold truncate">
                <span>{currentRegion.flag}</span>
                <span>{t.regionalNoticeTokyo}</span>
              </span>
            ) : (
              <span className="flex items-center gap-2 truncate">
                <span>{currentRegion.flag}</span>
                <span>{currentRegion.id === 'us' ? t.regionalNoticeUS : t.regionalNoticeGeneral}</span>
                <span className="text-neutral-400 hidden md:inline">·</span>
                <span className="text-neutral-300 hidden md:inline">{currentRegion.customsPolicy}</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 shrink-0 pl-2">
            <button
              onClick={() => setIsRegionMenuOpen(!isRegionMenuOpen)}
              className="flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors cursor-pointer text-xs"
            >
              <span>{currentRegion.flag}</span>
              <span className="font-semibold text-white">{currentCurrency}</span>
              <span className="text-neutral-400">({currentLang.toUpperCase()})</span>
              <ChevronDown className="w-3 h-3 text-neutral-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Region & Currency Selector Dropdown Modal */}
      {isRegionMenuOpen && (
        <div className="absolute right-4 md:right-12 top-11 z-50 w-80 bg-white rounded-xl shadow-2xl border border-neutral-200 p-4 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <span className="font-semibold text-neutral-900 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-[#4285F4]" />
              {t.shipTo} & {t.currency}
            </span>
            <button
              onClick={() => setIsRegionMenuOpen(false)}
              className="text-neutral-400 hover:text-neutral-800 font-bold px-1"
            >
              ✕
            </button>
          </div>

          {/* Region list */}
          <div className="py-2.5">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
              Region & Shipping Destination
            </div>
            <div className="space-y-1">
              {REGIONS.map((reg) => (
                <button
                  key={reg.id}
                  onClick={() => {
                    onChangeRegion(reg);
                    setIsRegionMenuOpen(false);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors ${
                    currentRegion.id === reg.id
                      ? 'bg-blue-50 text-[#1a73e8] font-medium'
                      : 'hover:bg-neutral-50 text-neutral-700'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-base">{reg.flag}</span>
                    <span className="truncate">{reg.name}</span>
                  </span>
                  {currentRegion.id === reg.id && <Check className="w-3.5 h-3.5 shrink-0" />}
                </button>
              ))}
            </div>
          </div>

          {/* Currency selector */}
          <div className="pt-2 border-t border-neutral-100">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
              Currency
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {(Object.keys(CURRENCIES) as CurrencyCode[]).map((c) => (
                <button
                  key={c}
                  onClick={() => onChangeCurrency(c)}
                  className={`px-2 py-1 rounded text-center font-mono text-xs transition-colors ${
                    currentCurrency === c
                      ? 'bg-[#1a73e8] text-white font-bold'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {c} ({CURRENCIES[c].symbol})
                </button>
              ))}
            </div>
          </div>

          {/* Language selector */}
          <div className="pt-2.5 mt-2 border-t border-neutral-100">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
              Interface Language
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { code: 'en', label: 'English' },
                { code: 'ja', label: '日本語 (Japanese)' },
                { code: 'zh', label: '简体中文 (Chinese)' },
                { code: 'es', label: 'Español (Spanish)' },
              ].map((l) => (
                <button
                  key={l.code}
                  onClick={() => onChangeLang(l.code as LanguageCode)}
                  className={`px-2 py-1 rounded text-xs text-left truncate transition-colors ${
                    currentLang === l.code
                      ? 'bg-blue-50 text-[#1a73e8] font-bold border border-blue-200'
                      : 'bg-neutral-50 text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Top Bar (Conforms strictly to Section 2 Top Bar Contract) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onSelectCategory('all')}
          className="flex items-center gap-2 group cursor-pointer text-left shrink-0"
        >
          {/* Subtle Google quad-color dots */}
          <div className="flex items-center gap-0.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4285F4]"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#EA4335]"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#FBBC05]"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#34A853]"></span>
          </div>
          <span className="text-lg font-bold tracking-tight text-neutral-900 group-hover:text-[#4285F4] transition-colors whitespace-nowrap">
            {t.brandTitle}
          </span>
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-600">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectCategory(item.id)}
              className={`transition-colors whitespace-nowrap cursor-pointer hover:text-neutral-900 ${
                activeCategory === item.id
                  ? 'text-[#1a73e8] font-semibold border-b-2 border-[#1a73e8] pb-1'
                  : 'text-neutral-600'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors cursor-pointer"
            aria-label="Search merchandise"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Cart Trigger Button */}
          <button
            onClick={onOpenCart}
            className={`relative flex items-center gap-2 px-3.5 py-2 rounded-full font-medium text-sm transition-all cursor-pointer ${
              showAuditHighlights
                ? 'ring-2 ring-emerald-500 shadow-sm'
                : 'hover:bg-neutral-100'
            } ${
              cartCount > 0
                ? 'bg-blue-50 text-[#1a73e8] hover:bg-blue-100'
                : 'bg-neutral-100 text-neutral-700'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">{t.cart}</span>
            <span className="font-bold tabular-nums text-xs px-1.5 py-0.5 bg-[#1a73e8] text-white rounded-full">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
