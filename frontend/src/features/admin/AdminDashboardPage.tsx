import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GlassCard } from '../../components/ui/GlassCard';
import {
  Shield,
  Users,
  DollarSign,
  Package,
  ArrowRight,
  TrendingUp,
  BookOpen,
  ClipboardList,
  FileText,
  AlertTriangle,
  BarChart2,
  Warehouse,
} from 'lucide-react';
import apiClient from '../../api/apiClient';
import type { SpringPage, VentaResponseDTO } from '../../types';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface KpiState {
  ventasHoy: number | null;
  alumnosActivos: number | null;
  inscripcionesActivas: number | null;
  stockBajo: number | null;
}

// ---------------------------------------------------------------------------
// Skeleton helpers
// ---------------------------------------------------------------------------
const KpiSkeleton: React.FC = () => (
  <div className="glass-panel rounded-xl p-6 animate-pulse">
    <div className="h-3 bg-white/10 rounded w-24 mb-4" />
    <div className="h-8 bg-white/10 rounded w-16 mb-2" />
    <div className="h-3 bg-white/10 rounded w-20" />
  </div>
);

const TableSkeleton: React.FC = () => (
  <div className="space-y-2 animate-pulse">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="h-10 bg-white/5 rounded" />
    ))}
  </div>
);

// ---------------------------------------------------------------------------
// Estado badge
// ---------------------------------------------------------------------------
const EstadoBadge: React.FC<{ estado: string }> = ({ estado }) => {
  const map: Record<string, string> = {
    COMPLETADA: 'bg-green-500/20 text-green-400 border-green-500/30',
    PENDIENTE:  'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    CANCELADA:  'bg-red-500/20 text-red-400 border-red-500/30',
  };
  const cls = map[estado] ?? 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  return (
    <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${cls}`}>
      {estado}
    </span>
  );
};

// ---------------------------------------------------------------------------
// Quick-nav items
// ---------------------------------------------------------------------------
interface QuickLink {
  label: string;
  to: string;
  icon: React.ReactNode;
  color: string;
}

const quickLinks: QuickLink[] = [
  { label: 'Inventario & Kardex',  to: '/admin/inventario',      icon: <Warehouse className="w-5 h-5" />,    color: 'text-neon-cyan' },
  { label: 'Usuarios',             to: '/admin/usuarios',         icon: <Users className="w-5 h-5" />,        color: 'text-neon-green' },
  { label: 'Pase de Lista',        to: '/admin/pase-lista',       icon: <ClipboardList className="w-5 h-5" />, color: 'text-neon-pink' },
  { label: 'Proveedores',          to: '/admin/proveedores',      icon: <Package className="w-5 h-5" />,      color: 'text-neon-yellow' },
  { label: 'Estados de Cuenta',    to: '/admin/estados-cuenta',   icon: <FileText className="w-5 h-5" />,     color: 'text-neon-orange' },
  { label: 'Logs de Auditoría',    to: '/admin/logs',             icon: <BookOpen className="w-5 h-5" />,     color: 'text-orange-400' },
];

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------
export const AdminDashboardPage: React.FC = () => {
  const [kpi, setKpi] = useState<KpiState>({
    ventasHoy: null,
    alumnosActivos: null,
    inscripcionesActivas: null,
    stockBajo: null,
  });
  const [kpiLoading, setKpiLoading] = useState(true);

  const [recentSales, setRecentSales] = useState<VentaResponseDTO[]>([]);
  const [salesLoading, setSalesLoading] = useState(true);

  useEffect(() => {
    const fetchKpis = async () => {
      try {
        const [ventasRes, usuariosRes, inscripcionesRes, productosRes] = await Promise.all([
          apiClient.get<SpringPage<VentaResponseDTO>>('/api/ventas?page=0&size=1'),
          apiClient.get<SpringPage<unknown>>('/api/usuarios?page=0&size=1'),
          apiClient.get<SpringPage<unknown>>('/api/inscripciones?page=0&size=1'),
          apiClient.get<SpringPage<unknown>>('/api/productos?page=0&size=1'),
        ]);
        setKpi({
          ventasHoy: ventasRes.data.totalElements,
          alumnosActivos: usuariosRes.data.totalElements,
          inscripcionesActivas: inscripcionesRes.data.totalElements,
          stockBajo: productosRes.data.totalElements,
        });
      } catch {
        // Errors handled by apiClient interceptors
      } finally {
        setKpiLoading(false);
      }
    };

    const fetchSales = async () => {
      try {
        const res = await apiClient.get<SpringPage<VentaResponseDTO>>(
          '/api/ventas?page=0&size=5&sort=fechaHora,desc'
        );
        setRecentSales(res.data.content);
      } catch {
        // Errors handled by apiClient interceptors
      } finally {
        setSalesLoading(false);
      }
    };

    fetchKpis();
    fetchSales();
  }, []);

  return (
    <div className="container mx-auto px-6 py-12">
      {/* HEADER */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-green/40 bg-neon-green/10 text-neon-green text-xs font-semibold uppercase tracking-wider mb-3">
          <Shield className="w-3.5 h-3.5" />
          <span>Dirección & Gobernanza RBAC</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white neon-text-green mb-1">
          Panel Administrativo
        </h1>
        <p className="text-sm text-gray-400">
          SonoraSync Enterprise — Visión unificada de la academia, inventario, ventas y auditoría.
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {kpiLoading ? (
          <>
            <KpiSkeleton /><KpiSkeleton /><KpiSkeleton /><KpiSkeleton />
          </>
        ) : (
          <>
            {/* Ventas Hoy */}
            <GlassCard accent="gold" className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-neon-green uppercase">Ventas Hoy</span>
                <DollarSign className="w-5 h-5 text-neon-green" />
              </div>
              <div className="text-3xl font-extrabold text-white mb-1">
                {kpi.ventasHoy ?? '—'}
              </div>
              <span className="text-[11px] text-neon-green flex items-center gap-1 font-medium">
                <TrendingUp className="w-3.5 h-3.5" /> Total de ventas
              </span>
            </GlassCard>

            {/* Alumnos Activos */}
            <GlassCard accent="cyan" className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-neon-cyan uppercase">Alumnos Activos</span>
                <Users className="w-5 h-5 text-neon-cyan" />
              </div>
              <div className="text-3xl font-extrabold text-white mb-1">
                {kpi.alumnosActivos ?? '—'}
              </div>
              <span className="text-[11px] text-gray-400 font-medium">Total de usuarios</span>
            </GlassCard>

            {/* Inscripciones */}
            <GlassCard accent="pink" className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-neon-pink uppercase">Inscripciones Activas</span>
                <BookOpen className="w-5 h-5 text-neon-pink" />
              </div>
              <div className="text-3xl font-extrabold text-white mb-1">
                {kpi.inscripcionesActivas ?? '—'}
              </div>
              <span className="text-[11px] text-gray-400 font-medium">Total en sistema</span>
            </GlassCard>

            {/* Stock Bajo */}
            <GlassCard accent="gold" className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-neon-yellow uppercase">Stock (Productos)</span>
                <Package className="w-5 h-5 text-neon-yellow" />
              </div>
              <div className="text-3xl font-extrabold text-white mb-1">
                {kpi.stockBajo ?? '—'}
              </div>
              {(kpi.stockBajo ?? 0) > 0 && (
                <span className="text-[11px] text-orange-400 flex items-center gap-1 font-medium">
                  <AlertTriangle className="w-3.5 h-3.5" /> Revisar stock mínimo
                </span>
              )}
            </GlassCard>
          </>
        )}
      </div>

      {/* RECENT SALES TABLE */}
      <section className="mb-12">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <BarChart2 className="w-5 h-5 text-neon-cyan" />
          Ventas Recientes
        </h2>
        <div className="glass-table-container">
          {salesLoading ? (
            <div className="p-6">
              <TableSkeleton />
            </div>
          ) : recentSales.length === 0 ? (
            <div className="p-10 text-center text-gray-400 text-sm">
              No hay ventas registradas aún.
            </div>
          ) : (
            <table className="w-full text-sm" aria-label="Ventas recientes">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Folio</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Cliente</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Monto (IVA inc.)</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Método</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Estado</th>
                </tr>
              </thead>
              <tbody>
                {recentSales.map((v) => (
                  <tr key={v.idVenta} className="glass-table-row">
                    <td className="px-4 py-3 font-mono text-neon-cyan text-xs">{v.folio}</td>
                    <td className="px-4 py-3 text-gray-300">
                      {v.cliente ? `${v.cliente.nombre} ${v.cliente.apellidos}` : '—'}
                    </td>
                    <td className="px-4 py-3 text-gray-300 font-medium">
                      {/* Backend does not return total in this endpoint; show IVA rate */}
                      IVA {v.tasaIva}%
                    </td>
                    <td className="px-4 py-3 text-gray-300">{v.metodoPago.nombre}</td>
                    <td className="px-4 py-3">
                      <EstadoBadge estado={v.estado} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      {/* QUICK NAV GRID */}
      <section>
        <h2 className="text-lg font-bold text-white mb-4">Acceso Rápido</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {quickLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="glass-panel rounded-xl p-5 flex items-center gap-3 hover:bg-white/5 transition-all duration-300 group"
            >
              <span className={`${link.color} group-hover:scale-110 transition-transform`}>
                {link.icon}
              </span>
              <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                {link.label}
              </span>
              <ArrowRight className="w-4 h-4 text-gray-600 ml-auto group-hover:text-gray-300 transition-colors" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
