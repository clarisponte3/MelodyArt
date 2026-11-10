import React from 'react';
import { Link } from 'react-router-dom';
import { GlassCard } from '../../components/ui/GlassCard';
import {
  Shield,
  Users,
  DollarSign,
  Package,
  ArrowRight,
  TrendingUp,
  FileCheck,
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-green/40 bg-neon-green/10 text-neon-green text-xs font-semibold uppercase tracking-wider mb-2">
          <Shield className="w-3.5 h-3.5" />
          <span>Dirección & Gobernanza RBAC</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          Panel de Administración SonoraSync
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Visión unificada de la academia musical, inventario físico de instrumentos, ventas y auditoría forense.
        </p>
      </div>

      {/* KPI METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <GlassCard accent="cyan" className="p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-neon-cyan uppercase">Alumnos Activos</span>
            <Users className="w-5 h-5 text-neon-cyan" />
          </div>
          <div className="text-3xl font-extrabold text-white mb-1">148</div>
          <span className="text-[11px] text-neon-green flex items-center gap-1 font-medium">
            <TrendingUp className="w-3.5 h-3.5" /> +12% este mes
          </span>
        </GlassCard>

        <GlassCard accent="gold" className="p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-neon-yellow uppercase">Ventas E-Commerce</span>
            <DollarSign className="w-5 h-5 text-neon-yellow" />
          </div>
          <div className="text-3xl font-extrabold text-white mb-1 font-mono">$184,590</div>
          <span className="text-[11px] text-neon-cyan font-medium">16.00% IVA recaudado</span>
        </GlassCard>

        <GlassCard accent="pink" className="p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-neon-pink uppercase">Stock de Instrumentos</span>
            <Package className="w-5 h-5 text-neon-pink" />
          </div>
          <div className="text-3xl font-extrabold text-white mb-1">86 Pzas</div>
          <span className="text-[11px] text-neon-orange font-medium">3 modelos en nivel mínimo</span>
        </GlassCard>

        <GlassCard accent="gold" className="p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-neon-green uppercase">Auditoría & Logs</span>
            <FileCheck className="w-5 h-5 text-neon-green" />
          </div>
          <div className="text-3xl font-extrabold text-white mb-1">99.9%</div>
          <span className="text-[11px] text-gray-400 font-medium">Sin incidentes de integridad</span>
        </GlassCard>
      </div>

      {/* MÓDULOS DE ADMINISTRACIÓN */}
      <h2 className="text-lg font-bold text-white mb-6">Módulos de Gestión Administrativa</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard accent="cyan" className="p-6">
          <h3 className="font-bold text-white text-base mb-2">Inventario & Kardex</h3>
          <p className="text-xs text-gray-400 mb-6">
            Control de altas, salidas por venta, mermas y ajustes de instrumentos con registro de folio.
          </p>
          <Link to="/catalogo" className="text-xs text-neon-cyan hover:underline flex items-center gap-1 font-medium">
            <span>Ver Catálogo Activo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </GlassCard>

        <GlassCard accent="pink" className="p-6">
          <h3 className="font-bold text-white text-base mb-2">Talleres & Aulas</h3>
          <p className="text-xs text-gray-400 mb-6">
            Configuración de cupos, asignación de aulas físicas con tratamiento acústico y horarios semanales.
          </p>
          <Link to="/academia/talleres" className="text-xs text-neon-pink hover:underline flex items-center gap-1 font-medium">
            <span>Gestionar Talleres</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </GlassCard>

        <GlassCard accent="gold" className="p-6">
          <h3 className="font-bold text-white text-base mb-2">Historial de Ventas</h3>
          <p className="text-xs text-gray-400 mb-6">
            Consulta de ventas con desglose del 16% de IVA y métodos de pago aprobados.
          </p>
          <Link to="/mis-compras" className="text-xs text-neon-green hover:underline flex items-center gap-1 font-medium">
            <span>Revisar Ventas Generales</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </GlassCard>
      </div>
    </div>
  );
};
