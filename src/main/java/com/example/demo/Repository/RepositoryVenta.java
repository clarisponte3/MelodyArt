package com.sonorasync.repository;
import com.sonorasync.model.Venta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryVenta extends JpaRepository<Venta, Long> {}