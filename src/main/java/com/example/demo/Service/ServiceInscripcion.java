package com.sonorasync.service;
import com.sonorasync.dao.DaoInscripcion;
import com.sonorasync.model.Inscripcion;
import com.sonorasync.repository.RepositoryInscripcion;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServiceInscripcion {
    @Autowired private RepositoryInscripcion repository;
    public List<DaoInscripcion> findAll() { return repository.findAll().stream().map(this::toDao).collect(Collectors.toList()); }
    public DaoInscripcion findById(Long id) { return repository.findById(id).map(this::toDao).orElse(null); }
    public DaoInscripcion save(DaoInscripcion dao) { return toDao(repository.save(toEntity(dao))); }
    public DaoInscripcion update(Long id, DaoInscripcion dao) {
        if (repository.existsById(id)) { Inscripcion entity = toEntity(dao); entity.setIdInscripcion(id); return toDao(repository.save(entity)); } return null;
    }
    public void delete(Long id) { repository.deleteById(id); }
    private DaoInscripcion toDao(Inscripcion entity) { DaoInscripcion dao = new DaoInscripcion(); BeanUtils.copyProperties(entity, dao); return dao; }
    private Inscripcion toEntity(DaoInscripcion dao) { Inscripcion entity = new Inscripcion(); BeanUtils.copyProperties(dao, entity); return entity; }
}