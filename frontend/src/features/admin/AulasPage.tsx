import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, PlusCircle, X } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { NeonButton } from '../../components/ui/NeonButton';
import apiClient from '../../api/apiClient';
import type { AulaResponseDTO, AulaRequestDTO } from '../../types';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
interface FormState {
  nombre: string;
  capacidad: number;
  ubicacion: string;
  activo: boolean;
}

const INITIAL_FORM: FormState = { nombre: '', capacidad: 20, ubicacion: '', activo: true };

const CardSkeleton: React.FC = () => (
  <div className="glass-panel rounded-xl p-6 animate-pulse">
    <div className="h-5 bg-white/10 rounded w-32 mb-3" />
    <div className="h-3 bg-white/10 rounded w-24 mb-2" />
    <div className="h-3 bg-white/10 rounded w-20" />
  </div>
);

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------
export const AulasPage: React.FC = () => {
  const [aulas, setAulas] = useState<AulaResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [togglingId, setTogglingId] = useState<number | null>(null);
  const [formError, setFormError] = useState('');

  const fetchAulas = () => {
    setLoading(true);
    apiClient
      .get<AulaResponseDTO[]>('/api/aulas')
      .then((r) => setAulas(r.data))
      .catch(() => {/* handled by interceptor */})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAulas();
  }, []);

  const handleFormChange = (field: keyof FormState, value: string | number | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setFormError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre.trim()) {
      setFormError('El nombre del aula es obligatorio.');
      return;
    }
    setSubmitting(true);
    try {
      const payload: AulaRequestDTO = {
        nombre: form.nombre.trim(),
        capacidad: form.capacidad,
        ubicacion: form.ubicacion.trim() || undefined,
        activo: form.activo,
      };
      await apiClient.post('/api/aulas', payload);
      setForm(INITIAL_FORM);
      setShowForm(false);
      fetchAulas();
    } catch {
      /* handled by interceptor */
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggle = async (aula: AulaResponseDTO) => {
    setTogglingId(aula.idAula);
    try {
      await apiClient.put(`/api/aulas/${aula.idAula}`, {
        nombre: aula.nombre,
        capacidad: aula.capacidad,
        ubicacion: aula.ubicacion,
        activo: !aula.activo,
      });
      setAulas((prev) =>
        prev.map((a) => a.idAula === aula.idAula ? { ...a, activo: !a.activo } : a)
      );
    } catch {
      /* handled by interceptor */
    } finally {
      setTogglingId(null);
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      {/* HEADER */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">
            <span className="neon-text-pink">Aulas y Talleres</span>
          </h1>
          <p className="text-sm text-gray-400">
            Gestión de espacios físicos de la academia musical.
          </p>
        </div>
        <NeonButton
          variant="pink"
          onClick={() => setShowForm((v) => !v)}
          className="py-2 px-4 text-sm"
        >
          {showForm ? (
            <><X className="w-4 h-4" /> Cancelar</>
          ) : (
            <><PlusCircle className="w-4 h-4" /> Registrar Aula</>
          )}
        </NeonButton>
      </div>

      {/* INLINE REGISTRATION FORM */}
      {showForm && (
        <div className="glass-panel rounded-xl p-6 mb-8">
          <h2 className="text-base font-bold text-white mb-4">Nueva Aula</h2>
          <form onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1" htmlFor="aula-nombre">
                  Nombre <span className="text-red-400">*</span>
                </label>
                <input
                  id="aula-nombre"
                  type="text"
                  required
                  value={form.nombre}
                  onChange={(e) => handleFormChange('nombre', e.target.value)}
                  placeholder="Ej. Sala de Guitarra A"
                  className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-300 placeholder-gray-600 focus:border-neon-pink/50 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1" htmlFor="aula-capacidad">
                  Capacidad (personas)
                </label>
                <input
                  id="aula-capacidad"
                  type="number"
                  min={1}
                  max={500}
                  value={form.capacidad}
                  onChange={(e) => handleFormChange('capacidad', Number(e.target.value))}
                  className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-300 focus:border-neon-pink/50 focus:outline-none"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-400 mb-1" htmlFor="aula-ubicacion">
                  Ubicación
                </label>
                <input
                  id="aula-ubicacion"
                  type="text"
                  value={form.ubicacion}
                  onChange={(e) => handleFormChange('ubicacion', e.target.value)}
                  placeholder="Ej. Piso 2, Ala Norte"
                  className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-300 placeholder-gray-600 focus:border-neon-pink/50 focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-2 mt-1">
                <input
                  id="aula-activo"
                  type="checkbox"
                  checked={form.activo}
                  onChange={(e) => handleFormChange('activo', e.target.checked)}
                  className="w-4 h-4 accent-neon-pink"
                />
                <label htmlFor="aula-activo" className="text-sm text-gray-300">
                  Aula activa
                </label>
              </div>
            </div>
            {formError && (
              <p className="text-red-400 text-xs mb-3">{formError}</p>
            )}
            <NeonButton
              type="submit"
              variant="pink"
              disabled={submitting}
              className="py-2 px-6 text-sm"
            >
              {submitting ? 'Guardando…' : 'Crear Aula'}
            </NeonButton>
          </form>
        </div>
      )}

      {/* AULAS GRID */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => <CardSkeleton key={i} />)}
        </div>
      ) : aulas.length === 0 ? (
        <div className="p-10 text-center text-gray-400 text-sm glass-panel rounded-xl">
          No hay aulas registradas.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aulas.map((aula) => (
            <GlassCard key={aula.idAula} accent="pink" className="p-6 flex flex-col gap-3">
              <div className="flex items-start justify-between">
                <h3 className="font-bold text-white text-base">{aula.nombre}</h3>
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold border ${
                    aula.activo
                      ? 'bg-green-500/20 text-green-400 border-green-500/30'
                      : 'bg-red-500/20 text-red-400 border-red-500/30'
                  }`}
                >
                  {aula.activo
                    ? <><CheckCircle className="w-3 h-3" /> Activa</>
                    : <><XCircle className="w-3 h-3" /> Inactiva</>}
                </span>
              </div>
              <div className="text-xs text-gray-400 space-y-1">
                <p>
                  <span className="text-gray-500">Capacidad:</span>{' '}
                  <span className="text-gray-300">{aula.capacidad} personas</span>
                </p>
                <p>
                  <span className="text-gray-500">Ubicación:</span>{' '}
                  <span className="text-gray-300">{aula.ubicacion ?? '—'}</span>
                </p>
              </div>
              <NeonButton
                variant={aula.activo ? 'pink' : 'green'}
                onClick={() => handleToggle(aula)}
                disabled={togglingId === aula.idAula}
                className="mt-auto py-1.5 px-4 text-xs self-start"
              >
                {togglingId === aula.idAula
                  ? 'Guardando…'
                  : aula.activo
                    ? 'Desactivar'
                    : 'Activar'}
              </NeonButton>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
};
