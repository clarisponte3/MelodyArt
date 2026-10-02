package com.sonorasync.controller;

import com.sonorasync.dao.DaoAsistenciaClase;
import com.sonorasync.service.ServiceAsistenciaClase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/asistencias")
public class ControllerAsistenciaClase {
    @Autowired private ServiceAsistenciaClase service;
    @GetMapping public List<DaoAsistenciaClase> findAll() { return service.findAll(); }
    @GetMapping("/{id}") public ResponseEntity<DaoAsistenciaClase> findById(@PathVariable Long id) {
        DaoAsistenciaClase dao = service.findById(id);
        return dao != null ? ResponseEntity.ok(dao) : ResponseEntity.notFound().build();
    }
    @PostMapping public ResponseEntity<DaoAsistenciaClase> save(@RequestBody DaoAsistenciaClase dao) { return ResponseEntity.ok(service.save(dao)); }
    @PutMapping("/{id}") public ResponseEntity<DaoAsistenciaClase> update(@PathVariable Long id, @RequestBody DaoAsistenciaClase dao) {
        DaoAsistenciaClase updated = service.update(id, dao);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }
    @DeleteMapping("/{id}") public ResponseEntity<Void> delete(@PathVariable Long id) { service.delete(id); return ResponseEntity.noContent().build(); }
}