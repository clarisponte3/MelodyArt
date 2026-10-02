package com.sonorasync.service;
import com.sonorasync.dao.DaoEvaluacion;
import com.sonorasync.model.Evaluacion;
import com.sonorasync.repository.RepositoryEvaluacion;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServiceEvaluacion {
    @Autowired private RepositoryEvaluacion repository;
    public List<DaoEvaluacion> findAll() { return repository.findAll().stream().map(this::toDao).collect(Collectors.toList()); }
    public DaoEvaluacion findById(Long id) { return repository.findById(id).map(this::toDao).orElse(null); }
    public DaoEvaluacion save(DaoEvaluacion dao) { return toDao(repository.save(toEntity(dao))); }
    public DaoEvaluacion update(Long id, DaoEvaluacion dao) {
        if (repository.existsById(id)) { Evaluacion entity = toEntity(dao); entity.setIdEvaluacion(id); return toDao(repository.save(entity)); } return null;
    }
    public void delete(Long id) { repository.deleteById(id); }
    private DaoEvaluacion toDao(Evaluacion entity) { DaoEvaluacion dao = new DaoEvaluacion(); BeanUtils.copyProperties(entity, dao); return dao; }
    private Evaluacion toEntity(DaoEvaluacion dao) { Evaluacion entity = new Evaluacion(); BeanUtils.copyProperties(dao, entity); return entity; }
}