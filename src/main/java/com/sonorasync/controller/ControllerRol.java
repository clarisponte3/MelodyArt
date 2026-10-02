package com.sonorasync.controller;

import com.sonorasync.dao.DaoRol;
import com.sonorasync.service.ServiceRol;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/roles")
public class ControllerRol {
    @Autowired private ServiceRol service;
    @GetMapping public List<DaoRol> findAll() { return service.findAll(); }
    @GetMapping("/{id}") public ResponseEntity<DaoRol> findById(@PathVariable Long id) {
        DaoRol dao = service.findById(id);
        return dao != null ? ResponseEntity.ok(dao) : ResponseEntity.notFound().build();
    }
    @PostMapping public ResponseEntity<DaoRol> save(@RequestBody DaoRol dao) { return ResponseEntity.ok(service.save(dao)); }
    @PutMapping("/{id}") public ResponseEntity<DaoRol> update(@PathVariable Long id, @RequestBody DaoRol dao) {
        DaoRol updated = service.update(id, dao);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }
    @DeleteMapping("/{id}") public ResponseEntity<Void> delete(@PathVariable Long id) { service.delete(id); return ResponseEntity.noContent().build(); }
}
