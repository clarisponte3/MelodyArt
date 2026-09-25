package com.sonorasync.service;
import com.sonorasync.dao.DaoProducto;
import com.sonorasync.model.Producto;
import com.sonorasync.repository.RepositoryProducto;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServiceProducto {
    @Autowired private RepositoryProducto repository;
    public List<DaoProducto> findAll() { return repository.findAll().stream().map(this::toDao).collect(Collectors.toList()); }
    public DaoProducto findById(Long id) { return repository.findById(id).map(this::toDao).orElse(null); }
    public DaoProducto save(DaoProducto dao) { return toDao(repository.save(toEntity(dao))); }
    public DaoProducto update(Long id, DaoProducto dao) {
        if (repository.existsById(id)) { Producto entity = toEntity(dao); entity.setIdProducto(id); return toDao(repository.save(entity)); } return null;
    }
    public void delete(Long id) { repository.deleteById(id); }
    private DaoProducto toDao(Producto entity) { DaoProducto dao = new DaoProducto(); BeanUtils.copyProperties(entity, dao); return dao; }
    private Producto toEntity(DaoProducto dao) { Producto entity = new Producto(); BeanUtils.copyProperties(dao, entity); return entity; }
}