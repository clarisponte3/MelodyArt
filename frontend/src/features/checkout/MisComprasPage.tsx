import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../../api/apiClient';
import { VentaResponseDTO, DetalleVentaResponseDTO, SpringPage } from '../../types';
import { ShoppingBag, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';

const EstadoBadge: React.FC<{ estado: string }> = ({ estado }) => {
  const colorMap: Record<string, string> = {
    COMPLETADA: 'bg-neon-green/10 text-neon-green border-neon-green/30',
    PENDIENTE: 'bg-neon-yellow/10 text-neon-yellow border-neon-yellow/30',
    CANCELADA: 'bg-red-500/10 text-red-400 border-red-500/30',
  };
  const cls = colorMap[estado] ?? 'bg-white/10 text-gray-300 border-white/20';
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold border ${cls}`}>
      {estado}
    </span>
  );
};

const VentaRow: React.FC<{ venta: VentaResponseDTO }> = ({ venta }) => {
  const [expanded, setExpanded] = useState(false);
  const [detalles, setDetalles] = useState<DetalleVentaResponseDTO[]>([]);
  const [loadingDetalles, setLoadingDetalles] = useState(false);

  const toggleDetalles = async () => {
    if (!expanded && detalles.length === 0) {
      setLoadingDetalles(true);
      try {
        const { data } = await apiClient.get<DetalleVentaResponseDTO[]>(
          `/api/detalles-venta?idVenta=${venta.idVenta}`
        );
        setDetalles(Array.isArray(data) ? data : []);
      } catch {
        // Toast handled by interceptor
      } finally {
        setLoadingDetalles(false);
      }
    }
    setExpanded((prev) => !prev);
  };

  const totalConIva =
    detalles.reduce((acc, d) => acc + d.precioUnitario * d.cantidad, 0) * (1 + (venta.tasaIva || 0.16));

  return (
    <>
      <tr className="glass-table-row">
        <td className="px-4 py-3 text-white font-mono text-xs">{venta.folio}</td>
        <td className="px-4 py-3 text-gray-300 text-xs hidden md:table-cell">
          {new Date(venta.fechaHora).toLocaleDateString('es-MX', {
            year: 'numeric', month: 'short', day: 'numeric',
          })}
        </td>
        <td className="px-4 py-3 text-gray-400 text-xs hidden lg:table-cell">
          {venta.metodoPago?.nombre ?? '—'}
        </td>
        <td className="px-4 py-3">
          <EstadoBadge estado={venta.estado} />
        </td>
        <td className="px-4 py-3 text-right">
          <button
            onClick={toggleDetalles}
            className="inline-flex items-center gap-1 text-xs text-neon-cyan hover:text-white transition-colors px-2 py-1 rounded border border-neon-cyan/20 hover:border-neon-cyan/50"
            aria-expanded={expanded}
            aria-label={expanded ? 'Ocultar detalles' : 'Ver detalles'}
          >
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            Detalles
          </button>
        </td>
      </tr>
      {expanded && (
        <tr>
          <td colSpan={5} className="px-4 py-4 bg-dark-900/60">
            {loadingDetalles ? (
              <div className="text-xs text-gray-400 animate-pulse">Cargando detalles...</div>
            ) : detalles.length > 0 ? (
              <div className="rounded-xl border border-white/10 overflow-hidden">
                <table className="w-full text-xs" aria-label="Detalles de la venta">
                  <thead>
                    <tr className="border-b border-white/10 bg-dark-900/80">
                      <th className="text-left px-3 py-2 text-gray-400">Producto</th>
                      <th className="text-center px-3 py-2 text-gray-400">Cant.</th>
                      <th className="text-right px-3 py-2 text-gray-400">Precio Unit.</th>
                      <th className="text-right px-3 py-2 text-gray-400">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detalles.map((d) => (
                      <tr key={d.idDetalleVenta} className="border-b border-white/5">
                        <td className="px-3 py-2 text-white">{d.producto.nombre}</td>
                        <td className="px-3 py-2 text-center text-gray-300">{d.cantidad}</td>
                        <td className="px-3 py-2 text-right text-gray-300">
                          ${Number(d.precioUnitario).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                        </td>
                        <td className="px-3 py-2 text-right text-white font-medium">
                          ${(d.precioUnitario * d.cantidad).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t border-white/10 bg-dark-900/80">
                      <td colSpan={3} className="px-3 py-2 text-right text-gray-400 font-semibold">
                        Total (IVA {((venta.tasaIva || 0.16) * 100).toFixed(0)}% incluido):
                      </td>
                      <td className="px-3 py-2 text-right text-neon-green font-bold">
                        ${totalConIva.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            ) : (
              <p className="text-xs text-gray-500">No se encontraron detalles para esta venta.</p>
            )}
          </td>
        </tr>
      )}
    </>
  );
};

export const MisComprasPage: React.FC = () => {
  const [ventas, setVentas] = useState<VentaResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const PAGE_SIZE = 10;

  const fetchVentas = useCallback(async (p: number) => {
    setLoading(true);
    try {
      const { data } = await apiClient.get<SpringPage<VentaResponseDTO>>(
        `/api/ventas?page=${p}&size=${PAGE_SIZE}&sort=fechaHora,desc`
      );
      if (data && data.content) {
        setVentas(data.content);
        setTotalPages(data.totalPages);
        setTotalElements(data.totalElements);
      }
    } catch {
      // Toast via interceptor
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVentas(page);
  }, [page, fetchVentas]);

  return (
    <div className="container mx-auto px-6 py-12 flex flex-col gap-8">
      {/* HEADER */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <ShoppingBag className="w-5 h-5 text-neon-pink" aria-hidden="true" />
          <span className="text-xs font-semibold text-neon-pink uppercase tracking-widest">Mi Historial</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white">Mis Compras & Facturas</h1>
        <p className="text-sm text-gray-400 mt-1">{totalElements} compra{totalElements !== 1 ? 's' : ''} registrada{totalElements !== 1 ? 's' : ''}</p>
      </div>

      {/* NOTA LEGAL LFPC */}
      <div className="flex items-start gap-3 p-4 rounded-xl border border-neon-green/20 bg-neon-green/5">
        <ShieldCheck className="w-5 h-5 text-neon-green flex-shrink-0 mt-0.5" aria-hidden="true" />
        <p className="text-xs text-gray-300 leading-relaxed">
          <strong className="text-neon-green">Derechos del Consumidor (Art. 56 LFPC):</strong> Cuentas con 5 días hábiles a partir de la fecha de entrega para solicitar la devolución o cancelación de tu compra sin penalización. Consulta{' '}
          <Link to="/terminos" className="underline hover:text-white transition-colors">Términos y Condiciones</Link> para el procedimiento completo.
        </p>
      </div>

      {/* TABLA */}
      {loading ? (
        <div className="glass-table-container">
          {[1, 2, 3, 4, 5].map((n) => (
            <div key={n} className="h-12 border-b border-white/5 animate-pulse bg-white/3" />
          ))}
        </div>
      ) : ventas.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
          <ShoppingBag className="w-16 h-16 text-gray-600" aria-hidden="true" />
          <h2 className="text-xl font-semibold text-white">Aún no has realizado ninguna compra</h2>
          <p className="text-gray-400 max-w-sm text-sm">
            Explora nuestro catálogo de instrumentos y encuentra el instrumento perfecto para ti.
          </p>
          <Link to="/catalogo">
            <button className="mt-2 px-6 py-2.5 rounded-xl border border-neon-cyan/40 bg-neon-cyan/10 text-neon-cyan text-sm font-semibold hover:bg-neon-cyan/20 transition-colors">
              Explorar Catálogo
            </button>
          </Link>
        </div>
      ) : (
        <>
          <div className="glass-table-container">
            <table className="w-full text-sm" role="table" aria-label="Historial de compras">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Folio</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden md:table-cell">Fecha</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden lg:table-cell">Método de Pago</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Estado</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {ventas.map((v) => (
                  <VentaRow key={v.idVenta} venta={v} />
                ))}
              </tbody>
            </table>
          </div>

          {/* PAGINACIÓN */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-gray-400">
                Página {page + 1} de {totalPages} · {totalElements} compras
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={page === 0}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-white/10 text-xs text-gray-300 hover:text-white hover:border-white/30 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  aria-label="Página anterior"
                >
                  <ChevronLeft className="w-3.5 h-3.5" /> Anterior
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                  disabled={page === totalPages - 1}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-white/10 text-xs text-gray-300 hover:text-white hover:border-white/30 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  aria-label="Página siguiente"
                >
                  Siguiente <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
