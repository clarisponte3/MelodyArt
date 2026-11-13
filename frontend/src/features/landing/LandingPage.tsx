import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductosService } from '../../api/productos.service';
import { ProductoResponseDTO } from '../../types';
import { useCartStore } from '../../store/cartStore';
import { NeonButton } from '../../components/ui/NeonButton';
import { QuoteOfTheDay } from '../../components/ui/QuoteOfTheDay';
import {
  Music,
  ShoppingBag,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<ProductoResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCartStore();

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await ProductosService.getProductos({ page: 0, size: 6 });
        if (Array.isArray(data)) {
          setFeaturedProducts(data.slice(0, 6));
        } else if (data && data.content) {
          setFeaturedProducts(data.content.slice(0, 6));
        }
      } catch {
        // En caso de que el backend no tenga productos en BD o falle la red, renderizar catálogo demo
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  // Productos de respaldo representativos si la BD está vacía
  const fallbackProducts: Partial<ProductoResponseDTO>[] = [
    {
      idProducto: 101,
      sku: 'GTR-AC-01',
      nombre: 'Guitarra Acústica Clásica Concierto',
      modelo: 'Sonora Master C-40',
      precioVenta: 4850.0,
      stock: 8,
      categoria: { idCategoria: 1, nombre: 'Guitarras' },
      marca: { idMarca: 1, nombre: 'Sonora Artesanal', activa: true },
    },
    {
      idProducto: 102,
      sku: 'UKL-SOP-02',
      nombre: 'Ukelele Soprano Caoba Maciza',
      modelo: 'Island Sound US-20',
      precioVenta: 1890.0,
      stock: 12,
      categoria: { idCategoria: 1, nombre: 'Ukeleles' },
      marca: { idMarca: 2, nombre: 'MelodyArt Select', activa: true },
    },
    {
      idProducto: 103,
      sku: 'PNO-DIG-03',
      nombre: 'Piano Digital 88 Teclas Contrapesadas',
      modelo: 'Harmony Stage P-88',
      precioVenta: 16499.0,
      stock: 4,
      categoria: { idCategoria: 2, nombre: 'Teclados' },
      marca: { idMarca: 3, nombre: 'Yamaha Pro', activa: true },
    },
  ];

  const displayedProducts = featuredProducts.length > 0 ? featuredProducts : fallbackProducts;

  return (
    <div className="flex flex-col gap-24 pb-20">
      {/* =========================================================================
          HERO SECTION: EL ORIGEN ANALÓGICO (ERA VINILO)
          ========================================================================= */}
      <section className="container mx-auto px-6 pt-16 md:pt-24 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-yellow/30 bg-neon-yellow/10 mb-8 animate-pulse">
          <Sparkles className="w-4 h-4 text-neon-yellow" />
          <span className="text-xs font-semibold tracking-wider uppercase text-neon-yellow">
            Academia Musical & Tienda en Línea Certificada
          </span>
        </div>

        <h1 className="font-neon text-6xl md:text-8xl neon-text-yellow mb-6 max-w-5xl leading-tight">
          La Evolución del Arte Sonoro
        </h1>

        <h2 className="text-2xl md:text-3xl font-semibold neon-text-cyan mb-8 max-w-3xl">
          Aprende, perfecciona y equipa tu pasión musical con SonoraSync
        </h2>

        <div className="w-full mb-10">
          <QuoteOfTheDay />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-5 mb-16">
          <Link to="/catalogo">
            <NeonButton variant="cyan" className="py-3 px-8 text-base">
              <ShoppingBag className="w-5 h-5" />
              <span>Explorar Catálogo</span>
            </NeonButton>
          </Link>
          <Link to="/academia/talleres">
            <NeonButton variant="pink" className="py-3 px-8 text-base">
              <Music className="w-5 h-5" />
              <span>Talleres de Academia</span>
            </NeonButton>
          </Link>
        </div>

        {/* METRICS BANNER */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl p-6 rounded-2xl glass-panel border border-white/10">
          <div className="text-center p-2">
            <div className="text-2xl md:text-3xl font-bold text-neon-yellow font-mono">100%</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider">Apego PROFECO & LFPC</div>
          </div>
          <div className="text-center p-2 border-l border-white/10">
            <div className="text-2xl md:text-3xl font-bold text-neon-cyan font-mono">16.00%</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider">IVA Fiscal Desglosado</div>
          </div>
          <div className="text-center p-2 border-l border-white/10">
            <div className="text-2xl md:text-3xl font-bold text-neon-pink font-mono">90 Días</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider">Garantía Legal Nuevos</div>
          </div>
          <div className="text-center p-2 border-l border-white/10">
            <div className="text-2xl md:text-3xl font-bold text-neon-green font-mono">25+</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider">Talleres Musicales</div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECCIÓN: INSTRUMENTOS DESTACADOS
          ========================================================================= */}
      <section className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-semibold text-neon-cyan uppercase tracking-widest">
              Tienda Oficial
            </span>
            <h2 className="text-3xl font-bold text-white mt-1">Instrumentos en Exhibición</h2>
          </div>
          <Link
            to="/catalogo"
            className="text-xs font-semibold text-neon-cyan hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <span>Ver Catálogo Completo</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-72 rounded-2xl glass-panel animate-pulse bg-white/5" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayedProducts.map((prod) => (
              <div
                key={prod.idProducto}
                className="group rounded-2xl glass-panel border border-white/10 hover:border-neon-cyan/40 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-neon-cyan/20"
              >
                <div>
                  <div className="h-44 w-full rounded-xl bg-dark-900 border border-white/5 flex items-center justify-center mb-4 text-neon-cyan font-bold text-sm tracking-wider">
                    {prod.nombre?.slice(0, 20)}
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                    <span>{prod.categoria?.nombre || 'General'}</span>
                    <span className="text-neon-cyan font-medium">{prod.marca?.nombre}</span>
                  </div>

                  <h3 className="font-semibold text-white text-base mb-2 group-hover:text-neon-cyan transition-colors truncate">
                    {prod.nombre}
                  </h3>

                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-xl font-bold text-neon-pink">
                      ${Number(prod.precioVenta || 0).toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
                    </span>
                    <span className="text-[10px] text-gray-400">IVA incluido</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                  <Link to={`/catalogo/${prod.idProducto}`} className="flex-1">
                    <button className="w-full py-2.5 rounded-lg border border-white/20 text-xs font-semibold text-gray-300 hover:text-white hover:border-white transition-colors">
                      Ver Detalle
                    </button>
                  </Link>
                  <button
                    onClick={() => addItem(prod as ProductoResponseDTO)}
                    className="p-2.5 rounded-lg bg-neon-green/10 border border-neon-green/40 text-neon-green hover:bg-neon-green hover:text-black transition-all"
                    title="Añadir al Carrito"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* =========================================================================
          CUMPLIMIENTO LEGAL & CONFIANZA PROFECO
          ========================================================================= */}
      <section className="container mx-auto px-6">
        <div className="p-8 md:p-12 rounded-3xl glass-panel border border-neon-green/30 bg-gradient-to-r from-dark-950 via-dark-900 to-dark-950">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-green/40 bg-neon-green/10 text-neon-green text-xs font-semibold uppercase tracking-wider mb-4">
                <ShieldCheck className="w-4 h-4" />
                <span>Normativa Mexicana Vigente</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Transparencia Total en Cada Compra
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed mb-6">
                En SonoraSync / MelodyArt cumplimos estrictamente con la Ley Federal de Protección al Consumidor (LFPC) y los lineamientos de la PROFECO para tiendas virtuales. Tus derechos están respaldados por la legislación mexicana.
              </p>

              <div className="space-y-3 text-xs text-gray-300">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-neon-green flex-shrink-0" />
                  <span><strong>Desglose Fiscal del 16% de IVA:</strong> Cero cargos ocultos o cobros sorpresa al momento de pagar.</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-neon-green flex-shrink-0" />
                  <span><strong>Revocación de Compra (Art. 56 LFPC):</strong> 5 días hábiles a partir de la entrega para devolver tu producto sin penalización.</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-neon-green flex-shrink-0" />
                  <span><strong>Garantía de Fábrica:</strong> Mínimo 90 días naturales para todos los instrumentos musicales nuevos.</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl border border-white/10 bg-dark-900/60 text-xs">
                <h4 className="font-semibold text-white mb-1">Aviso de Privacidad (LFPDPPP)</h4>
                <p className="text-gray-400 mb-3">Tus datos personales y CURP están protegidos con cifrado y sujetos a derechos ARCO.</p>
                <Link to="/privacidad" className="text-neon-cyan font-medium hover:underline">Leer Aviso Completo →</Link>
              </div>

              <div className="p-5 rounded-2xl border border-white/10 bg-dark-900/60 text-xs">
                <h4 className="font-semibold text-white mb-1">Términos Comerciales</h4>
                <p className="text-gray-400 mb-3">Conoce los lineamientos de compra, facturación electrónica CFDI y envíos.</p>
                <Link to="/terminos" className="text-neon-pink font-medium hover:underline">Ver Términos →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
