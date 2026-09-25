package com.sonorasync.service;
import com.sonorasync.dao.DaoPermiso;
import com.sonorasync.model.Permiso;
import com.sonorasync.repository.RepositoryPermiso;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServicePermiso {
    @Autowired private RepositoryPermiso repository;

    public List<DaoPermiso> findAll() { return repository.findAll().stream().map(this::toDao).collect(Collectors.toList()); }
    public DaoPermiso findById(Long id) { return repository.findById(id).map(this::toDao).orElse(null); }
    public DaoPermiso save(DaoPermiso dao) { return toDao(repository.save(toEntity(dao))); }
    public DaoPermiso update(Long id, DaoPermiso dao) {
        if (repository.existsById(id)) {
            Permiso entity = toEntity(dao);
            entity.setIdPermiso(id);
            return toDao(repository.save(entity));
        }
        return null;
    }
    public void delete(Long id) { repository.deleteById(id); }

    private DaoPermiso toDao(Permiso entity) { DaoPermiso dao = new DaoPermiso(); BeanUtils.copyProperties(entity, dao); return dao; }
    private Permiso toEntity(DaoPermiso dao) { Permiso entity = new Permiso(); BeanUtils.copyProperties(dao, entity); return entity; }
}