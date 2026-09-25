package com.sonorasync.service;
import com.sonorasync.dao.DaoConceptoPago;
import com.sonorasync.model.ConceptoPago;
import com.sonorasync.repository.RepositoryConceptoPago;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServiceConceptoPago {
    @Autowired private RepositoryConceptoPago repository;
    public List<DaoConceptoPago> findAll() { return repository.findAll().stream().map(this::toDao).collect(Collectors.toList()); }
    public DaoConceptoPago findById(Long id) { return repository.findById(id).map(this::toDao).orElse(null); }
    public DaoConceptoPago save(DaoConceptoPago dao) { return toDao(repository.save(toEntity(dao))); }
    public DaoConceptoPago update(Long id, DaoConceptoPago dao) {
        if (repository.existsById(id)) { ConceptoPago entity = toEntity(dao); entity.setIdConceptoPago(id); return toDao(repository.save(entity)); } return null;
    }
    public void delete(Long id) { repository.deleteById(id); }
    private DaoConceptoPago toDao(ConceptoPago entity) { DaoConceptoPago dao = new DaoConceptoPago(); BeanUtils.copyProperties(entity, dao); return dao; }
    private ConceptoPago toEntity(DaoConceptoPago dao) { ConceptoPago entity = new ConceptoPago(); BeanUtils.copyProperties(dao, entity); return entity; }
}