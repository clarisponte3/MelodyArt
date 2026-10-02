package com.sonorasync.service;
import com.sonorasync.dao.DaoBitacoraProgreso;
import com.sonorasync.model.BitacoraProgreso;
import com.sonorasync.repository.RepositoryBitacoraProgreso;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServiceBitacoraProgreso {
    @Autowired private RepositoryBitacoraProgreso repository;
    public List<DaoBitacoraProgreso> findAll() { return repository.findAll().stream().map(this::toDao).collect(Collectors.toList()); }
    public DaoBitacoraProgreso findById(Long id) { return repository.findById(id).map(this::toDao).orElse(null); }
    public DaoBitacoraProgreso save(DaoBitacoraProgreso dao) { return toDao(repository.save(toEntity(dao))); }
    public DaoBitacoraProgreso update(Long id, DaoBitacoraProgreso dao) {
        if (repository.existsById(id)) { BitacoraProgreso entity = toEntity(dao); entity.setIdBitacora(id); return toDao(repository.save(entity)); } return null;
    }
    public void delete(Long id) { repository.deleteById(id); }
    private DaoBitacoraProgreso toDao(BitacoraProgreso entity) { DaoBitacoraProgreso dao = new DaoBitacoraProgreso(); BeanUtils.copyProperties(entity, dao); return dao; }
    private BitacoraProgreso toEntity(DaoBitacoraProgreso dao) { BitacoraProgreso entity = new BitacoraProgreso(); BeanUtils.copyProperties(dao, entity); return entity; }
}