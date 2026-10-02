package com.sonorasync.controller;

import com.sonorasync.dao.DaoEvaluacion;
import com.sonorasync.service.ServiceEvaluacion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/evaluaciones")
public class ControllerEvaluacion {
    @Autowired private ServiceEvaluacion service;
    @GetMapping public List<DaoEvaluacion> findAll() { return service.findAll(); }
    @GetMapping("/{id}") public ResponseEntity<DaoEvaluacion> findById(@PathVariable Long id) {
        DaoEvaluacion dao = service.findById(id);
        return dao != null ? ResponseEntity.ok(dao) : ResponseEntity.notFound().build();
    }
    @PostMapping public ResponseEntity<DaoEvaluacion> save(@RequestBody DaoEvaluacion dao) { return ResponseEntity.ok(service.save(dao)); }
    @PutMapping("/{id}") public ResponseEntity<DaoEvaluacion> update(@PathVariable Long id, @RequestBody DaoEvaluacion dao) {
        DaoEvaluacion updated = service.update(id, dao);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }
    @DeleteMapping("/{id}") public ResponseEntity<Void> delete(@PathVariable Long id) { service.delete(id); return ResponseEntity.noContent().build(); }
}

