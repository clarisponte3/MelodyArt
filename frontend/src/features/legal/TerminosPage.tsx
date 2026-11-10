import React from 'react';
import { GlassCard } from '../../components/ui/GlassCard';
import { Scale, ShieldCheck, RefreshCw, AlertTriangle } from 'lucide-react';

export const TerminosPage: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <div className="mb-8 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-green/40 bg-neon-green/10 text-neon-green text-xs font-semibold uppercase tracking-wider mb-3">
          <Scale className="w-3.5 h-3.5" />
          <span>Normativa PROFECO & LFPC</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Términos y Condiciones Comerciales
        </h1>
        <p className="text-xs text-gray-400">
          Apego a la Ley Federal de Protección al Consumidor (LFPC) para Comercio Electrónico
        </p>
      </div>

      <GlassCard accent="gold" className="p-8 md:p-10 space-y-8 text-xs text-gray-300 leading-relaxed">
        <section>
          <h2 className="text-base font-bold text-white mb-2 flex items-center gap-2">
            <Scale className="w-4 h-4 text-neon-yellow" />
            1. Transparencia de Precios e Impuestos (Art. 7 bis LFPC)
          </h2>
          <p>
            Todos los precios exhibidos en la tienda en línea de <strong>SonoraSync</strong> están expresados en <strong>Pesos Mexicanos (MXN)</strong> e incluyen de forma obligatoria y desglosada el <strong>16.00% de Impuesto al Valor Agregado (IVA)</strong>. SonoraSync no aplica cobros ocultos, comisiones no informadas ni cargos automáticos.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-white mb-2 flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-neon-cyan" />
            2. Derecho de Revocación de Compra (Art. 56 LFPC)
          </h2>
          <p>
            El consumidor cuenta con un plazo de <strong>5 (cinco) días hábiles</strong> a partir de la fecha de recepción física del instrumento para revocar su consentimiento y cancelar la operación de compra sin responsabilidad ni retención económica alguna. El producto deberá devolverse en su empaque original sin alteraciones físicas ni daños derivados de mal uso.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-white mb-2 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-neon-green" />
            3. Garantía Legal de Instrumentos (Art. 77 a 84 LFPC)
          </h2>
          <p>
            Todos los instrumentos musicales nuevos comercializados en SonoraSync cuentan con una <strong>Garantía de Fábrica de al menos 90 días naturales</strong> contados a partir de su entrega. La garantía ampara reparación sin costo, reemplazo de piezas defectuosas de fabricación y calibración en el taller de luthería oficial.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-white mb-2 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-neon-orange" />
            4. Mayoría de Edad y Capacidad Jurídica
          </h2>
          <p>
            Las compras en la tienda en línea están restringidas legalmente a personas mayores de 18 años con plena capacidad de ejercicio. Las inscripciones y adquisiciones para menores de edad deberán ser procesadas y autorizadas formalmente por su padre, madre o tutor legal.
          </p>
        </section>
      </GlassCard>
    </div>
  );
};
