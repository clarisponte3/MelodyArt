import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import { NeonButton } from '../../components/ui/NeonButton';
import { GlassCard } from '../../components/ui/GlassCard';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, ArrowLeft } from 'lucide-react';

export const CarritoPage: React.FC = () => {
  const { items, removeItem, updateQuantity, clearCart, getSubtotal, getIva, getTotal } = useCartStore();
  const navigate = useNavigate();

  const subtotal = getSubtotal();
  const iva = getIva();
  const total = getTotal();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-6 py-24 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 rounded-full border border-white/10 bg-dark-900 flex items-center justify-center mb-6 text-gray-500">
          <ShoppingBag className="w-10 h-10 text-gray-400" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Tu Carrito de Compras está Vacío</h1>
        <p className="text-sm text-gray-400 max-w-md mb-8">
          Aún no has agregado instrumentos ni accesorios musicales a tu orden. Descubre nuestras piezas acústicas y eléctricas en exhibición.
        </p>
        <Link to="/catalogo">
          <NeonButton variant="cyan" className="py-3 px-8 text-sm">
            Explorar Catálogo de Instrumentos
          </NeonButton>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 border-b border-white/10 mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Carrito de Compras</h1>
          <p className="text-xs text-gray-400">
            Revisa los artículos de tu orden antes de proceder a la facturación y checkout seguro.
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-gray-400 hover:text-red-400 flex items-center gap-1.5 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Vaciar todo el carrito</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* TABLA GLASSMORPHISM DE PRODUCTOS */}
        <div className="lg:col-span-2">
          <div className="glass-table-container">
            <table className="w-full text-left text-xs">
              <thead className="bg-dark-900/80 border-b border-white/10 text-neon-cyan uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-4 px-6">Instrumento</th>
                  <th className="py-4 px-4 text-center">Cantidad</th>
                  <th className="py-4 px-4 text-right">Precio Unitario</th>
                  <th className="py-4 px-4 text-right">Subtotal</th>
                  <th className="py-4 px-4 text-center">Quitar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {items.map((item) => (
                  <tr key={item.producto.idProducto} className="glass-table-row">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-dark-900 border border-white/10 flex items-center justify-center font-bold text-neon-cyan text-xs flex-shrink-0">
                          {item.producto.sku.slice(0, 3)}
                        </div>
                        <div>
                          <Link
                            to={`/catalogo/${item.producto.idProducto}`}
                            className="font-medium text-white hover:text-neon-cyan transition-colors line-clamp-1"
                          >
                            {item.producto.nombre}
                          </Link>
                          <span className="text-[11px] text-gray-400 block">
                            SKU: {item.producto.sku} · {item.producto.marca?.nombre}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4 text-center">
                      <div className="inline-flex items-center gap-2 border border-white/20 rounded-lg px-2 py-1 bg-dark-900">
                        <button
                          onClick={() => updateQuantity(item.producto.idProducto, item.cantidad - 1)}
                          className="text-gray-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-semibold text-white px-1">{item.cantidad}</span>
                        <button
                          onClick={() => updateQuantity(item.producto.idProducto, item.cantidad + 1)}
                          className="text-gray-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </td>

                    <td className="py-4 px-4 text-right font-mono text-gray-300">
                      ${Number(item.producto.precioVenta).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                    </td>

                    <td className="py-4 px-4 text-right font-mono font-bold text-neon-pink">
                      ${(Number(item.producto.precioVenta) * item.cantidad).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                    </td>

                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => removeItem(item.producto.idProducto)}
                        className="p-1.5 text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <Link
              to="/catalogo"
              className="text-xs text-neon-cyan hover:text-white flex items-center gap-1.5 transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Continuar Explorando Catálogo</span>
            </Link>
          </div>
        </div>

        {/* RESUMEN DE LA ORDEN CON DESGLOSE FISCAL */}
        <div className="lg:col-span-1">
          <GlassCard accent="pink" className="p-6 sticky top-28 space-y-6">
            <h3 className="text-base font-bold text-white border-b border-white/10 pb-3">
              Resumen de la Orden
            </h3>

            <div className="space-y-3 text-xs text-gray-300">
              <div className="flex justify-between">
                <span>Subtotal (Base Imponible):</span>
                <span className="font-mono text-white">
                  ${subtotal.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
                </span>
              </div>

              <div className="flex justify-between">
                <span className="flex items-center gap-1">
                  IVA Trasladado (16.00% LFPC):
                </span>
                <span className="font-mono text-neon-cyan font-semibold">
                  ${iva.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
                </span>
              </div>

              <div className="flex justify-between">
                <span>Costo de Envío:</span>
                <span className="text-neon-green font-semibold uppercase">Gratis (Nacional)</span>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-between items-baseline">
                <span className="text-sm font-bold text-white">Total a Pagar:</span>
                <span className="text-2xl font-black text-neon-pink font-mono">
                  ${total.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl border border-neon-green/30 bg-neon-green/5 text-[11px] text-gray-300 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-neon-green flex-shrink-0 mt-0.5" />
              <span>Precios protegidos conforme al Art. 7 bis LFPC. Sin cobros sorpresa.</span>
            </div>

            <NeonButton
              variant="green"
              onClick={() => navigate('/checkout')}
              className="w-full py-3.5 text-sm"
            >
              <span>Proceder al Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </NeonButton>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
