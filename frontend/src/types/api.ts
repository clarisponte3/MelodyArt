/**
 * Definiciones de Contratos TypeScript para SonoraSync / MelodyArt
 * Mapeo 1:1 de los 25 DTOs Request y Response del Backend Spring Boot 3.3.5
 */

// =============================================================================
// ESTRUCTURAS TRANSVERSALES DE SPRING DATA JPA Y ERROR HANDLER
// =============================================================================

export interface BackendErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
  detalles?: Record<string, string>; // Errores de validación @Valid por campo
}

export interface SpringPage<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number; // 0-indexed en Spring Boot
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface PaginationParams {
  page?: number;
  size?: number;
  sort?: string;
}

// =============================================================================
// MÓDULO: AUTENTICACIÓN Y SEGURIDAD (JWT / RBAC)
// =============================================================================

export interface LoginRequestDTO {
  correo: string;
  contrasena: string;
}

export interface AuthResponseDTO {
  token: string;
  token_type: string;
  expires_in: number;
  user_id: number;
  correo: string;
  nombre: string;
}

export interface UsuarioRequestDTO {
  nombre: string;
  apellidos: string;
  correo: string;
  telefono?: string;
  direccion?: string;
  fechaNacimiento?: string;
  curp?: string;
  contrasena?: string;
  contrasenaHash?: string;
  activo?: boolean;
}

export interface UsuarioResponseDTO {
  idUsuario: number;
  nombre: string;
  apellidos: string;
  correo: string;
  telefono?: string;
  direccion?: string;
  fechaNacimiento?: string;
  curp?: string;
  activo: boolean;
  intentosFallidos?: number;
  bloqueadoHasta?: string;
  creadoEn: string;
  actualizadoEn: string;
}

export interface RolRequestDTO {
  nombre: string;
  descripcion?: string;
  activo?: boolean;
}

export interface RolResponseDTO {
  idRol: number;
  nombre: string;
  descripcion?: string;
  activo: boolean;
}

export interface UsuarioRolRequestDTO {
  idUsuario: number;
  idRol: number;
  asignadoEn?: string;
  activo?: boolean;
}

export interface UsuarioRolResponseDTO {
  idUsuario: number;
  idRol: number;
  usuario?: UsuarioResponseDTO;
  rol?: RolResponseDTO;
  asignadoEn: string;
  activo: boolean;
}

export interface PermisoRequestDTO {
  codigo: string;
  nombre: string;
  modulo: string;
  accion: string;
  descripcion?: string;
}

export interface PermisoResponseDTO {
  idPermiso: number;
  codigo: string;
  nombre: string;
  modulo: string;
  accion: string;
  descripcion?: string;
}

export interface RolPermisoRequestDTO {
  idRol: number;
  idPermiso: number;
}

export interface RolPermisoResponseDTO {
  idRol: number;
  idPermiso: number;
  rol?: RolResponseDTO;
  permiso?: PermisoResponseDTO;
}

// =============================================================================
// MÓDULO: CATÁLOGO DE PRODUCTOS (E-COMMERCE)
// =============================================================================

export interface CategoriaRequestDTO {
  nombre: string;
  tipo?: string;
  descripcion?: string;
}

export interface CategoriaResponseDTO {
  idCategoria: number;
  nombre: string;
  tipo?: string;
  descripcion?: string;
}

export interface MarcaRequestDTO {
  nombre: string;
  descripcion?: string;
  activa?: boolean;
}

export interface MarcaResponseDTO {
  idMarca: number;
  nombre: string;
  descripcion?: string;
  activa: boolean;
}

export interface ProductoRequestDTO {
  sku: string;
  nombre: string;
  descripcion?: string;
  modelo?: string;
  numeroSerie?: string;
  precioVenta: number;
  stock: number;
  stockMinimo?: number;
  idCategoria: number;
  idMarca?: number;
  activo?: boolean;
}

export interface ProductoResponseDTO {
  idProducto: number;
  sku: string;
  nombre: string;
  descripcion?: string;
  modelo?: string;
  numeroSerie?: string;
  precioVenta: number;
  stock: number;
  stockMinimo: number;
  categoria: CategoriaResponseDTO;
  marca?: MarcaResponseDTO;
  activo: boolean;
}

// =============================================================================
// MÓDULO: VENTAS, CARRITO Y CHECKOUT
// =============================================================================

export interface MetodoPagoRequestDTO {
  nombre: string;
  descripcion?: string;
  activo?: boolean;
}

export interface MetodoPagoResponseDTO {
  idMetodoPago: number;
  nombre: string;
  descripcion?: string;
  activo: boolean;
}

export interface VentaRequestDTO {
  folio: string;
  fechaHora?: string;
  idUsuarioVendedor?: number;
  idUsuarioCliente?: number;
  idMetodoPago: number;
  tasaIva?: number; // 16.00 por defecto en backend
  estado?: string;  // COMPLETADA, PENDIENTE, CANCELADA
}

export interface VentaResponseDTO {
  idVenta: number;
  folio: string;
  fechaHora: string;
  vendedor?: UsuarioResponseDTO;
  cliente?: UsuarioResponseDTO;
  metodoPago: MetodoPagoResponseDTO;
  tasaIva: number;
  estado: string;
}

export interface DetalleVentaRequestDTO {
  idVenta: number;
  idProducto: number;
  cantidad: number;
  precioUnitario: number;
}

export interface DetalleVentaResponseDTO {
  idDetalleVenta: number;
  idVenta: number;
  producto: ProductoResponseDTO;
  cantidad: number;
  precioUnitario: number;
}

// =============================================================================
// MÓDULO: GESTIÓN DE LA ACADEMIA Y CLASES MUSICALES
// =============================================================================

export interface AulaRequestDTO {
  nombre: string;
  capacidad: number;
  ubicacion?: string;
  activo?: boolean;
}

export interface AulaResponseDTO {
  idAula: number;
  nombre: string;
  capacidad: number;
  ubicacion?: string;
  activo: boolean;
}

export interface ClaseMusicalRequestDTO {
  nombre: string;
  descripcion?: string;
  horario: string;
  capacidadMaxima: number;
  costo: number;
}

export interface ClaseMusicalResponseDTO {
  idClaseMusical: number;
  nombre: string;
  descripcion?: string;
  horario: string;
  capacidadMaxima: number;
  costo: number;
}

export interface InscripcionRequestDTO {
  idUsuarioAlumno: number;
  idClase: number;
  fechaInscripcion?: string;
  fechaBaja?: string;
  costoAcordado?: number;
  estado?: string;
}

export interface InscripcionResponseDTO {
  idInscripcion: number;
  alumno: UsuarioResponseDTO;
  clase: ClaseMusicalResponseDTO;
  idClase?: number;       // alias para acceso directo
  idClaseMusical?: number; // alias para acceso directo
  fechaInscripcion: string;
  fechaBaja?: string;
  costoAcordado: number;
  estado: string;
}

export interface AsistenciaClaseRequestDTO {
  idInscripcion: number;
  fechaClase: string;
  estado: string; // PRESENTE, FALTA, RETARDO, JUSTIFICADA
  observaciones?: string;
}

export interface AsistenciaClaseResponseDTO {
  idAsistencia: number;
  inscripcion: InscripcionResponseDTO;
  fechaClase: string;
  estado: string;
  observaciones?: string;
  registradaEn: string;
}

export interface BitacoraProgresoRequestDTO {
  idInscripcion: number;
  idProfesor: number;
  fechaSesion?: string;
  temaTrabajado?: string;
  comentariosPedagogicos?: string;
  objetivosCumplidos?: string;
  proximaMeta?: string;
}

export interface BitacoraProgresoResponseDTO {
  idBitacora: number;
  inscripcion: InscripcionResponseDTO;
  profesor: UsuarioResponseDTO;
  fechaSesion: string;
  temaTrabajado?: string;
  comentariosPedagogicos?: string;
  objetivosCumplidos?: string;
  proximaMeta?: string;
}

export interface EvaluacionRequestDTO {
  idInscripcion: number;
  idProfesor: number;
  fechaEvaluacion?: string;
  tipo: string;
  calificacion: number;
  observaciones?: string;
}

export interface EvaluacionResponseDTO {
  idEvaluacion: number;
  inscripcion: InscripcionResponseDTO;
  profesor: UsuarioResponseDTO;
  fechaEvaluacion: string;
  tipo: string;
  calificacion: number;
  observaciones?: string;
}

// =============================================================================
// MÓDULO: FINANZAS Y COLEGIATURAS
// =============================================================================

export interface ConceptoPagoRequestDTO {
  nombre: string;
  descripcion?: string;
  tipo?: string;
  activo?: boolean;
}

export interface ConceptoPagoResponseDTO {
  idConceptoPago: number;
  nombre: string;
  descripcion?: string;
  tipo: string;
  activo: boolean;
}

export interface EstadoCuentaRequestDTO {
  idUsuarioAlumno: number;
  idConceptoPago: number;
  periodo?: string;
  fechaEmision?: string;
  fechaVencimiento: string;
  monto: number;
  estado?: string;
}

export interface EstadoCuentaResponseDTO {
  idEstadoCuenta: number;
  alumno: UsuarioResponseDTO;
  conceptoPago: ConceptoPagoResponseDTO;
  periodo?: string;
  fechaEmision: string;
  fechaVencimiento: string;
  monto: number;
  estado: string;
}

export interface PagoMensualidadRequestDTO {
  idEstadoCuenta: number;
  idMetodoPago: number;
  idUsuarioRegistra: number;
  fechaPago?: string;
  montoPagado: number;
  referencia?: string;
  observaciones?: string;
}

export interface PagoMensualidadResponseDTO {
  idPago: number;
  estadoCuenta: EstadoCuentaResponseDTO;
  metodoPago: MetodoPagoResponseDTO;
  usuarioRegistra: UsuarioResponseDTO;
  fechaPago: string;
  montoPagado: number;
  referencia?: string;
  observaciones?: string;
}

// =============================================================================
// MÓDULO: ALMACÉN, INVENTARIO Y PROVEEDORES
// =============================================================================

export interface MovimientoInventarioRequestDTO {
  idProducto: number;
  idUsuario: number;
  fechaHora?: string;
  tipoMovimiento: 'ENTRADA' | 'SALIDA' | 'AJUSTE';
  cantidad: number;
  motivo?: string;
  referencia?: string;
}

export interface MovimientoInventarioResponseDTO {
  idMovimiento: number;
  producto: ProductoResponseDTO;
  usuario: UsuarioResponseDTO;
  fechaHora: string;
  tipoMovimiento: string;
  cantidad: number;
  motivo?: string;
  referencia?: string;
}

export interface ProveedorRequestDTO {
  empresa: string;
  rfc: string;
  tel?: string;
  correo?: string;
  direccion?: string;
  condicionesPago?: string;
  activo?: boolean;
}

export interface ProveedorResponseDTO {
  idProveedor: number;
  empresa: string;
  rfc: string;
  tel?: string;
  correo?: string;
  direccion?: string;
  condicionesPago?: string;
  activo: boolean;
}

export interface CompraRequestDTO {
  folio: string;
  fecha?: string;
  idProveedor: number;
  idUsuarioRegistra: number;
  tasaIva?: number;
  observaciones?: string;
}

export interface CompraResponseDTO {
  idCompra: number;
  folio: string;
  fecha: string;
  proveedor: ProveedorResponseDTO;
  usuarioRegistra: UsuarioResponseDTO;
  tasaIva: number;
  observaciones?: string;
}

export interface DetalleCompraRequestDTO {
  idCompra: number;
  idProducto: number;
  cantidad: number;
  precioUnitario: number;
}

export interface DetalleCompraResponseDTO {
  idDetalleCompra: number;
  idCompra: number;
  producto: ProductoResponseDTO;
  cantidad: number;
  precioUnitario: number;
}

// =============================================================================
// MÓDULO: AUDITORÍA DEL SISTEMA
// =============================================================================

export interface LogAuditoriaRequestDTO {
  idUsuario?: number;
  fechaHora?: string;
  tipoEvento: string;
  modulo: string;
  accion: string;
  entidad: string;
  idEntidad?: number;
  ipOrigen?: string;
  userAgent?: string;
  detalle?: string; // JSONB en PostgreSQL
}

export interface LogAuditoriaResponseDTO {
  idLog: number;
  usuario?: UsuarioResponseDTO;
  fechaHora: string;
  tipoEvento: string;
  modulo: string;
  accion: string;
  entidad: string;
  idEntidad?: number;
  ipOrigen?: string;
  userAgent?: string;
  detalle?: string;
}
