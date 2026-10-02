package com.sonorasync.repository;
import com.sonorasync.model.Rol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryRol extends JpaRepository<Rol, Long> {}