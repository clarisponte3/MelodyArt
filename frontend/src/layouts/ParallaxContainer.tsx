import React, { useEffect, useState } from 'react';

/**
 * Contenedor de Parallax Scrolling Storytelling
 * Evolución de la Música:
 * 1. Vinilos (0% - 20% scroll)
 * 2. Casetes Magnéticos (20% - 40% scroll)
 * 3. CDs Iridiscentes (40% - 60% scroll)
 * 4. Reproductores MP3 (60% - 80% scroll)
 * 5. Streaming & Cloud Waves (80% - 100% scroll)
 */
export const ParallaxContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = Math.min(Math.max(window.scrollY / totalScroll, 0), 1);
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Opacidades dinámicas según la era sonora
  const era1 = Math.max(0, 1 - scrollProgress * 3.5); // Vinilo (Hero)
  const era2 = Math.max(0, 1 - Math.abs(scrollProgress - 0.28) * 4); // Casete
  const era3 = Math.max(0, 1 - Math.abs(scrollProgress - 0.52) * 4); // CD Iridiscente
  const era4 = Math.max(0, 1 - Math.abs(scrollProgress - 0.76) * 4); // MP3 EQ
  const era5 = Math.max(0, (scrollProgress - 0.7) * 3.3); // Streaming

  return (
    <div className="relative min-h-screen bg-dark-950 text-white overflow-hidden">
      {/* CAPA DE FONDO FIJA: STORYTELLING SONORO */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Gradiente ambiental base */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950" />

        {/* ERA 1: VINILO Y SURCOS ANALÓGICOS (Hero) */}
        <div
          className="absolute inset-0 transition-opacity duration-700 ease-out"
          style={{ opacity: era1 }}
        >
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full border border-amber-500/10 shadow-[0_0_80px_rgba(245,158,11,0.08)] animate-[spin_60s_linear_infinite]" />
          <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full border border-amber-400/15" />
          <div className="absolute top-1/4 right-10 w-72 h-72 rounded-full border border-amber-600/10 shadow-[0_0_60px_rgba(217,119,6,0.06)]" />
        </div>

        {/* ERA 2: CASETES Y CINTAS MAGNÉTICAS */}
        <div
          className="absolute inset-0 transition-opacity duration-700 ease-out"
          style={{ opacity: era2 }}
        >
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[260px] rounded-2xl border border-neon-cyan/15 bg-cyan-950/5 transform -rotate-6 backdrop-blur-xs" />
          <div className="absolute top-1/3 right-1/4 w-36 h-36 rounded-full border-2 border-dashed border-neon-cyan/25 animate-[spin_20s_linear_infinite]" />
        </div>

        {/* ERA 3: DISCOS COMPACTOS (CDs) CON REFLEJOS IRIDISCENTES */}
        <div
          className="absolute inset-0 transition-opacity duration-700 ease-out"
          style={{ opacity: era3 }}
        >
          <div className="absolute top-1/2 left-1/3 w-80 h-80 rounded-full bg-gradient-to-tr from-purple-500/10 via-pink-500/10 to-cyan-500/10 blur-xl animate-pulse" />
          <div className="absolute top-1/2 right-1/3 w-96 h-96 rounded-full border border-purple-400/20 shadow-[0_0_50px_rgba(168,85,247,0.12)]" />
        </div>

        {/* ERA 4: REVOLUCIÓN MP3 Y ECUALIZADORES DIGITALES */}
        <div
          className="absolute inset-0 transition-opacity duration-700 ease-out"
          style={{ opacity: era4 }}
        >
          <div className="absolute bottom-1/4 left-10 flex items-end gap-2 opacity-15">
            <div className="w-4 h-32 bg-neon-green" />
            <div className="w-4 h-48 bg-neon-green" />
            <div className="w-4 h-24 bg-neon-green" />
            <div className="w-4 h-40 bg-neon-green" />
            <div className="w-4 h-56 bg-neon-green" />
            <div className="w-4 h-20 bg-neon-green" />
          </div>
          <div className="absolute bottom-1/3 right-16 w-52 h-64 rounded-2xl border border-neon-green/20 bg-green-950/10 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full border-2 border-neon-green/30" />
          </div>
        </div>

        {/* ERA 5: STREAMING EN LA NUBE Y ESPECTROS DE AUDIO */}
        <div
          className="absolute inset-0 transition-opacity duration-700 ease-out"
          style={{ opacity: era5 }}
        >
          <div className="absolute bottom-0 inset-x-0 h-96 bg-gradient-to-t from-neon-pink/10 via-neon-cyan/5 to-transparent blur-2xl" />
          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full border border-neon-pink/20 shadow-[0_0_120px_rgba(255,0,255,0.15)]" />
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL POR ENCIMA DEL PARALLAX */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {children}
      </div>
    </div>
  );
};
