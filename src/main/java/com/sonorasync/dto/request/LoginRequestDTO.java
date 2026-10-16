package com.sonorasync.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO de entrada para el endpoint de autenticación {@code POST /api/auth/login}.
 *
 * <p>Aplica validaciones estrictas para no procesar peticiones malformadas
 * antes de intentar la autenticación.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequestDTO {

    /**
     * Correo electrónico del usuario. Actúa como username en el sistema JWT.
     * Validaciones: no vacío, formato de email válido.
     */
    @NotBlank(message = "El correo es obligatorio")
    @Email(message = "El correo debe tener un formato válido")
    private String correo;

    /**
     * Contraseña en texto plano enviada por el cliente.
     * El AuthenticationManager la verificará contra el hash BCrypt almacenado.
     */
    @NotBlank(message = "La contraseña es obligatoria")
    private String contrasena;
}
