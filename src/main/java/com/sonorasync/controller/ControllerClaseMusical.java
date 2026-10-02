package com.sonorasync.controller;

import com.sonorasync.dao.DaoClaseMusical;
import com.sonorasync.service.ServiceClaseMusical;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/clases-musicales")
public class ControllerClaseMusical {
    @Autowired private ServiceClaseMusical service;
    @GetMapping public List<DaoClaseMusical> findAll() { return service.findAll(); }
    @GetMapping("/{id}") public ResponseEntity<DaoClaseMusical> findById(@PathVariable Long id) {
        DaoClaseMusical dao = service.findById(id);
        return dao != null ? ResponseEntity.ok(dao) : ResponseEntity.notFound().build();
    }
    @PostMapping public ResponseEntity<DaoClaseMusical> save(@RequestBody DaoClaseMusical dao) { return ResponseEntity.ok(service.save(dao)); }
    @PutMapping("/{id}") public ResponseEntity<DaoClaseMusical> update(@PathVariable Long id, @RequestBody DaoClaseMusical dao) {
        DaoClaseMusical updated = service.update(id, dao);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }
    @DeleteMapping("/{id}") public ResponseEntity<Void> delete(@PathVariable Long id) { service.delete(id); return ResponseEntity.noContent().build(); }
}
