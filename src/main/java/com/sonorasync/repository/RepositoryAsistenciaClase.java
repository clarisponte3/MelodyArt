package com.sonorasync.repository;
import com.sonorasync.model.AsistenciaClase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryAsistenciaClase extends JpaRepository<AsistenciaClase, Long> {}