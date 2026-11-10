import { create } from 'zustand';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
  id: string;
  type: NotificationType;
  title?: string;
  message: string;
  duration?: number;
}

interface NotificationState {
  notifications: ToastMessage[];
  addNotification: (notification: Omit<ToastMessage, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  addNotification: (notification) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastMessage = { ...notification, id };
    
    set((state) => ({
      notifications: [...state.notifications, newToast],
    }));

    const duration = notification.duration || 4500;
    setTimeout(() => {
      set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id),
      }));
    }, duration);
  },
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
  clearNotifications: () => set({ notifications: [] }),
}));

// Helper exportable para invocar fuera de componentes React (ej. en Axios Interceptors)
export const showToast = (
  type: NotificationType,
  message: string,
  title?: string,
  duration?: number
) => {
  useNotificationStore.getState().addNotification({ type, message, title, duration });
};
