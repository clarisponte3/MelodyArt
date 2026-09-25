package com.sonorasync.controller;
import com.sonorasync.dao.DaoCategoria;
import com.sonorasync.service.ServiceCategoria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/categorias")
public class ControllerCategoria {
    @Autowired private ServiceCategoria service;
    @GetMapping public List<DaoCategoria> findAll() { return service.findAll(); }
    @GetMapping("/{id}") public ResponseEntity<DaoCategoria> findById(@PathVariable Long id) { return ResponseEntity.ok(service.findById(id)); }
    @PostMapping public ResponseEntity<DaoCategoria> save(@RequestBody DaoCategoria dao) { return ResponseEntity.ok(service.save(dao)); }
    @PutMapping("/{id}") public ResponseEntity<DaoCategoria> update(@PathVariable Long id, @RequestBody DaoCategoria dao) { return ResponseEntity.ok(service.update(id, dao)); }
    @DeleteMapping("/{id}") public ResponseEntity<Void> delete(@PathVariable Long id) { service.delete(id); return ResponseEntity.ok().build(); }
}