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
    public DaoRolPermiso findById(RolPermiso.RolPermisoId id) { return repository.findById(id).map(this::toDao).orElse(null); }
    public DaoRolPermiso save(DaoRolPermiso dao) { return toDao(repository.save(toEntity(dao))); }
    public void delete(RolPermiso.RolPermisoId id) { repository.deleteById(id); }
    private DaoRolPermiso toDao(RolPermiso entity) { 
        DaoRolPermiso dao = new DaoRolPermiso(); 
        BeanUtils.copyProperties(entity, dao); 
        if(entity.getRol() != null) dao.setIdRol(entity.getRol().getIdRol());
        if(entity.getPermiso() != null) dao.setIdPermiso(entity.getPermiso().getIdPermiso());
        return dao; 
    }
    private RolPermiso toEntity(DaoRolPermiso dao) { 
        RolPermiso entity = new RolPermiso(); 
        BeanUtils.copyProperties(dao, entity); 
        RolPermiso.RolPermisoId id = new RolPermiso.RolPermisoId();
        if(dao.getIdRol() != null) id.setIdRol(dao.getIdRol());
        if(dao.getIdPermiso() != null) id.setIdPermiso(dao.getIdPermiso());
        entity.setId(id);
        return entity; 
    }
}
