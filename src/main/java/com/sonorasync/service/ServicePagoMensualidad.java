package com.sonorasync.service;
import com.sonorasync.dao.DaoPagoMensualidad;
import com.sonorasync.model.PagoMensualidad;
import com.sonorasync.repository.RepositoryPagoMensualidad;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServicePagoMensualidad {
    @Autowired private RepositoryPagoMensualidad repository;
    public List<DaoPagoMensualidad> findAll() { return repository.findAll().stream().map(this::toDao).collect(Collectors.toList()); }
    public DaoPagoMensualidad findById(Long id) { return repository.findById(id).map(this::toDao).orElse(null); }
    public DaoPagoMensualidad save(DaoPagoMensualidad dao) { return toDao(repository.save(toEntity(dao))); }
    public DaoPagoMensualidad update(Long id, DaoPagoMensualidad dao) {
        if (repository.existsById(id)) { PagoMensualidad entity = toEntity(dao); entity.setIdPago(id); return toDao(repository.save(entity)); } return null;
    }
    public void delete(Long id) { repository.deleteById(id); }
    private DaoPagoMensualidad toDao(PagoMensualidad entity) { DaoPagoMensualidad dao = new DaoPagoMensualidad(); BeanUtils.copyProperties(entity, dao); return dao; }
    private PagoMensualidad toEntity(DaoPagoMensualidad dao) { PagoMensualidad entity = new PagoMensualidad(); BeanUtils.copyProperties(dao, entity); return entity; }
}