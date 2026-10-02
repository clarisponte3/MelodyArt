package com.sonorasync.service;
import com.sonorasync.dao.DaoLogAuditoria;
import com.sonorasync.model.LogAuditoria;
import com.sonorasync.repository.RepositoryLogAuditoria;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServiceLogAuditoria {
    @Autowired private RepositoryLogAuditoria repository;

    public List<DaoLogAuditoria> findAll() { return repository.findAll().stream().map(this::toDao).collect(Collectors.toList()); }
    public DaoLogAuditoria findById(Long id) { return repository.findById(id).map(this::toDao).orElse(null); }
    public DaoLogAuditoria save(DaoLogAuditoria dao) { return toDao(repository.save(toEntity(dao))); }

    private DaoLogAuditoria toDao(LogAuditoria entity) { DaoLogAuditoria dao = new DaoLogAuditoria(); BeanUtils.copyProperties(entity, dao); return dao; }
    private LogAuditoria toEntity(DaoLogAuditoria dao) { LogAuditoria entity = new LogAuditoria(); BeanUtils.copyProperties(dao, entity); return entity; }
}