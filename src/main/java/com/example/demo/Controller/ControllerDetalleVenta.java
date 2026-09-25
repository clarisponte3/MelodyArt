package com.sonorasync.controller;
import com.sonorasync.dao.DaoDetalleVenta;
import com.sonorasync.service.ServiceDetalleVenta;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/detalle-ventas")
public class ControllerDetalleVenta {
    @Autowired private ServiceDetalleVenta service;
    @GetMapping public List<DaoDetalleVenta> findAll() { return service.findAll(); }
    @GetMapping("/{id}") public ResponseEntity<DaoDetalleVenta> findById(@PathVariable Long id) { return ResponseEntity.ok(service.findById(id)); }
    @PostMapping public ResponseEntity<DaoDetalleVenta> save(@RequestBody DaoDetalleVenta dao) { return ResponseEntity.ok(service.save(dao)); }
    @PutMapping("/{id}") public ResponseEntity<DaoDetalleVenta> update(@PathVariable Long id, @RequestBody DaoDetalleVenta dao) { return ResponseEntity.ok(service.update(id, dao)); }
    @DeleteMapping("/{id}") public ResponseEntity<Void> delete(@PathVariable Long id) { service.delete(id); return ResponseEntity.ok().build(); }
}