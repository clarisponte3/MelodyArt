import React from 'react';
import { useSearchParams, Link, Navigate } from 'react-router-dom';
import { NeonButton } from '../../components/ui/NeonButton';
import { GlassCard } from '../../components/ui/GlassCard';
import { CheckCircle2, Printer, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';

export const CheckoutSuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const folio = searchParams.get('folio');
  const total = searchParams.get('total') || '0.00';

  if (!folio) {
    return <Navigate to="/dashboard" replace />;
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container mx-auto px-6 py-16 flex items-center justify-center min-h-[75vh]">
      <div className="w-full max-w-2xl">
        <GlassCard accent="gold" className="p-8 md:p-12 text-center relative overflow-hidden">
          {/* ICONO ANIMADO */}
          <div className="w-20 h-20 rounded-full bg-neon-green/10 border-2 border-neon-green flex items-center justify-center mx-auto mb-6 shadow-neon-green animate-bounce">
            <CheckCircle2 className="w-10 h-10 text-neon-green" />
          </div>

          <span className="text-xs font-semibold text-neon-green uppercase tracking-widest">
            Transacción Autorizada
          </span>

          <h1 className="text-3xl md:text-4xl font-extrabold text-white mt-2 mb-2">
            ¡Tu Pedido ha sido Confirmado!
          </h1>

          <p className="text-sm text-gray-300 max-w-md mx-auto mb-8">
            Hemos registrado tu compra en el sistema de SonoraSync. En breve recibirás la confirmación y guía de rastreo en tu correo registrado.
          </p>

          {/* TARJETA CON EL FOLIO COMERCIAL */}
          <div className="p-6 rounded-2xl border border-neon-cyan/40 bg-dark-900/80 mb-8 max-w-md mx-auto text-left space-y-3">
            <div className="flex justify-between items-center pb-3 border-b border-white/10">
              <span className="text-xs text-gray-400">Folio Comercial Oficial:</span>
              <span className="font-mono text-base font-bold text-neon-cyan">{folio}</span>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400">Fecha de Emisión:</span>
              <span className="text-white font-medium">{new Date().toLocaleDateString('es-MX')}</span>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400">Tasa de IVA Aplicada:</span>
              <span className="text-neon-cyan font-mono font-semibold">16.00% (LFPC)</span>
            </div>

            <div className="flex justify-between items-center text-xs pt-2 border-t border-white/10">
              <span className="text-gray-200 font-semibold">Total Pagado:</span>
              <span className="text-lg font-black text-neon-pink font-mono">
                ${Number(total).toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
              </span>
            </div>
          </div>

          {/* NOTA LEGAL FISCAL PROFECO */}
          <div className="p-4 rounded-xl border border-white/10 bg-white/5 text-xs text-gray-300 max-w-md mx-auto text-left mb-8 flex items-start gap-2.5">
            <ShieldCheck className="w-5 h-5 text-neon-green flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Comprobante Fiscal Digital:</strong> Este resumen de transacción cuenta con validez oficial conforme a la legislación fiscal mexicana y lineamientos de PROFECO. Dispones de 5 días hábiles para revocación o aclaraciones.
            </p>
          </div>

          {/* ACCIONES */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={handlePrint}
              className="py-3 px-6 rounded-xl border border-white/20 text-xs font-semibold text-white hover:border-neon-cyan hover:text-neon-cyan flex items-center gap-2 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir Comprobante</span>
            </button>

            <Link to="/catalogo">
              <NeonButton variant="cyan" className="py-3 px-6 text-xs">
                <ShoppingBag className="w-4 h-4" />
                <span>Seguir Comprando</span>
              </NeonButton>
            </Link>

            <Link to="/dashboard">
              <NeonButton variant="pink" className="py-3 px-6 text-xs">
                <span>Ir a Mi Panel</span>
                <ArrowRight className="w-4 h-4" />
              </NeonButton>
            </Link>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
