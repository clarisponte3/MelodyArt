package com.sonorasync.service;
import com.sonorasync.dao.DaoMetodoPago;
import com.sonorasync.model.MetodoPago;
import com.sonorasync.repository.RepositoryMetodoPago;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServiceMetodoPago {
    @Autowired private RepositoryMetodoPago repository;
    public List<DaoMetodoPago> findAll() { return repository.findAll().stream().map(this::toDao).collect(Collectors.toList()); }
    public DaoMetodoPago findById(Long id) { return repository.findById(id).map(this::toDao).orElse(null); }
    public DaoMetodoPago save(DaoMetodoPago dao) { return toDao(repository.save(toEntity(dao))); }
    public DaoMetodoPago update(Long id, DaoMetodoPago dao) {
        if (repository.existsById(id)) { MetodoPago entity = toEntity(dao); entity.setIdMetodoPago(id); return toDao(repository.save(entity)); } return null;
    }
    public void delete(Long id) { repository.deleteById(id); }
    private DaoMetodoPago toDao(MetodoPago entity) { DaoMetodoPago dao = new DaoMetodoPago(); BeanUtils.copyProperties(entity, dao); return dao; }
    private MetodoPago toEntity(DaoMetodoPago dao) { MetodoPago entity = new MetodoPago(); BeanUtils.copyProperties(dao, entity); return entity; }
}