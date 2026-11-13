import React, { useEffect, useState, useMemo } from 'react';
import { AlertTriangle, Shield } from 'lucide-react';
import { NeonButton } from '../../components/ui/NeonButton';
import apiClient from '../../api/apiClient';
import type { LogAuditoriaResponseDTO, SpringPage } from '../../types';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
type TipoEventoFilter =
  | 'LOGIN' | 'LOGOUT' | 'CREATE' | 'UPDATE' | 'DELETE' | '';

const TipoEventoBadge: React.FC<{ tipo: string }> = ({ tipo }) => {
  const map: Record<string, string> = {
    LOGIN:  'bg-green-500/20 text-green-400 border-green-500/30',
    LOGOUT: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    CREATE: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    UPDATE: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    DELETE: 'bg-red-500/20 text-red-400 border-red-500/30',
  };
  const cls = map[tipo] ?? 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  return (
    <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${cls}`}>
      {tipo}
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
export const LogsAuditoriaPage: React.FC = () => {
  const [logs, setLogs] = useState<LogAuditoriaResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [tipoFilter, setTipoFilter] = useState<TipoEventoFilter>('');
  const [moduloFilter, setModuloFilter] = useState('');

  const fetchLogs = (p: number) => {
    setLoading(true);
    apiClient
      .get<SpringPage<LogAuditoriaResponseDTO>>(
        `/api/log-auditoria?page=${p}&size=20&sort=fechaHora,desc`
      )
      .then((r) => {
        setLogs(r.data.content);
        setTotalPages(r.data.totalPages);
      })
      .catch(() => {/* handled by interceptor */})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchLogs(page);
  }, [page]);

  // Client-side filter
  const filtered = useMemo(() => {
    return logs.filter((l) => {
      const matchesTipo = tipoFilter ? l.tipoEvento === tipoFilter : true;
      const matchesModulo = moduloFilter
        ? l.modulo.toLowerCase().includes(moduloFilter.toLowerCase())
        : true;
      return matchesTipo && matchesModulo;
    });
  }, [logs, tipoFilter, moduloFilter]);

  // Unique modulos from current page for filter dropdown
  const modulos = useMemo(
    () => [...new Set(logs.map((l) => l.modulo))].sort(),
    [logs]
  );

  return (
    <div className="container mx-auto px-6 py-12">
      {/* HEADER */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/40 bg-orange-500/10 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Shield className="w-3.5 h-3.5" />
          <span>RBAC — Solo Administradores</span>
        </div>
        <h1 className="text-3xl font-bold text-white mb-1">
          Bitácora de <span className="text-orange-400">Auditoría del Sistema</span>
        </h1>
        <p className="text-sm text-gray-400">
          Registro inmutable de eventos de seguridad, accesos y operaciones críticas.
        </p>
      </div>

      {/* WARNING BANNER */}
      <div className="flex items-start gap-3 p-4 rounded-xl border border-orange-500/40 bg-orange-500/10 text-orange-300 text-sm mb-6">
        <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <span>
          <strong>Área restringida</strong> — Solo administradores con permiso{' '}
          <code className="text-xs bg-black/30 px-1.5 py-0.5 rounded">RBAC:LOGS:READ</code>{' '}
          pueden ver este módulo. Los accesos a esta página quedan registrados.
        </span>
      </div>

      {/* FILTERS */}
      <div className="flex flex-wrap gap-3 mb-4">
        <select
          value={tipoFilter}
          onChange={(e) => setTipoFilter(e.target.value as TipoEventoFilter)}
          className="bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-300 focus:border-orange-500/50 focus:outline-none"
          aria-label="Filtrar por tipo de evento"
        >
          <option value="">Todos los eventos</option>
          {(['LOGIN', 'LOGOUT', 'CREATE', 'UPDATE', 'DELETE'] as TipoEventoFilter[])
            .filter((t): t is Exclude<TipoEventoFilter, ''> => t !== '')
            .map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
        </select>

        <select
          value={moduloFilter}
          onChange={(e) => setModuloFilter(e.target.value)}
          className="bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-300 focus:border-orange-500/50 focus:outline-none"
          aria-label="Filtrar por módulo"
        >
          <option value="">Todos los módulos</option>
          {modulos.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      {/* TABLE */}
      <div className="glass-table-container">
        {loading ? (
          <TableSkeleton />
        ) : filtered.length === 0 ? (
          <div className="p-10 text-center text-gray-400 text-sm">
            No se encontraron registros con los filtros actuales.
          </div>
        ) : (
          <table className="w-full text-sm" aria-label="Bitácora de auditoría">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Fecha/Hora</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Usuario</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Tipo Evento</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Módulo</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Acción</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Entidad</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">IP Origen</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((log) => (
                <tr key={log.idLog} className="glass-table-row">
                  <td className="px-4 py-3 text-gray-400 text-xs font-mono whitespace-nowrap">
                    {new Date(log.fechaHora).toLocaleString('es-MX', {
                      dateStyle: 'short',
                      timeStyle: 'medium',
                    })}
                  </td>
                  <td className="px-4 py-3 text-gray-300 text-xs">
                    {log.usuario
                      ? `${log.usuario.nombre} ${log.usuario.apellidos}`
                      : '—'}
                  </td>
                  <td className="px-4 py-3">
                    <TipoEventoBadge tipo={log.tipoEvento} />
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-xs">{log.modulo}</td>
                  <td className="px-4 py-3 text-gray-400 text-xs">{log.accion}</td>
                  <td className="px-4 py-3 text-gray-400 text-xs">{log.entidad}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs font-mono">
                    {log.ipOrigen ?? '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-4">
          <NeonButton
            variant="orange"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="py-1.5 px-4 text-xs"
          >
            Anterior
          </NeonButton>
          <span className="text-sm text-gray-400">
            Página {page + 1} de {totalPages}
          </span>
          <NeonButton
            variant="orange"
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            className="py-1.5 px-4 text-xs"
          >
            Siguiente
          </NeonButton>
        </div>
      )}

      {/* FOOTER NOTE */}
      <p className="mt-8 text-center text-xs text-gray-600 max-w-2xl mx-auto">
        Los logs de auditoría son inmutables y se conservan conforme a las políticas de retención de datos de SonoraSync Enterprise. Cualquier intento de modificación queda registrado.
      </p>
    </div>
  );
};
