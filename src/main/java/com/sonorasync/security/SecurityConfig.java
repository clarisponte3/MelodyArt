package com.sonorasync.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

/**
 * Configuración central de Spring Security.
 *
 * <p>Define el {@link SecurityFilterChain} con las siguientes políticas:
 * <ul>
 *   <li><b>CSRF</b>: Deshabilitado (API REST stateless; el token JWT reemplaza la protección CSRF).</li>
 *   <li><b>Sesiones</b>: {@code STATELESS} — Spring Security no crea ni usa sesiones HTTP.</li>
 *   <li><b>CORS</b>: Permisivo para todos los orígenes y métodos (apropiado para desarrollo;
 *       restringir a dominios específicos en producción).</li>
 *   <li><b>Rutas públicas</b>: {@code /api/auth/**} accesible sin token.</li>
 *   <li><b>Resto</b>: Requiere autenticación JWT válida.</li>
 *   <li><b>Filtro JWT</b>: Se registra antes de {@link UsernamePasswordAuthenticationFilter}.</li>
 * </ul>
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity                // Habilita @PreAuthorize / @PostAuthorize para control fino por método
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final AuthenticationProvider authenticationProvider;

    /**
     * Define la cadena de filtros de seguridad de la aplicación.
     *
     * @param http el objeto {@link HttpSecurity} proporcionado por Spring Security
     * @return el {@link SecurityFilterChain} configurado
     * @throws Exception si falla alguna configuración de seguridad
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // 1. Deshabilitar CSRF: innecesario en APIs REST con JWT stateless
                .csrf(AbstractHttpConfigurer::disable)

                // 2. Configuración de CORS: permisiva para desarrollo/integración con frontend
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                // 3. Autorización de rutas
                .authorizeHttpRequests(auth -> auth
                        // Rutas públicas: login y registro (Fase 7 puede agregar /api/auth/register)
                        .requestMatchers("/api/auth/**").permitAll()
                        // Todo lo demás requiere autenticación JWT válida
                        .anyRequest().authenticated()
                )

                // 4. Política de sesiones: STATELESS (no se almacena estado en el servidor)
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                // 5. Registrar el AuthenticationProvider personalizado (DaoAuthenticationProvider)
                .authenticationProvider(authenticationProvider)

                // 6. Insertar el filtro JWT ANTES del filtro de autenticación por formulario
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    /**
     * Configuración de CORS permisiva para todos los orígenes.
     *
     * <p><b>Nota para producción en Render:</b> Reemplazar {@code "*"} en
     * {@code allowedOriginPatterns} con el dominio real del frontend
     * (ej. {@code "https://melodart.onrender.com"}) antes del despliegue final.
     *
     * @return la fuente de configuración CORS para Spring MVC
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // Permite cualquier origen (usar allowedOriginPatterns en lugar de allowedOrigins
        // para compatibilidad con allowCredentials si se necesita en el futuro)
        configuration.setAllowedOriginPatterns(List.of("*"));

        // Métodos HTTP permitidos
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));

        // Headers permitidos en la petición (incluye Authorization para el JWT)
        configuration.setAllowedHeaders(List.of("*"));

        // Exponer el header Authorization en la respuesta (útil si el token se renueva)
        configuration.setExposedHeaders(List.of("Authorization"));

        // Permitir credenciales (cookies, Authorization header)
        configuration.setAllowCredentials(true);

        // Pre-flight cache: 1 hora
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
