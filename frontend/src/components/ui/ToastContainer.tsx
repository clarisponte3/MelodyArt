import React from 'react';
import { useNotificationStore } from '../../store/notificationStore';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { notifications, removeNotification } = useNotificationStore();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md w-full px-4 pointer-events-none">
      {notifications.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';
        const isWarning = toast.type === 'warning';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border glass-panel transition-all duration-300 shadow-2xl animate-in slide-in-from-bottom-5 ${
              isSuccess
                ? 'border-neon-green/40 shadow-neon-green/20'
                : isError
                ? 'border-red-500/50 shadow-red-500/20'
                : isWarning
                ? 'border-neon-orange/40 shadow-neon-orange/20'
                : 'border-neon-cyan/40 shadow-neon-cyan/20'
            }`}
          >
            {isSuccess && <CheckCircle2 className="w-5 h-5 text-neon-green flex-shrink-0 mt-0.5" />}
            {isError && <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />}
            {isWarning && <AlertTriangle className="w-5 h-5 text-neon-orange flex-shrink-0 mt-0.5" />}
            {!isSuccess && !isError && !isWarning && (
              <Info className="w-5 h-5 text-neon-cyan flex-shrink-0 mt-0.5" />
            )}

            <div className="flex-1 text-sm">
              {toast.title && (
                <h4
                  className={`font-semibold mb-0.5 ${
                    isSuccess
                      ? 'text-neon-green'
                      : isError
                      ? 'text-red-400'
                      : isWarning
                      ? 'text-neon-orange'
                      : 'text-neon-cyan'
                  }`}
                >
                  {toast.title}
                </h4>
              )}
              <p className="text-gray-200 text-xs leading-relaxed">{toast.message}</p>
            </div>

            <button
              onClick={() => removeNotification(toast.id)}
              className="text-gray-400 hover:text-white transition-colors p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
