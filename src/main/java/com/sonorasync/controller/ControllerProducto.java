package com.sonorasync.controller;

import com.sonorasync.dao.DaoProducto;
import com.sonorasync.service.ServiceProducto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/productos")
public class ControllerProducto {
    @Autowired private ServiceProducto service;
    @GetMapping public List<DaoProducto> findAll() { return service.findAll(); }
    @GetMapping("/{id}") public ResponseEntity<DaoProducto> findById(@PathVariable Long id) {
        DaoProducto dao = service.findById(id);
        return dao != null ? ResponseEntity.ok(dao) : ResponseEntity.notFound().build();
    }
    @PostMapping public ResponseEntity<DaoProducto> save(@RequestBody DaoProducto dao) { return ResponseEntity.ok(service.save(dao)); }
    @PutMapping("/{id}") public ResponseEntity<DaoProducto> update(@PathVariable Long id, @RequestBody DaoProducto dao) {
        DaoProducto updated = service.update(id, dao);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }
    @DeleteMapping("/{id}") public ResponseEntity<Void> delete(@PathVariable Long id) { service.delete(id); return ResponseEntity.noContent().build(); }
}
