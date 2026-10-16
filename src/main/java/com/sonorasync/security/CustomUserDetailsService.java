package com.sonorasync.security;

import com.sonorasync.model.Usuario;
import com.sonorasync.repository.RepositoryUsuario;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Implementación de {@link UserDetailsService} que conecta la autenticación de
 * Spring Security con el modelo de dominio {@link Usuario}.
 *
 * <p>Carga el usuario por su correo electrónico (campo {@code correo}), que actúa
 * como identificador único para la autenticación JWT.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final RepositoryUsuario repositoryUsuario;

    /**
     * Busca al usuario en base de datos por correo electrónico y lo convierte
     * al objeto {@link UserDetails} que Spring Security puede usar internamente.
     *
     * @param correo el correo electrónico del usuario (actúa como username)
     * @return el UserDetails correspondiente al usuario encontrado
     * @throws UsernameNotFoundException si no existe ningún usuario con ese correo
     */
    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String correo) throws UsernameNotFoundException {
        log.debug("Buscando usuario por correo: {}", correo);

        Usuario usuario = repositoryUsuario.findByCorreo(correo)
                .orElseThrow(() -> {
                    log.warn("Intento de login con correo no registrado: {}", correo);
                    // Mensaje genérico para no revelar si el correo existe en el sistema
                    return new UsernameNotFoundException("Credenciales inválidas");
                });

        // Autoridades mínimas. En Fase 7+ se puede enriquecer con roles reales
        // consultando la tabla usuario_rol -> rol -> nombre.
        List<SimpleGrantedAuthority> authorities = List.of(
                new SimpleGrantedAuthority("ROLE_USER")
        );

        return User.builder()
                .username(usuario.getCorreo())
                .password(usuario.getContrasenaHash())
                .authorities(authorities)
                .accountLocked(isAccountLocked(usuario))
                .disabled(!Boolean.TRUE.equals(usuario.getActivo()))
                .build();
    }

    /**
     * Determina si la cuenta está bloqueada por exceso de intentos fallidos.
     * La cuenta se considera bloqueada si {@code bloqueadoHasta} es no nulo y
     * apunta a un instante en el futuro.
     */
    private boolean isAccountLocked(Usuario usuario) {
        if (usuario.getBloqueadoHasta() == null) {
            return false;
        }
        return usuario.getBloqueadoHasta().isAfter(java.time.LocalDateTime.now());
    }
}
