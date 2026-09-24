import React from 'react';
import { Target, Sparkles, Tag, CheckCircle2, X } from 'lucide-react';
import { LanguageCode } from '../types/store';
import { TRANSLATIONS } from '../data/translations';

interface CampaignLandingBannerProps {
  currentLang: LanguageCode;
  selectedCpcQuery: string;
  onSelectCpcQuery: (query: string) => void;
  onDismissCpc: () => void;
  showAuditHighlights: boolean;
}

export const CampaignLandingBanner: React.FC<CampaignLandingBannerProps> = ({
  currentLang,
  selectedCpcQuery,
  onSelectCpcQuery,
  onDismissCpc,
  showAuditHighlights,
}) => {
  const t = TRANSLATIONS[currentLang];

  const simulatedQueries = [
    { id: 'all-cpc', label: 'All Paid Ads: Google Gear', category: 'all' },
    { id: 'hoodie', label: 'Query: "Google Unisex Hoodie"', category: 'apparel' },
    { id: 'tumbler', label: 'Query: "Google Bamboo Tumbler"', category: 'drinkware' },
    { id: 'backpack', label: 'Query: "Google Tech Backpack 22L"', category: 'bags' },
  ];

  return (
    <div className="relative my-4 overflow-hidden rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50/90 via-orange-50/70 to-amber-50/90 p-4 sm:p-5 shadow-sm">
      {/* Audit Highlight callout */}
      {showAuditHighlights && (
        <div className="mb-3 px-3 py-1.5 bg-amber-200/70 border border-amber-300 rounded-lg text-xs text-amber-900 font-medium flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse"></span>
            <strong>Operational Change #2 Active:</strong> Directing Paid Search (`google/cpc`) traffic to high-intent product collections + welcome promotion, preventing the 12-second bounce and solving the $586 revenue leak flagged by GA4 automated insights.
          </span>
          <span className="font-mono font-bold text-[11px] bg-white px-2 py-0.5 rounded text-amber-900">
            Fixes 12s Drop-off
          </span>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                Google Paid Search Landing Funnel
              </span>
              <span className="text-xs text-neutral-600">
                Source: <code className="font-mono font-semibold text-neutral-900">google / cpc</code>
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-neutral-900 mt-1">
              {t.cpcBannerTitle}: <span className="text-amber-800 font-normal">"{selectedCpcQuery}"</span>
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 mt-0.5">
              {t.cpcBannerDesc}
            </p>
          </div>
        </div>

        {/* Promo Code Pill & Dismiss */}
        <div className="flex items-center gap-2 self-start md:self-center shrink-0">
          <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-amber-200 shadow-xs">
            <Tag className="w-4 h-4 text-emerald-600" />
            <div className="text-xs">
              <span className="text-neutral-500 block text-[10px] uppercase font-semibold">Automatic CPC Perk</span>
              <span className="font-mono font-bold text-neutral-900">GOOGLECPC15</span>
              <span className="text-emerald-700 font-semibold ml-1.5">(15% OFF)</span>
            </div>
          </div>
          <button
            onClick={onDismissCpc}
            className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-lg hover:bg-amber-100/60 transition-colors"
            title="Close CPC mode"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Query intent simulator buttons */}
      <div className="mt-3 pt-3 border-t border-amber-200/60 flex items-center gap-2 flex-wrap">
        <span className="text-xs font-medium text-neutral-600">
          Simulate Search Query Intent:
        </span>
        <div className="flex items-center gap-1.5 flex-wrap">
          {simulatedQueries.map((q) => (
            <button
              key={q.id}
              onClick={() => onSelectCpcQuery(q.label.replace('Query: ', '').replace('All Paid Ads: ', ''))}
              className={`px-2.5 py-1 text-xs rounded-lg transition-colors cursor-pointer ${
                selectedCpcQuery.includes(q.id) || (q.id === 'all-cpc' && selectedCpcQuery === 'Google Gear')
                  ? 'bg-amber-600 text-white font-medium shadow-xs'
                  : 'bg-white/80 text-neutral-700 hover:bg-white border border-amber-200/80'
              }`}
            >
              {q.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
