package com.sonorasync.service;
import com.sonorasync.dao.DaoCompra;
import com.sonorasync.model.Compra;
import com.sonorasync.repository.RepositoryCompra;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServiceCompra {
    @Autowired private RepositoryCompra repository;
    public List<DaoCompra> findAll() { return repository.findAll().stream().map(this::toDao).collect(Collectors.toList()); }
    public DaoCompra findById(Long id) { return repository.findById(id).map(this::toDao).orElse(null); }
    public DaoCompra save(DaoCompra dao) { return toDao(repository.save(toEntity(dao))); }
    public DaoCompra update(Long id, DaoCompra dao) {
        if (repository.existsById(id)) { Compra entity = toEntity(dao); entity.setIdCompra(id); return toDao(repository.save(entity)); } return null;
    }
    public void delete(Long id) { repository.deleteById(id); }
    private DaoCompra toDao(Compra entity) { DaoCompra dao = new DaoCompra(); BeanUtils.copyProperties(entity, dao); return dao; }
    private Compra toEntity(DaoCompra dao) { Compra entity = new Compra(); BeanUtils.copyProperties(dao, entity); return entity; }
}