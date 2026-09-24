import React from 'react';
import { Shirt, Coffee, Backpack, Sparkles, Flame, Leaf, ArrowRight } from 'lucide-react';
import { LanguageCode } from '../types/store';
import { TRANSLATIONS } from '../data/translations';

interface CategoryHubsProps {
  currentLang: LanguageCode;
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  showAuditHighlights: boolean;
}

export const CategoryHubs: React.FC<CategoryHubsProps> = ({
  currentLang,
  activeCategory,
  onSelectCategory,
  showAuditHighlights,
}) => {
  const t = TRANSLATIONS[currentLang];

  const hubs = [
    {
      id: 'apparel',
      title: t.hubApparel,
      desc: t.hubApparelDesc,
      icon: Shirt,
      gradient: 'from-blue-500/10 to-indigo-500/10 border-blue-200/80',
      iconColor: 'text-[#4285F4]',
      badge: 'GA4: 11.8% Bounce Rate Category',
      popularTag: 'Most Visited',
    },
    {
      id: 'drinkware',
      title: t.hubDrinkware,
      desc: t.hubDrinkwareDesc,
      icon: Coffee,
      gradient: 'from-emerald-500/10 to-teal-500/10 border-emerald-200/80',
      iconColor: 'text-[#34A853]',
      badge: 'High Conversion / Fast Dispatch',
      popularTag: 'Bestseller',
    },
    {
      id: 'bags',
      title: t.hubBags,
      desc: t.hubBagsDesc,
      icon: Backpack,
      gradient: 'from-amber-500/10 to-orange-500/10 border-amber-200/80',
      iconColor: 'text-[#FBBC05]',
      badge: 'High AOV Cart Value',
      popularTag: 'Commute Gear',
    },
    {
      id: 'campus',
      title: t.hubCampus,
      desc: t.hubCampusDesc,
      icon: Sparkles,
      gradient: 'from-purple-500/10 to-pink-500/10 border-purple-200/80',
      iconColor: 'text-purple-600',
      badge: 'Low Friction Impulse Items',
      popularTag: 'Collectibles',
    },
  ];

  return (
    <section className="relative pt-6 pb-2">
      {/* GA4 Optimization Annotation Banner when audit highlights is ON */}
      {showAuditHighlights && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-start sm:items-center justify-between gap-3 text-xs text-blue-900">
          <div className="flex items-center gap-2 font-medium">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse shrink-0"></span>
            <span>
              <strong>Operational Change #1 Active:</strong> Direct Dynamic Category Hubs right above the fold to cut the 68.1% Home Bounce Rate down to the ~11.8% benchmark observed in category sub-pages.
            </span>
          </div>
          <span className="shrink-0 font-mono text-[11px] bg-blue-100 px-2 py-0.5 rounded text-blue-800 font-semibold">
            68.1% → 11.8% Target
          </span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-4 gap-1">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
            {t.hubsHeading}
          </h2>
          <p className="text-sm text-neutral-500 mt-0.5">
            {t.hubsSubheading}
          </p>
        </div>

        <button
          onClick={() => onSelectCategory('all')}
          className="text-xs font-semibold text-[#1a73e8] hover:text-[#174ea6] flex items-center gap-1 self-start sm:self-auto cursor-pointer"
        >
          <span>{t.navAll}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Grid of direct dynamic category hubs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {hubs.map((hub) => {
          const Icon = hub.icon;
          const isSelected = activeCategory === hub.id;

          return (
            <button
              key={hub.id}
              onClick={() => onSelectCategory(hub.id)}
              className={`group relative text-left p-4 rounded-2xl border transition-all duration-200 cursor-pointer overflow-hidden ${
                isSelected
                  ? 'border-[#1a73e8] bg-white ring-2 ring-[#1a73e8]/20 shadow-md'
                  : 'border-neutral-200/90 bg-white hover:border-neutral-300 hover:shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl bg-neutral-50 flex items-center justify-center transition-transform group-hover:scale-110 ${hub.iconColor}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-medium text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full">
                  {hub.popularTag}
                </span>
              </div>

              <h3 className="font-semibold text-neutral-900 text-base group-hover:text-[#1a73e8] transition-colors flex items-center justify-between">
                <span>{hub.title}</span>
                <ArrowRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#1a73e8]" />
              </h3>

              <p className="text-xs text-neutral-500 mt-1 line-clamp-1">
                {hub.desc}
              </p>

              {/* Data proof kicker (unboxed, clean typography adhering to design constitution) */}
              <div className="mt-3 pt-2.5 border-t border-neutral-100 flex items-center gap-1.5 text-[11px] text-neutral-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                <span className="truncate">{hub.badge}</span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
