import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AcademiaService } from '../../api/academia.service';
import { ClaseMusicalResponseDTO } from '../../types';
import { useAuthStore } from '../../store/authStore';
import { showToast } from '../../store/notificationStore';
import { GlassCard } from '../../components/ui/GlassCard';
import { NeonButton } from '../../components/ui/NeonButton';
import { Clock, Users, DollarSign, Sparkles, CheckCircle2, Loader2, Music } from 'lucide-react';

const TALLERES_FALLBACK: ClaseMusicalResponseDTO[] = [
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
    descripcion: 'Postura, digitación avanzada y análisis armónico con pianos de cola calibrados.',
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
];

export const InscripcionPage: React.FC = () => {
  const { user } = useAuthStore();
  const [clases, setClases] = useState<ClaseMusicalResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [inscribing, setInscribing] = useState<number | null>(null);
  const [inscritoIds, setInscritoIds] = useState<number[]>([]);

  useEffect(() => {
    const fetchClases = async () => {
      try {
        const data = await AcademiaService.getClases();
        setClases(Array.isArray(data) && data.length > 0 ? data : TALLERES_FALLBACK);
      } catch {
        setClases(TALLERES_FALLBACK);
      } finally {
        setLoading(false);
      }
    };

    // Cargar inscripciones existentes del alumno para marcar las ya inscritas
    const fetchInscripciones = async () => {
      try {
        const data = await AcademiaService.getInscripciones();
        if (Array.isArray(data)) {
          setInscritoIds(data.map((i) => i.idClase ?? i.idClaseMusical ?? 0));
        }
      } catch {
        // Sin conexión — ignorar
      }
    };

    fetchClases();
    fetchInscripciones();
  }, []);

  const handleInscribir = async (clase: ClaseMusicalResponseDTO) => {
    if (!user) return;
    setInscribing(clase.idClaseMusical);

    try {
      await AcademiaService.inscribirAlumno({
        idUsuarioAlumno: user.userId,
        idClase: clase.idClaseMusical,
        costoAcordado: clase.costo,
        estado: 'ACTIVA',
      });

      setInscritoIds((prev) => [...prev, clase.idClaseMusical]);
      showToast(
        'success',
        `¡Te has inscrito exitosamente al "${clase.nombre}"! Revisa tu portal en Mis Clases.`,
        'Inscripción Confirmada'
      );
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'No fue posible procesar la inscripción.';
      showToast('error', msg, 'Error de Inscripción');
    } finally {
      setInscribing(null);
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      {/* ENCABEZADO */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-cyan/40 bg-neon-cyan/10 text-neon-cyan text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Portal del Alumno · Inscripción a Talleres</span>
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">
          Talleres Disponibles en <span className="neon-text-cyan">SonoraSync</span>
        </h1>
        <p className="text-xs text-gray-400 max-w-xl mx-auto">
          Selecciona el taller al que deseas inscribirte. Una vez confirmada, tu inscripción aparecerá
          automáticamente en tu sección de{' '}
          <Link to="/mis-clases" className="text-neon-cyan hover:underline">
            Mis Clases
          </Link>
          .
        </p>
      </div>

      {/* SPINNER DE CARGA */}
      {loading ? (
        <div className="flex justify-center items-center py-24">
          <Loader2 className="w-10 h-10 text-neon-cyan animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {clases.map((clase) => {
            const yaInscrito = inscritoIds.includes(clase.idClaseMusical);
            const isCurrentlyInscribing = inscribing === clase.idClaseMusical;

            return (
              <GlassCard key={clase.idClaseMusical} accent="cyan" className="p-6 flex flex-col justify-between">
                <div>
                  {/* HEADER TARJETA */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-neon-cyan/10 border border-neon-cyan/30">
                        <Music className="w-4 h-4 text-neon-cyan" />
                      </div>
                      <span className="text-xs font-mono text-neon-cyan font-bold">
                        Taller #{clase.idClaseMusical}
                      </span>
                    </div>
                    {yaInscrito ? (
                      <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-neon-green/20 text-neon-green border border-neon-green/30">
                        <CheckCircle2 className="w-3 h-3" />
                        INSCRITO
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30">
                        DISPONIBLE
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{clase.nombre}</h3>
                  <p className="text-xs text-gray-300 leading-relaxed mb-5">{clase.descripcion}</p>

                  <div className="space-y-2 text-xs text-gray-400 mb-5">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-neon-yellow" />
                      <span>{clase.horario}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-neon-pink" />
                      <span>Cupo máximo: {clase.capacidadMaxima} alumnos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-neon-green" />
                      <span className="font-semibold text-white">
                        Colegiatura: ${Number(clase.costo).toLocaleString('es-MX')} MXN / mes
                      </span>
                    </div>
                  </div>
                </div>

                {/* CTA INSCRIPCIÓN */}
                <div className="pt-4 border-t border-white/10">
                  {yaInscrito ? (
                    <Link to="/mis-clases">
                      <button className="w-full py-2.5 rounded-xl border border-neon-green/40 text-neon-green text-xs font-semibold hover:bg-neon-green/10 transition-colors flex items-center justify-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        Ver en Mis Clases
                      </button>
                    </Link>
                  ) : (
                    <NeonButton
                      variant="cyan"
                      disabled={isCurrentlyInscribing}
                      onClick={() => handleInscribir(clase)}
                      className="w-full py-2.5 justify-center text-xs"
                    >
                      {isCurrentlyInscribing ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Procesando inscripción...
                        </span>
                      ) : (
                        'Inscribirme a este Taller'
                      )}
                    </NeonButton>
                  )}
                </div>
              </GlassCard>
            );
          })}
        </div>
      )}

      {/* NOTA INFORMATIVA */}
      <div className="mt-10 max-w-2xl mx-auto p-4 rounded-xl border border-white/10 bg-white/5 text-xs text-gray-400 text-center">
        <strong className="text-white">Importante:</strong> Las inscripciones están sujetas a disponibilidad de
        cupo. Una vez confirmada, el cobro de la colegiatura mensual se gestiona a través del módulo de{' '}
        <strong className="text-neon-pink">Estados de Cuenta</strong>.
      </div>
    </div>
  );
};
