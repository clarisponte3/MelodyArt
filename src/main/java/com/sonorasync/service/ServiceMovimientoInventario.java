package com.sonorasync.service;
import com.sonorasync.dao.DaoMovimientoInventario;
import com.sonorasync.model.MovimientoInventario;
import com.sonorasync.repository.RepositoryMovimientoInventario;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServiceMovimientoInventario {
    @Autowired private RepositoryMovimientoInventario repository;
    public List<DaoMovimientoInventario> findAll() { return repository.findAll().stream().map(this::toDao).collect(Collectors.toList()); }
    public DaoMovimientoInventario findById(Long id) { return repository.findById(id).map(this::toDao).orElse(null); }
    public DaoMovimientoInventario save(DaoMovimientoInventario dao) { return toDao(repository.save(toEntity(dao))); }
    public DaoMovimientoInventario update(Long id, DaoMovimientoInventario dao) {
        if (repository.existsById(id)) { MovimientoInventario entity = toEntity(dao); entity.setIdMovimiento(id); return toDao(repository.save(entity)); } return null;
    }
    public void delete(Long id) { repository.deleteById(id); }
    private DaoMovimientoInventario toDao(MovimientoInventario entity) { DaoMovimientoInventario dao = new DaoMovimientoInventario(); BeanUtils.copyProperties(entity, dao); return dao; }
    private MovimientoInventario toEntity(DaoMovimientoInventario dao) { MovimientoInventario entity = new MovimientoInventario(); BeanUtils.copyProperties(dao, entity); return entity; }
}