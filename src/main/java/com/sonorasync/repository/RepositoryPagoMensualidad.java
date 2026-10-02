package com.sonorasync.repository;
import com.sonorasync.model.PagoMensualidad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryPagoMensualidad extends JpaRepository<PagoMensualidad, Long> {}