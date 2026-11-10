import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useCartStore } from '../../store/cartStore';
import { VentasService } from '../../api/ventas.service';
import { MetodoPagoResponseDTO, VentaRequestDTO } from '../../types';
import { showToast } from '../../store/notificationStore';
import { NeonButton } from '../../components/ui/NeonButton';
import { GlassCard } from '../../components/ui/GlassCard';
import {
  CreditCard,
  Banknote,
  Building2,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  User,
  FileCheck,
  Lock,
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { user } = useAuthStore();
  const { items, getSubtotal, getIva, getTotal, clearCart } = useCartStore();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Paso 1: Datos de Entrega y Mayoría de Edad
  const [shippingData, setShippingData] = useState({
    nombreCompleto: user?.nombre || '',
    correo: user?.correo || '',
    telefono: '',
    direccion: '',
    codigoPostal: '',
    ciudad: 'Ciudad de México',
    estado: 'CDMX',
    esMayorEdad: false,
  });

  // Paso 2: Método de Pago
  const [metodosPago, setMetodosPago] = useState<MetodoPagoResponseDTO[]>([]);
  const [selectedMetodoId, setSelectedMetodoId] = useState<number | null>(null);

  // Paso 3: Aceptación Legal PROFECO y Procesamiento
  const [acceptProfeco, setAcceptProfeco] = useState(false);
  const [loading, setLoading] = useState(false);

  const subtotal = getSubtotal();
  const iva = getIva();
  const total = getTotal();

  // Redirigir si el carrito está vacío
  useEffect(() => {
    if (items.length === 0) {
      navigate('/carrito');
    }
  }, [items, navigate]);

  // Carga de Métodos de Pago desde Backend
  useEffect(() => {
    const fetchMetodos = async () => {
      try {
        const data = await VentasService.getMetodosPago();
        if (Array.isArray(data) && data.length > 0) {
          setMetodosPago(data);
          setSelectedMetodoId(data[0].idMetodoPago);
        } else {
          // Fallback de métodos oficiales
          const fallback: MetodoPagoResponseDTO[] = [
            { idMetodoPago: 1, nombre: 'Tarjeta de Crédito / Débito (Visa / Mastercard)', activo: true },
            { idMetodoPago: 2, nombre: 'Transferencia Interbancaria SPEI (Sin Comisión)', activo: true },
            { idMetodoPago: 3, nombre: 'Efectivo en Tienda / OXXO Pay', activo: true },
          ];
          setMetodosPago(fallback);
          setSelectedMetodoId(fallback[0].idMetodoPago);
        }
      } catch {
        const fallback: MetodoPagoResponseDTO[] = [
          { idMetodoPago: 1, nombre: 'Tarjeta de Crédito / Débito', activo: true },
          { idMetodoPago: 2, nombre: 'Transferencia SPEI', activo: true },
        ];
        setMetodosPago(fallback);
        setSelectedMetodoId(fallback[0].idMetodoPago);
      }
    };

    fetchMetodos();
  }, []);

  const handleNextStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingData.esMayorEdad) {
      showToast('warning', 'Debes confirmar la mayoría de edad (18+ años) conforme a la LFPC.', 'Validación Requerida');
      return;
    }
    setCurrentStep(2);
  };

  const handleNextStep2 = () => {
    if (!selectedMetodoId) {
      showToast('warning', 'Selecciona un método de pago para continuar.', 'Selección Requerida');
      return;
    }
    setCurrentStep(3);
  };

  const handleConfirmOrder = async () => {
    if (!acceptProfeco) {
      showToast('warning', 'Debes aceptar las políticas comerciales de la PROFECO para finalizar.', 'Términos Requeridos');
      return;
    }

    setLoading(true);
    const folio = `FOL-${Date.now().toString().slice(-6)}-MX`;

    try {
      // 1. Crear la Venta en el backend (Spring Boot)
      const ventaPayload: VentaRequestDTO = {
        folio,
        idUsuarioCliente: user?.userId || 1,
        idMetodoPago: selectedMetodoId || 1,
        tasaIva: 16.0,
        estado: 'COMPLETADA',
      };

      const ventaGuardada = await VentasService.createVenta(ventaPayload);
      const idVenta = ventaGuardada.idVenta || Date.now();

      // 2. Persistir cada Detalle de Venta
      for (const item of items) {
        await VentasService.createDetalleVenta({
          idVenta,
          idProducto: item.producto.idProducto,
          cantidad: item.cantidad,
          precioUnitario: Number(item.producto.precioVenta),
        });
      }

      // 3. Limpiar carrito y redirigir
      clearCart();
      showToast('success', `¡Pedido #${folio} confirmado con éxito!`, 'Compra Procesada');
      navigate(`/checkout/exito?folio=${folio}&total=${total}&metodo=${selectedMetodoId}`);
    } catch (err: any) {
      showToast(
        'error',
        err?.message || 'Hubo un inconveniente al procesar tu orden en el backend. Intenta de nuevo.',
        'Error al Registrar Venta'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-12 max-w-5xl">
      {/* STEPPER DE 3 PASOS */}
      <div className="flex items-center justify-between max-w-2xl mx-auto mb-12">
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs border ${
              currentStep >= 1
                ? 'border-neon-cyan bg-neon-cyan/20 text-neon-cyan shadow-neon-cyan'
                : 'border-white/20 text-gray-500'
            }`}
          >
            1
          </div>
          <span className={`text-xs font-semibold ${currentStep >= 1 ? 'text-white' : 'text-gray-500'}`}>
            Identificación
          </span>
        </div>

        <div className={`flex-1 h-0.5 mx-4 ${currentStep >= 2 ? 'bg-neon-cyan' : 'bg-white/10'}`} />

        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs border ${
              currentStep >= 2
                ? 'border-neon-pink bg-neon-pink/20 text-neon-pink shadow-neon-pink'
                : 'border-white/20 text-gray-500'
            }`}
          >
            2
          </div>
          <span className={`text-xs font-semibold ${currentStep >= 2 ? 'text-white' : 'text-gray-500'}`}>
            Método de Pago
          </span>
        </div>

        <div className={`flex-1 h-0.5 mx-4 ${currentStep >= 3 ? 'bg-neon-green' : 'bg-white/10'}`} />

        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs border ${
              currentStep === 3
                ? 'border-neon-green bg-neon-green/20 text-neon-green shadow-neon-green'
                : 'border-white/20 text-gray-500'
            }`}
          >
            3
          </div>
          <span className={`text-xs font-semibold ${currentStep === 3 ? 'text-white' : 'text-gray-500'}`}>
            Confirmación
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* COLUMNA PRINCIPAL DE FORMULARIOS SEGÚN PASO */}
        <div className="lg:col-span-2">
          {/* ===================================================================
              PASO 1: DATOS DE ENTREGA Y MAYORÍA DE EDAD (PROFECO)
              =================================================================== */}
          {currentStep === 1 && (
            <GlassCard accent="cyan" className="p-8">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                <User className="w-5 h-5 text-neon-cyan" />
                <h2 className="text-xl font-bold text-white">Datos de Entrega y Facturación</h2>
              </div>

              <form onSubmit={handleNextStep1} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-300 mb-1">Nombre Completo *</label>
                    <input
                      type="text"
                      value={shippingData.nombreCompleto}
                      onChange={(e) => setShippingData({ ...shippingData, nombreCompleto: e.target.value })}
                      required
                      className="w-full bg-dark-900 border border-white/15 focus:border-neon-cyan rounded-xl py-2 px-3 text-xs text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-300 mb-1">Correo Electrónico *</label>
                    <input
                      type="email"
                      value={shippingData.correo}
                      onChange={(e) => setShippingData({ ...shippingData, correo: e.target.value })}
                      required
                      className="w-full bg-dark-900 border border-white/15 focus:border-neon-cyan rounded-xl py-2 px-3 text-xs text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-300 mb-1">Teléfono de Contacto *</label>
                    <input
                      type="tel"
                      value={shippingData.telefono}
                      onChange={(e) => setShippingData({ ...shippingData, telefono: e.target.value })}
                      placeholder="55 1234 5678"
                      required
                      className="w-full bg-dark-900 border border-white/15 focus:border-neon-cyan rounded-xl py-2 px-3 text-xs text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-300 mb-1">Código Postal *</label>
                    <input
                      type="text"
                      maxLength={5}
                      value={shippingData.codigoPostal}
                      onChange={(e) => setShippingData({ ...shippingData, codigoPostal: e.target.value })}
                      placeholder="Ej. 03100"
                      required
                      className="w-full bg-dark-900 border border-white/15 focus:border-neon-cyan rounded-xl py-2 px-3 text-xs text-white outline-none font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-300 mb-1">Dirección de Entrega Completa *</label>
                  <input
                    type="text"
                    value={shippingData.direccion}
                    onChange={(e) => setShippingData({ ...shippingData, direccion: e.target.value })}
                    placeholder="Calle, Número exterior e interior, Colonia, Municipio"
                    required
                    className="w-full bg-dark-900 border border-white/15 focus:border-neon-cyan rounded-xl py-2 px-3 text-xs text-white outline-none"
                  />
                </div>

                {/* DECLARACIÓN OBLIGATORIA DE MAYORÍA DE EDAD PROFECO */}
                <div className="p-4 rounded-xl border border-neon-cyan/30 bg-neon-cyan/5">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={shippingData.esMayorEdad}
                      onChange={(e) => setShippingData({ ...shippingData, esMayorEdad: e.target.checked })}
                      className="mt-0.5 w-4 h-4 text-neon-cyan rounded focus:ring-0 cursor-pointer"
                    />
                    <span className="text-xs text-gray-200 leading-relaxed">
                      <strong>Declaración de Mayoría de Edad (Obligatorio LFPC / PROFECO):</strong> Declaro bajo protesta de decir verdad que cuento con al menos 18 años de edad cumplidos y tengo plena capacidad legal para celebrar transacciones comerciales en México.
                    </span>
                  </label>
                </div>

                <div className="flex justify-end pt-4">
                  <NeonButton variant="cyan" type="submit" className="py-3 px-6 text-xs">
                    <span>Continuar a Métodos de Pago</span>
                    <ArrowRight className="w-4 h-4" />
                  </NeonButton>
                </div>
              </form>
            </GlassCard>
          )}

          {/* ===================================================================
              PASO 2: SELECCIÓN DE MÉTODO DE PAGO
              =================================================================== */}
          {currentStep === 2 && (
            <GlassCard accent="pink" className="p-8">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                <CreditCard className="w-5 h-5 text-neon-pink" />
                <h2 className="text-xl font-bold text-white">Selecciona tu Forma de Pago</h2>
              </div>

              <div className="space-y-4 mb-8">
                {metodosPago.map((metodo) => {
                  const isSelected = selectedMetodoId === metodo.idMetodoPago;

                  return (
                    <div
                      key={metodo.idMetodoPago}
                      onClick={() => setSelectedMetodoId(metodo.idMetodoPago)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'border-neon-pink bg-neon-pink/10 shadow-neon-pink/20'
                          : 'border-white/10 hover:border-white/30 bg-dark-900/60'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center border ${
                            isSelected
                              ? 'border-neon-pink text-neon-pink bg-dark-950'
                              : 'border-white/10 text-gray-400 bg-dark-900'
                          }`}
                        >
                          {metodo.nombre.toLowerCase().includes('tarjeta') ? (
                            <CreditCard className="w-5 h-5" />
                          ) : metodo.nombre.toLowerCase().includes('transferencia') ? (
                            <Building2 className="w-5 h-5" />
                          ) : (
                            <Banknote className="w-5 h-5" />
                          )}
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-white">{metodo.nombre}</h4>
                          <span className="text-[11px] text-gray-400">
                            Procesado de forma segura y encriptada (HTTPS / SSL)
                          </span>
                        </div>
                      </div>

                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-neon-pink bg-neon-pink' : 'border-gray-500'
                        }`}
                      >
                        {isSelected && <div className="w-2 h-2 rounded-full bg-black" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="text-xs text-gray-400 hover:text-white flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Volver a Datos de Entrega</span>
                </button>

                <NeonButton variant="pink" onClick={handleNextStep2} className="py-3 px-6 text-xs">
                  <span>Revisar y Confirmar Pedido</span>
                  <ArrowRight className="w-4 h-4" />
                </NeonButton>
              </div>
            </GlassCard>
          )}

          {/* ===================================================================
              PASO 3: CONFIRMACIÓN Y CUMPLIMIENTO PROFECO
              =================================================================== */}
          {currentStep === 3 && (
            <GlassCard accent="gold" className="p-8">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                <FileCheck className="w-5 h-5 text-neon-green" />
                <h2 className="text-xl font-bold text-white">Revisión Final y Confirmación</h2>
              </div>

              {/* LISTA COMPACTA DE PRODUCTOS */}
              <div className="divide-y divide-white/5 mb-6">
                {items.map((item) => (
                  <div key={item.producto.idProducto} className="py-3 flex justify-between items-center text-xs">
                    <div>
                      <span className="text-white font-medium">{item.producto.nombre}</span>
                      <span className="text-gray-400 block">
                        Cantidad: {item.cantidad} x ${Number(item.producto.precioVenta).toLocaleString('es-MX')}
                      </span>
                    </div>
                    <span className="font-mono font-bold text-neon-pink">
                      ${(Number(item.producto.precioVenta) * item.cantidad).toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
                    </span>
                  </div>
                ))}
              </div>

              {/* LEYENDA OBLIGATORIA PROFECO DE PRECIO DEFINITIVO */}
              <div className="p-4 rounded-xl border border-neon-green/30 bg-neon-green/5 text-xs text-gray-300 space-y-2 mb-6">
                <div className="flex items-center gap-2 text-neon-green font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Protección al Consumidor (Ley Federal de Protección al Consumidor)</span>
                </div>
                <p>
                  El precio final de <strong className="text-white">${total.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN</strong> incluye el 16.00% de IVA de ley y cubre la totalidad de los costos. SonoraSync garantiza que no se aplicarán cargos ocultos, propinas ni cobros extraordinarios no autorizados.
                </p>
                <p className="text-[11px] text-gray-400">
                  Cuentas con un plazo de <strong>5 días hábiles</strong> posteriores a la entrega para revocar tu compra (Art. 56 LFPC) y una garantía legal mínima de <strong>90 días naturales</strong>.
                </p>
              </div>

              {/* CHECKBOX OBLIGATORIO PROFECO */}
              <div className="mb-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={acceptProfeco}
                    onChange={(e) => setAcceptProfeco(e.target.checked)}
                    className="mt-0.5 w-4 h-4 text-neon-green rounded focus:ring-0 cursor-pointer"
                  />
                  <span className="text-xs text-gray-300 leading-relaxed">
                    Acepto los{' '}
                    <Link to="/terminos" target="_blank" className="text-neon-cyan hover:underline font-medium">
                      Términos y Condiciones Comerciales
                    </Link>
                    , políticas de garantía y lineamientos de devolución y revocación de la PROFECO.
                  </span>
                </label>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="text-xs text-gray-400 hover:text-white flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Modificar Método de Pago</span>
                </button>

                <NeonButton
                  variant="green"
                  disabled={!acceptProfeco || loading}
                  onClick={handleConfirmOrder}
                  className={`py-3.5 px-8 text-sm ${!acceptProfeco || loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <Lock className="w-4 h-4" />
                  <span>{loading ? 'Generando Venta...' : 'Pagar y Confirmar Pedido'}</span>
                </NeonButton>
              </div>
            </GlassCard>
          )}
        </div>

        {/* COLUMNA LATERAL: RESUMEN FINANCIERO */}
        <div className="lg:col-span-1">
          <GlassCard accent="cyan" className="p-6 sticky top-28 space-y-4">
            <h3 className="text-sm font-bold text-white border-b border-white/10 pb-3 uppercase tracking-wider">
              Desglose de Pago (MXN)
            </h3>

            <div className="space-y-2 text-xs text-gray-300">
              <div className="flex justify-between">
                <span>Total de Artículos:</span>
                <span className="text-white font-medium">{items.reduce((acc, i) => acc + i.cantidad, 0)}</span>
              </div>
              <div className="flex justify-between">
                <span>Subtotal (Base Imponible):</span>
                <span className="font-mono text-white">
                  ${subtotal.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neon-cyan">IVA Trasladado (16.00%):</span>
                <span className="font-mono text-neon-cyan font-bold">
                  ${iva.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Envío Terrestre:</span>
                <span className="text-neon-green font-semibold">Gratis</span>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-between items-baseline">
                <span className="text-sm font-bold text-white">Total a Cobrar:</span>
                <span className="text-xl font-black text-neon-pink font-mono">
                  ${total.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
                </span>
              </div>
            </div>

            <div className="pt-2 text-[10px] text-gray-500 text-center">
              Transacción protegida por el backend de SonoraSync (Spring Boot 3.3.5 en Render).
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
