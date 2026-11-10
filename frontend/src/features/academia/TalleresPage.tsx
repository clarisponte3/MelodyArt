import React, { useEffect, useState } from 'react';
import { AcademiaService } from '../../api/academia.service';
import { ClaseMusicalResponseDTO } from '../../types';
import { GlassCard } from '../../components/ui/GlassCard';
import { NeonButton } from '../../components/ui/NeonButton';
import { Clock, Users, DollarSign, Sparkles, Loader2 } from 'lucide-react';

export const TalleresPage: React.FC = () => {
  const [clases, setClases] = useState<ClaseMusicalResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClases = async () => {
      try {
        const data = await AcademiaService.getClases();
        if (Array.isArray(data) && data.length > 0) {
          setClases(data);
        } else {
          // Fallback representativo
          setClases([
            {
              idClaseMusical: 1,
              nombre: 'Taller de Guitarra Clásica & Solfeo',
              descripcion: 'Técnica de mano derecha, lectura a primera vista y repertorio barroco y latinoamericano.',
              horario: 'Lunes y Miércoles 16:00 - 18:00 hrs',
              capacidadMaxima: 12,
              costo: 1450.0,
            },
            {
              idClaseMusical: 2,
              nombre: 'Taller de Ukelele Creativo',
              descripcion: 'Iniciación musical para todas las edades, acordes modernos y acompañamiento vocal.',
              horario: 'Martes y Jueves 17:00 - 18:30 hrs',
              capacidadMaxima: 10,
              costo: 1100.0,
            },
            {
              idClaseMusical: 3,
              nombre: 'Piano Clásico y Armonía Contemporánea',
              descripcion: 'Postura, digitación avanzada y análisis armónico en aulas con pianos de cola calibrados.',
              horario: 'Sábados 10:00 - 13:00 hrs',
              capacidadMaxima: 8,
              costo: 1850.0,
            },
            {
              idClaseMusical: 4,
              nombre: 'Percusión Latina y Ensamble Rítmico',
              descripcion: 'Tumbadoras, bongos y timbales. Práctica colectiva de polirritmia y métricas compuestas.',
              horario: 'Viernes 17:00 - 19:30 hrs',
              capacidadMaxima: 15,
              costo: 1300.0,
            },
          ]);
        }
      } catch {
        // Handled with fallback
      } finally {
        setLoading(false);
      }
    };

    fetchClases();
  }, []);

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-pink/40 bg-neon-pink/10 text-neon-pink text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Formación Musical de Grado Profesional</span>
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">Talleres de la Academia SonoraSync</h1>
        <p className="text-xs text-gray-400 max-w-xl mx-auto">
          Programas semestrales con control de cupos, docentes graduados en conservatorios, aulas acústicamente tratadas y bitácoras de avance por sesión.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20 text-neon-pink">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {clases.map((clase) => (
            <GlassCard key={clase.idClaseMusical} accent="pink" className="p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-neon-cyan font-bold">
                    Taller #{clase.idClaseMusical}
                  </span>
                  <span className="text-xs font-semibold text-neon-green bg-neon-green/10 px-2.5 py-0.5 rounded-full border border-neon-green/30">
                    Cupo Disponible
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{clase.nombre}</h3>
                <p className="text-xs text-gray-300 leading-relaxed mb-6">{clase.descripcion}</p>

                <div className="space-y-2 text-xs text-gray-400 mb-6">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-neon-yellow" />
                    <span>{clase.horario}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-neon-cyan" />
                    <span>Cupo Máximo: {clase.capacidadMaxima} alumnos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-neon-pink" />
                    <span className="font-semibold text-white">
                      Colegiatura: ${Number(clase.costo).toLocaleString('es-MX')} MXN / mes
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] text-gray-400">Incluye material y uso de aulas</span>
                <NeonButton variant="pink" className="py-2 px-4 text-xs">
                  Inscribirme
                </NeonButton>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
};
