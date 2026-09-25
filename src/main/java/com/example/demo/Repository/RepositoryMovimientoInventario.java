package com.sonorasync.repository;
import com.sonorasync.model.MovimientoInventario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryMovimientoInventario extends JpaRepository<MovimientoInventario, Long> {}