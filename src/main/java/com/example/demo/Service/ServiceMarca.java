package com.sonorasync.service;
import com.sonorasync.dao.DaoMarca;
import com.sonorasync.model.Marca;
import com.sonorasync.repository.RepositoryMarca;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServiceMarca {
    @Autowired private RepositoryMarca repository;
    public List<DaoMarca> findAll() { return repository.findAll().stream().map(this::toDao).collect(Collectors.toList()); }
    public DaoMarca findById(Long id) { return repository.findById(id).map(this::toDao).orElse(null); }
    public DaoMarca save(DaoMarca dao) { return toDao(repository.save(toEntity(dao))); }
    public DaoMarca update(Long id, DaoMarca dao) {
        if (repository.existsById(id)) { Marca entity = toEntity(dao); entity.setIdMarca(id); return toDao(repository.save(entity)); } return null;
    }
    public void delete(Long id) { repository.deleteById(id); }
    private DaoMarca toDao(Marca entity) { DaoMarca dao = new DaoMarca(); BeanUtils.copyProperties(entity, dao); return dao; }
    private Marca toEntity(DaoMarca dao) { Marca entity = new Marca(); BeanUtils.copyProperties(dao, entity); return entity; }
}