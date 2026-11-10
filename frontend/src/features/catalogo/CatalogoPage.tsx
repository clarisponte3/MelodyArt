import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ProductosService } from '../../api/productos.service';
import { CategoriaResponseDTO, MarcaResponseDTO, ProductoResponseDTO, SpringPage } from '../../types';
import { useCartStore } from '../../store/cartStore';
import { NeonButton } from '../../components/ui/NeonButton';
import { GlassCard } from '../../components/ui/GlassCard';
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Music,
} from 'lucide-react';

export const CatalogoPage: React.FC = () => {
  const [productos, setProductos] = useState<ProductoResponseDTO[]>([]);
  const [categorias, setCategorias] = useState<CategoriaResponseDTO[]>([]);
  const [marcas, setMarcas] = useState<MarcaResponseDTO[]>([]);

  // Paginación Spring Boot
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(9);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  // Filtros
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedCategoria, setSelectedCategoria] = useState<number | null>(null);
  const [selectedMarca, setSelectedMarca] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number>(50000);
  const [loading, setLoading] = useState(true);

  const { addItem } = useCartStore();

  // Debounce de 300ms en búsqueda
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCurrentPage(0);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Carga inicial de filtros (Categorías y Marcas)
  useEffect(() => {
    const loadFilters = async () => {
      try {
        const [catData, marcaData] = await Promise.allSettled([
          ProductosService.getCategorias(),
          ProductosService.getMarcas(),
        ]);

        if (catData.status === 'fulfilled' && Array.isArray(catData.value)) {
          setCategorias(catData.value);
        } else {
          // Fallback de categorías
          setCategorias([
            { idCategoria: 1, nombre: 'Guitarras y Ukeleles', tipo: 'CUERDAS' },
            { idCategoria: 2, nombre: 'Teclados y Pianos', tipo: 'TECLAS' },
            { idCategoria: 3, nombre: 'Percusión y Baterías', tipo: 'PERCUSION' },
            { idCategoria: 4, nombre: 'Vientos y Accesorios', tipo: 'VIENTOS' },
          ]);
        }

        if (marcaData.status === 'fulfilled' && Array.isArray(marcaData.value)) {
          setMarcas(marcaData.value);
        } else {
          // Fallback de marcas
          setMarcas([
            { idMarca: 1, nombre: 'Sonora Artesanal', activa: true },
            { idMarca: 2, nombre: 'Yamaha Pro', activa: true },
            { idMarca: 3, nombre: 'Fender México', activa: true },
            { idMarca: 4, nombre: 'Roland Classic', activa: true },
          ]);
        }
      } catch {
        // Silently handled
      }
    };

    loadFilters();
  }, []);

  // Carga de productos desde el backend con soporte de paginación
  useEffect(() => {
    const loadProductos = async () => {
      setLoading(true);
      try {
        const data = await ProductosService.getProductos({
          page: currentPage,
          size: pageSize,
          sort: 'precioVenta,asc',
        });

        if (Array.isArray(data)) {
          setProductos(data);
          setTotalElements(data.length);
          setTotalPages(Math.ceil(data.length / pageSize) || 1);
        } else if (data && 'content' in data) {
          const pageData = data as SpringPage<ProductoResponseDTO>;
          setProductos(pageData.content || []);
          setTotalPages(pageData.totalPages || 1);
          setTotalElements(pageData.totalElements || 0);
        }
      } catch {
        // Si el backend aún no tiene datos cargados, inyectar catálogo demo para testear la UI
        const demoProductos: ProductoResponseDTO[] = [
          {
            idProducto: 1,
            sku: 'GTR-AC-01',
            nombre: 'Guitarra Acústica Sonora Concierto',
            modelo: 'Classic C-40',
            numeroSerie: 'SN-GTR-8812',
            precioVenta: 4850.0,
            stock: 6,
            stockMinimo: 2,
            categoria: { idCategoria: 1, nombre: 'Guitarras y Ukeleles' },
            marca: { idMarca: 1, nombre: 'Sonora Artesanal', activa: true },
            activo: true,
          },
          {
            idProducto: 2,
            sku: 'UKL-SOP-02',
            nombre: 'Ukelele Soprano Madera Maciza Caoba',
            modelo: 'US-20 Island',
            numeroSerie: 'SN-UKL-1029',
            precioVenta: 1890.0,
            stock: 14,
            stockMinimo: 3,
            categoria: { idCategoria: 1, nombre: 'Guitarras y Ukeleles' },
            marca: { idMarca: 1, nombre: 'Sonora Artesanal', activa: true },
            activo: true,
          },
          {
            idProducto: 3,
            sku: 'PNO-DIG-03',
            nombre: 'Piano Digital 88 Teclas Contrapesadas Graded Hammer',
            modelo: 'P-125 Stage Pro',
            numeroSerie: 'SN-PNO-4491',
            precioVenta: 16499.0,
            stock: 3,
            stockMinimo: 1,
            categoria: { idCategoria: 2, nombre: 'Teclados y Pianos' },
            marca: { idMarca: 2, nombre: 'Yamaha Pro', activa: true },
            activo: true,
          },
          {
            idProducto: 4,
            sku: 'BAT-AC-04',
            nombre: 'Batería Acústica 5 Cuerpos Stage Custom',
            modelo: 'Rydeen Studio',
            numeroSerie: 'SN-BAT-7721',
            precioVenta: 22800.0,
            stock: 2,
            stockMinimo: 1,
            categoria: { idCategoria: 3, nombre: 'Percusión y Baterías' },
            marca: { idMarca: 2, nombre: 'Yamaha Pro', activa: true },
            activo: true,
          },
          {
            idProducto: 5,
            sku: 'GTR-EL-05',
            nombre: 'Guitarra Eléctrica Stratocaster Player Plus',
            modelo: 'Player Series SSS',
            numeroSerie: 'SN-FND-9923',
            precioVenta: 18990.0,
            stock: 5,
            stockMinimo: 2,
            categoria: { idCategoria: 1, nombre: 'Guitarras y Ukeleles' },
            marca: { idMarca: 3, nombre: 'Fender México', activa: true },
            activo: true,
          },
          {
            idProducto: 6,
            sku: 'AMP-GTR-06',
            nombre: 'Amplificador de Guitarra 40W Bluetooth',
            modelo: 'Cube Stage 40',
            numeroSerie: 'SN-AMP-3321',
            precioVenta: 6890.0,
            stock: 0,
            stockMinimo: 2,
            categoria: { idCategoria: 4, nombre: 'Vientos y Accesorios' },
            marca: { idMarca: 4, nombre: 'Roland Classic', activa: true },
            activo: true,
          },
        ];

        setProductos(demoProductos);
        setTotalElements(demoProductos.length);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    loadProductos();
  }, [currentPage, pageSize]);

  // Filtrado local reactivo en cliente (cuando backend entrega lista completa o sobre la página)
  const filteredProductos = useMemo(() => {
    return productos.filter((prod) => {
      // Filtro de búsqueda
      if (debouncedSearch.trim()) {
        const query = debouncedSearch.toLowerCase();
        const matchesName = prod.nombre.toLowerCase().includes(query);
        const matchesSku = prod.sku?.toLowerCase().includes(query);
        const matchesModel = prod.modelo?.toLowerCase().includes(query);
        if (!matchesName && !matchesSku && !matchesModel) return false;
      }

      // Filtro de categoría
      if (selectedCategoria && prod.categoria?.idCategoria !== selectedCategoria) {
        return false;
      }

      // Filtro de marca
      if (selectedMarca && prod.marca?.idMarca !== selectedMarca) {
        return false;
      }

      // Filtro de precio
      if (Number(prod.precioVenta) > maxPrice) {
        return false;
      }

      return true;
    });
  }, [productos, debouncedSearch, selectedCategoria, selectedMarca, maxPrice]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setDebouncedSearch('');
    setSelectedCategoria(null);
    setSelectedMarca(null);
    setMaxPrice(50000);
    setCurrentPage(0);
  };

  return (
    <div className="container mx-auto px-6 py-12">
      {/* HEADER DE LA TIENDA */}
      <div className="mb-10 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tienda de Instrumentos Musicales</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white">Catálogo de Instrumentos</h1>
          <p className="text-xs text-gray-400 mt-1">
            Precios en Pesos Mexicanos (MXN) con 16% de IVA desglosado y 90 días de garantía de fábrica.
          </p>
        </div>

        {/* BARRA DE BÚSQUEDA REACTIVA CON DEBOUNCE */}
        <div className="w-full md:w-80 relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nombre, modelo, SKU..."
            className="w-full bg-dark-900 border border-white/15 focus:border-neon-cyan rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-gray-500 outline-none transition-all shadow-inner"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* =======================================================================
            SIDEBAR DE FILTROS
            ======================================================================= */}
        <aside className="lg:col-span-1">
          <GlassCard accent="cyan" className="p-6 sticky top-28 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <SlidersHorizontal className="w-4 h-4 text-neon-cyan" />
                <span>Filtros Activos</span>
              </div>
              <button
                onClick={handleResetFilters}
                className="text-[11px] text-gray-400 hover:text-neon-cyan flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Limpiar</span>
              </button>
            </div>

            {/* FILTRO POR CATEGORÍA */}
            <div>
              <h4 className="text-xs font-semibold text-neon-cyan uppercase tracking-wider mb-3">
                Categorías
              </h4>
              <div className="space-y-2">
                <label className="flex items-center gap-2.5 text-xs text-gray-300 cursor-pointer">
                  <input
                    type="radio"
                    name="categoria"
                    checked={selectedCategoria === null}
                    onChange={() => setSelectedCategoria(null)}
                    className="text-neon-cyan focus:ring-0"
                  />
                  <span>Todas las categorías</span>
                </label>
                {categorias.map((cat) => (
                  <label key={cat.idCategoria} className="flex items-center gap-2.5 text-xs text-gray-300 cursor-pointer">
                    <input
                      type="radio"
                      name="categoria"
                      checked={selectedCategoria === cat.idCategoria}
                      onChange={() => setSelectedCategoria(cat.idCategoria)}
                      className="text-neon-cyan focus:ring-0"
                    />
                    <span className={selectedCategoria === cat.idCategoria ? 'text-neon-cyan font-semibold' : ''}>
                      {cat.nombre}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* FILTRO POR MARCA */}
            <div>
              <h4 className="text-xs font-semibold text-neon-pink uppercase tracking-wider mb-3">
                Marcas
              </h4>
              <div className="space-y-2">
                <label className="flex items-center gap-2.5 text-xs text-gray-300 cursor-pointer">
                  <input
                    type="radio"
                    name="marca"
                    checked={selectedMarca === null}
                    onChange={() => setSelectedMarca(null)}
                    className="text-neon-pink focus:ring-0"
                  />
                  <span>Todas las marcas</span>
                </label>
                {marcas.map((m) => (
                  <label key={m.idMarca} className="flex items-center gap-2.5 text-xs text-gray-300 cursor-pointer">
                    <input
                      type="radio"
                      name="marca"
                      checked={selectedMarca === m.idMarca}
                      onChange={() => setSelectedMarca(m.idMarca)}
                      className="text-neon-pink focus:ring-0"
                    />
                    <span className={selectedMarca === m.idMarca ? 'text-neon-pink font-semibold' : ''}>
                      {m.nombre}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* FILTRO POR RANGO DE PRECIOS */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-xs font-semibold text-neon-yellow uppercase tracking-wider">
                  Precio Máximo
                </h4>
                <span className="text-xs font-bold text-neon-yellow font-mono">
                  ${maxPrice.toLocaleString('es-MX')} MXN
                </span>
              </div>
              <input
                type="range"
                min="1000"
                max="50000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-neon-yellow cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                <span>$1,000 MXN</span>
                <span>$50,000 MXN</span>
              </div>
            </div>
          </GlassCard>
        </aside>

        {/* =======================================================================
            GRID DE PRODUCTOS Y PAGINACIÓN
            ======================================================================= */}
        <section className="lg:col-span-3">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-80 rounded-2xl glass-panel animate-pulse bg-white/5" />
              ))}
            </div>
          ) : filteredProductos.length === 0 ? (
            <div className="rounded-2xl glass-panel p-12 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full border border-white/10 bg-dark-900 flex items-center justify-center text-gray-500 mb-4">
                <Music className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                No encontramos instrumentos con estos filtros
              </h3>
              <p className="text-xs text-gray-400 max-w-sm mb-6">
                Intenta ajustando el rango de precio, cambiando la categoría o limpiando los términos de búsqueda.
              </p>
              <NeonButton variant="cyan" onClick={handleResetFilters}>
                Restablecer Filtros
              </NeonButton>
            </div>
          ) : (
            <>
              {/* LISTADO DE TARJETAS */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
                {filteredProductos.map((prod) => {
                  const isOutOfStock = prod.stock <= 0;
                  const isLowStock = prod.stock > 0 && prod.stock <= (prod.stockMinimo || 2);

                  return (
                    <div
                      key={prod.idProducto}
                      className="group rounded-2xl glass-panel border border-white/10 hover:border-neon-cyan/40 p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-neon-cyan/20"
                    >
                      <div>
                        {/* IMAGEN / PLACEHOLDER DEL INSTRUMENTO */}
                        <div className="relative h-48 w-full rounded-xl bg-dark-900 border border-white/5 flex items-center justify-center mb-4 overflow-hidden group-hover:border-neon-cyan/20 transition-colors">
                          <span className="font-mono text-neon-cyan font-bold text-sm tracking-wider">
                            {prod.modelo || prod.sku}
                          </span>

                          {/* BADGES DE STOCK */}
                          <div className="absolute top-2.5 right-2.5">
                            {isOutOfStock ? (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                                Agotado
                              </span>
                            ) : isLowStock ? (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-neon-orange/20 text-neon-orange border border-neon-orange/30">
                                ¡Últimas {prod.stock} pzas!
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-neon-green/20 text-neon-green border border-neon-green/30">
                                En Stock ({prod.stock})
                              </span>
                            )}
                          </div>
                        </div>

                        {/* CATEGORÍA Y MARCA */}
                        <div className="flex items-center justify-between text-[11px] text-gray-400 mb-1">
                          <span>{prod.categoria?.nombre || 'Instrumento'}</span>
                          <span className="text-neon-cyan font-medium">{prod.marca?.nombre}</span>
                        </div>

                        {/* TÍTULO */}
                        <h3 className="font-semibold text-white text-sm mb-2 group-hover:text-neon-cyan transition-colors line-clamp-2">
                          {prod.nombre}
                        </h3>

                        {/* PRECIO CON IVA */}
                        <div className="flex items-baseline gap-2 mb-4">
                          <span className="text-lg font-bold text-neon-pink">
                            ${Number(prod.precioVenta).toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
                          </span>
                          <span className="text-[10px] text-gray-400">16% IVA</span>
                        </div>
                      </div>

                      {/* BOTONES DE ACCIÓN */}
                      <div className="flex items-center gap-2 pt-3 border-t border-white/5">
                        <Link to={`/catalogo/${prod.idProducto}`} className="flex-1">
                          <button className="w-full py-2 rounded-lg border border-white/20 text-xs font-semibold text-gray-300 hover:text-white hover:border-white transition-colors">
                            Detalles
                          </button>
                        </Link>

                        <button
                          disabled={isOutOfStock}
                          onClick={() => addItem(prod)}
                          className={`p-2 rounded-lg border transition-all ${
                            isOutOfStock
                              ? 'bg-gray-800 border-gray-700 text-gray-500 cursor-not-allowed'
                              : 'bg-neon-green/10 border-neon-green/40 text-neon-green hover:bg-neon-green hover:text-black hover:shadow-neon-green'
                          }`}
                          title={isOutOfStock ? 'Producto agotado' : 'Añadir al carrito'}
                        >
                          <ShoppingBag className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CONTROLES DE PAGINACIÓN SPRING BOOT (PAGEABLE) */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl glass-panel text-xs text-gray-400">
                <div>
                  Mostrando <strong className="text-white">{filteredProductos.length}</strong> de{' '}
                  <strong className="text-white">{totalElements}</strong> instrumentos registrados
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <span>Ver:</span>
                    <select
                      value={pageSize}
                      onChange={(e) => {
                        setPageSize(Number(e.target.value));
                        setCurrentPage(0);
                      }}
                      className="bg-dark-900 border border-white/10 rounded px-2 py-1 text-white text-xs focus:outline-none focus:border-neon-cyan"
                    >
                      <option value={6}>6</option>
                      <option value={9}>9</option>
                      <option value={12}>12</option>
                      <option value={24}>24</option>
                    </select>
                  </div>

                  <button
                    disabled={currentPage === 0}
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                    className="p-1.5 rounded-lg border border-white/10 hover:border-white/30 disabled:opacity-40 disabled:cursor-not-allowed text-white"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <span className="text-white font-medium">
                    Página {currentPage + 1} de {totalPages || 1}
                  </span>

                  <button
                    disabled={currentPage >= totalPages - 1}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    className="p-1.5 rounded-lg border border-white/10 hover:border-white/30 disabled:opacity-40 disabled:cursor-not-allowed text-white"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
};
