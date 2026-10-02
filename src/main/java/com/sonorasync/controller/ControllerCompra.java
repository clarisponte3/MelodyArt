package com.sonorasync.controller;

import com.sonorasync.dao.DaoCompra;
import com.sonorasync.service.ServiceCompra;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/compras")
public class ControllerCompra {
    @Autowired private ServiceCompra service;
    @GetMapping public List<DaoCompra> findAll() { return service.findAll(); }
    @GetMapping("/{id}") public ResponseEntity<DaoCompra> findById(@PathVariable Long id) {
        DaoCompra dao = service.findById(id);
        return dao != null ? ResponseEntity.ok(dao) : ResponseEntity.notFound().build();
    }
    @PostMapping public ResponseEntity<DaoCompra> save(@RequestBody DaoCompra dao) { return ResponseEntity.ok(service.save(dao)); }
    @PutMapping("/{id}") public ResponseEntity<DaoCompra> update(@PathVariable Long id, @RequestBody DaoCompra dao) {
        DaoCompra updated = service.update(id, dao);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }
    @DeleteMapping("/{id}") public ResponseEntity<Void> delete(@PathVariable Long id) { service.delete(id); return ResponseEntity.noContent().build(); }
}
