package com.sonorasync.service;
import com.sonorasync.dao.DaoRolPermiso;
import com.sonorasync.model.RolPermiso;
import com.sonorasync.repository.RepositoryRolPermiso;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServiceRolPermiso {
    @Autowired private RepositoryRolPermiso repository;

    public List<DaoRolPermiso> findAll() { return repository.findAll().stream().map(this::toDao).collect(Collectors.toList()); }
    public DaoRolPermiso save(DaoRolPermiso dao) {
        RolPermiso entity = toEntity(dao);
        RolPermiso.RolPermisoId id = new RolPermiso.RolPermisoId();
        id.setIdRol(dao.getRol().getIdRol());
        id.setIdPermiso(dao.getPermiso().getIdPermiso());
        entity.setId(id);
        return toDao(repository.save(entity));
    }
    public void delete(Long idRol, Long idPermiso) {
        RolPermiso.RolPermisoId id = new RolPermiso.RolPermisoId();
        id.setIdRol(idRol);
        id.setIdPermiso(idPermiso);
        repository.deleteById(id);
    }

    private DaoRolPermiso toDao(RolPermiso entity) { DaoRolPermiso dao = new DaoRolPermiso(); BeanUtils.copyProperties(entity, dao); return dao; }
    private RolPermiso toEntity(DaoRolPermiso dao) { RolPermiso entity = new RolPermiso(); BeanUtils.copyProperties(dao, entity); return entity; }
}