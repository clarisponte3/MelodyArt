import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, ClipboardList } from 'lucide-react';
import { NeonButton } from '../../components/ui/NeonButton';
import { GlassCard } from '../../components/ui/GlassCard';
import apiClient from '../../api/apiClient';
import type {
  ClaseMusicalResponseDTO,
  InscripcionResponseDTO,
  AsistenciaClaseRequestDTO,
  AsistenciaClaseResponseDTO,
  SpringPage,
} from '../../types';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type EstadoAsistencia = 'PRESENTE' | 'FALTA' | 'RETARDO' | 'JUSTIFICADA';

interface AttendanceRow {
  inscripcion: InscripcionResponseDTO;
  estado: EstadoAsistencia;
  observaciones: string;
  saved: boolean;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const EstadoBadge: React.FC<{ estado: EstadoAsistencia }> = ({ estado }) => {
  const map: Record<EstadoAsistencia, string> = {
    PRESENTE:    'bg-green-500/20 text-green-400 border-green-500/30',
    FALTA:       'bg-red-500/20 text-red-400 border-red-500/30',
    RETARDO:     'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    JUSTIFICADA: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  };
  const icon = estado === 'PRESENTE'
    ? <CheckCircle className="w-3 h-3" />
    : <XCircle className="w-3 h-3" />;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold border ${map[estado]}`}>
      {icon}{estado}
    </span>
  );
};

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------
export const PaseListaAdminPage: React.FC = () => {
  const [clases, setClases] = useState<ClaseMusicalResponseDTO[]>([]);
  const [clasesLoading, setClasesLoading] = useState(true);
  const [selectedClaseId, setSelectedClaseId] = useState<number | null>(null);
  const [inscripciones, setInscripciones] = useState<InscripcionResponseDTO[]>([]);
  const [inscLoading, setInscLoading] = useState(false);
  const [fechaClase, setFechaClase] = useState<string>(new Date().toISOString().split('T')[0]);
  const [rows, setRows] = useState<AttendanceRow[]>([]);
  const [saving, setSaving] = useState(false);

  // Fetch ALL clases (admin has access to all)
  useEffect(() => {
    apiClient
      .get<SpringPage<ClaseMusicalResponseDTO>>('/api/clases?page=0&size=50')
      .then((r) => setClases(r.data.content))
      .catch(() => {/* handled */})
      .finally(() => setClasesLoading(false));
  }, []);

  // Fetch inscripciones for selected clase
  useEffect(() => {
    if (!selectedClaseId) {
      setInscripciones([]);
      setRows([]);
      return;
    }
    setInscLoading(true);
    apiClient
      .get<SpringPage<InscripcionResponseDTO>>(
        `/api/inscripciones?page=0&size=50&idClase=${selectedClaseId}`
      )
      .then((r) => {
        const ins = r.data.content.filter((i) => i.estado === 'ACTIVA');
        setInscripciones(ins);
        setRows(
          ins.map((insc) => ({
            inscripcion: insc,
            estado: 'PRESENTE',
            observaciones: '',
            saved: false,
          }))
        );
      })
      .catch(() => {/* handled */})
      .finally(() => setInscLoading(false));
  }, [selectedClaseId]);

  const updateRow = (idx: number, field: keyof AttendanceRow, value: unknown) => {
    setRows((prev) =>
      prev.map((r, i) => (i === idx ? { ...r, [field]: value, saved: false } : r))
    );
  };

  const handleSave = async () => {
    setSaving(true);
    const payloads: AsistenciaClaseRequestDTO[] = rows.map((r) => ({
      idInscripcion: r.inscripcion.idInscripcion,
      fechaClase,
      estado: r.estado,
      observaciones: r.observaciones || undefined,
    }));

    let successCount = 0;
    for (const payload of payloads) {
      try {
        await apiClient.post<AsistenciaClaseResponseDTO>('/api/asistencias', payload);
        successCount++;
      } catch {
        /* each row error handled by interceptor */
      }
    }

    setRows((prev) =>
      prev.map((r, i) => ({ ...r, saved: i < successCount }))
    );
    setSaving(false);
  };

  const selectedClase = clases.find((c) => c.idClaseMusical === selectedClaseId);

  return (
    <div className="container mx-auto px-6 py-12">
      {/* HEADER */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-cyan/40 bg-neon-cyan/10 text-neon-cyan text-xs font-semibold uppercase tracking-wider mb-3">
          <ClipboardList className="w-3.5 h-3.5" />
          <span>Acceso de Administrador</span>
        </div>
        <h1 className="text-3xl font-bold text-white mb-1">
          Control de <span className="neon-text-cyan">Asistencias</span> — Administrador
        </h1>
        <p className="text-sm text-gray-400">
          Vista global de todas las clases — sin filtro por docente.
        </p>
      </div>

      {/* CONTROLS */}
      <div className="glass-panel rounded-xl p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1" htmlFor="admin-clase-select">
              Seleccionar Clase
            </label>
            {clasesLoading ? (
              <div className="h-10 bg-white/5 rounded-lg animate-pulse" />
            ) : (
              <select
                id="admin-clase-select"
                value={selectedClaseId ?? ''}
                onChange={(e) =>
                  setSelectedClaseId(e.target.value ? Number(e.target.value) : null)
                }
                className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-300 focus:border-neon-cyan/50 focus:outline-none"
              >
                <option value="">— Selecciona una clase —</option>
                {clases.map((c) => (
                  <option key={c.idClaseMusical} value={c.idClaseMusical}>
                    {c.nombre} ({c.horario})
                  </option>
                ))}
              </select>
            )}
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1" htmlFor="admin-fecha-clase">
              Fecha de Clase
            </label>
            <input
              id="admin-fecha-clase"
              type="date"
              value={fechaClase}
              onChange={(e) => setFechaClase(e.target.value)}
              className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-300 focus:border-neon-cyan/50 focus:outline-none"
            />
          </div>
        </div>

        {selectedClase && (
          <div className="mt-4 p-3 rounded-lg border border-neon-cyan/20 bg-neon-cyan/5 text-xs text-gray-400">
            <span className="font-medium text-neon-cyan">{selectedClase.nombre}</span> —{' '}
            {selectedClase.horario} · Cap: {selectedClase.capacidadMaxima} · $
            {selectedClase.costo.toLocaleString('es-MX')}
          </div>
        )}
      </div>

      {/* ATTENDANCE TABLE */}
      {selectedClaseId && (
        <>
          {inscLoading ? (
            <div className="glass-panel rounded-xl p-6 animate-pulse space-y-3">
              {[...Array(4)].map((_, i) => <div key={i} className="h-10 bg-white/5 rounded" />)}
            </div>
          ) : inscripciones.length === 0 ? (
            <GlassCard accent="cyan" className="p-8 text-center">
              <p className="text-gray-400 text-sm">
                No hay alumnos inscritos activos en esta clase.
              </p>
            </GlassCard>
          ) : (
            <>
              <div className="glass-table-container mb-4">
                <table className="w-full text-sm" aria-label="Pase de lista de administrador">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Alumno</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Correo</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Asistencia</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Observaciones</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Guardado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, idx) => (
                      <tr key={row.inscripcion.idInscripcion} className="glass-table-row">
                        <td className="px-4 py-3 text-gray-200 font-medium text-xs">
                          {row.inscripcion.alumno.nombre} {row.inscripcion.alumno.apellidos}
                        </td>
                        <td className="px-4 py-3 text-gray-400 text-xs">
                          {row.inscripcion.alumno.correo}
                        </td>
                        <td className="px-4 py-3">
                          <select
                            value={row.estado}
                            onChange={(e) =>
                              updateRow(idx, 'estado', e.target.value as EstadoAsistencia)
                            }
                            className="bg-dark-900 border border-white/10 rounded-lg px-2 py-1 text-xs text-gray-300 focus:border-neon-cyan/50 focus:outline-none"
                            aria-label={`Asistencia de ${row.inscripcion.alumno.nombre}`}
                          >
                            <option value="PRESENTE">PRESENTE</option>
                            <option value="FALTA">FALTA</option>
                            <option value="RETARDO">RETARDO</option>
                            <option value="JUSTIFICADA">JUSTIFICADA</option>
                          </select>
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={row.observaciones}
                            onChange={(e) => updateRow(idx, 'observaciones', e.target.value)}
                            placeholder="Opcional…"
                            className="bg-dark-900 border border-white/10 rounded-lg px-2 py-1 text-xs text-gray-300 placeholder-gray-600 focus:border-neon-cyan/50 focus:outline-none w-full max-w-[180px]"
                            aria-label={`Observaciones de ${row.inscripcion.alumno.nombre}`}
                          />
                        </td>
                        <td className="px-4 py-3">
                          {row.saved ? (
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          ) : (
                            <span className="w-4 h-4 rounded-full border border-gray-600 inline-block" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Summary badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {(['PRESENTE', 'FALTA', 'RETARDO', 'JUSTIFICADA'] as EstadoAsistencia[]).map((e) => (
                  <div key={e} className="flex items-center gap-1.5 glass-panel rounded-lg px-3 py-1.5 text-xs">
                    <EstadoBadge estado={e} />
                    <span className="text-gray-400">
                      {rows.filter((r) => r.estado === e).length}
                    </span>
                  </div>
                ))}
              </div>

              <NeonButton
                variant="cyan"
                onClick={handleSave}
                disabled={saving || rows.length === 0}
                className="py-2.5 px-8 text-sm"
              >
                {saving ? 'Guardando…' : `Guardar Pase de Lista (${rows.length} alumnos)`}
              </NeonButton>
            </>
          )}
        </>
      )}

      {!selectedClaseId && !clasesLoading && (
        <div className="p-10 text-center text-gray-500 text-sm glass-panel rounded-xl">
          Selecciona una clase para comenzar el pase de lista.
        </div>
      )}
    </div>
  );
};
