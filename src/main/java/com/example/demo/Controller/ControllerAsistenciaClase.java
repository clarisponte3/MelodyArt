package com.sonorasync.controller;
import com.sonorasync.dao.DaoAsistenciaClase;
import com.sonorasync.service.ServiceAsistenciaClase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/asistencias")
public class ControllerAsistenciaClase {
    @Autowired private ServiceAsistenciaClase service;
    @GetMapping public List<DaoAsistenciaClase> findAll() { return service.findAll(); }
    @GetMapping("/{id}") public ResponseEntity<DaoAsistenciaClase> findById(@PathVariable Long id) { return ResponseEntity.ok(service.findById(id)); }
    @PostMapping public ResponseEntity<DaoAsistenciaClase> save(@RequestBody DaoAsistenciaClase dao) { return ResponseEntity.ok(service.save(dao)); }
    @PutMapping("/{id}") public ResponseEntity<DaoAsistenciaClase> update(@PathVariable Long id, @RequestBody DaoAsistenciaClase dao) { return ResponseEntity.ok(service.update(id, dao)); }
    @DeleteMapping("/{id}") public ResponseEntity<Void> delete(@PathVariable Long id) { service.delete(id); return ResponseEntity.ok().build(); }
}