package com.sonorasync.controller;
import com.sonorasync.dao.DaoMovimientoInventario;
import com.sonorasync.service.ServiceMovimientoInventario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/movimientos")
public class ControllerMovimientoInventario {
    @Autowired private ServiceMovimientoInventario service;
    @GetMapping public List<DaoMovimientoInventario> findAll() { return service.findAll(); }
    @GetMapping("/{id}") public ResponseEntity<DaoMovimientoInventario> findById(@PathVariable Long id) { return ResponseEntity.ok(service.findById(id)); }
    @PostMapping public ResponseEntity<DaoMovimientoInventario> save(@RequestBody DaoMovimientoInventario dao) { return ResponseEntity.ok(service.save(dao)); }
    @PutMapping("/{id}") public ResponseEntity<DaoMovimientoInventario> update(@PathVariable Long id, @RequestBody DaoMovimientoInventario dao) { return ResponseEntity.ok(service.update(id, dao)); }
    @DeleteMapping("/{id}") public ResponseEntity<Void> delete(@PathVariable Long id) { service.delete(id); return ResponseEntity.ok().build(); }
}