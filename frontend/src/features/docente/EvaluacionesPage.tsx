import React, { useEffect, useState } from 'react';
import { Award, PlusCircle, Calendar, Star } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { NeonButton } from '../../components/ui/NeonButton';
import apiClient from '../../api/apiClient';
import { useAuthStore } from '../../store/authStore';
import { showToast } from '../../store/notificationStore';
import type {
  EvaluacionResponseDTO,
  InscripcionResponseDTO,
  SpringPage,
} from '../../types';

const CalificacionBar: React.FC<{ calificacion: number }> = ({ calificacion }) => {
  const percent = Math.min(Math.max((calificacion / 10) * 100, 0), 100);
  let colorCls = 'bg-red-500 text-red-400';
  if (calificacion >= 8.5) {
    colorCls = 'bg-neon-green text-neon-green';
  } else if (calificacion >= 7.0) {
    colorCls = 'bg-neon-cyan text-neon-cyan';
  } else if (calificacion >= 6.0) {
    colorCls = 'bg-neon-yellow text-neon-yellow';
  }

  return (
    <div className="flex items-center gap-2.5 min-w-[120px]">
      <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${colorCls.split(' ')[0]}`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className={`text-xs font-bold font-mono ${colorCls.split(' ')[1]}`}>
        {calificacion.toFixed(1)}
      </span>
    </div>
  );
};

export const EvaluacionesPage: React.FC = () => {
  const { user } = useAuthStore();
  const [evaluaciones, setEvaluaciones] = useState<EvaluacionResponseDTO[]>([]);
  const [inscripciones, setInscripciones] = useState<InscripcionResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form
  const [selectedInscripcionId, setSelectedInscripcionId] = useState<number | ''>('');
  const [tipo, setTipo] = useState('PARCIAL');
  const [calificacion, setCalificacion] = useState('10.0');
  const [observaciones, setObservaciones] = useState('');
  const [fechaEvaluacion, setFechaEvaluacion] = useState<string>(() => new Date().toISOString().split('T')[0]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [evalRes, inscRes] = await Promise.all([
        apiClient.get<SpringPage<EvaluacionResponseDTO> | EvaluacionResponseDTO[]>('/api/evaluaciones?size=50'),
        apiClient.get<SpringPage<InscripcionResponseDTO> | InscripcionResponseDTO[]>('/api/inscripciones?size=100'),
      ]);

      setEvaluaciones(
        Array.isArray(evalRes.data) ? evalRes.data : evalRes.data?.content || []
      );
      setInscripciones(
        Array.isArray(inscRes.data) ? inscRes.data : inscRes.data?.content || []
      );
    } catch {
      // Handled by interceptor
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInscripcionId) {
      showToast('warning', 'Selecciona el alumno a evaluar.');
      return;
    }
    const valNum = parseFloat(calificacion);
    if (isNaN(valNum) || valNum < 0 || valNum > 10) {
      showToast('warning', 'La calificación debe ser un número entre 0 y 10.');
      return;
    }

    setSubmitting(true);
    try {
      await apiClient.post('/api/evaluaciones', {
        idInscripcion: Number(selectedInscripcionId),
        idProfesor: user?.userId || 1,
        fechaEvaluacion: fechaEvaluacion,
        tipo: tipo,
        calificacion: valNum,
        observaciones: observaciones.trim() || undefined,
      });

      showToast('success', 'Evaluación registrada correctamente.', 'Evaluación Creada');
      setObservaciones('');
      setCalificacion('10.0');
      setShowForm(false);
      fetchData();
    } catch {
      // Handled by interceptor
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-12 flex flex-col gap-8">
      {/* HEADER */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-pink/30 bg-neon-pink/10 text-neon-pink text-xs font-semibold uppercase tracking-wider mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>Portal Docente</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Evaluaciones & <span className="neon-text-pink">Calificaciones</span>
          </h1>
          <p className="text-sm text-gray-400">
            Califica el desempeño instrumental, rítmico y armónico de tus alumnos.
          </p>
        </div>

        <NeonButton
          variant="pink"
          onClick={() => setShowForm(!showForm)}
          className="py-2.5 px-5 text-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{showForm ? 'Cerrar Formulario' : 'Nueva Evaluación'}</span>
        </NeonButton>
      </div>

      {/* FORM */}
      {showForm && (
        <GlassCard accent="pink" className="p-6 md:p-8 animate-fadeIn">
          <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Star className="w-5 h-5 text-neon-pink" />
            Calificar Alumno
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Alumno & Taller Musical *
                </label>
                <select
                  value={selectedInscripcionId}
                  onChange={(e) => setSelectedInscripcionId(e.target.value ? Number(e.target.value) : '')}
                  required
                  className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-neon-pink/50 focus:outline-none"
                >
                  <option value="">-- Selecciona un alumno --</option>
                  {inscripciones.map((ins) => (
                    <option key={ins.idInscripcion} value={ins.idInscripcion}>
                      {ins.alumno?.nombre} {ins.alumno?.apellidos} · {ins.clase?.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Tipo de Evaluación *
                </label>
                <select
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                  className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-neon-pink/50 focus:outline-none"
                >
                  <option value="PARCIAL">PARCIAL</option>
                  <option value="FINAL">FINAL</option>
                  <option value="CONTINUA">CONTINUA</option>
                  <option value="DIAGNOSTICO">DIAGNÓSTICO</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Calificación (Escala 0.0 - 10.0) *
                </label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.1"
                  value={calificacion}
                  onChange={(e) => setCalificacion(e.target.value)}
                  required
                  className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-mono focus:border-neon-pink/50 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Fecha de la Evaluación *
                </label>
                <input
                  type="date"
                  value={fechaEvaluacion}
                  onChange={(e) => setFechaEvaluacion(e.target.value)}
                  required
                  className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-neon-pink/50 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Observaciones y Retroalimentación Pedagógica
              </label>
              <textarea
                rows={3}
                placeholder="Comentarios sobre precisión rítmica, ejecución técnica, áreas a reforzar..."
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
                className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-neon-pink/50 focus:outline-none resize-none"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-5 py-2.5 rounded-xl border border-white/10 text-xs font-semibold text-gray-400 hover:text-white transition-colors"
              >
                Cancelar
              </button>
              <NeonButton
                variant="pink"
                type="submit"
                disabled={submitting}
                className="py-2.5 px-6 text-sm"
              >
                {submitting ? 'Registrando...' : 'Registrar Evaluación'}
              </NeonButton>
            </div>
          </form>
        </GlassCard>
      )}

      {/* TABLE */}
      {loading ? (
        <div className="glass-panel p-8 text-center text-gray-400 animate-pulse">
          Cargando registros de evaluación...
        </div>
      ) : evaluaciones.length === 0 ? (
        <div className="glass-panel p-16 text-center rounded-2xl flex flex-col items-center gap-4">
          <Award className="w-12 h-12 text-gray-600" />
          <h3 className="text-lg font-bold text-white">Sin evaluaciones registradas</h3>
          <p className="text-xs text-gray-400 max-w-md">
            Comienza evaluando el rendimiento de tus alumnos usando el botón superior.
          </p>
        </div>
      ) : (
        <div className="glass-table-container">
          <table className="w-full text-sm" aria-label="Tabla de evaluaciones">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Alumno
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider hidden sm:table-cell">
                  Clase
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Calificación
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider hidden lg:table-cell">
                  Observaciones
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider hidden md:table-cell">
                  Fecha
                </th>
              </tr>
            </thead>
            <tbody>
              {evaluaciones.map((ev) => (
                <tr key={ev.idEvaluacion} className="glass-table-row">
                  <td className="px-4 py-3 text-white font-medium">
                    {ev.inscripcion?.alumno?.nombre} {ev.inscripcion?.alumno?.apellidos}
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-xs hidden sm:table-cell">
                    {ev.inscripcion?.clase?.nombre}
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold border border-neon-pink/30 bg-neon-pink/10 text-neon-pink">
                      {ev.tipo}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <CalificacionBar calificacion={ev.calificacion} />
                  </td>
                  <td className="px-4 py-3 text-gray-300 text-xs hidden lg:table-cell max-w-xs truncate">
                    {ev.observaciones || '—'}
                  </td>
                  <td className="px-4 py-3 text-right text-gray-400 text-xs font-mono hidden md:table-cell">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-gray-500" />
                      {new Date(ev.fechaEvaluacion).toLocaleDateString('es-MX', { dateStyle: 'short' })}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
