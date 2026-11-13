import React, { useEffect, useState, useMemo } from 'react';
import { AlertTriangle, Package, ArrowUpCircle, ArrowDownCircle, RefreshCw } from 'lucide-react';
import { NeonButton } from '../../components/ui/NeonButton';
import apiClient from '../../api/apiClient';
import type {
  MovimientoInventarioResponseDTO,
  ProductoResponseDTO,
  SpringPage,
} from '../../types';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
type TabId = 'movimientos' | 'stock';
type TipoMovimiento = 'ENTRADA' | 'SALIDA' | 'AJUSTE' | '';

const TipoBadge: React.FC<{ tipo: string }> = ({ tipo }) => {
  const map: Record<string, string> = {
    ENTRADA: 'bg-green-500/20 text-green-400 border-green-500/30',
    SALIDA:  'bg-red-500/20 text-red-400 border-red-500/30',
    AJUSTE:  'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  };
  const cls = map[tipo] ?? 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  const Icon = tipo === 'ENTRADA'
    ? ArrowUpCircle
    : tipo === 'SALIDA'
      ? ArrowDownCircle
      : RefreshCw;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold border ${cls}`}>
      <Icon className="w-3 h-3" />
      {tipo}
    </span>
  );
};

const StockBadge: React.FC<{ stock: number }> = ({ stock }) => {
  const cls =
    stock > 10
      ? 'bg-green-500/20 text-green-400 border-green-500/30'
      : stock >= 1
        ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
        : 'bg-red-500/20 text-red-400 border-red-500/30';
  return (
    <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${cls}`}>
      {stock}
    </span>
  );
};

const TableSkeleton: React.FC = () => (
  <div className="space-y-2 animate-pulse p-4">
    {[...Array(6)].map((_, i) => <div key={i} className="h-10 bg-white/5 rounded" />)}
  </div>
);

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------
export const InventarioPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('movimientos');

  // --- Movimientos state ---
  const [movimientos, setMovimientos] = useState<MovimientoInventarioResponseDTO[]>([]);
  const [movPage, setMovPage] = useState(0);
  const [movTotalPages, setMovTotalPages] = useState(0);
  const [movLoading, setMovLoading] = useState(false);
  const [movTipoFilter, setMovTipoFilter] = useState<TipoMovimiento>('');
  const [movSearch, setMovSearch] = useState('');

  // --- Stock state ---
  const [productos, setProductos] = useState<ProductoResponseDTO[]>([]);
  const [stockLoading, setStockLoading] = useState(false);

  // Fetch Movimientos
  useEffect(() => {
    if (activeTab !== 'movimientos') return;
    setMovLoading(true);
    apiClient
      .get<SpringPage<MovimientoInventarioResponseDTO>>(
        `/api/movimientos-inventario?page=${movPage}&size=20`
      )
      .then((r) => {
        setMovimientos(r.data.content);
        setMovTotalPages(r.data.totalPages);
      })
      .catch(() => {/* handled by interceptor */})
      .finally(() => setMovLoading(false));
  }, [activeTab, movPage]);

  // Fetch Productos / Stock
  useEffect(() => {
    if (activeTab !== 'stock') return;
    setStockLoading(true);
    apiClient
      .get<SpringPage<ProductoResponseDTO>>('/api/productos?page=0&size=50')
      .then((r) => setProductos(r.data.content))
      .catch(() => {/* handled by interceptor */})
      .finally(() => setStockLoading(false));
  }, [activeTab]);

  // Client-side filter for movimientos
  const filteredMovimientos = useMemo(() => {
    return movimientos.filter((m) => {
      const matchesTipo = movTipoFilter ? m.tipoMovimiento === movTipoFilter : true;
      const matchesSearch = movSearch
        ? m.producto.nombre.toLowerCase().includes(movSearch.toLowerCase())
        : true;
      return matchesTipo && matchesSearch;
    });
  }, [movimientos, movTipoFilter, movSearch]);

  // Check for zero-stock products
  const hasZeroStock = productos.some((p) => p.stock === 0);

  return (
    <div className="container mx-auto px-6 py-12">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-1">
          Inventario & <span className="neon-text-cyan">Kardex</span>
        </h1>
        <p className="text-sm text-gray-400">
          Control de movimientos de inventario y stock actual de productos.
        </p>
      </div>

      {/* TABS */}
      <div className="flex gap-1 mb-6 glass-panel rounded-xl p-1 w-fit">
        {(['movimientos', 'stock'] as TabId[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 capitalize ${
              activeTab === tab
                ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/40'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            {tab === 'movimientos' ? 'Movimientos' : 'Stock Actual'}
          </button>
        ))}
      </div>

      {/* TAB: MOVIMIENTOS */}
      {activeTab === 'movimientos' && (
        <>
          {/* Filter Bar */}
          <div className="flex flex-wrap gap-3 mb-4">
            <select
              value={movTipoFilter}
              onChange={(e) => setMovTipoFilter(e.target.value as TipoMovimiento)}
              className="bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-300 focus:border-neon-cyan/50 focus:outline-none"
              aria-label="Filtrar por tipo de movimiento"
            >
              <option value="">Todos los tipos</option>
              <option value="ENTRADA">ENTRADA</option>
              <option value="SALIDA">SALIDA</option>
              <option value="AJUSTE">AJUSTE</option>
            </select>
            <input
              type="text"
              placeholder="Buscar por producto…"
              value={movSearch}
              onChange={(e) => setMovSearch(e.target.value)}
              className="bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-300 placeholder-gray-600 focus:border-neon-cyan/50 focus:outline-none w-56"
              aria-label="Buscar por producto"
            />
          </div>

          <div className="glass-table-container">
            {movLoading ? (
              <TableSkeleton />
            ) : filteredMovimientos.length === 0 ? (
              <div className="p-10 text-center text-gray-400 text-sm">
                No se encontraron movimientos con los filtros actuales.
              </div>
            ) : (
              <table className="w-full text-sm" aria-label="Movimientos de inventario">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Fecha</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Producto</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Tipo</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Cantidad</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Motivo</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Referencia</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Usuario</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMovimientos.map((m) => (
                    <tr key={m.idMovimiento} className="glass-table-row">
                      <td className="px-4 py-3 text-gray-400 text-xs font-mono">
                        {new Date(m.fechaHora).toLocaleString('es-MX', { dateStyle: 'short', timeStyle: 'short' })}
                      </td>
                      <td className="px-4 py-3 text-gray-300">{m.producto.nombre}</td>
                      <td className="px-4 py-3"><TipoBadge tipo={m.tipoMovimiento} /></td>
                      <td className="px-4 py-3 text-gray-300 font-mono">{m.cantidad}</td>
                      <td className="px-4 py-3 text-gray-400 text-xs">{m.motivo ?? '—'}</td>
                      <td className="px-4 py-3 text-gray-400 text-xs font-mono">{m.referencia ?? '—'}</td>
                      <td className="px-4 py-3 text-gray-400 text-xs">
                        {m.usuario.nombre} {m.usuario.apellidos}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          {movTotalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-4">
              <NeonButton
                variant="cyan"
                onClick={() => setMovPage((p) => Math.max(0, p - 1))}
                disabled={movPage === 0}
                className="py-1.5 px-4 text-xs"
              >
                Anterior
              </NeonButton>
              <span className="text-sm text-gray-400">
                Página {movPage + 1} de {movTotalPages}
              </span>
              <NeonButton
                variant="cyan"
                onClick={() => setMovPage((p) => Math.min(movTotalPages - 1, p + 1))}
                disabled={movPage >= movTotalPages - 1}
                className="py-1.5 px-4 text-xs"
              >
                Siguiente
              </NeonButton>
            </div>
          )}
        </>
      )}

      {/* TAB: STOCK ACTUAL */}
      {activeTab === 'stock' && (
        <>
          {hasZeroStock && (
            <div className="flex items-center gap-3 p-4 rounded-xl border border-red-500/40 bg-red-500/10 text-red-400 text-sm mb-4">
              <AlertTriangle className="w-5 h-5 flex-shrink-0" />
              <span>
                <strong>Alerta:</strong> Uno o más productos tienen stock en <strong>CERO</strong>. Revisa tu inventario y registra una entrada.
              </span>
            </div>
          )}

          <div className="glass-table-container">
            {stockLoading ? (
              <TableSkeleton />
            ) : productos.length === 0 ? (
              <div className="p-10 text-center text-gray-400 text-sm">
                No hay productos registrados en el sistema.
              </div>
            ) : (
              <table className="w-full text-sm" aria-label="Stock actual de productos">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">SKU</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Nombre</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Categoría</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Marca</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Precio</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((p) => (
                    <tr key={p.idProducto} className="glass-table-row">
                      <td className="px-4 py-3 font-mono text-neon-cyan text-xs">{p.sku}</td>
                      <td className="px-4 py-3 text-gray-300">{p.nombre}</td>
                      <td className="px-4 py-3 text-gray-400 text-xs">{p.categoria.nombre}</td>
                      <td className="px-4 py-3 text-gray-400 text-xs">{p.marca?.nombre ?? '—'}</td>
                      <td className="px-4 py-3 text-gray-300 font-mono">
                        ${p.precioVenta.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-4 py-3">
                        <StockBadge stock={p.stock} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}

      {/* Empty state icon */}
      {activeTab === 'stock' && !stockLoading && productos.length === 0 && (
        <div className="flex justify-center mt-6 text-gray-700">
          <Package className="w-16 h-16" />
        </div>
      )}
    </div>
  );
};
