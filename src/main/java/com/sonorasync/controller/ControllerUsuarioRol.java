package com.sonorasync.controller;

import com.sonorasync.dao.DaoUsuarioRol;
import com.sonorasync.model.UsuarioRol;
import com.sonorasync.service.ServiceUsuarioRol;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/usuarios-roles")
public class ControllerUsuarioRol {
    @Autowired private ServiceUsuarioRol service;

    @GetMapping 
    public List<DaoUsuarioRol> findAll() { 
        return service.findAll(); 
    }

    @GetMapping("/{idUsuario}/{idRol}") 
    public ResponseEntity<DaoUsuarioRol> findById(@PathVariable Long idUsuario, @PathVariable Long idRol) {
        UsuarioRol.UsuarioRolId id = new UsuarioRol.UsuarioRolId();
        id.setIdUsuario(idUsuario);
        id.setIdRol(idRol);
        DaoUsuarioRol dao = service.findById(id);
        return dao != null ? ResponseEntity.ok(dao) : ResponseEntity.notFound().build();
    }

    @PostMapping 
    public ResponseEntity<DaoUsuarioRol> save(@RequestBody DaoUsuarioRol dao) { 
        return ResponseEntity.ok(service.save(dao)); 
    }

    @DeleteMapping("/{idUsuario}/{idRol}") 
    public ResponseEntity<Void> delete(@PathVariable Long idUsuario, @PathVariable Long idRol) {
        UsuarioRol.UsuarioRolId id = new UsuarioRol.UsuarioRolId();
        id.setIdUsuario(idUsuario);
        id.setIdRol(idRol);
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}