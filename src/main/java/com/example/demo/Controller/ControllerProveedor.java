package com.sonorasync.controller;
import com.sonorasync.dao.DaoProveedor;
import com.sonorasync.service.ServiceProveedor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/proveedores")
public class ControllerProveedor {
    @Autowired private ServiceProveedor service;
    @GetMapping public List<DaoProveedor> findAll() { return service.findAll(); }
    @GetMapping("/{id}") public ResponseEntity<DaoProveedor> findById(@PathVariable Long id) { return ResponseEntity.ok(service.findById(id)); }
    @PostMapping public ResponseEntity<DaoProveedor> save(@RequestBody DaoProveedor dao) { return ResponseEntity.ok(service.save(dao)); }
    @PutMapping("/{id}") public ResponseEntity<DaoProveedor> update(@PathVariable Long id, @RequestBody DaoProveedor dao) { return ResponseEntity.ok(service.update(id, dao)); }
    @DeleteMapping("/{id}") public ResponseEntity<Void> delete(@PathVariable Long id) { service.delete(id); return ResponseEntity.ok().build(); }
}