import React from 'react';
import { Link } from 'react-router-dom';
import { Music, ShieldCheck, Mail, Phone, MapPin, Clock, Scale } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 border-t border-white/10 glass-panel mt-auto pt-16 pb-12 text-gray-300">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* COLUMNA 1: IDENTIDAD Y VISIÓN */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-neon-cyan/20 border border-neon-cyan/50 flex items-center justify-center">
                <Music className="w-5 h-5 text-neon-cyan" />
              </div>
              <span className="font-neon text-3xl neon-text-yellow">SonoraSync</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              Plataforma integral que fusiona la academia musical con la tienda en línea de instrumentos de más alta gama en México. Calidad Enterprise, sonido y cultura.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-neon-green/30 bg-neon-green/5 text-neon-green text-xs">
              <ShieldCheck className="w-4 h-4" />
              <span>Tienda Segura con Garantía PROFECO</span>
            </div>
          </div>

          {/* COLUMNA 2: NAVEGACIÓN RÁPIDA */}
          <div>
            <h4 className="text-sm font-semibold text-neon-cyan mb-4 uppercase tracking-wider">
              Explorar Plataforma
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/catalogo" className="hover:text-neon-cyan transition-colors">
                  Catálogo de Guitarras y Ukeleles
                </Link>
              </li>
              <li>
                <Link to="/catalogo" className="hover:text-neon-cyan transition-colors">
                  Teclados, Pianos y Percusión
                </Link>
              </li>
              <li>
                <Link to="/academia/talleres" className="hover:text-neon-pink transition-colors">
                  Talleres Musicales & Clases
                </Link>
              </li>
              <li>
                <Link to="/carrito" className="hover:text-neon-green transition-colors">
                  Carrito de Compras
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-neon-yellow transition-colors">
                  Portal del Alumno / Docente
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMNA 3: CUMPLIMIENTO LEGAL (PROFECO Y LFPDPPP) */}
          <div>
            <h4 className="text-sm font-semibold text-neon-pink mb-4 uppercase tracking-wider flex items-center gap-2">
              <Scale className="w-4 h-4 text-neon-pink" />
              Marco Legal Mexicano
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <Link to="/privacidad" className="hover:text-white transition-colors underline decoration-neon-pink/40">
                  Aviso de Privacidad Integral (LFPDPPP)
                </Link>
              </li>
              <li>
                <Link to="/terminos" className="hover:text-white transition-colors underline decoration-neon-cyan/40">
                  Términos y Condiciones (LFPC)
                </Link>
              </li>
              <li>
                <Link to="/perfil" className="hover:text-white transition-colors">
                  Ejercicio de Derechos ARCO
                </Link>
              </li>
              <li>
                <span className="text-neon-green font-medium">Plazo de Revocación (Art. 56 LFPC):</span> 5 días hábiles a partir de la entrega física.
              </li>
              <li>
                <span className="text-neon-yellow font-medium">Garantía Legal (Art. 77 LFPC):</span> 90 días naturales mínimos en instrumentos nuevos.
              </li>
            </ul>
          </div>

          {/* COLUMNA 4: IDENTIDAD COMERCIAL OBLIGATORIA (ART. 76 BIS LFPC) */}
          <div>
            <h4 className="text-sm font-semibold text-neon-yellow mb-4 uppercase tracking-wider">
              Identidad Comercial
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-neon-cyan flex-shrink-0 mt-0.5" />
                <span>Av. Insurgentes Sur 1200, Col. del Valle, Benito Juárez, CDMX, C.P. 03100</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-neon-green flex-shrink-0" />
                <span>(+52) 55 1234 5678</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-neon-pink flex-shrink-0" />
                <span>contacto@sonorasync.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-neon-yellow flex-shrink-0" />
                <span>Lunes a Viernes: 9:00 - 18:00 hrs</span>
              </li>
              <li className="pt-2 text-[11px] text-gray-400">
                RFC: <strong className="text-white">SSM261014-XYZ</strong> · Razón Social: SonoraSync / MelodyArt S.A. de C.V.
              </li>
            </ul>
          </div>
        </div>

        {/* LÍNEA FINAL */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>
            © 2026 SonoraSync / MelodyArt. Desarrollado por <span className="text-white font-medium">Clarissa Aponte Foglia</span> & <span className="text-white font-medium">Melo Fitta Joshua Efraín</span>.
          </p>
          <p className="text-gray-400">
            Todos los precios exhibidos se expresan en <strong className="text-white">Pesos Mexicanos (MXN)</strong> e incluyen el <strong className="text-white">16.00% de IVA</strong> de ley.
          </p>
        </div>
      </div>
    </footer>
  );
};
