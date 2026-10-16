package com.sonorasync.repository;

import com.sonorasync.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RepositoryUsuario extends JpaRepository<Usuario, Long> {

    /**
     * Busca un usuario por su correo electrónico.
     * Utilizado por CustomUserDetailsService para la autenticación JWT.
     *
     * @param correo el correo electrónico del usuario
     * @return un Optional con el Usuario si existe, o vacío si no se encuentra
     */
    Optional<Usuario> findByCorreo(String correo);
}