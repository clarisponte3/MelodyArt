package com.sonorasync.controller;

import com.sonorasync.dao.DaoMarca;
import com.sonorasync.service.ServiceMarca;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/marcas")
public class ControllerMarca {
    @Autowired private ServiceMarca service;
    @GetMapping public List<DaoMarca> findAll() { return service.findAll(); }
    @GetMapping("/{id}") public ResponseEntity<DaoMarca> findById(@PathVariable Long id) {
        DaoMarca dao = service.findById(id);
        return dao != null ? ResponseEntity.ok(dao) : ResponseEntity.notFound().build();
    }
    @PostMapping public ResponseEntity<DaoMarca> save(@RequestBody DaoMarca dao) { return ResponseEntity.ok(service.save(dao)); }
    @PutMapping("/{id}") public ResponseEntity<DaoMarca> update(@PathVariable Long id, @RequestBody DaoMarca dao) {
        DaoMarca updated = service.update(id, dao);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }
    @DeleteMapping("/{id}") public ResponseEntity<Void> delete(@PathVariable Long id) { service.delete(id); return ResponseEntity.noContent().build(); }
}
