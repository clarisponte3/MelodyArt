package com.sonorasync.service;
import com.sonorasync.dao.DaoAula;
import com.sonorasync.model.Aula;
import com.sonorasync.repository.RepositoryAula;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServiceAula {
    @Autowired private RepositoryAula repository;
    public List<DaoAula> findAll() { return repository.findAll().stream().map(this::toDao).collect(Collectors.toList()); }
    public DaoAula findById(Long id) { return repository.findById(id).map(this::toDao).orElse(null); }
    public DaoAula save(DaoAula dao) { return toDao(repository.save(toEntity(dao))); }
    public DaoAula update(Long id, DaoAula dao) {
        if (repository.existsById(id)) { Aula entity = toEntity(dao); entity.setIdAula(id); return toDao(repository.save(entity)); } return null;
    }
    public void delete(Long id) { repository.deleteById(id); }
    private DaoAula toDao(Aula entity) { DaoAula dao = new DaoAula(); BeanUtils.copyProperties(entity, dao); return dao; }
    private Aula toEntity(DaoAula dao) { Aula entity = new Aula(); BeanUtils.copyProperties(dao, entity); return entity; }
}