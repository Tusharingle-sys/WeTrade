import React from 'react';
import { useTrade } from '../../context/TradeContext';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useTrade();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-md w-full px-4 pointer-events-none">
      {toasts.map((toast) => {
        let bg = 'bg-slate-900 text-white border-slate-700';
        let Icon = Info;
        let iconColor = 'text-blue-400';

        if (toast.type === 'success') {
          bg = 'bg-white text-slate-900 border-emerald-500 shadow-xl';
          Icon = CheckCircle2;
          iconColor = 'text-emerald-600';
        } else if (toast.type === 'warning') {
          bg = 'bg-white text-slate-900 border-amber-500 shadow-xl';
          Icon = AlertTriangle;
          iconColor = 'text-amber-500';
        } else if (toast.type === 'error') {
          bg = 'bg-white text-slate-900 border-red-500 shadow-xl';
          Icon = AlertCircle;
          iconColor = 'text-red-500';
        } else {
          bg = 'bg-white text-slate-900 border-blue-600 shadow-xl';
          Icon = Info;
          iconColor = 'text-[#07145B]';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border-l-4 border shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 ${bg}`}
          >
            <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${iconColor}`} />
            <div className="flex-1 pr-2">
              <h4 className="text-sm font-bold leading-tight">{toast.title}</h4>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-700 p-1 -mr-1 -mt-1 transition-colors"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
