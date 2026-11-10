import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { showToast } from '../../store/notificationStore';
import { GlassCard } from '../../components/ui/GlassCard';
import { NeonButton } from '../../components/ui/NeonButton';
import { User, ShieldCheck } from 'lucide-react';

export const PerfilPage: React.FC = () => {
  const { user } = useAuthStore();

  const [formData, setFormData] = useState({
    nombre: user?.nombre || '',
    correo: user?.correo || '',
    telefono: '55 1234 5678',
    direccion: 'Av. Insurgentes Sur 1200, Benito Juárez, CDMX',
    curp: 'MELJ010203HDFRNS09',
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      showToast('success', 'Tus datos han sido actualizados con éxito.', 'Perfil Guardado');
    }, 600);
  };

  const handleArcoRequest = (tipo: string) => {
    showToast(
      'info',
      `Tu solicitud de Derecho ARCO (${tipo}) ha sido registrada formalmente con folio ARCO-${Date.now().toString().slice(-4)}. Se responderá en menos de 20 días hábiles conforme a la LFPDPPP.`,
      'Solicitud LFPDPPP Registrada'
    );
  };

  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-1">Mi Cuenta y Perfil</h1>
        <p className="text-xs text-gray-400">
          Gestiona tu información de contacto, credenciales y tus derechos ARCO conforme a la ley mexicana.
        </p>
      </div>

      <div className="space-y-8">
        {/* FORMULARIO DE DATOS PERSONALES */}
        <GlassCard accent="cyan" className="p-8">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
            <User className="w-5 h-5 text-neon-cyan" />
            <h2 className="text-lg font-bold text-white">Información de Contacto</h2>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-300 mb-1">Nombre Completo</label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full bg-dark-900 border border-white/15 focus:border-neon-cyan rounded-xl py-2 px-3 text-xs text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-300 mb-1">Correo Electrónico (No modificable)</label>
                <input
                  type="email"
                  value={formData.correo}
                  disabled
                  className="w-full bg-dark-950 border border-white/10 rounded-xl py-2 px-3 text-xs text-gray-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-300 mb-1">Teléfono Móvil</label>
                <input
                  type="tel"
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  className="w-full bg-dark-900 border border-white/15 focus:border-neon-cyan rounded-xl py-2 px-3 text-xs text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-300 mb-1">CURP Registrada</label>
                <input
                  type="text"
                  value={formData.curp}
                  disabled
                  className="w-full bg-dark-950 border border-white/10 rounded-xl py-2 px-3 text-xs text-gray-400 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-300 mb-1">Dirección Registrada para Envíos</label>
              <input
                type="text"
                value={formData.direccion}
                onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                className="w-full bg-dark-900 border border-white/15 focus:border-neon-cyan rounded-xl py-2 px-3 text-xs text-white outline-none"
              />
            </div>

            <div className="flex justify-end pt-2">
              <NeonButton variant="cyan" type="submit" disabled={isSaving}>
                <span>{isSaving ? 'Guardando...' : 'Guardar Cambios'}</span>
              </NeonButton>
            </div>
          </form>
        </GlassCard>

        {/* SECCIÓN OBLIGATORIA DERECHOS ARCO (LFPDPPP MÉXICO) */}
        <GlassCard accent="gold" className="p-8">
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
            <ShieldCheck className="w-5 h-5 text-neon-green" />
            <div>
              <h2 className="text-lg font-bold text-white">Gestión de Derechos ARCO (LFPDPPP)</h2>
              <span className="text-[11px] text-gray-400">
                Acceso, Rectificación, Cancelación y Oposición de Datos Personales
              </span>
            </div>
          </div>

          <p className="text-xs text-gray-300 mb-6 leading-relaxed">
            Como titular de los datos en SonoraSync / MelodyArt, tienes el derecho inalienable de controlar el destino de tu información conforme al marco normativo del INAI y la LFPDPPP.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <button
              onClick={() => handleArcoRequest('Acceso')}
              className="p-3 rounded-xl border border-white/10 hover:border-neon-cyan bg-dark-900/60 text-xs text-left transition-colors"
            >
              <strong className="text-neon-cyan block mb-1">1. Acceso</strong>
              <span className="text-[11px] text-gray-400">Solicitar copia de mi expediente completo.</span>
            </button>

            <button
              onClick={() => handleArcoRequest('Rectificación')}
              className="p-3 rounded-xl border border-white/10 hover:border-neon-pink bg-dark-900/60 text-xs text-left transition-colors"
            >
              <strong className="text-neon-pink block mb-1">2. Rectificación</strong>
              <span className="text-[11px] text-gray-400">Actualizar datos inexactos o erróneos.</span>
            </button>

            <button
              onClick={() => handleArcoRequest('Cancelación')}
              className="p-3 rounded-xl border border-white/10 hover:border-neon-yellow bg-dark-900/60 text-xs text-left transition-colors"
            >
              <strong className="text-neon-yellow block mb-1">3. Cancelación</strong>
              <span className="text-[11px] text-gray-400">Bloquear y dar de baja mi cuenta y datos.</span>
            </button>

            <button
              onClick={() => handleArcoRequest('Oposición')}
              className="p-3 rounded-xl border border-white/10 hover:border-neon-green bg-dark-900/60 text-xs text-left transition-colors"
            >
              <strong className="text-neon-green block mb-1">4. Oposición</strong>
              <span className="text-[11px] text-gray-400">Oponerme a fines promocionales o terceros.</span>
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
