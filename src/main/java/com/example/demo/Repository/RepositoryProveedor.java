package com.sonorasync.repository;
import com.sonorasync.model.Proveedor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryProveedor extends JpaRepository<Proveedor, Long> {}