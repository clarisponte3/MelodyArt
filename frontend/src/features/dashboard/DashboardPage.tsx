import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import apiClient from '../../api/apiClient';
import {
  Music,
  ShoppingBag,
  CreditCard,
  Calendar,
  BookOpen,
  User,
  LayoutDashboard,
  ChevronRight,
} from 'lucide-react';
import { InscripcionResponseDTO, SpringPage } from '../../types';

const SkeletonCard: React.FC = () => (
  <div className="glass-panel rounded-2xl p-6 animate-pulse">
    <div className="h-4 bg-white/10 rounded w-1/2 mb-4" />
    <div className="h-8 bg-white/10 rounded w-1/3 mb-2" />
    <div className="h-3 bg-white/5 rounded w-2/3" />
  </div>
);

export const DashboardPage: React.FC = () => {
  const { user } = useAuthStore();
  const [inscripciones, setInscripciones] = useState<InscripcionResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalInscripciones, setTotalInscripciones] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await apiClient.get<SpringPage<InscripcionResponseDTO>>(
          '/api/inscripciones?page=0&size=5&sort=fechaInscripcion,desc'
        );
        if (data && data.content) {
          setInscripciones(data.content);
          setTotalInscripciones(data.totalElements);
        }
      } catch {
        // Fallo silencioso — el interceptor muestra el toast
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const proximaClase = inscripciones.find((i) => i.estado === 'ACTIVA');

  return (
    <div className="container mx-auto px-6 py-12 flex flex-col gap-10">
      {/* HEADER */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3 mb-1">
          <LayoutDashboard className="w-6 h-6 text-neon-cyan" aria-hidden="true" />
          <span className="text-xs font-semibold text-neon-cyan uppercase tracking-widest">
            Portal del Alumno
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          ¡Bienvenido,{' '}
          <span className="neon-text-cyan">{user?.nombre ?? 'Alumno'}</span>!
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          {user?.correo} &nbsp;·&nbsp; Sesión activa
        </p>
      </div>

      {/* KPI CARDS */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* KPI 1: Inscripciones */}
          <div className="glass-panel rounded-2xl p-6 border border-neon-pink/20 hover:border-neon-pink/40 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2.5 rounded-xl bg-neon-pink/10 border border-neon-pink/30">
                <Music className="w-5 h-5 text-neon-pink" aria-hidden="true" />
              </div>
              <span className="text-xs text-gray-500 uppercase tracking-wider">Inscripciones</span>
            </div>
            <p className="text-3xl font-bold text-white font-mono">{totalInscripciones}</p>
            <p className="text-xs text-gray-400 mt-1">Talleres activos inscritos</p>
            {totalInscripciones === 0 && (
              <Link
                to="/academia/talleres"
                className="mt-3 inline-flex items-center gap-1 text-xs text-neon-cyan hover:underline"
              >
                Ver talleres disponibles <ChevronRight className="w-3 h-3" />
              </Link>
            )}
          </div>

          {/* KPI 2: Próxima Clase */}
          <div className="glass-panel rounded-2xl p-6 border border-neon-yellow/20 hover:border-neon-yellow/40 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2.5 rounded-xl bg-neon-yellow/10 border border-neon-yellow/30">
                <Calendar className="w-5 h-5 text-neon-yellow" aria-hidden="true" />
              </div>
              <span className="text-xs text-gray-500 uppercase tracking-wider">Próxima Clase</span>
            </div>
            {proximaClase ? (
              <>
                <p className="text-base font-semibold text-white truncate">
                  {proximaClase.clase.nombre}
                </p>
                <p className="text-xs text-gray-400 mt-1">{proximaClase.clase.horario}</p>
              </>
            ) : (
              <>
                <p className="text-sm font-semibold text-gray-400">Sin clases próximas</p>
                <p className="text-xs text-gray-500 mt-1">No hay inscripciones activas</p>
              </>
            )}
          </div>

          {/* KPI 3: Estado de Cuenta */}
          <div className="glass-panel rounded-2xl p-6 border border-neon-green/20 hover:border-neon-green/40 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2.5 rounded-xl bg-neon-green/10 border border-neon-green/30">
                <CreditCard className="w-5 h-5 text-neon-green" aria-hidden="true" />
              </div>
              <span className="text-xs text-gray-500 uppercase tracking-wider">Estado de Cuenta</span>
            </div>
            <p className="text-3xl font-bold text-white font-mono">$0.00</p>
            <p className="text-xs text-gray-400 mt-1">Sin saldos pendientes</p>
            <Link
              to="/mis-clases"
              className="mt-3 inline-flex items-center gap-1 text-xs text-neon-green hover:underline"
            >
              Ver historial <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      )}

      {/* ACCESOS RÁPIDOS */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Accesos Rápidos</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/mis-compras">
            <div className="glass-panel rounded-2xl p-5 flex flex-col items-center gap-3 border border-white/5 hover:border-neon-pink/30 hover:bg-neon-pink/5 transition-all group cursor-pointer">
              <ShoppingBag className="w-7 h-7 text-neon-pink group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold text-gray-300 text-center">Mis Compras</span>
            </div>
          </Link>
          <Link to="/mis-clases">
            <div className="glass-panel rounded-2xl p-5 flex flex-col items-center gap-3 border border-white/5 hover:border-neon-cyan/30 hover:bg-neon-cyan/5 transition-all group cursor-pointer">
              <BookOpen className="w-7 h-7 text-neon-cyan group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold text-gray-300 text-center">Mis Clases</span>
            </div>
          </Link>
          <Link to="/perfil">
            <div className="glass-panel rounded-2xl p-5 flex flex-col items-center gap-3 border border-white/5 hover:border-neon-yellow/30 hover:bg-neon-yellow/5 transition-all group cursor-pointer">
              <User className="w-7 h-7 text-neon-yellow group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold text-gray-300 text-center">Mi Perfil & ARCO</span>
            </div>
          </Link>
          <Link to="/academia/talleres">
            <div className="glass-panel rounded-2xl p-5 flex flex-col items-center gap-3 border border-white/5 hover:border-neon-green/30 hover:bg-neon-green/5 transition-all group cursor-pointer">
              <Music className="w-7 h-7 text-neon-green group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold text-gray-300 text-center">Explorar Talleres</span>
            </div>
          </Link>
        </div>
      </div>

      {/* INSCRIPCIONES RECIENTES */}
      {!loading && inscripciones.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Inscripciones Recientes</h2>
            <Link to="/mis-clases" className="text-xs text-neon-cyan hover:underline flex items-center gap-1">
              Ver todas <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="glass-table-container">
            <table className="w-full text-sm" role="table" aria-label="Inscripciones recientes">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Taller</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden md:table-cell">Horario</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Estado</th>
                </tr>
              </thead>
              <tbody>
                {inscripciones.map((ins) => (
                  <tr key={ins.idInscripcion} className="glass-table-row">
                    <td className="px-4 py-3 text-white font-medium">{ins.clase.nombre}</td>
                    <td className="px-4 py-3 text-gray-400 hidden md:table-cell">{ins.clase.horario}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                          ins.estado === 'ACTIVA'
                            ? 'bg-neon-green/10 text-neon-green border border-neon-green/30'
                            : 'bg-red-500/10 text-red-400 border border-red-500/30'
                        }`}
                      >
                        {ins.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
