package com.sonorasync.repository;
import com.sonorasync.model.DetalleCompra;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryDetalleCompra extends JpaRepository<DetalleCompra, Long> {}