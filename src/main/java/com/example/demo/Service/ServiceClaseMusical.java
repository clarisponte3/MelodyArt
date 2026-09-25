package com.sonorasync.service;
import com.sonorasync.dao.DaoClaseMusical;
import com.sonorasync.model.ClaseMusical;
import com.sonorasync.repository.RepositoryClaseMusical;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServiceClaseMusical {
    @Autowired private RepositoryClaseMusical repository;
    public List<DaoClaseMusical> findAll() { return repository.findAll().stream().map(this::toDao).collect(Collectors.toList()); }
    public DaoClaseMusical findById(Long id) { return repository.findById(id).map(this::toDao).orElse(null); }
    public DaoClaseMusical save(DaoClaseMusical dao) { return toDao(repository.save(toEntity(dao))); }
    public DaoClaseMusical update(Long id, DaoClaseMusical dao) {
        if (repository.existsById(id)) { ClaseMusical entity = toEntity(dao); entity.setIdClase(id); return toDao(repository.save(entity)); } return null;
    }
    public void delete(Long id) { repository.deleteById(id); }
    private DaoClaseMusical toDao(ClaseMusical entity) { DaoClaseMusical dao = new DaoClaseMusical(); BeanUtils.copyProperties(entity, dao); return dao; }
    private ClaseMusical toEntity(DaoClaseMusical dao) { ClaseMusical entity = new ClaseMusical(); BeanUtils.copyProperties(dao, entity); return entity; }
}