package com.sonorasync.repository;
import com.sonorasync.model.RolPermiso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryRolPermiso extends JpaRepository<RolPermiso, RolPermiso.RolPermisoId> {}