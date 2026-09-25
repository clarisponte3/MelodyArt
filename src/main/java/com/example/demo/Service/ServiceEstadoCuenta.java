package com.sonorasync.service;
import com.sonorasync.dao.DaoEstadoCuenta;
import com.sonorasync.model.EstadoCuenta;
import com.sonorasync.repository.RepositoryEstadoCuenta;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServiceEstadoCuenta {
    @Autowired private RepositoryEstadoCuenta repository;
    public List<DaoEstadoCuenta> findAll() { return repository.findAll().stream().map(this::toDao).collect(Collectors.toList()); }
    public DaoEstadoCuenta findById(Long id) { return repository.findById(id).map(this::toDao).orElse(null); }
    public DaoEstadoCuenta save(DaoEstadoCuenta dao) { return toDao(repository.save(toEntity(dao))); }
    public DaoEstadoCuenta update(Long id, DaoEstadoCuenta dao) {
        if (repository.existsById(id)) { EstadoCuenta entity = toEntity(dao); entity.setIdEstadoCuenta(id); return toDao(repository.save(entity)); } return null;
    }
    public void delete(Long id) { repository.deleteById(id); }
    private DaoEstadoCuenta toDao(EstadoCuenta entity) { DaoEstadoCuenta dao = new DaoEstadoCuenta(); BeanUtils.copyProperties(entity, dao); return dao; }
    private EstadoCuenta toEntity(DaoEstadoCuenta dao) { EstadoCuenta entity = new EstadoCuenta(); BeanUtils.copyProperties(dao, entity); return entity; }
}