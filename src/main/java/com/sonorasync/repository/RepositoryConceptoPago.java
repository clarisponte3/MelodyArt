package com.sonorasync.repository;
import com.sonorasync.model.ConceptoPago;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryConceptoPago extends JpaRepository<ConceptoPago, Long> {}