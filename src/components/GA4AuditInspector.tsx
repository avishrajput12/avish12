import React, { useState } from 'react';
import { BarChart3, ChevronUp, ChevronDown, CheckCircle2, Sparkles, Globe, Target, Eye, ShoppingCart } from 'lucide-react';
import { GA4_PILLARS } from '../data/products';
import { RegionConfig, CurrencyCode, LanguageCode } from '../types/store';
import { REGIONS } from '../data/currencies';

interface GA4AuditInspectorProps {
  showAuditHighlights: boolean;
  onToggleHighlights: () => void;
  onSimulateCpc: () => void;
  onSimulateTokyo: () => void;
  onSimulateChinese: () => void;
  onSimulateSpanish: () => void;
  onResetDirect: () => void;
  activePersona: string;
}

export const GA4AuditInspector: React.FC<GA4AuditInspectorProps> = ({
  showAuditHighlights,
  onToggleHighlights,
  onSimulateCpc,
  onSimulateTokyo,
  onSimulateChinese,
  onSimulateSpanish,
  onResetDirect,
  activePersona,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedPillarId, setSelectedPillarId] = useState<number>(1);

  const selectedPillar = GA4_PILLARS.find((p) => p.id === selectedPillarId) || GA4_PILLARS[0];

  return (
    <aside 
      aria-label="GA4 Conversion Optimization Inspector" 
      className="fixed bottom-4 right-4 z-40 max-w-lg w-[calc(100vw-2rem)] transition-all duration-300"
    >
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-neutral-300 overflow-hidden text-neutral-900">
        {/* Dock Header */}
        <div 
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-4 py-3 bg-[#202124] text-white flex items-center justify-between cursor-pointer select-none"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-[#4285F4] flex items-center justify-center text-white">
              <BarChart3 className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="font-bold text-xs tracking-tight">GA4 Conversion Audit & Optimization Engine</span>
              <span className="text-[10px] text-neutral-400 block -mt-0.5">Google Merchandise Store 4-Pillar Transformation</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-semibold">
              Live Inspector
            </span>
            <button className="text-neutral-400 hover:text-white transition-colors">
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Expanded Panel */}
        {isExpanded && (
          <div className="p-4 text-xs space-y-3.5 max-h-[75vh] overflow-y-auto">
            {/* Top Controller Bar: Audit Highlights & Persona Switcher */}
            <div className="flex items-center justify-between gap-2 p-2.5 bg-neutral-100 rounded-xl">
              <span className="font-semibold text-neutral-700 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-[#1a73e8]" />
                Show Fix Badges on Page
              </span>
              <button
                onClick={onToggleHighlights}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  showAuditHighlights
                    ? 'bg-[#1a73e8] text-white shadow-xs'
                    : 'bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-50'
                }`}
              >
                {showAuditHighlights ? 'Badges: ON' : 'Badges: OFF'}
              </button>
            </div>

            {/* Traffic Persona Simulator */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5 flex items-center justify-between">
                <span>Simulate GA4 Traffic Segment</span>
                <span className="text-neutral-500 font-normal">Current: <strong className="text-neutral-900">{activePersona}</strong></span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                <button
                  onClick={onResetDirect}
                  className={`p-2 rounded-lg text-left transition-colors cursor-pointer border ${
                    activePersona === 'Direct Traffic'
                      ? 'border-neutral-900 bg-neutral-900 text-white font-medium'
                      : 'border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <span className="font-semibold block truncate">Direct Unknown</span>
                  <span className="text-[10px] opacity-75 block truncate">80.9% of Users</span>
                </button>

                <button
                  onClick={onSimulateCpc}
                  className={`p-2 rounded-lg text-left transition-colors cursor-pointer border ${
                    activePersona === 'Google Paid Search (CPC)'
                      ? 'border-amber-600 bg-amber-600 text-white font-medium'
                      : 'border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <span className="font-semibold block truncate">Paid Search (CPC)</span>
                  <span className="text-[10px] opacity-75 block truncate">12s bounce fix</span>
                </button>

                <button
                  onClick={onSimulateTokyo}
                  className={`p-2 rounded-lg text-left transition-colors cursor-pointer border ${
                    activePersona === 'Tokyo / Toshima Visitor'
                      ? 'border-emerald-600 bg-emerald-600 text-white font-medium'
                      : 'border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <span className="font-semibold block truncate">Tokyo / Japan 🇯🇵</span>
                  <span className="text-[10px] opacity-75 block truncate">0-4s $0 rev fix</span>
                </button>

                <button
                  onClick={onSimulateChinese}
                  className={`p-2 rounded-lg text-left transition-colors cursor-pointer border ${
                    activePersona === 'Chinese High-Intent Visitor'
                      ? 'border-red-600 bg-red-600 text-white font-medium'
                      : 'border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <span className="font-semibold block truncate">Chinese (中文) 🇨🇳</span>
                  <span className="text-[10px] opacity-75 block truncate">35.1% Key Event</span>
                </button>

                <button
                  onClick={onSimulateSpanish}
                  className={`p-2 rounded-lg text-left transition-colors cursor-pointer border ${
                    activePersona === 'Spanish Visitor'
                      ? 'border-orange-600 bg-orange-600 text-white font-medium'
                      : 'border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <span className="font-semibold block truncate">Español 🇪🇸</span>
                  <span className="text-[10px] opacity-75 block truncate">Multilingual path</span>
                </button>
              </div>
            </div>

            {/* 4 Pillars Navigation Tabs */}
            <div className="pt-2 border-t border-neutral-200">
              <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2">
                4 Data-Backed Operational Changes
              </div>
              <div className="grid grid-cols-4 gap-1 bg-neutral-100 p-1 rounded-xl">
                {GA4_PILLARS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPillarId(p.id)}
                    className={`py-1.5 px-1 rounded-lg text-center font-medium transition-all cursor-pointer ${
                      selectedPillarId === p.id
                        ? 'bg-white text-neutral-900 shadow-xs font-bold'
                        : 'text-neutral-500 hover:text-neutral-900'
                    }`}
                  >
                    #{p.id}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Pillar Details Card */}
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-neutral-900 text-sm">
                  #{selectedPillar.id}. {selectedPillar.title}
                </span>
                <span className="font-mono text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                  {selectedPillar.metricBadge}
                </span>
              </div>

              {/* Data Problem */}
              <div className="p-2 bg-red-50/80 border border-red-100 rounded-lg text-red-900 text-[11px] leading-relaxed">
                <strong>GA4 Diagnostic:</strong> {selectedPillar.dataProblem}
              </div>

              {/* Implemented Solutions */}
              <div className="space-y-1.5">
                <span className="font-semibold text-neutral-700 block text-[11px]">
                  Applied Operational Fixes:
                </span>
                {selectedPillar.implementedFixes.map((fix, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 text-neutral-600 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{fix}</span>
                  </div>
                ))}
              </div>

              {/* Expected Impact */}
              <div className="pt-2 border-t border-neutral-200 text-[11px] text-emerald-800 font-medium">
                <strong>Projected Impact:</strong> {selectedPillar.expectedImpact}
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
