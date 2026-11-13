import React from 'react';
import { Quote as QuoteIcon, Sparkles } from 'lucide-react';

export interface MusicalQuote {
  phrase: string;
  author: string;
  genre: string;
}

export const MUSICAL_QUOTES: MusicalQuote[] = [
  {
    phrase: 'La música tiene un sentido de eternidad que pocas cosas en este mundo poseen.',
    author: 'Gustavo Cerati',
    genre: 'Rock Latinoamericano',
  },
  {
    phrase: 'La música es la posesión de todos. Solo las compañías discográficas creen que la gente puede poseerla.',
    author: 'John Lennon',
    genre: 'Rock Clásico',
  },
  {
    phrase: 'La música es una revelación más alta que toda la sabiduría y la filosofía.',
    author: 'Ludwig van Beethoven',
    genre: 'Música Clásica',
  },
  {
    phrase: 'No toques lo que ya está ahí; escucha y toca lo que todavía no existe.',
    author: 'Miles Davis',
    genre: 'Jazz',
  },
  {
    phrase: 'Lo más hermoso de aprender música es que nadie en el mundo te lo puede quitar.',
    author: 'B.B. King',
    genre: 'Blues',
  },
  {
    phrase: 'No seré una estrella más en el cielo; seré una leyenda en la historia de la música.',
    author: 'Freddie Mercury',
    genre: 'Rock / Queen',
  },
  {
    phrase: 'La música no miente. Si hay algo que debe cambiar en este mundo, solo puede suceder a través de la música.',
    author: 'Jimi Hendrix',
    genre: 'Rock Psicodélico',
  },
  {
    phrase: 'Una cosa buena que tiene la música es que cuando te golpea el corazón, no sientes dolor.',
    author: 'Bob Marley',
    genre: 'Reggae',
  },
  {
    phrase: 'El deber de un músico es reflejar los tiempos en que vive y transformar el dolor en arte sonoro.',
    author: 'Nina Simone',
    genre: 'Soul & Jazz',
  },
  {
    phrase: 'La música más pura es aquella que se toca directamente desde el alma, sin intermediarios.',
    author: 'Carlos Santana',
    genre: 'Latin Rock & Fusión',
  },
  {
    phrase: 'El mañana pertenece a aquellos que tienen el valor de escuchar su propia melodía hoy.',
    author: 'David Bowie',
    genre: 'Art Rock',
  },
  {
    phrase: 'La música no está en las notas individuales, sino en el silencio armónico entre ellas.',
    author: 'Wolfgang Amadeus Mozart',
    genre: 'Música Clásica',
  },
  {
    phrase: 'La música es un mundo dentro de sí mismo, un lenguaje universal que todos entendemos sin palabras.',
    author: 'Stevie Wonder',
    genre: 'Motown & R&B',
  },
  {
    phrase: 'La música es el único arte que tiene la capacidad de abrazarte sin necesidad de tocarte.',
    author: 'Charly García',
    genre: 'Rock Argentino',
  },
  {
    phrase: 'Los verdaderos músicos no se retiran jamás; dejan de tocar cuando ya no queda música en su espíritu.',
    author: 'Louis Armstrong',
    genre: 'Jazz Tradicional',
  },
  {
    phrase: 'El deber de la juventud es desafiar la apatía del mundo con guitarras afinadas y pasión.',
    author: 'Kurt Cobain',
    genre: 'Grunge & Rock Alternativo',
  },
  {
    phrase: 'La música es una necesidad vital; después del aire, el agua y la comida, la música es lo primero.',
    author: 'Ray Charles',
    genre: 'Rhythm & Blues',
  },
  {
    phrase: 'Lo único mejor y más sublime en este universo que la música, es aún más música.',
    author: 'Ella Fitzgerald',
    genre: 'Vocal Jazz',
  },
  {
    phrase: 'Las manos son solo la herramienta que pulsa las cuerdas; quien manda en cada compás es el corazón.',
    author: 'Paco de Lucía',
    genre: 'Flamenco',
  },
  {
    phrase: 'La música debe evolucionar siempre, romper moldes y buscar nuevas emociones en cada compás.',
    author: 'Astor Piazzolla',
    genre: 'Nuevo Tango',
  },
];

export const QuoteOfTheDay: React.FC = () => {
  // Fórmula matemática requerida para rotación diaria automática a las 00:00
  const index = Math.floor(Date.now() / 86400000) % MUSICAL_QUOTES.length;
  const quote = MUSICAL_QUOTES[index];

  return (
    <div className="w-full max-w-3xl mx-auto my-6 p-6 md:p-8 rounded-3xl glass-panel border border-neon-cyan/30 relative overflow-hidden shadow-2xl transition-all duration-300">
      {/* Resplandor ambiental de fondo */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-neon-cyan/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-neon-pink/5 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 relative z-10">
        <div className="p-3 rounded-2xl bg-neon-cyan/10 border border-neon-cyan/40 text-neon-cyan flex-shrink-0 shadow-neon-cyan/20">
          <QuoteIcon className="w-6 h-6" />
        </div>

        <div className="flex-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-neon-cyan" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-neon-cyan">
              Inspiración Diaria Sonora
            </span>
          </div>

          <blockquote className="text-base md:text-lg text-gray-100 font-medium italic leading-relaxed mb-4">
            "{quote.phrase}"
          </blockquote>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2 border-t border-white/10 text-xs">
            <span className="font-bold text-neon-yellow tracking-wide">
              {quote.author}
            </span>
            <span className="text-gray-500">·</span>
            <span className="text-gray-400 font-medium">
              {quote.genre}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteOfTheDay;
