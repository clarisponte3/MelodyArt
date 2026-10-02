package com.sonorasync.repository;
import com.sonorasync.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryCategoria extends JpaRepository<Categoria, Long> {}