package com.sonorasync.service;
import com.sonorasync.dao.DaoAsistenciaClase;
import com.sonorasync.model.AsistenciaClase;
import com.sonorasync.repository.RepositoryAsistenciaClase;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServiceAsistenciaClase {
    @Autowired private RepositoryAsistenciaClase repository;
    public List<DaoAsistenciaClase> findAll() { return repository.findAll().stream().map(this::toDao).collect(Collectors.toList()); }
    public DaoAsistenciaClase findById(Long id) { return repository.findById(id).map(this::toDao).orElse(null); }
    public DaoAsistenciaClase save(DaoAsistenciaClase dao) { return toDao(repository.save(toEntity(dao))); }
    public DaoAsistenciaClase update(Long id, DaoAsistenciaClase dao) {
        if (repository.existsById(id)) { AsistenciaClase entity = toEntity(dao); entity.setIdAsistencia(id); return toDao(repository.save(entity)); } return null;
    }
    public void delete(Long id) { repository.deleteById(id); }
    private DaoAsistenciaClase toDao(AsistenciaClase entity) { DaoAsistenciaClase dao = new DaoAsistenciaClase(); BeanUtils.copyProperties(entity, dao); return dao; }
    private AsistenciaClase toEntity(DaoAsistenciaClase dao) { AsistenciaClase entity = new AsistenciaClase(); BeanUtils.copyProperties(dao, entity); return entity; }
}