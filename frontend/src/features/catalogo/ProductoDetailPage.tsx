import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ProductosService } from '../../api/productos.service';
import { ProductoResponseDTO } from '../../types';
import { useCartStore } from '../../store/cartStore';
import { NeonButton } from '../../components/ui/NeonButton';
import { GlassCard } from '../../components/ui/GlassCard';
import {
  ShoppingBag,
  ShieldCheck,
  RotateCcw,
  Plus,
  Minus,
  ChevronRight,
  Truck,
} from 'lucide-react';

export const ProductoDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [producto, setProducto] = useState<ProductoResponseDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [cantidad, setCantidad] = useState(1);
  const [activeTab, setActiveTab] = useState<'descripcion' | 'garantia' | 'especificaciones'>('descripcion');

  const { addItem, openDrawer } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducto = async () => {
      setLoading(true);
      try {
        if (id) {
          const data = await ProductosService.getProductoById(Number(id));
          setProducto(data);
        }
      } catch {
        // Mock fallback para visualización si el endpoint no tiene ese ID en BD
        setProducto({
          idProducto: Number(id) || 1,
          sku: 'GTR-AC-01',
          nombre: 'Guitarra Acústica Sonora Concierto Profesional',
          modelo: 'Classic C-40 Heritage',
          numeroSerie: 'SN-GTR-881290-MX',
          descripcion:
            'Instrumento de cuerda pulsada construido artesanalmente con maderas seleccionadas de abeto y aros de caoba. Diseñada para alumnos avanzados y concertistas que buscan una proyección acústica pura con armónicos balanceados.',
          precioVenta: 4850.0,
          stock: 6,
          stockMinimo: 2,
          categoria: { idCategoria: 1, nombre: 'Guitarras y Ukeleles', tipo: 'CUERDAS' },
          marca: { idMarca: 1, nombre: 'Sonora Artesanal', activa: true },
          activo: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducto();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-20 flex justify-center items-center">
        <div className="w-12 h-12 rounded-full border-2 border-neon-cyan border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Instrumento no encontrado</h2>
        <Link to="/catalogo">
          <NeonButton variant="cyan">Regresar al Catálogo</NeonButton>
        </Link>
      </div>
    );
  }

  const isOutOfStock = producto.stock <= 0;

  const handleAddToCart = () => {
    if (addItem(producto, cantidad)) {
      openDrawer();
    }
  };

  const handleBuyNow = () => {
    if (addItem(producto, cantidad)) {
      navigate('/checkout');
    }
  };

  return (
    <div className="container mx-auto px-6 py-10">
      {/* BREADCRUMB */}
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-8">
        <Link to="/" className="hover:text-neon-cyan transition-colors">Inicio</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to="/catalogo" className="hover:text-neon-cyan transition-colors">Catálogo</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-neon-cyan">{producto.categoria?.nombre}</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-white font-medium truncate max-w-xs">{producto.nombre}</span>
      </nav>

      {/* DETALLE PRINCIPAL: 2 COLUMNAS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* COLUMNA IZQUIERDA: GALERÍA / VISUALIZADOR */}
        <div className="space-y-4">
          <div className="h-[420px] rounded-2xl glass-panel border border-neon-cyan/30 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden group">
            <div className="w-40 h-40 rounded-full border-2 border-dashed border-neon-cyan/30 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-500">
              <span className="font-mono text-neon-cyan text-xl font-bold">{producto.sku}</span>
            </div>
            <h3 className="font-neon text-2xl neon-text-yellow">{producto.marca?.nombre}</h3>
            <span className="text-xs text-gray-400 font-mono mt-1">Modelo: {producto.modelo || 'Estándar'}</span>

            {/* BADGE STOCK */}
            <div className="absolute top-4 right-4">
              {isOutOfStock ? (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/40">
                  Agotado
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-neon-green/20 text-neon-green border border-neon-green/40 shadow-neon-green/20">
                  En Stock ({producto.stock} disponibles)
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map((idx) => (
              <div
                key={idx}
                className="h-20 rounded-xl glass-panel border border-white/10 flex items-center justify-center text-[11px] text-gray-500 font-mono hover:border-neon-cyan/40 transition-colors cursor-pointer"
              >
                Vista #{idx}
              </div>
            ))}
          </div>
        </div>

        {/* COLUMNA DERECHA: DATOS, PRECIO Y COMPRA */}
        <div className="flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold text-neon-cyan uppercase tracking-wider">
                {producto.categoria?.nombre}
              </span>
              <span className="text-gray-500">·</span>
              <span className="text-xs text-gray-300 font-medium">{producto.marca?.nombre}</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-snug">
              {producto.nombre}
            </h1>

            {/* PRECIO CON DESGLOSE FISCAL */}
            <div className="p-5 rounded-2xl glass-panel border border-neon-pink/30 mb-6 bg-neon-pink/5">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl md:text-4xl font-extrabold text-neon-pink">
                  ${Number(producto.precioVenta).toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
                </span>
                <span className="text-xs text-neon-green font-semibold uppercase tracking-wider">
                  IVA del 16.00% Incluido
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Precio final conforme al Art. 7 bis de la Ley Federal de Protección al Consumidor. Sin cargos ocultos.
              </p>
            </div>

            {/* SELECTOR DE CANTIDAD Y BOTONES */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4">
                <span className="text-xs text-gray-300 font-medium">Cantidad a comprar:</span>
                <div className="flex items-center gap-3 border border-white/20 rounded-xl px-3 py-1.5 bg-dark-900">
                  <button
                    disabled={cantidad <= 1 || isOutOfStock}
                    onClick={() => setCantidad((prev) => Math.max(1, prev - 1))}
                    className="text-gray-400 hover:text-white disabled:opacity-40"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-sm font-bold text-white px-2">{cantidad}</span>
                  <button
                    disabled={cantidad >= producto.stock || isOutOfStock}
                    onClick={() => setCantidad((prev) => Math.min(producto.stock, prev + 1))}
                    className="text-gray-400 hover:text-white disabled:opacity-40"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-xs text-gray-500">
                  (Máximo {producto.stock} unidades en almacén)
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <NeonButton
                  variant="cyan"
                  disabled={isOutOfStock}
                  onClick={handleAddToCart}
                  className={`flex-1 py-3.5 text-sm ${isOutOfStock ? 'opacity-40 cursor-not-allowed' : ''}`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Añadir al Carrito</span>
                </NeonButton>

                <NeonButton
                  variant="green"
                  disabled={isOutOfStock}
                  onClick={handleBuyNow}
                  className={`flex-1 py-3.5 text-sm ${isOutOfStock ? 'opacity-40 cursor-not-allowed' : ''}`}
                >
                  <span>Comprar Ahora</span>
                </NeonButton>
              </div>
            </div>
          </div>

          {/* BENEFICIOS DESTACADOS PROFECO */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl border border-white/10 glass-panel text-xs text-gray-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-neon-green flex-shrink-0" />
              <span>Garantía 90 días</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-neon-cyan flex-shrink-0" />
              <span>5 días revocación</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-neon-yellow flex-shrink-0" />
              <span>Envío asegurado MX</span>
            </div>
          </div>
        </div>
      </div>

      {/* PESTAÑAS DE DETALLES, ESPECIFICACIONES Y GARANTÍA */}
      <GlassCard accent="gold" className="p-8">
        <div className="flex border-b border-white/10 gap-8 mb-6">
          <button
            onClick={() => setActiveTab('descripcion')}
            className={`pb-3 text-sm font-semibold transition-colors relative ${
              activeTab === 'descripcion' ? 'text-neon-cyan' : 'text-gray-400 hover:text-white'
            }`}
          >
            Descripción Detallada
            {activeTab === 'descripcion' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon-cyan shadow-neon-cyan" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('especificaciones')}
            className={`pb-3 text-sm font-semibold transition-colors relative ${
              activeTab === 'especificaciones' ? 'text-neon-pink' : 'text-gray-400 hover:text-white'
            }`}
          >
            Especificaciones Técnicas
            {activeTab === 'especificaciones' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon-pink shadow-neon-pink" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('garantia')}
            className={`pb-3 text-sm font-semibold transition-colors relative ${
              activeTab === 'garantia' ? 'text-neon-green' : 'text-gray-400 hover:text-white'
            }`}
          >
            Garantía Legal & PROFECO
            {activeTab === 'garantia' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon-green shadow-neon-green" />
            )}
          </button>
        </div>

        {activeTab === 'descripcion' && (
          <div className="text-sm text-gray-300 leading-relaxed space-y-4">
            <p>{producto.descripcion || 'Instrumento certificado para estudio y presentación en vivo.'}</p>
            <p>
              Cada unidad pasa por una rigurosa inspección de calibración, afinación y resonancia en los talleres de luthería de SonoraSync antes de ser enviada a su comprador.
            </p>
          </div>
        )}

        {activeTab === 'especificaciones' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl border border-white/10 bg-dark-900/60 flex justify-between">
              <span className="text-gray-400">Código SKU:</span>
              <span className="font-mono text-neon-cyan font-bold">{producto.sku}</span>
            </div>
            <div className="p-3.5 rounded-xl border border-white/10 bg-dark-900/60 flex justify-between">
              <span className="text-gray-400">Número de Serie:</span>
              <span className="font-mono text-white">{producto.numeroSerie || 'Serie de Taller'}</span>
            </div>
            <div className="p-3.5 rounded-xl border border-white/10 bg-dark-900/60 flex justify-between">
              <span className="text-gray-400">Modelo:</span>
              <span className="text-white font-medium">{producto.modelo || 'Heritage Standard'}</span>
            </div>
            <div className="p-3.5 rounded-xl border border-white/10 bg-dark-900/60 flex justify-between">
              <span className="text-gray-400">Categoría:</span>
              <span className="text-white font-medium">{producto.categoria?.nombre}</span>
            </div>
          </div>
        )}

        {activeTab === 'garantia' && (
          <div className="text-xs text-gray-300 space-y-4 leading-relaxed">
            <div className="p-4 rounded-xl border border-neon-green/30 bg-neon-green/5">
              <h4 className="font-bold text-neon-green text-sm mb-1">
                Garantía Legal de 90 Días Naturales (Art. 77 a 84 LFPC)
              </h4>
              <p>
                Este instrumento musical cuenta con una cobertura mínima obligatoria de 90 días naturales a partir de la fecha de entrega contra cualquier defecto de fabricación, vicio oculto o desajuste de fábrica.
              </p>
            </div>

            <div className="space-y-2">
              <h5 className="font-semibold text-white">Derecho de Cancelación / Devolución (Art. 56 LFPC):</h5>
              <p>
                El consumidor cuenta con 5 (cinco) días hábiles posteriores a la recepción del instrumento para revocar la compra sin penalidad alguna, reintegrando el producto en su empaque original sin alteraciones físicas.
              </p>
            </div>
          </div>
        )}
      </GlassCard>
    </div>
  );
};
