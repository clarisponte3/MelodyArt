package com.sonorasync.controller;

import com.sonorasync.dao.DaoUsuario;
import com.sonorasync.service.ServiceUsuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
public class ControllerUsuario {
    @Autowired private ServiceUsuario service;
    @GetMapping public List<DaoUsuario> findAll() { return service.findAll(); }
    @GetMapping("/{id}") public ResponseEntity<DaoUsuario> findById(@PathVariable Long id) {
        DaoUsuario dao = service.findById(id);
        return dao != null ? ResponseEntity.ok(dao) : ResponseEntity.notFound().build();
    }
    @PostMapping public ResponseEntity<DaoUsuario> save(@RequestBody DaoUsuario dao) { return ResponseEntity.ok(service.save(dao)); }
    @PutMapping("/{id}") public ResponseEntity<DaoUsuario> update(@PathVariable Long id, @RequestBody DaoUsuario dao) {
        DaoUsuario updated = service.update(id, dao);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }
    @DeleteMapping("/{id}") public ResponseEntity<Void> delete(@PathVariable Long id) { service.delete(id); return ResponseEntity.noContent().build(); }
}
