import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { NeonButton } from '../../components/ui/NeonButton';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    removeItem,
    updateQuantity,
    getSubtotal,
    getIva,
    getTotal,
  } = useCartStore();

  const navigate = useNavigate();

  if (!isDrawerOpen) return null;

  const subtotal = getSubtotal();
  const iva = getIva();
  const total = getTotal();

  const handleGoToCheckout = () => {
    closeDrawer();
    navigate('/checkout');
  };

  const handleGoToCart = () => {
    closeDrawer();
    navigate('/carrito');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* BACKDROP BLUR OSCURO */}
      <div
        onClick={closeDrawer}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md glass-panel border-l border-neon-cyan/30 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300 bg-dark-950/95">
          {/* HEADER DEL DRAWER */}
          <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-neon-pink" />
              <h2 className="text-lg font-semibold text-white">Tu Carrito de Compras</h2>
            </div>
            <button
              onClick={closeDrawer}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* CUERPO: LISTA DE ARTÍCULOS */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-white/5">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full border border-white/10 bg-dark-900 flex items-center justify-center mb-4 text-gray-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-medium text-gray-200 mb-1">Tu carrito está vacío</h3>
                <p className="text-xs text-gray-400 max-w-xs mb-6">
                  Explora nuestro catálogo de instrumentos acústicos y accesorios musicales de alta gama.
                </p>
                <NeonButton variant="cyan" onClick={() => { closeDrawer(); navigate('/catalogo'); }}>
                  Ver Catálogo
                </NeonButton>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.producto.idProducto} className="py-4 flex gap-4 items-center">
                  <div className="w-16 h-16 rounded-xl bg-dark-900 border border-white/10 flex items-center justify-center text-neon-cyan font-bold text-xs flex-shrink-0 overflow-hidden">
                    {item.producto.categoria?.nombre?.slice(0, 3).toUpperCase() || 'INS'}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-white truncate mb-0.5">
                      {item.producto.nombre}
                    </h4>
                    <p className="text-xs text-gray-400 mb-2">
                      {item.producto.marca?.nombre} · SKU: {item.producto.sku}
                    </p>

                    <div className="flex items-center justify-between">
                      {/* SELECTOR DE CANTIDAD */}
                      <div className="flex items-center gap-2 border border-white/10 rounded-lg px-2 py-0.5 bg-dark-900">
                        <button
                          onClick={() => updateQuantity(item.producto.idProducto, item.cantidad - 1)}
                          className="text-gray-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-semibold text-white px-1">
                          {item.cantidad}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.producto.idProducto, item.cantidad + 1)}
                          className="text-gray-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* PRECIO CON IVA */}
                      <span className="text-sm font-semibold text-neon-pink">
                        ${(Number(item.producto.precioVenta) * item.cantidad).toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => removeItem(item.producto.idProducto)}
                    className="p-1.5 text-gray-500 hover:text-red-400 transition-colors"
                    title="Eliminar artículo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* FOOTER DEL DRAWER CON DESGLOSE FISCAL */}
          {items.length > 0 && (
            <div className="p-6 border-t border-white/10 glass-panel bg-dark-950">
              <div className="space-y-1.5 text-xs text-gray-400 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal (Base imponible):</span>
                  <span className="text-white">${subtotal.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN</span>
                </div>
                <div className="flex justify-between">
                  <span>IVA Trasladado (16.00% LFPC):</span>
                  <span className="text-neon-cyan">${iva.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN</span>
                </div>
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
                  <span>Total Definitivo:</span>
                  <span className="text-neon-pink">${total.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN</span>
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                <NeonButton variant="green" onClick={handleGoToCheckout} className="w-full py-3">
                  <span>Proceder al Pago Seguro</span>
                  <ArrowRight className="w-4 h-4" />
                </NeonButton>
                <button
                  onClick={handleGoToCart}
                  className="w-full py-2 text-xs text-gray-400 hover:text-white transition-colors text-center"
                >
                  Ver Carrito Detallado
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
