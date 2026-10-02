package com.sonorasync.service;

import com.sonorasync.dao.DaoUsuarioRol;
import com.sonorasync.model.UsuarioRol;
import com.sonorasync.repository.RepositoryUsuarioRol;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServiceUsuarioRol {
    @Autowired private RepositoryUsuarioRol repository;
    public List<DaoUsuarioRol> findAll() { return repository.findAll().stream().map(this::toDao).collect(Collectors.toList()); }
    public DaoUsuarioRol findById(UsuarioRol.UsuarioRolId id) { return repository.findById(id).map(this::toDao).orElse(null); }
    public DaoUsuarioRol save(DaoUsuarioRol dao) { return toDao(repository.save(toEntity(dao))); }
    public void delete(UsuarioRol.UsuarioRolId id) { repository.deleteById(id); }
    private DaoUsuarioRol toDao(UsuarioRol entity) { 
        DaoUsuarioRol dao = new DaoUsuarioRol(); 
        BeanUtils.copyProperties(entity, dao); 
        if(entity.getUsuario() != null) dao.setIdUsuario(entity.getUsuario().getIdUsuario());
        if(entity.getRol() != null) dao.setIdRol(entity.getRol().getIdRol());
        return dao; 
    }
    private UsuarioRol toEntity(DaoUsuarioRol dao) { 
        UsuarioRol entity = new UsuarioRol(); 
        BeanUtils.copyProperties(dao, entity); 
        UsuarioRol.UsuarioRolId id = new UsuarioRol.UsuarioRolId();
        if(dao.getIdUsuario() != null) id.setIdUsuario(dao.getIdUsuario());
        if(dao.getIdRol() != null) id.setIdRol(dao.getIdRol());
        entity.setId(id);
        return entity; 
    }
}
