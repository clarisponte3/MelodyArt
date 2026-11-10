import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { GlassCard } from '../../components/ui/GlassCard';
import { NeonButton } from '../../components/ui/NeonButton';
import { Music, ShoppingBag, ShieldCheck, ArrowRight } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <div className="container mx-auto px-6 py-12">
      {/* HEADER DE BIENVENIDA */}
      <div className="mb-10">
        <span className="text-xs font-semibold text-neon-cyan uppercase tracking-widest">
          Panel de Control Personal
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-white mt-1">
          ¡Hola de nuevo, <span className="neon-text-yellow">{user?.nombre}</span>!
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Gestiona tus compras de instrumentos, talleres musicales inscritos y expedientes en SonoraSync.
        </p>
      </div>

      {/* TARJETAS RESUMEN */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <GlassCard accent="cyan" className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-neon-cyan uppercase">Mis Talleres Activos</span>
            <div className="p-2 rounded-lg bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan">
              <Music className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-2">2 Clases</div>
          <p className="text-xs text-gray-400 mb-4">Taller de Guitarra Clásica & Solfeo y Armonía</p>
          <Link to="/mis-clases" className="text-xs text-neon-cyan hover:underline flex items-center gap-1 font-medium">
            <span>Ver Horarios y Asistencias</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </GlassCard>

        <GlassCard accent="pink" className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-neon-pink uppercase">Órdenes Realizadas</span>
            <div className="p-2 rounded-lg bg-neon-pink/10 border border-neon-pink/30 text-neon-pink">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-2">Pedidos Recientes</div>
          <p className="text-xs text-gray-400 mb-4">Garantía activa de 90 días y comprobantes con 16% IVA</p>
          <Link to="/mis-compras" className="text-xs text-neon-pink hover:underline flex items-center gap-1 font-medium">
            <span>Consultar Historial de Compras</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </GlassCard>

        <GlassCard accent="gold" className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-neon-green uppercase">Privacidad & Datos</span>
            <div className="p-2 rounded-lg bg-neon-green/10 border border-neon-green/30 text-neon-green">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-2">Derechos ARCO</div>
          <p className="text-xs text-gray-400 mb-4">Expediente blindado conforme a la ley mexicana LFPDPPP</p>
          <Link to="/perfil" className="text-xs text-neon-green hover:underline flex items-center gap-1 font-medium">
            <span>Administrar Datos Personales</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </GlassCard>
      </div>

      {/* ACCIONES RÁPIDAS */}
      <div className="p-8 rounded-2xl glass-panel border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-lg font-bold text-white mb-1">¿Buscas un nuevo instrumento o accesorio?</h3>
          <p className="text-xs text-gray-400">
            Explora guitarras, ukeleles y teclados de luthería artesanal con entrega protegida a todo México.
          </p>
        </div>
        <Link to="/catalogo">
          <NeonButton variant="cyan" className="py-3 px-6 text-xs">
            Ir al Catálogo de Instrumentos
          </NeonButton>
        </Link>
      </div>
    </div>
  );
};
