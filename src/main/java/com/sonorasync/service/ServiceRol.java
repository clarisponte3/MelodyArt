package com.sonorasync.service;
import com.sonorasync.dao.DaoRol;
import com.sonorasync.model.Rol;
import com.sonorasync.repository.RepositoryRol;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServiceRol {
    @Autowired private RepositoryRol repository;

    public List<DaoRol> findAll() { return repository.findAll().stream().map(this::toDao).collect(Collectors.toList()); }
    public DaoRol findById(Long id) { return repository.findById(id).map(this::toDao).orElse(null); }
    public DaoRol save(DaoRol dao) { return toDao(repository.save(toEntity(dao))); }
    public DaoRol update(Long id, DaoRol dao) {
        if (repository.existsById(id)) {
            Rol entity = toEntity(dao);
            entity.setIdRol(id);
            return toDao(repository.save(entity));
        }
        return null;
    }
    public void delete(Long id) { repository.deleteById(id); }

    private DaoRol toDao(Rol entity) { DaoRol dao = new DaoRol(); BeanUtils.copyProperties(entity, dao); return dao; }
    private Rol toEntity(DaoRol dao) { Rol entity = new Rol(); BeanUtils.copyProperties(dao, entity); return entity; }
}