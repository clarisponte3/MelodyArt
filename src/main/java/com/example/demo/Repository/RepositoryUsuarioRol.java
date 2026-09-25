package com.sonorasync.repository;
import com.sonorasync.model.UsuarioRol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryUsuarioRol extends JpaRepository<UsuarioRol, UsuarioRol.UsuarioRolId> {}