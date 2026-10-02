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
    @GetMapping("/{id}") public ResponseEntity<DaoMarca> findById(@PathVariable Long id) { return ResponseEntity.ok(service.findById(id)); }
    @PostMapping public ResponseEntity<DaoMarca> save(@RequestBody DaoMarca dao) { return ResponseEntity.ok(service.save(dao)); }
    @PutMapping("/{id}") public ResponseEntity<DaoMarca> update(@PathVariable Long id, @RequestBody DaoMarca dao) { return ResponseEntity.ok(service.update(id, dao)); }
    @DeleteMapping("/{id}") public ResponseEntity<Void> delete(@PathVariable Long id) { service.delete(id); return ResponseEntity.ok().build(); }
}