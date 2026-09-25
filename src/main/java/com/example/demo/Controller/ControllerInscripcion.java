package com.sonorasync.controller;
import com.sonorasync.dao.DaoInscripcion;
import com.sonorasync.service.ServiceInscripcion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/inscripciones")
public class ControllerInscripcion {
    @Autowired private ServiceInscripcion service;
    @GetMapping public List<DaoInscripcion> findAll() { return service.findAll(); }
    @GetMapping("/{id}") public ResponseEntity<DaoInscripcion> findById(@PathVariable Long id) { return ResponseEntity.ok(service.findById(id)); }
    @PostMapping public ResponseEntity<DaoInscripcion> save(@RequestBody DaoInscripcion dao) { return ResponseEntity.ok(service.save(dao)); }
    @PutMapping("/{id}") public ResponseEntity<DaoInscripcion> update(@PathVariable Long id, @RequestBody DaoInscripcion dao) { return ResponseEntity.ok(service.update(id, dao)); }
    @DeleteMapping("/{id}") public ResponseEntity<Void> delete(@PathVariable Long id) { service.delete(id); return ResponseEntity.ok().build(); }
}