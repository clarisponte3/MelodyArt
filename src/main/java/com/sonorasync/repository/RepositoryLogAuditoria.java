package com.sonorasync.repository;
import com.sonorasync.model.LogAuditoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryLogAuditoria extends JpaRepository<LogAuditoria, Long> {}