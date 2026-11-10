import React from 'react';
import { Link } from 'react-router-dom';
import { NeonButton } from '../../components/ui/NeonButton';
import { Music, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-24 flex flex-col items-center justify-center text-center">
      <div className="w-20 h-20 rounded-full border border-neon-pink/40 bg-neon-pink/10 flex items-center justify-center mb-6 shadow-neon-pink animate-pulse">
        <Music className="w-10 h-10 text-neon-pink" />
      </div>

      <h1 className="font-neon text-6xl md:text-8xl neon-text-pink mb-4">404</h1>
      <h2 className="text-2xl font-bold text-white mb-2">Nota Fuera de Tono: Página No Encontrada</h2>
      <p className="text-xs text-gray-400 max-w-md mb-8">
        La ruta a la que intentas acceder no existe o fue movida en la partitura de SonoraSync.
      </p>

      <Link to="/">
        <NeonButton variant="cyan" className="py-3 px-6 text-xs">
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Inicio</span>
        </NeonButton>
      </Link>
    </div>
  );
};
