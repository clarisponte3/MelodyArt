package com.sonorasync.controller;

import com.sonorasync.dao.DaoEstadoCuenta;
import com.sonorasync.service.ServiceEstadoCuenta;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/estados-cuenta")
public class ControllerEstadoCuenta {
    @Autowired private ServiceEstadoCuenta service;
    @GetMapping public List<DaoEstadoCuenta> findAll() { return service.findAll(); }
    @GetMapping("/{id}") public ResponseEntity<DaoEstadoCuenta> findById(@PathVariable Long id) {
        DaoEstadoCuenta dao = service.findById(id);
        return dao != null ? ResponseEntity.ok(dao) : ResponseEntity.notFound().build();
    }
    @PostMapping public ResponseEntity<DaoEstadoCuenta> save(@RequestBody DaoEstadoCuenta dao) { return ResponseEntity.ok(service.save(dao)); }
    @PutMapping("/{id}") public ResponseEntity<DaoEstadoCuenta> update(@PathVariable Long id, @RequestBody DaoEstadoCuenta dao) {
        DaoEstadoCuenta updated = service.update(id, dao);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }
    @DeleteMapping("/{id}") public ResponseEntity<Void> delete(@PathVariable Long id) { service.delete(id); return ResponseEntity.noContent().build(); }
}
