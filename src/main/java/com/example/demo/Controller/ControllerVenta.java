package com.sonorasync.controller;
import com.sonorasync.dao.DaoVenta;
import com.sonorasync.service.ServiceVenta;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/ventas")
public class ControllerVenta {
    @Autowired private ServiceVenta service;
    @GetMapping public List<DaoVenta> findAll() { return service.findAll(); }
    @GetMapping("/{id}") public ResponseEntity<DaoVenta> findById(@PathVariable Long id) { return ResponseEntity.ok(service.findById(id)); }
    @PostMapping public ResponseEntity<DaoVenta> save(@RequestBody DaoVenta dao) { return ResponseEntity.ok(service.save(dao)); }
    @PutMapping("/{id}") public ResponseEntity<DaoVenta> update(@PathVariable Long id, @RequestBody DaoVenta dao) { return ResponseEntity.ok(service.update(id, dao)); }
    @DeleteMapping("/{id}") public ResponseEntity<Void> delete(@PathVariable Long id) { service.delete(id); return ResponseEntity.ok().build(); }
}