package com.sonorasync.repository;
import com.sonorasync.model.DetalleVenta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryDetalleVenta extends JpaRepository<DetalleVenta, Long> {}