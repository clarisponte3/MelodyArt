package com.sonorasync.controller;
import com.sonorasync.dao.DaoPagoMensualidad;
import com.sonorasync.service.ServicePagoMensualidad;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/pagos")
public class ControllerPagoMensualidad {
    @Autowired private ServicePagoMensualidad service;
    @GetMapping public List<DaoPagoMensualidad> findAll() { return service.findAll(); }
    @GetMapping("/{id}") public ResponseEntity<DaoPagoMensualidad> findById(@PathVariable Long id) { return ResponseEntity.ok(service.findById(id)); }
    @PostMapping public ResponseEntity<DaoPagoMensualidad> save(@RequestBody DaoPagoMensualidad dao) { return ResponseEntity.ok(service.save(dao)); }
    @PutMapping("/{id}") public ResponseEntity<DaoPagoMensualidad> update(@PathVariable Long id, @RequestBody DaoPagoMensualidad dao) { return ResponseEntity.ok(service.update(id, dao)); }
    @DeleteMapping("/{id}") public ResponseEntity<Void> delete(@PathVariable Long id) { service.delete(id); return ResponseEntity.ok().build(); }
}