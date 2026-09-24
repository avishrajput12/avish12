import React from 'react';
import { CheckCircle2, Package, Truck, ArrowRight, ShieldCheck } from 'lucide-react';
import { LanguageCode } from '../types/store';
import { TRANSLATIONS } from '../data/translations';

interface OrderConfirmationModalProps {
  orderDetails: any;
  lang: LanguageCode;
  onClose: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  orderDetails,
  lang,
  onClose,
}) => {
  if (!orderDetails) return null;

  const t = TRANSLATIONS[lang];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-neutral-200 p-6 sm:p-8 text-center animate-in zoom-in-95 duration-200 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-100 shadow-xs">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <span className="text-xs uppercase tracking-wider font-bold text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full">
          Transaction Completed
        </span>

        <h2 className="text-2xl font-bold text-neutral-900 mt-3">
          {t.orderConfirmed}
        </h2>
        <p className="text-sm text-neutral-600 mt-1">
          {t.orderThankYou}
        </p>

        {/* Order Details Card */}
        <div className="mt-6 p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 text-left text-xs space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
            <div>
              <span className="text-neutral-500 block text-[11px]">{t.orderNumber}</span>
              <span className="font-mono font-bold text-sm text-neutral-900">{orderDetails.orderNumber}</span>
            </div>
            <div className="text-right">
              <span className="text-neutral-500 block text-[11px]">Total Charged</span>
              <span className="font-mono font-bold text-sm text-neutral-900">{orderDetails.totalFormatted}</span>
            </div>
          </div>

          <div>
            <span className="text-neutral-500 block text-[11px]">Shipping Destination</span>
            <span className="font-medium text-neutral-900">{orderDetails.destination}</span>
            <p className="text-neutral-500 text-[11px] mt-0.5">Recipient: {orderDetails.fullName} ({orderDetails.email})</p>
          </div>

          <div className="pt-2 border-t border-neutral-200 flex items-center justify-between text-neutral-600">
            <span className="flex items-center gap-1.5 font-medium">
              <Truck className="w-3.5 h-3.5 text-[#1a73e8]" />
              <span>{orderDetails.carrier}</span>
            </span>
            <span className="text-emerald-700 font-semibold">{orderDetails.deliveryEstimate}</span>
          </div>
        </div>

        {/* Order tracking steps */}
        <div className="mt-6 pt-2">
          <div className="text-xs font-semibold text-neutral-700 mb-3 text-left">
            {t.trackShipment}
          </div>
          <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
            <div className="flex flex-col items-center">
              <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold mb-1 shadow-xs">
                ✓
              </div>
              <span className="font-semibold text-neutral-900">Received</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold mb-1 animate-pulse">
                2
              </div>
              <span className="font-semibold text-neutral-900">Preparing</span>
            </div>
            <div className="flex flex-col items-center opacity-40">
              <div className="w-7 h-7 rounded-full bg-neutral-200 text-neutral-600 flex items-center justify-center font-bold mb-1">
                3
              </div>
              <span>Dispatched</span>
            </div>
            <div className="flex flex-col items-center opacity-40">
              <div className="w-7 h-7 rounded-full bg-neutral-200 text-neutral-600 flex items-center justify-center font-bold mb-1">
                4
              </div>
              <span>Delivered</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="mt-7 w-full py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-xs sm:text-sm rounded-xl transition-colors cursor-pointer"
        >
          {t.continueShopping}
        </button>
      </div>
    </div>
  );
};
