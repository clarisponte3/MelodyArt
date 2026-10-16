package com.sonorasync.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * Configuración de los beans de seguridad fundamentales para la autenticación.
 *
 * <p>Esta clase expone tres beans esenciales que se reutilizan en otros componentes
 * de seguridad (SecurityFilterChain, AuthController):
 * <ul>
 *   <li>{@link PasswordEncoder} — BCrypt para hash de contraseñas.</li>
 *   <li>{@link AuthenticationProvider} — DaoAuthenticationProvider conectado con
 *       nuestro {@link CustomUserDetailsService} y el BCryptPasswordEncoder.</li>
 *   <li>{@link AuthenticationManager} — Punto de entrada para disparar la autenticación
 *       desde el {@code AuthController}.</li>
 * </ul>
 *
 * <p>Se mantiene separada de {@code SecurityConfig} (que define el {@code SecurityFilterChain})
 * para evitar dependencias circulares y respetar el principio de responsabilidad única.
 */
@Configuration
@RequiredArgsConstructor
public class SecurityBeansConfig {

    private final CustomUserDetailsService customUserDetailsService;

    /**
     * Encoder de contraseñas usando BCrypt con el factor de costo por defecto (10).
     * Es el estándar de la industria para almacenar contraseñas de forma segura.
     *
     * @return instancia de {@link BCryptPasswordEncoder}
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Proveedor de autenticación DAO que delega la búsqueda de usuarios a
     * {@link CustomUserDetailsService} y verifica la contraseña con BCrypt.
     *
     * @return instancia configurada de {@link DaoAuthenticationProvider}
     */
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(customUserDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    /**
     * Expone el {@link AuthenticationManager} gestionado por Spring Security.
     * Necesario para disparar la autenticación manualmente desde {@code AuthController}
     * al procesar el endpoint {@code POST /api/auth/login}.
     *
     * @param config la configuración de autenticación de Spring Security
     * @return el {@link AuthenticationManager} configurado
     * @throws Exception si Spring Security no puede resolver el AuthenticationManager
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
