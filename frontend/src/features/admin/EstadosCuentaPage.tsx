import React, { useEffect, useState, useMemo } from 'react';
import { AlertTriangle } from 'lucide-react';
import apiClient from '../../api/apiClient';
import type { EstadoCuentaResponseDTO } from '../../types';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
type EstadoFilter = 'PENDIENTE' | 'PAGADO' | 'VENCIDO' | '';

const EstadoBadge: React.FC<{ estado: string }> = ({ estado }) => {
  const map: Record<string, string> = {
    PENDIENTE: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    PAGADO:    'bg-green-500/20 text-green-400 border-green-500/30',
    VENCIDO:   'bg-red-500/20 text-red-400 border-red-500/30',
  };
  const cls = map[estado] ?? 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  return (
    <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${cls}`}>
      {estado}
    </span>
  );
};

const fmtDate = (d: string) =>
  new Date(d).toLocaleDateString('es-MX', { dateStyle: 'medium' });

const fmtMXN = (n: number) =>
  n.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });

const TableSkeleton: React.FC = () => (
  <div className="space-y-2 animate-pulse p-4">
    {[...Array(6)].map((_, i) => <div key={i} className="h-10 bg-white/5 rounded" />)}
  </div>
);

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------
export const EstadosCuentaPage: React.FC = () => {
  const [estados, setEstados] = useState<EstadoCuentaResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [estadoFilter, setEstadoFilter] = useState<EstadoFilter>('');

  useEffect(() => {
    apiClient
      .get<EstadoCuentaResponseDTO[]>('/api/estados-cuenta')
      .then((r) => setEstados(r.data))
      .catch(() => {/* handled by interceptor */})
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(
    () =>
      estadoFilter ? estados.filter((e) => e.estado === estadoFilter) : estados,
    [estados, estadoFilter]
  );

  // Sum of PENDIENTE amounts
  const totalPendiente = useMemo(
    () =>
      estados
        .filter((e) => e.estado === 'PENDIENTE')
        .reduce((acc, e) => acc + e.monto, 0),
    [estados]
  );

  return (
    <div className="container mx-auto px-6 py-12">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-1">
          <span className="neon-text-yellow">Estados de Cuenta</span>
        </h1>
        <p className="text-sm text-gray-400">
          Gestión de colegiaturas y estados financieros por alumno.
        </p>
      </div>

      {/* FILTER + TOTAL */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <select
          value={estadoFilter}
          onChange={(e) => setEstadoFilter(e.target.value as EstadoFilter)}
          className="bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-300 focus:border-neon-yellow/50 focus:outline-none"
          aria-label="Filtrar por estado"
        >
          <option value="">Todos los estados</option>
          <option value="PENDIENTE">PENDIENTE</option>
          <option value="PAGADO">PAGADO</option>
          <option value="VENCIDO">VENCIDO</option>
        </select>

        <div className="flex items-center gap-2 glass-panel rounded-xl px-4 py-2 text-sm">
          <span className="text-gray-400">Total pendiente:</span>
          <span className="font-bold text-neon-yellow">{fmtMXN(totalPendiente)}</span>
        </div>
      </div>

      {/* TABLE */}
      <div className="glass-table-container">
        {loading ? (
          <TableSkeleton />
        ) : filtered.length === 0 ? (
          <div className="p-10 text-center text-gray-400 text-sm">
            No hay estados de cuenta con los filtros actuales.
          </div>
        ) : (
          <table className="w-full text-sm" aria-label="Estados de cuenta">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Alumno</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Concepto</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Período</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Emisión</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Vencimiento</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Monto</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Estado</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((e) => (
                <tr
                  key={e.idEstadoCuenta}
                  className={`glass-table-row ${
                    e.estado === 'VENCIDO' ? 'border-l-2 border-red-500/50' : ''
                  }`}
                >
                  <td className="px-4 py-3 text-gray-200 text-xs">
                    {e.alumno.nombre} {e.alumno.apellidos}
                  </td>
                  <td className="px-4 py-3 text-gray-300 text-xs">{e.conceptoPago.nombre}</td>
                  <td className="px-4 py-3 text-gray-400 text-xs">{e.periodo ?? '—'}</td>
                  <td className="px-4 py-3 text-gray-400 text-xs">{fmtDate(e.fechaEmision)}</td>
                  <td className="px-4 py-3 text-gray-400 text-xs">
                    {e.estado === 'VENCIDO' ? (
                      <span className="flex items-center gap-1 text-red-400">
                        <AlertTriangle className="w-3 h-3" />
                        {fmtDate(e.fechaVencimiento)}
                      </span>
                    ) : (
                      fmtDate(e.fechaVencimiento)
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-300 font-mono text-xs">{fmtMXN(e.monto)}</td>
                  <td className="px-4 py-3"><EstadoBadge estado={e.estado} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
