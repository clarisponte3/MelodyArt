package com.sonorasync.controller;

import com.sonorasync.dao.DaoLogAuditoria;
import com.sonorasync.service.ServiceLogAuditoria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/logs-auditoria")
public class ControllerLogAuditoria {
    @Autowired private ServiceLogAuditoria service;
    @GetMapping public List<DaoLogAuditoria> findAll() { return service.findAll(); }
    @GetMapping("/{id}") public ResponseEntity<DaoLogAuditoria> findById(@PathVariable Long id) {
        DaoLogAuditoria dao = service.findById(id);
        return dao != null ? ResponseEntity.ok(dao) : ResponseEntity.notFound().build();
    }
    @PostMapping public ResponseEntity<DaoLogAuditoria> save(@RequestBody DaoLogAuditoria dao) { return ResponseEntity.ok(service.save(dao)); }
    @PutMapping("/{id}") public ResponseEntity<DaoLogAuditoria> update(@PathVariable Long id, @RequestBody DaoLogAuditoria dao) {
        DaoLogAuditoria updated = service.update(id, dao);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }
    @DeleteMapping("/{id}") public ResponseEntity<Void> delete(@PathVariable Long id) { service.delete(id); return ResponseEntity.noContent().build(); }
}
