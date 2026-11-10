import React from 'react';
import { GlassCard } from '../../components/ui/GlassCard';
import { Shield, Lock, FileText, CheckCircle2 } from 'lucide-react';

export const PrivacidadPage: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <div className="mb-8 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-cyan/40 bg-neon-cyan/10 text-neon-cyan text-xs font-semibold uppercase tracking-wider mb-3">
          <Shield className="w-3.5 h-3.5" />
          <span>Cumplimiento Legal LFPDPPP</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Aviso de Privacidad Integral
        </h1>
        <p className="text-xs text-gray-400">
          Última actualización: Noviembre 2026 · SonoraSync / MelodyArt S.A. de C.V.
        </p>
      </div>

      <GlassCard accent="cyan" className="p-8 md:p-10 space-y-8 text-xs text-gray-300 leading-relaxed">
        <section>
          <h2 className="text-base font-bold text-white mb-2 flex items-center gap-2">
            <Lock className="w-4 h-4 text-neon-cyan" />
            1. Identidad y Domicilio del Responsable
          </h2>
          <p>
            <strong>SonoraSync / MelodyArt S.A. de C.V.</strong>, con domicilio legal en Av. Insurgentes Sur 1200, Col. del Valle, Benito Juárez, Ciudad de México, C.P. 03100, es el responsable del uso, tratamiento y protección de sus datos personales conforme a la <strong>Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP)</strong>.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-white mb-2 flex items-center gap-2">
            <FileText className="w-4 h-4 text-neon-pink" />
            2. Datos Personales Recabados
          </h2>
          <p className="mb-3">
            Para la prestación de los servicios académicos y la gestión de compras en línea, SonoraSync recaba los siguientes datos personales:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-400">
            <li>Nombre(s), apellidos y fecha de nacimiento.</li>
            <li>Correo electrónico y número telefónico de contacto.</li>
            <li>Domicilio de entrega y facturación.</li>
            <li>Clave Única de Registro de Población (CURP) para expedientes de matrícula.</li>
            <li>Información de método de pago y comprobantes fiscales (sin almacenar números de tarjeta en texto plano).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-white mb-2 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-neon-green" />
            3. Finalidades del Tratamiento de Datos
          </h2>
          <p className="mb-2"><strong>Finalidades Primarias:</strong></p>
          <ul className="list-disc pl-5 space-y-1 text-gray-400 mb-3">
            <li>Procesamiento de órdenes de compra, emisión de folios comerciales y facturación con 16% de IVA.</li>
            <li>Gestión de inscripciones, control de cupos en aulas y pase de lista diario.</li>
            <li>Elaboración de bitácoras de progreso pedagógico y emisión de calificaciones oficiales.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-white mb-2 flex items-center gap-2">
            <Shield className="w-4 h-4 text-neon-yellow" />
            4. Ejercicio de Derechos ARCO (Acceso, Rectificación, Cancelación y Oposición)
          </h2>
          <p>
            Usted tiene derecho a conocer qué datos personales tenemos de usted, para qué los utilizamos y las condiciones de su uso (Acceso). Asimismo, es su derecho solicitar la corrección de su información (Rectificación), que la eliminemos de nuestros registros (Cancelación), oponerse al uso de sus datos para fines específicos (Oposición).
          </p>
          <p className="mt-2">
            Para ejercer cualquiera de los derechos ARCO, puede acceder a la sección de perfil en nuestra plataforma o enviar un correo formal a: <strong className="text-neon-cyan">privacidad@sonorasync.com</strong> con tiempo máximo de respuesta legal de 20 días hábiles.
          </p>
        </section>
      </GlassCard>
    </div>
  );
};
