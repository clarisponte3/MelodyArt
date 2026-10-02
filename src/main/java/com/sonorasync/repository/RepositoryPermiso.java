package com.sonorasync.repository;
import com.sonorasync.model.Permiso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryPermiso extends JpaRepository<Permiso, Long> {}