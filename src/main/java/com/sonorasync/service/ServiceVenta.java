package com.sonorasync.service;
import com.sonorasync.dao.DaoVenta;
import com.sonorasync.model.Venta;
import com.sonorasync.repository.RepositoryVenta;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServiceVenta {
    @Autowired private RepositoryVenta repository;
    public List<DaoVenta> findAll() { return repository.findAll().stream().map(this::toDao).collect(Collectors.toList()); }
    public DaoVenta findById(Long id) { return repository.findById(id).map(this::toDao).orElse(null); }
    public DaoVenta save(DaoVenta dao) { return toDao(repository.save(toEntity(dao))); }
    public DaoVenta update(Long id, DaoVenta dao) {
        if (repository.existsById(id)) { Venta entity = toEntity(dao); entity.setIdVenta(id); return toDao(repository.save(entity)); } return null;
    }
    public void delete(Long id) { repository.deleteById(id); }
    private DaoVenta toDao(Venta entity) { DaoVenta dao = new DaoVenta(); BeanUtils.copyProperties(entity, dao); return dao; }
    private Venta toEntity(DaoVenta dao) { Venta entity = new Venta(); BeanUtils.copyProperties(dao, entity); return entity; }
}