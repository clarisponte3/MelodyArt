package com.sonorasync.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO de respuesta para el endpoint de autenticación {@code POST /api/auth/login}.
 *
 * <p>Incluye el token JWT y los datos básicos del usuario autenticado,
 * sin exponer información sensible como la contraseña o los intentos fallidos.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponseDTO {

    /**
     * Token JWT firmado. El cliente debe enviarlo en el header
     * {@code Authorization: Bearer <token>} en cada petición subsecuente.
     */
    private String token;

    /**
     * Tipo de token. Siempre "Bearer" para JWT.
     */
    @Builder.Default
    @JsonProperty("token_type")
    private String tokenType = "Bearer";

    /**
     * Tiempo de expiración en milisegundos (relativo al momento de emisión).
     * Permite al cliente calcular cuándo refrescar el token sin decodificarlo.
     */
    @JsonProperty("expires_in")
    private long expiresIn;

    // -------------------------------------------------------------------------
    // Datos básicos del usuario autenticado (sin datos sensibles)
    // -------------------------------------------------------------------------

    /** ID único del usuario en la base de datos. */
    @JsonProperty("user_id")
    private Long userId;

    /** Correo electrónico del usuario (identificador único). */
    private String correo;

    /** Nombre completo del usuario para personalización del frontend. */
    private String nombre;
}
