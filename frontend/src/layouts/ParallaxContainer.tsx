import React, { useEffect, useState } from 'react';
import { Disc, Radio, Sparkles, Headphones, CloudLightning } from 'lucide-react';

/**
 * Contenedor de Parallax Scrolling Storytelling
 * 5 Etapas de la Historia del Sonido:
 * 1. Vinilos (0% - 20% scroll)
 * 2. Cintas Magnéticas / Casettes (20% - 40% scroll)
 * 3. Discos Compactos / CDs (40% - 60% scroll)
 * 4. Ecualizadores MP3 (60% - 80% scroll)
 * 5. Cloud Streaming & Alta Fidelidad (80% - 100% scroll)
 */

interface EraConfig {
  id: number;
  nombre: string;
  subtitulo: string;
  bg: string;
  color: string;
  icon: React.ReactNode;
}

const ERAS: EraConfig[] = [
  {
    id: 1,
    nombre: '1. Vinilo Analógico',
    subtitulo: 'Surcos dorados & calidez acústica (1950s - 1970s)',
    bg: 'radial-gradient(circle at 25% 25%, rgba(245, 158, 11, 0.28) 0%, transparent 45%), radial-gradient(circle at 75% 75%, rgba(217, 119, 6, 0.20) 0%, transparent 40%), repeating-radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.06) 0px, rgba(245, 158, 11, 0.06) 1px, transparent 2px, transparent 18px), linear-gradient(180deg, #070502 0%, #120b04 50%, #050505 100%)',
    color: 'text-amber-400 border-amber-400/40 bg-amber-400/10',
    icon: <Disc className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />,
  },
  {
    id: 2,
    nombre: '2. Cinta Magnética (Casette)',
    subtitulo: 'Grabación en casete & portabilidad estéreo (1970s - 1980s)',
    bg: 'radial-gradient(circle at 75% 30%, rgba(0, 243, 255, 0.26) 0%, transparent 48%), radial-gradient(circle at 25% 70%, rgba(6, 182, 212, 0.20) 0%, transparent 42%), repeating-linear-gradient(45deg, rgba(0, 243, 255, 0.035) 0px, rgba(0, 243, 255, 0.035) 2px, transparent 2px, transparent 14px), linear-gradient(180deg, #02070a 0%, #04141c 50%, #050505 100%)',
    color: 'text-neon-cyan border-neon-cyan/40 bg-neon-cyan/10',
    icon: <Radio className="w-3.5 h-3.5 text-neon-cyan" />,
  },
  {
    id: 3,
    nombre: '3. Disco Compacto (CD)',
    subtitulo: 'Audio óptico digital & prisma iridiscente (1980s - 1990s)',
    bg: 'radial-gradient(circle at 50% 45%, rgba(255, 0, 255, 0.26) 0%, rgba(168, 85, 247, 0.20) 30%, rgba(0, 243, 255, 0.15) 55%, transparent 70%), radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.22) 0%, transparent 40%), radial-gradient(circle at 20% 80%, rgba(147, 51, 234, 0.20) 0%, transparent 45%), linear-gradient(180deg, #08020a 0%, #15061c 50%, #050505 100%)',
    color: 'text-neon-pink border-neon-pink/40 bg-neon-pink/10',
    icon: <Sparkles className="w-3.5 h-3.5 text-neon-pink animate-pulse" />,
  },
  {
    id: 4,
    nombre: '4. Ecualizador MP3',
    subtitulo: 'Música de bolsillo, frecuencias & compresión (1990s - 2010s)',
    bg: 'radial-gradient(circle at 35% 65%, rgba(0, 255, 102, 0.26) 0%, transparent 48%), radial-gradient(circle at 65% 25%, rgba(16, 185, 129, 0.20) 0%, transparent 42%), repeating-linear-gradient(0deg, rgba(0, 255, 102, 0.05) 0px, rgba(0, 255, 102, 0.05) 3px, transparent 3px, transparent 15px), linear-gradient(180deg, #020a04 0%, #051a0b 50%, #050505 100%)',
    color: 'text-neon-green border-neon-green/40 bg-neon-green/10',
    icon: <Headphones className="w-3.5 h-3.5 text-neon-green" />,
  },
  {
    id: 5,
    nombre: '5. Cloud Streaming',
    subtitulo: 'Sonido sin límites en la nube & audio Hi-Fi espacial (Hoy)',
    bg: 'radial-gradient(circle at 50% 15%, rgba(0, 243, 255, 0.25) 0%, transparent 50%), radial-gradient(circle at 50% 85%, rgba(255, 0, 255, 0.28) 0%, transparent 60%), radial-gradient(circle at 80% 50%, rgba(124, 58, 237, 0.22) 0%, transparent 45%), linear-gradient(180deg, #04020a 0%, #10061e 50%, #050505 100%)',
    color: 'text-purple-300 border-purple-400/40 bg-purple-500/10',
    icon: <CloudLightning className="w-3.5 h-3.5 text-purple-300" />,
  },
];

export const ParallaxContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [eraIndex, setEraIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalScroll > 0 ? Math.min(Math.max(scrollY / totalScroll, 0), 1) : 0;

      if (progress < 0.2) {
        setEraIndex(0);
      } else if (progress < 0.4) {
        setEraIndex(1);
      } else if (progress < 0.6) {
        setEraIndex(2);
      } else if (progress < 0.8) {
        setEraIndex(3);
      } else {
        setEraIndex(4);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeEra = ERAS[eraIndex];

  return (
    <div className="relative min-h-screen text-white bg-transparent">
      {/* =========================================================================
          DIV GLOBAL FIJO DE FONDO PARALLAX (z-index: -10, transition-all duration-1000)
          ========================================================================= */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -10,
          backgroundImage: activeEra.bg,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
        className="transition-all duration-1000 ease-in-out pointer-events-none"
        aria-hidden="true"
      />

      {/* INDICADOR AMBIENTAL DISCRETO DE LA ERA SONORA EN CURSO */}
      <div className="fixed bottom-5 right-5 z-30 pointer-events-none hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border glass-panel backdrop-blur-md transition-all duration-700 shadow-2xl">
        {activeEra.icon}
        <div className="flex flex-col">
          <span className="text-[11px] font-bold tracking-wider text-white">
            {activeEra.nombre}
          </span>
          <span className="text-[9px] text-gray-400">
            {activeEra.subtitulo}
          </span>
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL POR ENCIMA DEL FONDO MUTANTE */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default ParallaxContainer;
