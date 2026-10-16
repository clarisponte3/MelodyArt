package com.sonorasync.controller;

import com.sonorasync.dto.request.LoginRequestDTO;
import com.sonorasync.dto.response.AuthResponseDTO;
import com.sonorasync.model.Usuario;
import com.sonorasync.repository.RepositoryUsuario;
import com.sonorasync.security.JwtService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controlador de autenticación. Expone los endpoints públicos del módulo de seguridad.
 *
 * <p>Endpoints:
 * <ul>
 *   <li>{@code POST /api/auth/login} — Autentica al usuario y devuelve un token JWT.</li>
 * </ul>
 *
 * <p>No requiere autenticación previa (configurado como ruta pública en {@code SecurityConfig}).
 */
@Slf4j
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final RepositoryUsuario repositoryUsuario;

    @Value("${jwt.expiration-ms}")
    private long jwtExpirationMs;

    /**
     * Autentica al usuario con correo y contraseña, y devuelve un JWT válido.
     *
     * <p>Flujo:
     * <ol>
     *   <li>Valida el {@link LoginRequestDTO} (formato de correo, campos no vacíos).</li>
     *   <li>Delega la autenticación al {@link AuthenticationManager}:
     *       si las credenciales son incorrectas, lanza {@code BadCredentialsException}
     *       (interceptada por {@code GlobalExceptionHandler} → 400).</li>
     *   <li>Genera el JWT con {@link JwtService}.</li>
     *   <li>Carga los datos básicos del usuario para enriquecer la respuesta.</li>
     *   <li>Devuelve {@link AuthResponseDTO} con el token y los datos del usuario.</li>
     * </ol>
     *
     * @param loginRequest credenciales del usuario (correo + contraseña en texto plano)
     * @return {@code 200 OK} con el token JWT y datos básicos del usuario
     */
    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@Valid @RequestBody LoginRequestDTO loginRequest) {
        log.info("Intento de login para el correo: {}", loginRequest.getCorreo());

        // 1. Autenticar con Spring Security (BCrypt verifica la contraseña automáticamente)
        //    Si las credenciales son inválidas, AuthenticationManager lanza BadCredentialsException.
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getCorreo(),
                        loginRequest.getContrasena()
                )
        );

        // 2. Obtener el UserDetails del principal autenticado
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        // 3. Generar el JWT
        String token = jwtService.generateToken(userDetails);
        log.info("Login exitoso para el correo: {}", loginRequest.getCorreo());

        // 4. Cargar datos básicos del usuario desde la base de datos para la respuesta
        //    (UserDetails de Spring solo expone username y authorities, no nombre/apellidos)
        Usuario usuario = repositoryUsuario.findByCorreo(loginRequest.getCorreo())
                .orElseThrow(); // No puede fallar: el usuario fue autenticado en el paso 1

        // 5. Construir y devolver la respuesta
        AuthResponseDTO response = AuthResponseDTO.builder()
                .token(token)
                .tokenType("Bearer")
                .expiresIn(jwtExpirationMs)
                .userId(usuario.getIdUsuario())
                .correo(usuario.getCorreo())
                .nombre(usuario.getNombre() + " " + usuario.getApellidos())
                .build();

        return ResponseEntity.ok(response);
    }
}
