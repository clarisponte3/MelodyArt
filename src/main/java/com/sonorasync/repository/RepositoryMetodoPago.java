package com.sonorasync.repository;
import com.sonorasync.model.MetodoPago;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryMetodoPago extends JpaRepository<MetodoPago, Long> {}