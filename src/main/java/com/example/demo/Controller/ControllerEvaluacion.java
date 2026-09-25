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
    @GetMapping("/{id}") public ResponseEntity<DaoEvaluacion> findById(@PathVariable Long id) { return ResponseEntity.ok(service.findById(id)); }
    @PostMapping public ResponseEntity<DaoEvaluacion> save(@RequestBody DaoEvaluacion dao) { return ResponseEntity.ok(service.save(dao)); }
    @PutMapping("/{id}") public ResponseEntity<DaoEvaluacion> update(@PathVariable Long id, @RequestBody DaoEvaluacion dao) { return ResponseEntity.ok(service.update(id, dao)); }
    @DeleteMapping("/{id}") public ResponseEntity<Void> delete(@PathVariable Long id) { service.delete(id); return ResponseEntity.ok().build(); }
}