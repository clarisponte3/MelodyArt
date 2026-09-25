package com.sonorasync.repository;
import com.sonorasync.model.EstadoCuenta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryEstadoCuenta extends JpaRepository<EstadoCuenta, Long> {}