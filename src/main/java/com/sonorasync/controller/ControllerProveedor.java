package com.sonorasync.controller;

import com.sonorasync.dao.DaoProveedor;
import com.sonorasync.service.ServiceProveedor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/proveedores")
public class ControllerProveedor {
    @Autowired private ServiceProveedor service;
    @GetMapping public List<DaoProveedor> findAll() { return service.findAll(); }
    @GetMapping("/{id}") public ResponseEntity<DaoProveedor> findById(@PathVariable Long id) {
        DaoProveedor dao = service.findById(id);
        return dao != null ? ResponseEntity.ok(dao) : ResponseEntity.notFound().build();
    }
    @PostMapping public ResponseEntity<DaoProveedor> save(@RequestBody DaoProveedor dao) { return ResponseEntity.ok(service.save(dao)); }
    @PutMapping("/{id}") public ResponseEntity<DaoProveedor> update(@PathVariable Long id, @RequestBody DaoProveedor dao) {
        DaoProveedor updated = service.update(id, dao);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }
    @DeleteMapping("/{id}") public ResponseEntity<Void> delete(@PathVariable Long id) { service.delete(id); return ResponseEntity.noContent().build(); }
}
