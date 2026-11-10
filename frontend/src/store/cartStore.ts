import { create } from 'zustand';
import { CartItem, ProductoResponseDTO } from '../types';
import { showToast } from './notificationStore';

interface CartState {
  items: CartItem[];
  isDrawerOpen: boolean;
  addItem: (producto: ProductoResponseDTO, cantidad?: number) => boolean;
  removeItem: (idProducto: number) => void;
  updateQuantity: (idProducto: number, cantidad: number) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  
  // Totales
  getItemCount: () => number;
  getSubtotal: () => number;
  getIva: () => number; // 16% IVA México
  getTotal: () => number;
}

const CART_STORAGE_KEY = 'sonorasync_cart_storage';

const loadSavedCart = (): CartItem[] => {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveCart = (items: CartItem[]) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Silently ignore storage quota errors
  }
};

export const useCartStore = create<CartState>((set, get) => ({
  items: loadSavedCart(),
  isDrawerOpen: false,

  openDrawer: () => set({ isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false }),
  toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),

  addItem: (producto: ProductoResponseDTO, cantidad = 1) => {
    if (producto.stock <= 0) {
      showToast('error', `El instrumento "${producto.nombre}" está agotado.`, 'Sin Stock');
      return false;
    }

    const { items } = get();
    const existingIndex = items.findIndex((i) => i.producto.idProducto === producto.idProducto);

    let newItems: CartItem[];

    if (existingIndex > -1) {
      const currentQty = items[existingIndex].cantidad;
      const targetQty = currentQty + cantidad;

      if (targetQty > producto.stock) {
        showToast(
          'warning',
          `Solo hay ${producto.stock} piezas disponibles de este modelo.`,
          'Límite de Stock Alcanzado'
        );
        return false;
      }

      newItems = items.map((item, index) =>
        index === existingIndex ? { ...item, cantidad: targetQty } : item
      );
    } else {
      if (cantidad > producto.stock) {
        showToast(
          'warning',
          `No se pueden añadir más de ${producto.stock} unidades.`,
          'Límite de Stock'
        );
        return false;
      }
      newItems = [...items, { producto, cantidad }];
    }

    saveCart(newItems);
    set({ items: newItems, isDrawerOpen: true });
    showToast('success', `"${producto.nombre}" añadido al carrito.`, 'Carrito Actualizado');
    return true;
  },

  removeItem: (idProducto: number) => {
    const { items } = get();
    const target = items.find((i) => i.producto.idProducto === idProducto);
    const newItems = items.filter((i) => i.producto.idProducto !== idProducto);
    saveCart(newItems);
    set({ items: newItems });
    if (target) {
      showToast('info', `Se eliminó "${target.producto.nombre}" del carrito.`, 'Producto Removido');
    }
  },

  updateQuantity: (idProducto: number, cantidad: number) => {
    if (cantidad <= 0) {
      get().removeItem(idProducto);
      return;
    }

    const { items } = get();
    const target = items.find((i) => i.producto.idProducto === idProducto);
    if (!target) return;

    if (cantidad > target.producto.stock) {
      showToast(
        'warning',
        `Stock máximo disponible: ${target.producto.stock} unidades.`,
        'Límite de Inventario'
      );
      return;
    }

    const newItems = items.map((item) =>
      item.producto.idProducto === idProducto ? { ...item, cantidad } : item
    );

    saveCart(newItems);
    set({ items: newItems });
  },

  clearCart: () => {
    localStorage.removeItem(CART_STORAGE_KEY);
    set({ items: [] });
  },

  getItemCount: () => {
    return get().items.reduce((acc, item) => acc + item.cantidad, 0);
  },

  getSubtotal: () => {
    // En México el subtotal es el monto antes de IVA
    const totalConIva = get().items.reduce(
      (acc, item) => acc + Number(item.producto.precioVenta) * item.cantidad,
      0
    );
    // precioVenta / 1.16 da el subtotal base
    return totalConIva / 1.16;
  },

  getIva: () => {
    const total = get().getTotal();
    const subtotal = get().getSubtotal();
    return total - subtotal;
  },

  getTotal: () => {
    return get().items.reduce(
      (acc, item) => acc + Number(item.producto.precioVenta) * item.cantidad,
      0
    );
  },
}));
