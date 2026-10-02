package com.sonorasync.controller;

import com.sonorasync.dao.DaoDetalleCompra;
import com.sonorasync.service.ServiceDetalleCompra;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/detalles-compra")
public class ControllerDetalleCompra {
    @Autowired private ServiceDetalleCompra service;
    @GetMapping public List<DaoDetalleCompra> findAll() { return service.findAll(); }
    @GetMapping("/{id}") public ResponseEntity<DaoDetalleCompra> findById(@PathVariable Long id) {
        DaoDetalleCompra dao = service.findById(id);
        return dao != null ? ResponseEntity.ok(dao) : ResponseEntity.notFound().build();
    }
    @PostMapping public ResponseEntity<DaoDetalleCompra> save(@RequestBody DaoDetalleCompra dao) { return ResponseEntity.ok(service.save(dao)); }
    @PutMapping("/{id}") public ResponseEntity<DaoDetalleCompra> update(@PathVariable Long id, @RequestBody DaoDetalleCompra dao) {
        DaoDetalleCompra updated = service.update(id, dao);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }
    @DeleteMapping("/{id}") public ResponseEntity<Void> delete(@PathVariable Long id) { service.delete(id); return ResponseEntity.noContent().build(); }
}
