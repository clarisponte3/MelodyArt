package com.sonorasync.service;
import com.sonorasync.dao.DaoProveedor;
import com.sonorasync.model.Proveedor;
import com.sonorasync.repository.RepositoryProveedor;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServiceProveedor {
    @Autowired private RepositoryProveedor repository;
    public List<DaoProveedor> findAll() { return repository.findAll().stream().map(this::toDao).collect(Collectors.toList()); }
    public DaoProveedor findById(Long id) { return repository.findById(id).map(this::toDao).orElse(null); }
    public DaoProveedor save(DaoProveedor dao) { return toDao(repository.save(toEntity(dao))); }
    public DaoProveedor update(Long id, DaoProveedor dao) {
        if (repository.existsById(id)) { Proveedor entity = toEntity(dao); entity.setIdProveedor(id); return toDao(repository.save(entity)); } return null;
    }
    public void delete(Long id) { repository.deleteById(id); }
    private DaoProveedor toDao(Proveedor entity) { DaoProveedor dao = new DaoProveedor(); BeanUtils.copyProperties(entity, dao); return dao; }
    private Proveedor toEntity(DaoProveedor dao) { Proveedor entity = new Proveedor(); BeanUtils.copyProperties(dao, entity); return entity; }
}