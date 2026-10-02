package com.sonorasync.controller;

import com.sonorasync.dao.DaoBitacoraProgreso;
import com.sonorasync.service.ServiceBitacoraProgreso;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/bitacoras")
public class ControllerBitacoraProgreso {
    @Autowired private ServiceBitacoraProgreso service;
    @GetMapping public List<DaoBitacoraProgreso> findAll() { return service.findAll(); }
    @GetMapping("/{id}") public ResponseEntity<DaoBitacoraProgreso> findById(@PathVariable Long id) {
        DaoBitacoraProgreso dao = service.findById(id);
        return dao != null ? ResponseEntity.ok(dao) : ResponseEntity.notFound().build();
    }
    @PostMapping public ResponseEntity<DaoBitacoraProgreso> save(@RequestBody DaoBitacoraProgreso dao) { return ResponseEntity.ok(service.save(dao)); }
    @PutMapping("/{id}") public ResponseEntity<DaoBitacoraProgreso> update(@PathVariable Long id, @RequestBody DaoBitacoraProgreso dao) {
        DaoBitacoraProgreso updated = service.update(id, dao);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }
    @DeleteMapping("/{id}") public ResponseEntity<Void> delete(@PathVariable Long id) { service.delete(id); return ResponseEntity.noContent().build(); }
}
