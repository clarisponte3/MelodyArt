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
    
    @GetMapping 
    public List<DaoUsuario> findAll() { return service.findAll(); }
    
    @GetMapping("/{id}") 
    public ResponseEntity<DaoUsuario> findById(@PathVariable Long id) { return ResponseEntity.ok(service.findById(id)); }
    
    @PostMapping 
    public ResponseEntity<DaoUsuario> save(@RequestBody DaoUsuario dao) { return ResponseEntity.ok(service.save(dao)); }
    
    @PutMapping("/{id}") 
    public ResponseEntity<DaoUsuario> update(@PathVariable Long id, @RequestBody DaoUsuario dao) { return ResponseEntity.ok(service.update(id, dao)); }
    
    @DeleteMapping("/{id}") 
    public ResponseEntity<Void> delete(@PathVariable Long id) { service.delete(id); return ResponseEntity.ok().build(); }
}