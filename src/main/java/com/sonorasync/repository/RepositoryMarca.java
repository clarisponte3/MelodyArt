package com.sonorasync.repository;
import com.sonorasync.model.Marca;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryMarca extends JpaRepository<Marca, Long> {}