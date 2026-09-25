package com.sonorasync.service;
import com.sonorasync.dao.DaoCategoria;
import com.sonorasync.model.Categoria;
import com.sonorasync.repository.RepositoryCategoria;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServiceCategoria {
    @Autowired private RepositoryCategoria repository;
    public List<DaoCategoria> findAll() { return repository.findAll().stream().map(this::toDao).collect(Collectors.toList()); }
    public DaoCategoria findById(Long id) { return repository.findById(id).map(this::toDao).orElse(null); }
    public DaoCategoria save(DaoCategoria dao) { return toDao(repository.save(toEntity(dao))); }
    public DaoCategoria update(Long id, DaoCategoria dao) {
        if (repository.existsById(id)) { Categoria entity = toEntity(dao); entity.setIdCategoria(id); return toDao(repository.save(entity)); } return null;
    }
    public void delete(Long id) { repository.deleteById(id); }
    private DaoCategoria toDao(Categoria entity) { DaoCategoria dao = new DaoCategoria(); BeanUtils.copyProperties(entity, dao); return dao; }
    private Categoria toEntity(DaoCategoria dao) { Categoria entity = new Categoria(); BeanUtils.copyProperties(dao, entity); return entity; }
}