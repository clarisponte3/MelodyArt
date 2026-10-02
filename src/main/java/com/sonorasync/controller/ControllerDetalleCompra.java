package com.sonorasync.controller;
import com.sonorasync.dao.DaoDetalleCompra;
import com.sonorasync.service.ServiceDetalleCompra;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/detalle-compras")
public class ControllerDetalleCompra {
    @Autowired private ServiceDetalleCompra service;
    @GetMapping public List<DaoDetalleCompra> findAll() { return service.findAll(); }
    @GetMapping("/{id}") public ResponseEntity<DaoDetalleCompra> findById(@PathVariable Long id) { return ResponseEntity.ok(service.findById(id)); }
    @PostMapping public ResponseEntity<DaoDetalleCompra> save(@RequestBody DaoDetalleCompra dao) { return ResponseEntity.ok(service.save(dao)); }
    @PutMapping("/{id}") public ResponseEntity<DaoDetalleCompra> update(@PathVariable Long id, @RequestBody DaoDetalleCompra dao) { return ResponseEntity.ok(service.update(id, dao)); }
    @DeleteMapping("/{id}") public ResponseEntity<Void> delete(@PathVariable Long id) { service.delete(id); return ResponseEntity.ok().build(); }
}