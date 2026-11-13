import React, { useEffect, useState, useCallback } from 'react';
import { BookOpen, Calendar } from 'lucide-react';
import apiClient from '../../api/apiClient';
import { GlassCard } from '../../components/ui/GlassCard';
import { NeonButton } from '../../components/ui/NeonButton';
import type { InscripcionResponseDTO, AsistenciaClaseResponseDTO, SpringPage } from '../../types';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const estadoInscripcionBadge = (estado: string): string => {
  switch (estado?.toUpperCase()) {
    case 'ACTIVA':
      return 'bg-neon-green/15 text-neon-green border border-neon-green/40';
    case 'BAJA':
      return 'bg-neon-pink/15 text-neon-pink border border-neon-pink/40';
    default:
      return 'bg-white/10 text-gray-400 border border-white/20';
  }
};

const estadoAsistenciaBadge = (estado: string): string => {
  switch (estado?.toUpperCase()) {
    case 'PRESENTE':
      return 'bg-neon-green/15 text-neon-green border border-neon-green/40';
    case 'FALTA':
      return 'bg-neon-pink/15 text-neon-pink border border-neon-pink/40';
    case 'RETARDO':
      return 'bg-neon-yellow/15 text-neon-yellow border border-neon-yellow/40';
    case 'JUSTIFICADA':
      return 'bg-neon-cyan/15 text-neon-cyan border border-neon-cyan/40';
    default:
      return 'bg-white/10 text-gray-400 border border-white/20';
  }
};

const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString('es-MX', { dateStyle: 'medium' });

// ---------------------------------------------------------------------------
// Tab IDs
// ---------------------------------------------------------------------------
type TabId = 'inscripciones' | 'asistencia';

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export const MisClasesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('inscripciones');

  // ---- Inscripciones state ----
  const [inscripciones, setInscripciones] = useState<InscripcionResponseDTO[]>([]);
  const [loadingInsc, setLoadingInsc] = useState(true);

  // ---- Asistencias state ----
  const [asistencias, setAsistencias] = useState<AsistenciaClaseResponseDTO[]>([]);
  const [pageAsis, setPageAsis] = useState(0);
  const [totalPagesAsis, setTotalPagesAsis] = useState(0);
  const [loadingAsis, setLoadingAsis] = useState(false);

  useEffect(() => {
    apiClient
      .get<SpringPage<InscripcionResponseDTO>>('/api/inscripciones?page=0&size=50')
      .then((r) => setInscripciones(r.data.content ?? []))
      .catch(() => setInscripciones([]))
      .finally(() => setLoadingInsc(false));
  }, []);

  const fetchAsistencias = useCallback(async (p: number) => {
    setLoadingAsis(true);
    try {
      const r = await apiClient.get<SpringPage<AsistenciaClaseResponseDTO>>(
        `/api/asistencias?page=${p}&size=20`
      );
      setAsistencias(r.data.content ?? []);
      setTotalPagesAsis(r.data.totalPages);
    } catch {
      setAsistencias([]);
    } finally {
      setLoadingAsis(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab === 'asistencia') {
      fetchAsistencias(pageAsis);
    }
  }, [activeTab, pageAsis, fetchAsistencias]);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  return (
    <div className="container mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-8">
        <span className="text-xs font-semibold text-neon-cyan uppercase tracking-widest">
          Portal del Alumno
        </span>
        <h1 className="text-3xl font-bold text-white mt-2">Mis Clases Musicales</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-8 glass-panel rounded-xl p-1 w-fit">
        {(['inscripciones', 'asistencia'] as TabId[]).map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
              activeTab === t
                ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/40'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {t === 'inscripciones' ? 'Mis Inscripciones' : 'Mi Asistencia'}
          </button>
        ))}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* TAB 1 — Inscripciones */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === 'inscripciones' && (
        <>
          {loadingInsc ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="glass-panel rounded-xl p-6 animate-pulse space-y-3">
                  <div className="h-4 bg-white/10 rounded w-3/4" />
                  <div className="h-3 bg-white/10 rounded w-1/2" />
                  <div className="h-3 bg-white/10 rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : inscripciones.length === 0 ? (
            <div className="glass-panel rounded-2xl p-16 text-center">
              <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Sin inscripciones</h3>
              <p className="text-gray-400 text-sm">
                Aún no estás inscrito en ninguna clase musical.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inscripciones.map((ins) => (
                <GlassCard
                  key={ins.idInscripcion}
                  accent={ins.estado === 'ACTIVA' ? 'cyan' : 'pink'}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-white text-base leading-tight">
                      {ins.clase.nombre}
                    </h3>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-semibold flex-shrink-0 ml-2 ${estadoInscripcionBadge(
                        ins.estado
                      )}`}
                    >
                      {ins.estado}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {ins.clase.horario}
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    Inscrito el {formatDate(ins.fechaInscripcion)}
                  </p>
                  <div className="border-t border-white/10 pt-3 flex items-center justify-between">
                    <span className="text-xs text-gray-400">Costo acordado</span>
                    <span className="text-sm font-bold text-neon-green">
                      ${ins.costoAcordado.toFixed(2)}
                    </span>
                  </div>
                </GlassCard>
              ))}
            </div>
          )}
        </>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* TAB 2 — Asistencia */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === 'asistencia' && (
        <>
          {loadingAsis ? (
            <div className="glass-table-container rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <tbody className="divide-y divide-white/5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      {Array.from({ length: 4 }).map((__, j) => (
                        <td key={j} className="px-6 py-4">
                          <div className="h-3 bg-white/10 rounded w-24" />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : asistencias.length === 0 ? (
            <div className="glass-panel rounded-2xl p-16 text-center">
              <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Sin registros de asistencia</h3>
              <p className="text-gray-400 text-sm">
                Tus asistencias aparecerán aquí una vez que el docente las registre.
              </p>
            </div>
          ) : (
            <>
              <div className="glass-table-container rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-gray-500 uppercase text-xs">
                      {['Fecha', 'Clase', 'Estado', 'Observaciones'].map((h) => (
                        <th key={h} className="px-6 py-4 text-left font-medium">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {asistencias.map((a) => (
                      <tr key={a.idAsistencia} className="glass-table-row">
                        <td className="px-6 py-4 text-gray-300">
                          {formatDate(a.fechaClase)}
                        </td>
                        <td className="px-6 py-4 text-white font-medium">
                          {a.inscripcion?.clase?.nombre ?? '—'}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-semibold ${estadoAsistenciaBadge(
                              a.estado
                            )}`}
                          >
                            {a.estado}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-400 text-xs">
                          {a.observaciones ?? '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-6">
                <span className="text-sm text-gray-400">
                  Página{' '}
                  <span className="text-white font-semibold">{pageAsis + 1}</span> de{' '}
                  <span className="text-white font-semibold">{totalPagesAsis}</span>
                </span>
                <div className="flex gap-3">
                  <NeonButton
                    variant="cyan"
                    onClick={() => setPageAsis((p) => Math.max(0, p - 1))}
                    disabled={pageAsis === 0}
                    className="text-xs disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    ← Anterior
                  </NeonButton>
                  <NeonButton
                    variant="cyan"
                    onClick={() =>
                      setPageAsis((p) => Math.min(totalPagesAsis - 1, p + 1))
                    }
                    disabled={pageAsis >= totalPagesAsis - 1}
                    className="text-xs disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Siguiente →
                  </NeonButton>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};
