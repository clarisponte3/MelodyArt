package com.sonorasync.repository;
import com.sonorasync.model.BitacoraProgreso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryBitacoraProgreso extends JpaRepository<BitacoraProgreso, Long> {}