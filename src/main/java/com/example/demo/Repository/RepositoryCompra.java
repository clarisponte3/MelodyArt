package com.sonorasync.repository;
import com.sonorasync.model.Compra;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryCompra extends JpaRepository<Compra, Long> {}