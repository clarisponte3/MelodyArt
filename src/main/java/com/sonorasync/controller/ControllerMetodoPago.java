package com.sonorasync.controller;

import com.sonorasync.dao.DaoMetodoPago;
import com.sonorasync.service.ServiceMetodoPago;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/metodos-pago")
public class ControllerMetodoPago {
    @Autowired private ServiceMetodoPago service;
    @GetMapping public List<DaoMetodoPago> findAll() { return service.findAll(); }
    @GetMapping("/{id}") public ResponseEntity<DaoMetodoPago> findById(@PathVariable Long id) {
        DaoMetodoPago dao = service.findById(id);
        return dao != null ? ResponseEntity.ok(dao) : ResponseEntity.notFound().build();
    }
    @PostMapping public ResponseEntity<DaoMetodoPago> save(@RequestBody DaoMetodoPago dao) { return ResponseEntity.ok(service.save(dao)); }
    @PutMapping("/{id}") public ResponseEntity<DaoMetodoPago> update(@PathVariable Long id, @RequestBody DaoMetodoPago dao) {
        DaoMetodoPago updated = service.update(id, dao);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }
    @DeleteMapping("/{id}") public ResponseEntity<Void> delete(@PathVariable Long id) { service.delete(id); return ResponseEntity.noContent().build(); }
}
