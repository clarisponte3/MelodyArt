package com.sonorasync.controller;
import com.sonorasync.dao.DaoConceptoPago;
import com.sonorasync.service.ServiceConceptoPago;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/conceptos-pago")
public class ControllerConceptoPago {
    @Autowired private ServiceConceptoPago service;
    @GetMapping public List<DaoConceptoPago> findAll() { return service.findAll(); }
    @GetMapping("/{id}") public ResponseEntity<DaoConceptoPago> findById(@PathVariable Long id) { return ResponseEntity.ok(service.findById(id)); }
    @PostMapping public ResponseEntity<DaoConceptoPago> save(@RequestBody DaoConceptoPago dao) { return ResponseEntity.ok(service.save(dao)); }
    @PutMapping("/{id}") public ResponseEntity<DaoConceptoPago> update(@PathVariable Long id, @RequestBody DaoConceptoPago dao) { return ResponseEntity.ok(service.update(id, dao)); }
    @DeleteMapping("/{id}") public ResponseEntity<Void> delete(@PathVariable Long id) { service.delete(id); return ResponseEntity.ok().build(); }
}