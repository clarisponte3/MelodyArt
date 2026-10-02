package com.sonorasync.repository;
import com.sonorasync.model.Aula;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryAula extends JpaRepository<Aula, Long> {}