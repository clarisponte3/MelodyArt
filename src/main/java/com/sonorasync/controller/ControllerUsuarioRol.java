package com.sonorasync.controller;
import com.sonorasync.dao.DaoUsuarioRol;
import com.sonorasync.service.ServiceUsuarioRol;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/usuario-roles")
public class ControllerUsuarioRol {
    @Autowired private ServiceUsuarioRol service;
    @GetMapping public List<DaoUsuarioRol> findAll() { return service.findAll(); }
    @PostMapping public ResponseEntity<DaoUsuarioRol> save(@RequestBody DaoUsuarioRol dao) { return ResponseEntity.ok(service.save(dao)); }
    @DeleteMapping("/{idUsuario}/{idRol}") public ResponseEntity<Void> delete(@PathVariable Long idUsuario, @PathVariable Long idRol) { service.delete(idUsuario, idRol); return ResponseEntity.ok().build(); }
}