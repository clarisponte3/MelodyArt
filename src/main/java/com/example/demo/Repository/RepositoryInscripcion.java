package com.sonorasync.repository;
import com.sonorasync.model.Inscripcion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryInscripcion extends JpaRepository<Inscripcion, Long> {}