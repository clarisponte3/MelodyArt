package com.sonorasync.service;
import com.sonorasync.dao.DaoDetalleVenta;
import com.sonorasync.model.DetalleVenta;
import com.sonorasync.repository.RepositoryDetalleVenta;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServiceDetalleVenta {
    @Autowired private RepositoryDetalleVenta repository;
    public List<DaoDetalleVenta> findAll() { return repository.findAll().stream().map(this::toDao).collect(Collectors.toList()); }
    public DaoDetalleVenta findById(Long id) { return repository.findById(id).map(this::toDao).orElse(null); }
    public DaoDetalleVenta save(DaoDetalleVenta dao) { return toDao(repository.save(toEntity(dao))); }
    public DaoDetalleVenta update(Long id, DaoDetalleVenta dao) {
        if (repository.existsById(id)) { DetalleVenta entity = toEntity(dao); entity.setIdDetalleVenta(id); return toDao(repository.save(entity)); } return null;
    }
    public void delete(Long id) { repository.deleteById(id); }
    private DaoDetalleVenta toDao(DetalleVenta entity) { DaoDetalleVenta dao = new DaoDetalleVenta(); BeanUtils.copyProperties(entity, dao); return dao; }
    private DetalleVenta toEntity(DaoDetalleVenta dao) { DetalleVenta entity = new DetalleVenta(); BeanUtils.copyProperties(dao, entity); return entity; }
}