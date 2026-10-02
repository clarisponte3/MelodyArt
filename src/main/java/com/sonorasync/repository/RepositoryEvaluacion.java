package com.sonorasync.repository;
import com.sonorasync.model.Evaluacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryEvaluacion extends JpaRepository<Evaluacion, Long> {}