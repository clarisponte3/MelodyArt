package com.sonorasync.controller;

import com.sonorasync.dao.DaoRolPermiso;
import com.sonorasync.model.RolPermiso;
import com.sonorasync.service.ServiceRolPermiso;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/roles-permisos")
public class ControllerRolPermiso {
    @Autowired private ServiceRolPermiso service;

    @GetMapping 
    public List<DaoRolPermiso> findAll() { 
        return service.findAll(); 
    }

    @GetMapping("/{idRol}/{idPermiso}") 
    public ResponseEntity<DaoRolPermiso> findById(@PathVariable Long idRol, @PathVariable Long idPermiso) {
        RolPermiso.RolPermisoId id = new RolPermiso.RolPermisoId();
        id.setIdRol(idRol);
        id.setIdPermiso(idPermiso);
        DaoRolPermiso dao = service.findById(id);
        return dao != null ? ResponseEntity.ok(dao) : ResponseEntity.notFound().build();
    }

    @PostMapping 
    public ResponseEntity<DaoRolPermiso> save(@RequestBody DaoRolPermiso dao) { 
        return ResponseEntity.ok(service.save(dao)); 
    }

    @DeleteMapping("/{idRol}/{idPermiso}") 
    public ResponseEntity<Void> delete(@PathVariable Long idRol, @PathVariable Long idPermiso) {
        RolPermiso.RolPermisoId id = new RolPermiso.RolPermisoId();
        id.setIdRol(idRol);
        id.setIdPermiso(idPermiso);
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}