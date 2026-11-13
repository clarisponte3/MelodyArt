import React, { useEffect, useState, useCallback } from 'react';
import { ClipboardList, Calendar, CheckCircle, AlertCircle, Save } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { NeonButton } from '../../components/ui/NeonButton';
import apiClient from '../../api/apiClient';
import { showToast } from '../../store/notificationStore';
import type {
  ClaseMusicalResponseDTO,
  InscripcionResponseDTO,
  AsistenciaClaseResponseDTO,
  SpringPage,
} from '../../types';

type EstadoAsistencia = 'PRESENTE' | 'FALTA' | 'RETARDO' | 'JUSTIFICADA';

interface AttendanceRow {
  inscripcion: InscripcionResponseDTO;
  asistenciaId?: number;
  estado: EstadoAsistencia;
  observaciones: string;
  saved: boolean;
}

const EstadoBadge: React.FC<{ estado: EstadoAsistencia }> = ({ estado }) => {
  const map: Record<EstadoAsistencia, string> = {
    PRESENTE: 'bg-green-500/20 text-green-400 border-green-500/30',
    FALTA: 'bg-red-500/20 text-red-400 border-red-500/30',
    RETARDO: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    JUSTIFICADA: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${map[estado]}`}>
      {estado}
    </span>
  );
};

export const PaseListaPage: React.FC = () => {
  const [clases, setClases] = useState<ClaseMusicalResponseDTO[]>([]);
  const [selectedClaseId, setSelectedClaseId] = useState<number | ''>('');
  const [fechaClase, setFechaClase] = useState<string>(() => {
    return new Date().toISOString().split('T')[0];
  });

  const [rows, setRows] = useState<AttendanceRow[]>([]);
  const [loadingClases, setLoadingClases] = useState(true);
  const [loadingAlumnos, setLoadingAlumnos] = useState(false);
  const [saving, setSaving] = useState(false);

  // Load musical classes
  useEffect(() => {
    apiClient
      .get<ClaseMusicalResponseDTO[]>('/api/clases-musicales')
      .then((res) => {
        setClases(Array.isArray(res.data) ? res.data : []);
      })
      .catch(() => {
        // Handled by interceptor
      })
      .finally(() => setLoadingClases(false));
  }, []);

  // Load students and attendance for selected class
  const loadClassData = useCallback(async () => {
    if (!selectedClaseId) {
      setRows([]);
      return;
    }

    setLoadingAlumnos(true);
    try {
      // 1. Fetch inscriptions
      const inscRes = await apiClient.get<SpringPage<InscripcionResponseDTO> | InscripcionResponseDTO[]>(
        `/api/inscripciones?idClase=${selectedClaseId}&size=100`
      );
      const allInsc = Array.isArray(inscRes.data)
        ? inscRes.data
        : inscRes.data?.content || [];

      const activeInsc = allInsc.filter(
        (i) => i.clase?.idClaseMusical === Number(selectedClaseId) && i.estado === 'ACTIVA'
      );

      // 2. Fetch existing attendances for date
      let existingAsist: AsistenciaClaseResponseDTO[] = [];
      try {
        const asisRes = await apiClient.get<SpringPage<AsistenciaClaseResponseDTO> | AsistenciaClaseResponseDTO[]>(
          `/api/asistencias?idClase=${selectedClaseId}&fechaClase=${fechaClase}&size=100`
        );
        existingAsist = Array.isArray(asisRes.data)
          ? asisRes.data
          : asisRes.data?.content || [];
      } catch {
        // If not found, start fresh
      }

      const rowMap = new Map<number, AsistenciaClaseResponseDTO>();
      existingAsist.forEach((a) => {
        if (a.inscripcion?.idInscripcion) {
          rowMap.set(a.inscripcion.idInscripcion, a);
        }
      });

      const initialRows: AttendanceRow[] = activeInsc.map((insc) => {
        const found = rowMap.get(insc.idInscripcion);
        return {
          inscripcion: insc,
          asistenciaId: found?.idAsistencia,
          estado: (found?.estado as EstadoAsistencia) || 'PRESENTE',
          observaciones: found?.observaciones || '',
          saved: !!found,
        };
      });

      setRows(initialRows);
    } catch {
      showToast('error', 'Error al cargar los alumnos del taller seleccionado.');
    } finally {
      setLoadingAlumnos(false);
    }
  }, [selectedClaseId, fechaClase]);

  useEffect(() => {
    loadClassData();
  }, [loadClassData]);

  const updateRow = (index: number, field: 'estado' | 'observaciones', value: string) => {
    setRows((prev) => {
      const next = [...prev];
      next[index] = {
        ...next[index],
        [field]: value,
        saved: false,
      };
      return next;
    });
  };

  const handleSave = async () => {
    if (rows.length === 0) return;
    setSaving(true);
    let successCount = 0;
    let failCount = 0;

    const updatedRows = [...rows];

    for (let i = 0; i < updatedRows.length; i++) {
      const row = updatedRows[i];
      try {
        if (row.asistenciaId) {
          // Update
          await apiClient.put(`/api/asistencias/${row.asistenciaId}`, {
            idInscripcion: row.inscripcion.idInscripcion,
            fechaClase: fechaClase,
            estado: row.estado,
            observaciones: row.observaciones || undefined,
          });
        } else {
          // Create
          const res = await apiClient.post<AsistenciaClaseResponseDTO>('/api/asistencias', {
            idInscripcion: row.inscripcion.idInscripcion,
            fechaClase: fechaClase,
            estado: row.estado,
            observaciones: row.observaciones || undefined,
          });
          row.asistenciaId = res.data?.idAsistencia;
        }
        row.saved = true;
        successCount++;
      } catch {
        failCount++;
      }
    }

    setRows(updatedRows);
    setSaving(false);

    if (failCount === 0) {
      showToast('success', `Se guardó el pase de lista de ${successCount} alumnos.`, 'Pase de Lista Guardado');
    } else {
      showToast(
        'warning',
        `Se guardaron ${successCount} registros, pero fallaron ${failCount}. Revisa los no marcados.`,
        'Guardado Parcial'
      );
    }
  };

  return (
    <div className="container mx-auto px-6 py-12 flex flex-col gap-8">
      {/* HEADER */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-yellow/30 bg-neon-yellow/10 text-neon-yellow text-xs font-semibold uppercase tracking-wider mb-2">
          <ClipboardList className="w-3.5 h-3.5" />
          <span>Portal Docente</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Pase de <span className="neon-text-yellow">Lista Diario</span>
        </h1>
        <p className="text-sm text-gray-400">
          Control de asistencia de tus alumnos por taller musical y fecha.
        </p>
      </div>

      {/* STEP 1: CONTEXT CONTROLS */}
      <GlassCard accent="gold" className="p-6">
        <h2 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider text-neon-yellow">
          1. Selección de Clase y Fecha
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-2">
              Taller / Clase Musical
            </label>
            <select
              value={selectedClaseId}
              onChange={(e) => setSelectedClaseId(e.target.value ? Number(e.target.value) : '')}
              disabled={loadingClases}
              className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-neon-yellow/50 focus:outline-none"
              aria-label="Selecciona taller"
            >
              <option value="">-- Selecciona un taller --</option>
              {clases.map((c) => (
                <option key={c.idClaseMusical} value={c.idClaseMusical}>
                  {c.nombre} · {c.horario}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-2">
              Fecha de la Sesión
            </label>
            <div className="relative">
              <input
                type="date"
                value={fechaClase}
                onChange={(e) => setFechaClase(e.target.value)}
                className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-neon-yellow/50 focus:outline-none"
                aria-label="Fecha de clase"
              />
              <Calendar className="w-4 h-4 text-gray-400 absolute right-4 top-3.5 pointer-events-none" />
            </div>
          </div>
        </div>
      </GlassCard>

      {/* STEP 2: STUDENTS ATTENDANCE LIST */}
      {selectedClaseId !== '' && (
        <section className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>Alumnos Inscritos ({rows.length})</span>
            </h2>

            {/* SUMMARY STATS */}
            <div className="flex flex-wrap items-center gap-2">
              {(['PRESENTE', 'FALTA', 'RETARDO', 'JUSTIFICADA'] as EstadoAsistencia[]).map((st) => (
                <div
                  key={st}
                  className="glass-panel px-3 py-1 rounded-lg text-xs flex items-center gap-1.5"
                >
                  <EstadoBadge estado={st} />
                  <span className="text-gray-300 font-mono">
                    {rows.filter((r) => r.estado === st).length}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {loadingAlumnos ? (
            <div className="glass-panel p-8 text-center text-gray-400 animate-pulse">
              Cargando alumnos de la clase...
            </div>
          ) : rows.length === 0 ? (
            <div className="glass-panel p-12 text-center text-gray-400 rounded-2xl flex flex-col items-center gap-3">
              <AlertCircle className="w-10 h-10 text-neon-yellow" />
              <p className="text-base text-white font-semibold">
                No hay alumnos con inscripción activa en esta clase.
              </p>
              <p className="text-xs text-gray-500">
                Los alumnos deben estar registrados con estado ACTIVA para aparecer en el pase de lista.
              </p>
            </div>
          ) : (
            <>
              <div className="glass-table-container">
                <table className="w-full text-sm" aria-label="Tabla de pase de lista">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Alumno
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider hidden md:table-cell">
                        Contacto
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Estado
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Observaciones
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Estado
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, idx) => (
                      <tr key={row.inscripcion.idInscripcion} className="glass-table-row">
                        <td className="px-4 py-3 text-white font-medium">
                          {row.inscripcion.alumno?.nombre} {row.inscripcion.alumno?.apellidos}
                        </td>
                        <td className="px-4 py-3 text-gray-400 text-xs hidden md:table-cell">
                          {row.inscripcion.alumno?.correo}
                        </td>
                        <td className="px-4 py-3">
                          <select
                            value={row.estado}
                            onChange={(e) =>
                              updateRow(idx, 'estado', e.target.value as EstadoAsistencia)
                            }
                            className="bg-dark-900 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:border-neon-yellow/50 focus:outline-none"
                            aria-label={`Asistencia de ${row.inscripcion.alumno?.nombre}`}
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
                            placeholder="Comentario opcional…"
                            value={row.observaciones}
                            onChange={(e) => updateRow(idx, 'observaciones', e.target.value)}
                            className="w-full bg-dark-900 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-gray-600 focus:border-neon-yellow/50 focus:outline-none max-w-xs"
                          />
                        </td>
                        <td className="px-4 py-3 text-center">
                          {row.saved ? (
                            <span className="inline-flex items-center gap-1 text-[11px] text-neon-green">
                              <CheckCircle className="w-3.5 h-3.5" /> Guardado
                            </span>
                          ) : (
                            <span className="text-[11px] text-gray-500">Sin guardar</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end pt-2">
                <NeonButton
                  variant="green"
                  onClick={handleSave}
                  disabled={saving}
                  className="py-3 px-8 text-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>{saving ? 'Guardando asistencia...' : 'Guardar Pase de Lista'}</span>
                </NeonButton>
              </div>
            </>
          )}
        </section>
      )}
    </div>
  );
};
