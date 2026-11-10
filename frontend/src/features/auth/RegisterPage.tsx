import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthService } from '../../api/auth.service';
import { UsuarioRequestDTO } from '../../types';
import { showToast } from '../../store/notificationStore';
import { NeonButton } from '../../components/ui/NeonButton';
import { GlassCard } from '../../components/ui/GlassCard';
import { User, Mail, Lock, Phone, MapPin, Calendar, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    correo: '',
    telefono: '',
    direccion: '',
    fechaNacimiento: '',
    curp: '',
    contrasena: '',
    confirmarContrasena: '',
  });

  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Validación de CURP con formato RENAPO
  const curpRegex = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]\d$/;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);
    setFieldErrors({});

    // Validaciones locales
    const errors: Record<string, string> = {};

    if (formData.contrasena.length < 8) {
      errors.contrasena = 'La contraseña debe contener al menos 8 caracteres.';
    }

    if (formData.contrasena !== formData.confirmarContrasena) {
      errors.confirmarContrasena = 'Las contraseñas no coinciden.';
    }

    if (formData.curp && !curpRegex.test(formData.curp.toUpperCase())) {
      errors.curp = 'El formato de la CURP es inválido (18 caracteres oficiales RENAPO).';
    }

    if (!acceptPrivacy || !acceptTerms) {
      errors.legal = 'Debes aceptar el Aviso de Privacidad y los Términos de Servicio.';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setLoading(true);
    try {
      const payload: UsuarioRequestDTO = {
        nombre: formData.nombre.trim(),
        apellidos: formData.apellidos.trim(),
        correo: formData.correo.trim().toLowerCase(),
        telefono: formData.telefono.trim() || undefined,
        direccion: formData.direccion.trim() || undefined,
        fechaNacimiento: formData.fechaNacimiento || undefined,
        curp: formData.curp.trim().toUpperCase() || undefined,
        contrasena: formData.contrasena,
        activo: true,
      };

      await AuthService.register(payload);
      showToast('success', '¡Tu cuenta ha sido creada exitosamente! Ahora puedes iniciar sesión.', 'Registro Completado');
      navigate('/login');
    } catch (err: any) {
      if (err?.detalles) {
        setFieldErrors(err.detalles);
      } else if (err?.message) {
        setGeneralError(err.message);
      } else {
        setGeneralError('No se pudo completar el registro. Verifica los campos.');
      }
    } finally {
      setLoading(false);
    }
  };

  const isFormSubmittable = acceptPrivacy && acceptTerms && !loading;

  return (
    <div className="min-h-screen container mx-auto px-6 py-12 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <GlassCard accent="pink" className="p-8 md:p-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Crear Cuenta en SonoraSync</h1>
            <p className="text-xs text-gray-400">
              Únete a la academia musical y accede a nuestra tienda de instrumentos
            </p>
          </div>

          {generalError && (
            <div className="mb-6 p-4 rounded-xl border border-red-500/40 bg-red-950/40 flex items-center gap-2.5 text-xs text-red-300">
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400" />
              <span>{generalError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* SECCIÓN 1: DATOS PERSONALES */}
            <div>
              <h3 className="text-xs font-semibold text-neon-cyan uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
                1. Información Personal
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-300 mb-1">Nombre(s) *</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      placeholder="Ej. Juan Carlos"
                      required
                      className="w-full bg-dark-900 border border-white/15 focus:border-neon-cyan rounded-xl py-2 pl-10 pr-3 text-xs text-white placeholder-gray-500 outline-none"
                    />
                  </div>
                  {fieldErrors.nombre && <span className="text-[10px] text-red-400 mt-0.5">{fieldErrors.nombre}</span>}
                </div>

                <div>
                  <label className="block text-xs text-gray-300 mb-1">Apellidos *</label>
                  <input
                    type="text"
                    name="apellidos"
                    value={formData.apellidos}
                    onChange={handleChange}
                    placeholder="Ej. Pérez García"
                    required
                    className="w-full bg-dark-900 border border-white/15 focus:border-neon-cyan rounded-xl py-2 px-3 text-xs text-white placeholder-gray-500 outline-none"
                  />
                  {fieldErrors.apellidos && <span className="text-[10px] text-red-400 mt-0.5">{fieldErrors.apellidos}</span>}
                </div>

                <div>
                  <label className="block text-xs text-gray-300 mb-1">Correo Electrónico *</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      name="correo"
                      value={formData.correo}
                      onChange={handleChange}
                      placeholder="alumno@ejemplo.com"
                      required
                      className="w-full bg-dark-900 border border-white/15 focus:border-neon-cyan rounded-xl py-2 pl-10 pr-3 text-xs text-white placeholder-gray-500 outline-none"
                    />
                  </div>
                  {fieldErrors.correo && <span className="text-[10px] text-red-400 mt-0.5">{fieldErrors.correo}</span>}
                </div>

                <div>
                  <label className="block text-xs text-gray-300 mb-1">Teléfono (+52 México)</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      placeholder="55 1234 5678"
                      className="w-full bg-dark-900 border border-white/15 focus:border-neon-cyan rounded-xl py-2 pl-10 pr-3 text-xs text-white placeholder-gray-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-300 mb-1">Fecha de Nacimiento</label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      name="fechaNacimiento"
                      value={formData.fechaNacimiento}
                      onChange={handleChange}
                      className="w-full bg-dark-900 border border-white/15 focus:border-neon-cyan rounded-xl py-2 pl-10 pr-3 text-xs text-white outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-300 mb-1">CURP (Clave Única)</label>
                  <div className="relative">
                    <FileText className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      name="curp"
                      maxLength={18}
                      value={formData.curp}
                      onChange={handleChange}
                      placeholder="18 caracteres oficiales"
                      className="w-full bg-dark-900 border border-white/15 focus:border-neon-cyan rounded-xl py-2 pl-10 pr-3 text-xs text-white placeholder-gray-500 uppercase outline-none"
                    />
                  </div>
                  {fieldErrors.curp && <span className="text-[10px] text-red-400 mt-0.5">{fieldErrors.curp}</span>}
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-xs text-gray-300 mb-1">Dirección Residencial</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleChange}
                    placeholder="Calle, Número, Colonia, Municipio / Alcaldía, C.P."
                    className="w-full bg-dark-900 border border-white/15 focus:border-neon-cyan rounded-xl py-2 pl-10 pr-3 text-xs text-white placeholder-gray-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* SECCIÓN 2: SEGURIDAD */}
            <div>
              <h3 className="text-xs font-semibold text-neon-pink uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
                2. Contraseña de Acceso
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-300 mb-1">Contraseña (Mínimo 8 caracteres) *</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      name="contrasena"
                      value={formData.contrasena}
                      onChange={handleChange}
                      placeholder="••••••••"
                      required
                      className="w-full bg-dark-900 border border-white/15 focus:border-neon-pink rounded-xl py-2 pl-10 pr-3 text-xs text-white placeholder-gray-500 outline-none"
                    />
                  </div>
                  {fieldErrors.contrasena && <span className="text-[10px] text-red-400 mt-0.5">{fieldErrors.contrasena}</span>}
                </div>

                <div>
                  <label className="block text-xs text-gray-300 mb-1">Confirmar Contraseña *</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      name="confirmarContrasena"
                      value={formData.confirmarContrasena}
                      onChange={handleChange}
                      placeholder="••••••••"
                      required
                      className="w-full bg-dark-900 border border-white/15 focus:border-neon-pink rounded-xl py-2 pl-10 pr-3 text-xs text-white placeholder-gray-500 outline-none"
                    />
                  </div>
                  {fieldErrors.confirmarContrasena && (
                    <span className="text-[10px] text-red-400 mt-0.5">{fieldErrors.confirmarContrasena}</span>
                  )}
                </div>
              </div>
            </div>

            {/* SECCIÓN 3: CONSENTIMIENTO NORMATIVO MEXICANO (LFPDPPP Y PROFECO) */}
            <div className="p-4 rounded-xl border border-white/10 bg-dark-900/60 space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acceptPrivacy}
                  onChange={(e) => setAcceptPrivacy(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-gray-600 text-neon-green focus:ring-0 cursor-pointer"
                />
                <span className="text-xs text-gray-300 leading-relaxed">
                  He leído y acepto el{' '}
                  <Link to="/privacidad" target="_blank" className="text-neon-cyan hover:underline font-medium">
                    Aviso de Privacidad Integral
                  </Link>{' '}
                  y el tratamiento confidencial de mis datos conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP).
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-gray-600 text-neon-green focus:ring-0 cursor-pointer"
                />
                <span className="text-xs text-gray-300 leading-relaxed">
                  Acepto los{' '}
                  <Link to="/terminos" target="_blank" className="text-neon-pink hover:underline font-medium">
                    Términos y Condiciones Comerciales
                  </Link>
                  , políticas de garantía de 90 días y derecho de revocación a 5 días de la PROFECO.
                </span>
              </label>

              {fieldErrors.legal && <span className="text-[10px] text-red-400 block">{fieldErrors.legal}</span>}
            </div>

            {/* BOTÓN REGISTRARSE */}
            <NeonButton
              variant="green"
              type="submit"
              disabled={!isFormSubmittable}
              className={`w-full py-3.5 text-sm ${!isFormSubmittable ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{loading ? 'Creando cuenta...' : 'Completar Registro'}</span>
            </NeonButton>
          </form>

          <div className="mt-8 text-center text-xs text-gray-400">
            <span>¿Ya tienes cuenta? </span>
            <Link to="/login" className="text-neon-cyan font-semibold hover:underline">
              Iniciar Sesión
            </Link>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
