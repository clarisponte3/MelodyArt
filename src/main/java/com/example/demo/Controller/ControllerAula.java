package com.sonorasync.controller;
import com.sonorasync.dao.DaoAula;
import com.sonorasync.service.ServiceAula;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/aulas")
public class ControllerAula {
    @Autowired private ServiceAula service;
    @GetMapping public List<DaoAula> findAll() { return service.findAll(); }
    @GetMapping("/{id}") public ResponseEntity<DaoAula> findById(@PathVariable Long id) { return ResponseEntity.ok(service.findById(id)); }
    @PostMapping public ResponseEntity<DaoAula> save(@RequestBody DaoAula dao) { return ResponseEntity.ok(service.save(dao)); }
    @PutMapping("/{id}") public ResponseEntity<DaoAula> update(@PathVariable Long id, @RequestBody DaoAula dao) { return ResponseEntity.ok(service.update(id, dao)); }
    @DeleteMapping("/{id}") public ResponseEntity<Void> delete(@PathVariable Long id) { service.delete(id); return ResponseEntity.ok().build(); }
}