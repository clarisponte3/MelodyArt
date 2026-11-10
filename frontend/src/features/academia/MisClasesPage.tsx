import React, { useState } from 'react';
import { GlassCard } from '../../components/ui/GlassCard';
import { Music, Calendar, BookOpen } from 'lucide-react';

export const MisClasesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'inscripciones' | 'asistencia' | 'bitacoras'>('inscripciones');

  return (
    <div className="container mx-auto px-6 py-12 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-1">Portal del Alumno: Mis Clases</h1>
        <p className="text-xs text-gray-400">
          Supervisa tus talleres musicales, calendario de clases, asistencias y bitácoras pedagógicas.
        </p>
      </div>

      {/* TABS */}
      <div className="flex border-b border-white/10 gap-8 mb-8">
        <button
          onClick={() => setActiveTab('inscripciones')}
          className={`pb-3 text-sm font-semibold transition-colors relative flex items-center gap-2 ${
            activeTab === 'inscripciones' ? 'text-neon-cyan' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Music className="w-4 h-4" />
          <span>Mis Inscripciones</span>
          {activeTab === 'inscripciones' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon-cyan shadow-neon-cyan" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('asistencia')}
          className={`pb-3 text-sm font-semibold transition-colors relative flex items-center gap-2 ${
            activeTab === 'asistencia' ? 'text-neon-pink' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Control de Asistencia</span>
          {activeTab === 'asistencia' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon-pink shadow-neon-pink" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('bitacoras')}
          className={`pb-3 text-sm font-semibold transition-colors relative flex items-center gap-2 ${
            activeTab === 'bitacoras' ? 'text-neon-green' : 'text-gray-400 hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Bitácoras de Progreso</span>
          {activeTab === 'bitacoras' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon-green shadow-neon-green" />
          )}
        </button>
      </div>

      {/* CONTENIDO TAB 1: INSCRIPCIONES */}
      {activeTab === 'inscripciones' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassCard accent="cyan" className="p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-neon-cyan">Taller #1</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-neon-green/20 text-neon-green border border-neon-green/30">
                ACTIVA
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Taller de Guitarra Clásica & Solfeo</h3>
            <p className="text-xs text-gray-300 mb-4">Profesor Asignado: Lic. Carlos Santana</p>
            <div className="text-xs text-gray-400 space-y-1 mb-4">
              <div>Horario: Lunes y Miércoles 16:00 - 18:00 hrs</div>
              <div>Aula: Aula 102 (Pianos y Cuerdas)</div>
            </div>
            <div className="pt-3 border-t border-white/10 flex justify-between items-center text-xs">
              <span className="text-gray-400">Costo Mensual:</span>
              <span className="text-neon-pink font-bold font-mono">$1,450.00 MXN</span>
            </div>
          </GlassCard>

          <GlassCard accent="pink" className="p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-neon-pink">Taller #2</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-neon-green/20 text-neon-green border border-neon-green/30">
                ACTIVA
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Taller de Ukelele Creativo</h3>
            <p className="text-xs text-gray-300 mb-4">Profesora Asignada: Mtra. Ana Victoria</p>
            <div className="text-xs text-gray-400 space-y-1 mb-4">
              <div>Horario: Martes y Jueves 17:00 - 18:30 hrs</div>
              <div>Aula: Aula 104 (Iniciación Acústica)</div>
            </div>
            <div className="pt-3 border-t border-white/10 flex justify-between items-center text-xs">
              <span className="text-gray-400">Costo Mensual:</span>
              <span className="text-neon-pink font-bold font-mono">$1,100.00 MXN</span>
            </div>
          </GlassCard>
        </div>
      )}

      {/* CONTENIDO TAB 2: ASISTENCIA */}
      {activeTab === 'asistencia' && (
        <div className="glass-table-container">
          <table className="w-full text-left text-xs">
            <thead className="bg-dark-900/80 border-b border-white/10 text-neon-pink uppercase text-[11px]">
              <tr>
                <th className="py-4 px-6">Fecha de Clase</th>
                <th className="py-4 px-4">Taller Musical</th>
                <th className="py-4 px-4">Estado</th>
                <th className="py-4 px-6">Observaciones del Docente</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr className="glass-table-row">
                <td className="py-4 px-6 font-mono text-gray-300">2026-11-02</td>
                <td className="py-4 px-4 text-white font-medium">Guitarra Clásica</td>
                <td className="py-4 px-4">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-neon-green/20 text-neon-green border border-neon-green/30">
                    PRESENTE
                  </span>
                </td>
                <td className="py-4 px-6 text-gray-300">Puntual, presentó estudio de escalas mayores completas.</td>
              </tr>
              <tr className="glass-table-row">
                <td className="py-4 px-6 font-mono text-gray-300">2026-10-28</td>
                <td className="py-4 px-4 text-white font-medium">Guitarra Clásica</td>
                <td className="py-4 px-4">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-neon-green/20 text-neon-green border border-neon-green/30">
                    PRESENTE
                  </span>
                </td>
                <td className="py-4 px-6 text-gray-300">Excelente digitación en arpegios de mano derecha.</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* CONTENIDO TAB 3: BITÁCORAS */}
      {activeTab === 'bitacoras' && (
        <div className="space-y-4">
          <GlassCard accent="gold" className="p-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-neon-yellow font-mono">Sesión: 02 de Noviembre, 2026</span>
              <span className="text-xs text-gray-400">Taller de Guitarra Clásica</span>
            </div>
            <h4 className="text-base font-bold text-white mb-2">Tema Trabajado: Armónicos Naturales y Cejilla</h4>
            <p className="text-xs text-gray-300 mb-3 leading-relaxed">
              <strong>Comentarios Pedagógicos:</strong> Se repasó la posición del pulgar izquierdo en cambios de posición del traste 5 al 9. Muy buen avance rítmico.
            </p>
            <div className="p-3 rounded-lg bg-dark-900 border border-white/10 text-xs text-neon-green">
              <strong>Próxima Meta:</strong> Memorizar los compases 1 al 16 del Estudio en Mi menor de Tárrega.
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
};
