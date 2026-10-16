package com.sonorasync.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * Filtro JWT que intercepta cada petición HTTP exactamente una vez.
 *
 * <p>Flujo de validación:
 * <ol>
 *   <li>Lee el header {@code Authorization: Bearer <token>}.</li>
 *   <li>Si no existe o no empieza por "Bearer ", deja pasar la petición sin autenticar.</li>
 *   <li>Extrae el username (correo) del token via {@link JwtService}.</li>
 *   <li>Si el usuario aún no está autenticado en el {@code SecurityContext}, carga
 *       sus detalles desde {@link CustomUserDetailsService}.</li>
 *   <li>Valida el token (firma, expiración, coincidencia de usuario).</li>
 *   <li>Si es válido, establece la autenticación en el {@link SecurityContextHolder}.</li>
 * </ol>
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final String AUTHORIZATION_HEADER = "Authorization";
    private static final String BEARER_PREFIX = "Bearer ";

    private final JwtService jwtService;
    private final CustomUserDetailsService customUserDetailsService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        final String authHeader = request.getHeader(AUTHORIZATION_HEADER);

        // Si no hay header o no es un token Bearer, continuar sin autenticar
        if (authHeader == null || !authHeader.startsWith(BEARER_PREFIX)) {
            filterChain.doFilter(request, response);
            return;
        }

        final String jwt = authHeader.substring(BEARER_PREFIX.length());
        String username = null;

        try {
            username = jwtService.extractUsername(jwt);
        } catch (Exception e) {
            // Token malformado o con firma inválida. Se loguea y se deja continuar
            // sin autenticar; Spring Security devolverá 401 por las rutas protegidas.
            log.warn("No se pudo extraer el username del token JWT: {}", e.getMessage());
            filterChain.doFilter(request, response);
            return;
        }

        // Solo autenticar si el username es válido y no hay autenticación previa en el contexto
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails;
            try {
                userDetails = customUserDetailsService.loadUserByUsername(username);
            } catch (Exception e) {
                log.warn("Usuario del token no encontrado en base de datos: {}", username);
                filterChain.doFilter(request, response);
                return;
            }

            if (jwtService.isTokenValid(jwt, userDetails)) {
                // Construir objeto de autenticación con las autoridades del usuario
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,                        // credentials nulo: ya está verificado
                                userDetails.getAuthorities()
                        );

                // Enriquecer con detalles de la petición (IP, session ID, etc.)
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // Establecer la autenticación en el SecurityContext para esta petición
                SecurityContextHolder.getContext().setAuthentication(authToken);
                log.debug("Usuario autenticado via JWT: {}", username);
            } else {
                log.warn("Token JWT inválido o expirado para el usuario: {}", username);
            }
        }

        filterChain.doFilter(request, response);
    }
}
