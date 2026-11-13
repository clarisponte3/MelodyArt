import React, { useEffect, useState } from 'react';
import { BookOpen, Calendar, PlusCircle, CheckCircle2, Target, MessageSquare, Sparkles } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { NeonButton } from '../../components/ui/NeonButton';
import apiClient from '../../api/apiClient';
import { useAuthStore } from '../../store/authStore';
import { showToast } from '../../store/notificationStore';
import type {
  BitacoraProgresoResponseDTO,
  InscripcionResponseDTO,
  SpringPage,
} from '../../types';

export const BitacoraPage: React.FC = () => {
  const { user } = useAuthStore();
  const [bitacoras, setBitacoras] = useState<BitacoraProgresoResponseDTO[]>([]);
  const [inscripciones, setInscripciones] = useState<InscripcionResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form fields
  const [selectedInscripcionId, setSelectedInscripcionId] = useState<number | ''>('');
  const [fechaSesion, setFechaSesion] = useState<string>(() => new Date().toISOString().split('T')[0]);
  const [temaTrabajado, setTemaTrabajado] = useState('');
  const [comentarios, setComentarios] = useState('');
  const [objetivosCumplidos, setObjetivosCumplidos] = useState('');
  const [proximaMeta, setProximaMeta] = useState('');

  // Filter state
  const [filterInscripcion, setFilterInscripcion] = useState<number | ''>('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [bitRes, inscRes] = await Promise.all([
        apiClient.get<SpringPage<BitacoraProgresoResponseDTO> | BitacoraProgresoResponseDTO[]>('/api/bitacoras?size=50'),
        apiClient.get<SpringPage<InscripcionResponseDTO> | InscripcionResponseDTO[]>('/api/inscripciones?size=100'),
      ]);

      setBitacoras(
        Array.isArray(bitRes.data) ? bitRes.data : bitRes.data?.content || []
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
      showToast('warning', 'Selecciona la inscripción del alumno.');
      return;
    }
    if (!temaTrabajado.trim()) {
      showToast('warning', 'Ingresa el tema trabajado en la sesión.');
      return;
    }

    setSubmitting(true);
    try {
      await apiClient.post('/api/bitacoras', {
        idInscripcion: Number(selectedInscripcionId),
        idProfesor: user?.userId || 1,
        fechaSesion: fechaSesion,
        temaTrabajado: temaTrabajado.trim(),
        comentariosPedagogicos: comentarios.trim() || undefined,
        objetivosCumplidos: objetivosCumplidos.trim() || undefined,
        proximaMeta: proximaMeta.trim() || undefined,
      });

      showToast('success', 'Entrada de bitácora pedagógica registrada correctamente.', 'Bitácora Registrada');
      // Reset form
      setTemaTrabajado('');
      setComentarios('');
      setObjetivosCumplidos('');
      setProximaMeta('');
      setShowForm(false);
      // Refresh list
      fetchData();
    } catch {
      // Error handled by interceptor
    } finally {
      setSubmitting(false);
    }
  };

  const filteredBitacoras = filterInscripcion
    ? bitacoras.filter((b) => b.inscripcion?.idInscripcion === Number(filterInscripcion))
    : bitacoras;

  return (
    <div className="container mx-auto px-6 py-12 flex flex-col gap-8">
      {/* HEADER */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan text-xs font-semibold uppercase tracking-wider mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Portal Docente</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Bitácora de <span className="neon-text-cyan">Progreso Pedagógico</span>
          </h1>
          <p className="text-sm text-gray-400">
            Registro continuo de objetivos, metodologías y evolución musical de tus alumnos.
          </p>
        </div>

        <NeonButton
          variant="cyan"
          onClick={() => setShowForm(!showForm)}
          className="py-2.5 px-5 text-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{showForm ? 'Cerrar Formulario' : 'Nueva Entrada'}</span>
        </NeonButton>
      </div>

      {/* REGISTRATION FORM (COLLAPSIBLE) */}
      {showForm && (
        <GlassCard accent="cyan" className="p-6 md:p-8 animate-fadeIn">
          <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-neon-cyan" />
            Registrar Avance de Sesión
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
                  className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-neon-cyan/50 focus:outline-none"
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
                  Fecha de la Sesión *
                </label>
                <input
                  type="date"
                  value={fechaSesion}
                  onChange={(e) => setFechaSesion(e.target.value)}
                  required
                  className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-neon-cyan/50 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Tema / Pieza Trabajada *
              </label>
              <input
                type="text"
                placeholder="Ej. Escala Pentatónica Menor, Técnica de Púa Alternada, Lectura a Primera Vista..."
                value={temaTrabajado}
                onChange={(e) => setTemaTrabajado(e.target.value)}
                required
                className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-neon-cyan/50 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Observaciones & Comentarios Pedagógicos
                </label>
                <textarea
                  rows={3}
                  placeholder="Detalla postura, afinación, ritmo, concentración..."
                  value={comentarios}
                  onChange={(e) => setComentarios(e.target.value)}
                  className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-neon-cyan/50 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Objetivos Cumplidos
                </label>
                <textarea
                  rows={3}
                  placeholder="Hitos alcanzados durante la sesión..."
                  value={objetivosCumplidos}
                  onChange={(e) => setObjetivosCumplidos(e.target.value)}
                  className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-neon-cyan/50 focus:outline-none resize-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Próxima Meta / Tarea para Casa
              </label>
              <input
                type="text"
                placeholder="Ej. Practicar arpegios a 80 BPM con metrónomo..."
                value={proximaMeta}
                onChange={(e) => setProximaMeta(e.target.value)}
                className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-neon-cyan/50 focus:outline-none"
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
                variant="cyan"
                type="submit"
                disabled={submitting}
                className="py-2.5 px-6 text-sm"
              >
                {submitting ? 'Guardando...' : 'Guardar Entrada de Bitácora'}
              </NeonButton>
            </div>
          </form>
        </GlassCard>
      )}

      {/* FILTER CONTROLS */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <label className="text-xs font-semibold text-gray-400">Filtrar por Alumno:</label>
          <select
            value={filterInscripcion}
            onChange={(e) => setFilterInscripcion(e.target.value ? Number(e.target.value) : '')}
            className="bg-dark-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-neon-cyan/50 focus:outline-none min-w-[200px]"
          >
            <option value="">Todos los alumnos</option>
            {inscripciones.map((ins) => (
              <option key={ins.idInscripcion} value={ins.idInscripcion}>
                {ins.alumno?.nombre} {ins.alumno?.apellidos} ({ins.clase?.nombre})
              </option>
            ))}
          </select>
        </div>

        <span className="text-xs text-gray-400">
          Mostrando {filteredBitacoras.length} registros
        </span>
      </div>

      {/* BITÁCORAS LIST */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="glass-panel p-6 rounded-2xl animate-pulse h-48" />
          ))}
        </div>
      ) : filteredBitacoras.length === 0 ? (
        <div className="glass-panel p-16 text-center rounded-2xl flex flex-col items-center gap-4">
          <BookOpen className="w-12 h-12 text-gray-600" />
          <h3 className="text-lg font-bold text-white">Sin registros de bitácora</h3>
          <p className="text-xs text-gray-400 max-w-md">
            Aún no se han redactado notas pedagógicas para este criterio de búsqueda.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredBitacoras.map((b) => (
            <GlassCard key={b.idBitacora} accent="cyan" className="p-6 flex flex-col justify-between gap-4">
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <h3 className="text-base font-bold text-white">
                      {b.inscripcion?.alumno?.nombre} {b.inscripcion?.alumno?.apellidos}
                    </h3>
                    <span className="text-xs text-neon-cyan font-medium">
                      {b.inscripcion?.clase?.nombre}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400 font-mono flex items-center gap-1.5 flex-shrink-0">
                    <Calendar className="w-3.5 h-3.5 text-gray-500" />
                    {new Date(b.fechaSesion).toLocaleDateString('es-MX', { dateStyle: 'medium' })}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-dark-900/60 border border-white/5 mb-3">
                  <div className="text-xs text-gray-400 font-medium mb-1">Tema Trabajado:</div>
                  <div className="text-sm font-semibold text-white">{b.temaTrabajado}</div>
                </div>

                {b.comentariosPedagogicos && (
                  <div className="text-xs text-gray-300 leading-relaxed mb-3 flex items-start gap-2">
                    <MessageSquare className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
                    <span>{b.comentariosPedagogicos}</span>
                  </div>
                )}

                {b.objetivosCumplidos && (
                  <div className="text-xs text-neon-green/90 leading-relaxed mb-3 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-neon-green flex-shrink-0 mt-0.5" />
                    <span><strong>Objetivos:</strong> {b.objetivosCumplidos}</span>
                  </div>
                )}
              </div>

              {b.proximaMeta && (
                <div className="pt-3 border-t border-white/10 flex items-center gap-2 text-xs text-neon-yellow">
                  <Target className="w-4 h-4 flex-shrink-0" />
                  <span><strong>Próxima meta:</strong> {b.proximaMeta}</span>
                </div>
              )}
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
};
