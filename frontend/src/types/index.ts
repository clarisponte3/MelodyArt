/**
 * Exportaciones principales de tipos de SonoraSync / MelodyArt
 */

export * from './api';

export type UserRole =
  | 'ROLE_ADMIN'
  | 'ROLE_ADMINISTRADOR'
  | 'ROLE_USER'
  | 'ROLE_ALUMNO'
  | 'ROLE_DOCENTE'
  | 'ROLE_MAESTRO'
  | 'ROLE_VENDEDOR';

export interface UserSession {
  userId: number;
  correo: string;
  nombre: string;
  role: UserRole;
  token: string;
  tokenType: string;
  expiresIn: number;
  expiresAt: number; // Timestamp en milisegundos
}

export interface CartItem {
  producto: import('./api').ProductoResponseDTO;
  cantidad: number;
}
