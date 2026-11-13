import React, { useEffect, useState } from 'react';
import { User, Shield, AlertCircle, CheckCircle } from 'lucide-react';
import apiClient from '../../api/apiClient';
import { NeonButton } from '../../components/ui/NeonButton';
import { GlassCard } from '../../components/ui/GlassCard';
import { useAuthStore } from '../../store/authStore';
import { showToast } from '../../store/notificationStore';
import type { UsuarioResponseDTO, UsuarioRequestDTO } from '../../types';

// ---------------------------------------------------------------------------
// Tab type
// ---------------------------------------------------------------------------
type TabId = 'perfil' | 'arco';

// ---------------------------------------------------------------------------
// ARCO reason options
// ---------------------------------------------------------------------------
const CANCEL_REASONS = [
  'Ya no deseo recibir comunicaciones',
  'No consiento el tratamiento de mis datos',
  'Deseo eliminar mi cuenta',
  'Otros motivos',
];

const RECT_REASONS = [
  'Nombre o apellidos incorrectos',
  'Correo electrónico incorrecto',
  'Domicilio desactualizado',
  'Fecha de nacimiento incorrecta',
  'Otros datos incorrectos',
];

// ---------------------------------------------------------------------------
// Field validation helpers
// ---------------------------------------------------------------------------
interface FormErrors {
  nombre?: string;
  apellidos?: string;
  telefono?: string;
  direccion?: string;
  fechaNacimiento?: string;
}

const validate = (field: keyof FormErrors, value: string): string | undefined => {
  switch (field) {
    case 'nombre':
      return value.trim().length < 2 ? 'El nombre debe tener al menos 2 caracteres.' : undefined;
    case 'apellidos':
      return value.trim().length < 2 ? 'Los apellidos deben tener al menos 2 caracteres.' : undefined;
    case 'telefono':
      return value && !/^\d{10}$/.test(value.replace(/\s/g, ''))
        ? 'Ingresa un teléfono de 10 dígitos.'
        : undefined;
    case 'fechaNacimiento':
      return value && isNaN(Date.parse(value)) ? 'Fecha inválida.' : undefined;
    default:
      return undefined;
  }
};

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export const PerfilPage: React.FC = () => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<TabId>('perfil');

  // ---- Profile form ----
  const [profile, setProfile] = useState<UsuarioResponseDTO | null>(null);
  const [form, setForm] = useState<Omit<UsuarioRequestDTO, 'correo' | 'contrasena' | 'contrasenaHash' | 'activo' | 'curp'>>({
    nombre: '',
    apellidos: '',
    telefono: '',
    direccion: '',
    fechaNacimiento: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [savingProfile, setSavingProfile] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);

  // ---- ARCO forms ----
  const [cancelReason, setCancelReason] = useState(CANCEL_REASONS[0]);
  const [cancelDesc, setCancelDesc] = useState('');
  const [rectReason, setRectReason] = useState(RECT_REASONS[0]);
  const [rectDesc, setRectDesc] = useState('');
  const [arcoSubmitted, setArcoSubmitted] = useState<'cancel' | 'rect' | null>(null);

  // Fetch profile data
  useEffect(() => {
    if (!user?.userId) return;
    apiClient
      .get<UsuarioResponseDTO>(`/api/usuarios/${user.userId}`)
      .then((r) => {
        setProfile(r.data);
        setForm({
          nombre: r.data.nombre ?? '',
          apellidos: r.data.apellidos ?? '',
          telefono: r.data.telefono ?? '',
          direccion: r.data.direccion ?? '',
          fechaNacimiento: r.data.fechaNacimiento ?? '',
        });
      })
      .catch(() => showToast('error', 'No se pudo cargar tu perfil.'))
      .finally(() => setLoadingProfile(false));
  }, [user?.userId]);

  const handleBlur = (field: keyof FormErrors, value: string) => {
    setErrors((prev) => ({ ...prev, [field]: validate(field, value) }));
  };

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    // Run all validations
    const newErrors: FormErrors = {};
    (Object.keys(form) as (keyof FormErrors)[]).forEach((k) => {
      const err = validate(k, (form as Record<string, string>)[k] ?? '');
      if (err) newErrors[k] = err;
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setSavingProfile(true);
    try {
      await apiClient.put(`/api/usuarios/${user?.userId}`, {
        ...form,
        correo: profile?.correo,
        activo: true,
      });
      showToast('success', 'Tu perfil ha sido actualizado correctamente.', 'Perfil Actualizado');
    } catch {
      // apiClient interceptor shows toast
    } finally {
      setSavingProfile(false);
    }
  };

  const handleArcoSubmit = (type: 'cancel' | 'rect') => {
    // In a real implementation this would POST to an ARCO endpoint
    showToast(
      'success',
      'Tu solicitud ARCO ha sido recibida. La atenderemos en un máximo de 20 días hábiles.',
      'Solicitud ARCO Enviada'
    );
    setArcoSubmitted(type);
  };

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  return (
    <div className="container mx-auto px-6 py-12 max-w-3xl">
      {/* Header */}
      <div className="mb-8">
        <span className="text-xs font-semibold text-neon-green uppercase tracking-widest">
          Cuenta Personal
        </span>
        <h1 className="text-3xl font-bold text-white mt-2">Mi Perfil & Privacidad</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-8 glass-panel rounded-xl p-1 w-fit">
        {(['perfil', 'arco'] as TabId[]).map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
              activeTab === t
                ? 'bg-neon-green/20 text-neon-green border border-neon-green/40'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {t === 'perfil' ? (
              <>
                <User className="w-4 h-4" /> Mi Perfil
              </>
            ) : (
              <>
                <Shield className="w-4 h-4" /> Derechos ARCO (LFPDPPP)
              </>
            )}
          </button>
        ))}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* TAB 1 — Perfil */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === 'perfil' && (
        <GlassCard accent="cyan">
          {loadingProfile ? (
            <div className="space-y-4 animate-pulse">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-10 bg-white/10 rounded-lg" />
              ))}
            </div>
          ) : (
            <form onSubmit={handleSaveProfile} className="space-y-5" noValidate>
              {/* Correo (readonly) */}
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1.5">
                  Correo Electrónico{' '}
                  <span className="text-gray-600">(no editable)</span>
                </label>
                <input
                  type="email"
                  value={profile?.correo ?? ''}
                  readOnly
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-gray-500 cursor-not-allowed text-sm"
                />
              </div>

              {/* Nombre */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Nombre *
                </label>
                <input
                  type="text"
                  value={form.nombre}
                  onChange={(e) => handleChange('nombre', e.target.value)}
                  onBlur={(e) => handleBlur('nombre', e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg bg-white/5 border text-white text-sm transition-colors ${
                    errors.nombre
                      ? 'border-neon-pink focus:border-neon-pink'
                      : 'border-white/10 focus:border-neon-cyan'
                  } outline-none`}
                />
                {errors.nombre && (
                  <p className="mt-1 text-xs text-neon-pink">{errors.nombre}</p>
                )}
              </div>

              {/* Apellidos */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Apellidos *
                </label>
                <input
                  type="text"
                  value={form.apellidos}
                  onChange={(e) => handleChange('apellidos', e.target.value)}
                  onBlur={(e) => handleBlur('apellidos', e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg bg-white/5 border text-white text-sm transition-colors ${
                    errors.apellidos
                      ? 'border-neon-pink focus:border-neon-pink'
                      : 'border-white/10 focus:border-neon-cyan'
                  } outline-none`}
                />
                {errors.apellidos && (
                  <p className="mt-1 text-xs text-neon-pink">{errors.apellidos}</p>
                )}
              </div>

              {/* Teléfono */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Teléfono
                </label>
                <input
                  type="tel"
                  value={form.telefono ?? ''}
                  onChange={(e) => handleChange('telefono', e.target.value)}
                  onBlur={(e) => handleBlur('telefono', e.target.value)}
                  placeholder="10 dígitos"
                  className={`w-full px-4 py-3 rounded-lg bg-white/5 border text-white text-sm transition-colors ${
                    errors.telefono
                      ? 'border-neon-pink focus:border-neon-pink'
                      : 'border-white/10 focus:border-neon-cyan'
                  } outline-none`}
                />
                {errors.telefono && (
                  <p className="mt-1 text-xs text-neon-pink">{errors.telefono}</p>
                )}
              </div>

              {/* Dirección */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Dirección
                </label>
                <input
                  type="text"
                  value={form.direccion ?? ''}
                  onChange={(e) => handleChange('direccion', e.target.value)}
                  onBlur={(e) => handleBlur('direccion', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-neon-cyan text-white text-sm outline-none"
                />
              </div>

              {/* Fecha de nacimiento */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Fecha de Nacimiento
                </label>
                <input
                  type="date"
                  value={form.fechaNacimiento ?? ''}
                  onChange={(e) => handleChange('fechaNacimiento', e.target.value)}
                  onBlur={(e) => handleBlur('fechaNacimiento', e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg bg-white/5 border text-white text-sm transition-colors ${
                    errors.fechaNacimiento
                      ? 'border-neon-pink focus:border-neon-pink'
                      : 'border-white/10 focus:border-neon-cyan'
                  } outline-none`}
                />
                {errors.fechaNacimiento && (
                  <p className="mt-1 text-xs text-neon-pink">{errors.fechaNacimiento}</p>
                )}
              </div>

              <div className="pt-2">
                <NeonButton
                  type="submit"
                  variant="green"
                  disabled={savingProfile}
                  className="w-full py-3 disabled:opacity-60"
                >
                  {savingProfile ? 'Guardando…' : 'Guardar Cambios'}
                </NeonButton>
              </div>
            </form>
          )}
        </GlassCard>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* TAB 2 — Derechos ARCO */}
      {/* ------------------------------------------------------------------ */}
      {activeTab === 'arco' && (
        <div className="space-y-6">
          {/* Info banner */}
          <div className="glass-panel border border-neon-cyan/30 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-neon-cyan flex-shrink-0 mt-0.5" />
              <div>
                <h2 className="font-bold text-white text-base mb-2">¿Qué son los Derechos ARCO?</h2>
                <p className="text-gray-300 text-sm leading-relaxed mb-3">
                  Conforme a la{' '}
                  <span className="text-neon-cyan font-semibold">
                    Ley Federal de Protección de Datos Personales en Posesión de Particulares
                    (LFPDPPP)
                  </span>
                  , tienes derecho a:
                </p>
                <ul className="space-y-1.5 text-sm text-gray-300">
                  {[
                    ['A', 'Acceso', 'Conocer qué datos personales tenemos sobre ti.'],
                    ['R', 'Rectificación', 'Corregir datos inexactos o incompletos.'],
                    ['C', 'Cancelación', 'Solicitar la eliminación de tus datos.'],
                    ['O', 'Oposición', 'Oponerte al tratamiento de tus datos.'],
                  ].map(([letter, name, desc]) => (
                    <li key={letter} className="flex items-start gap-2">
                      <span className="font-bold text-neon-cyan w-5 flex-shrink-0">{letter}</span>
                      <span>
                        <span className="font-semibold text-white">{name}:</span> {desc}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex items-start gap-2 bg-neon-yellow/5 border border-neon-yellow/30 rounded-lg p-3">
                  <AlertCircle className="w-4 h-4 text-neon-yellow flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-300">
                    Atenderemos tu solicitud en un plazo máximo de{' '}
                    <span className="font-semibold text-white">20 días hábiles</span> conforme al{' '}
                    <span className="text-neon-yellow font-semibold">Art. 32 LFPDPPP</span>.
                    Puedes contactarnos en{' '}
                    <a
                      href="mailto:privacidad@sonorasync.mx"
                      className="text-neon-cyan hover:underline"
                    >
                      privacidad@sonorasync.mx
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Cancelación */}
          <GlassCard accent="pink">
            <h3 className="font-bold text-white text-base mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-neon-pink" />
              Solicitud de Cancelación (Eliminación de Datos)
            </h3>
            {arcoSubmitted === 'cancel' ? (
              <div className="flex items-center gap-3 text-neon-green">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm font-semibold">
                  Solicitud enviada. Te contactaremos en máximo 20 días hábiles.
                </span>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Motivo de cancelación
                  </label>
                  <select
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-neon-pink text-white text-sm outline-none"
                  >
                    {CANCEL_REASONS.map((r) => (
                      <option key={r} value={r} className="bg-dark-900">
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Descripción adicional
                  </label>
                  <textarea
                    value={cancelDesc}
                    onChange={(e) => setCancelDesc(e.target.value)}
                    rows={3}
                    placeholder="Describe tu solicitud con más detalle (opcional)..."
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-neon-pink text-white text-sm outline-none resize-none"
                  />
                </div>
                <NeonButton
                  variant="pink"
                  onClick={() => handleArcoSubmit('cancel')}
                  className="w-full"
                >
                  Enviar Solicitud de Cancelación
                </NeonButton>
              </div>
            )}
          </GlassCard>

          {/* Rectificación */}
          <GlassCard accent="cyan">
            <h3 className="font-bold text-white text-base mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-neon-cyan" />
              Solicitud de Rectificación de Datos
            </h3>
            {arcoSubmitted === 'rect' ? (
              <div className="flex items-center gap-3 text-neon-green">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm font-semibold">
                  Solicitud enviada. Te contactaremos en máximo 20 días hábiles.
                </span>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Dato a rectificar
                  </label>
                  <select
                    value={rectReason}
                    onChange={(e) => setRectReason(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-neon-cyan text-white text-sm outline-none"
                  >
                    {RECT_REASONS.map((r) => (
                      <option key={r} value={r} className="bg-dark-900">
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Descripción del cambio solicitado
                  </label>
                  <textarea
                    value={rectDesc}
                    onChange={(e) => setRectDesc(e.target.value)}
                    rows={3}
                    placeholder="Especifica qué datos deseas rectificar y los valores correctos..."
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-neon-cyan text-white text-sm outline-none resize-none"
                  />
                </div>
                <NeonButton
                  variant="cyan"
                  onClick={() => handleArcoSubmit('rect')}
                  className="w-full"
                >
                  Enviar Solicitud de Rectificación
                </NeonButton>
              </div>
            )}
          </GlassCard>
        </div>
      )}
    </div>
  );
};
