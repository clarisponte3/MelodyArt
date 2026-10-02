package com.sonorasync.controller;
import com.sonorasync.dao.DaoRolPermiso;
import com.sonorasync.service.ServiceRolPermiso;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/rol-permisos")
public class ControllerRolPermiso {
    @Autowired private ServiceRolPermiso service;
    @GetMapping public List<DaoRolPermiso> findAll() { return service.findAll(); }
    @PostMapping public ResponseEntity<DaoRolPermiso> save(@RequestBody DaoRolPermiso dao) { return ResponseEntity.ok(service.save(dao)); }
    @DeleteMapping("/{idRol}/{idPermiso}") public ResponseEntity<Void> delete(@PathVariable Long idRol, @PathVariable Long idPermiso) { service.delete(idRol, idPermiso); return ResponseEntity.ok().build(); }
}