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
    public DaoUsuarioRol save(DaoUsuarioRol dao) {
        UsuarioRol entity = toEntity(dao);
        UsuarioRol.UsuarioRolId id = new UsuarioRol.UsuarioRolId();
        id.setIdUsuario(dao.getUsuario().getIdUsuario());
        id.setIdRol(dao.getRol().getIdRol());
        entity.setId(id);
        return toDao(repository.save(entity));
    }
    public void delete(Long idUsuario, Long idRol) {
        UsuarioRol.UsuarioRolId id = new UsuarioRol.UsuarioRolId();
        id.setIdUsuario(idUsuario);
        id.setIdRol(idRol);
        repository.deleteById(id);
    }

    private DaoUsuarioRol toDao(UsuarioRol entity) { DaoUsuarioRol dao = new DaoUsuarioRol(); BeanUtils.copyProperties(entity, dao); return dao; }
    private UsuarioRol toEntity(DaoUsuarioRol dao) { UsuarioRol entity = new UsuarioRol(); BeanUtils.copyProperties(dao, entity); return entity; }
}