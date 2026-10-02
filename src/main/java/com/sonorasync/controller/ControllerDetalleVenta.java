package com.sonorasync.controller;

import com.sonorasync.dao.DaoDetalleVenta;
import com.sonorasync.service.ServiceDetalleVenta;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/detalles-venta")
public class ControllerDetalleVenta {
    @Autowired private ServiceDetalleVenta service;
    @GetMapping public List<DaoDetalleVenta> findAll() { return service.findAll(); }
    @GetMapping("/{id}") public ResponseEntity<DaoDetalleVenta> findById(@PathVariable Long id) {
        DaoDetalleVenta dao = service.findById(id);
        return dao != null ? ResponseEntity.ok(dao) : ResponseEntity.notFound().build();
    }
    @PostMapping public ResponseEntity<DaoDetalleVenta> save(@RequestBody DaoDetalleVenta dao) { return ResponseEntity.ok(service.save(dao)); }
    @PutMapping("/{id}") public ResponseEntity<DaoDetalleVenta> update(@PathVariable Long id, @RequestBody DaoDetalleVenta dao) {
        DaoDetalleVenta updated = service.update(id, dao);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }
    @DeleteMapping("/{id}") public ResponseEntity<Void> delete(@PathVariable Long id) { service.delete(id); return ResponseEntity.noContent().build(); }
}
