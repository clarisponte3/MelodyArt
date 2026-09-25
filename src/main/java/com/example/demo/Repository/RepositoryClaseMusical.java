package com.sonorasync.repository;
import com.sonorasync.model.ClaseMusical;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryClaseMusical extends JpaRepository<ClaseMusical, Long> {}