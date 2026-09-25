package com.sonorasync.service;
import com.sonorasync.dao.DaoDetalleCompra;
import com.sonorasync.model.DetalleCompra;
import com.sonorasync.repository.RepositoryDetalleCompra;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServiceDetalleCompra {
    @Autowired private RepositoryDetalleCompra repository;
    public List<DaoDetalleCompra> findAll() { return repository.findAll().stream().map(this::toDao).collect(Collectors.toList()); }
    public DaoDetalleCompra findById(Long id) { return repository.findById(id).map(this::toDao).orElse(null); }
    public DaoDetalleCompra save(DaoDetalleCompra dao) { return toDao(repository.save(toEntity(dao))); }
    public DaoDetalleCompra update(Long id, DaoDetalleCompra dao) {
        if (repository.existsById(id)) { DetalleCompra entity = toEntity(dao); entity.setIdDetalleCompra(id); return toDao(repository.save(entity)); } return null;
    }
    public void delete(Long id) { repository.deleteById(id); }
    private DaoDetalleCompra toDao(DetalleCompra entity) { DaoDetalleCompra dao = new DaoDetalleCompra(); BeanUtils.copyProperties(entity, dao); return dao; }
    private DetalleCompra toEntity(DaoDetalleCompra dao) { DetalleCompra entity = new DetalleCompra(); BeanUtils.copyProperties(dao, entity); return entity; }
}