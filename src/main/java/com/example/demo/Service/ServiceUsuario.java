package com.sonorasync.service;
import com.sonorasync.dao.DaoUsuario;
import com.sonorasync.model.Usuario;
import com.sonorasync.repository.RepositoryUsuario;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServiceUsuario {
    @Autowired private RepositoryUsuario repository;

    public List<DaoUsuario> findAll() {
        return repository.findAll().stream().map(this::toDao).collect(Collectors.toList());
    }
    public DaoUsuario findById(Long id) {
        return repository.findById(id).map(this::toDao).orElse(null);
    }
    public DaoUsuario save(DaoUsuario dao) {
        Usuario entity = toEntity(dao);
        return toDao(repository.save(entity));
    }
    public DaoUsuario update(Long id, DaoUsuario dao) {
        if (repository.existsById(id)) {
            Usuario entity = toEntity(dao);
            entity.setIdUsuario(id);
            return toDao(repository.save(entity));
        }
        return null;
    }
    public void delete(Long id) { repository.deleteById(id); }

    private DaoUsuario toDao(Usuario entity) {
        DaoUsuario dao = new DaoUsuario();
        BeanUtils.copyProperties(entity, dao);
        return dao;
    }
    private Usuario toEntity(DaoUsuario dao) {
        Usuario entity = new Usuario();
        BeanUtils.copyProperties(dao, entity);
        return entity;
    }
}