package com.sonorasync.controller;
import com.sonorasync.dao.DaoPermiso;
import com.sonorasync.service.ServicePermiso;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/permisos")
public class ControllerPermiso {
    @Autowired private ServicePermiso service;
    @GetMapping public List<DaoPermiso> findAll() { return service.findAll(); }
    @GetMapping("/{id}") public ResponseEntity<DaoPermiso> findById(@PathVariable Long id) { return ResponseEntity.ok(service.findById(id)); }
    @PostMapping public ResponseEntity<DaoPermiso> save(@RequestBody DaoPermiso dao) { return ResponseEntity.ok(service.save(dao)); }
    @PutMapping("/{id}") public ResponseEntity<DaoPermiso> update(@PathVariable Long id, @RequestBody DaoPermiso dao) { return ResponseEntity.ok(service.update(id, dao)); }
    @DeleteMapping("/{id}") public ResponseEntity<Void> delete(@PathVariable Long id) { service.delete(id); return ResponseEntity.ok().build(); }
}