package com.sonorasync.controller;
import com.sonorasync.dao.DaoLogAuditoria;
import com.sonorasync.service.ServiceLogAuditoria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/logs")
public class ControllerLogAuditoria {
    @Autowired private ServiceLogAuditoria service;
    @GetMapping public List<DaoLogAuditoria> findAll() { return service.findAll(); }
    @GetMapping("/{id}") public ResponseEntity<DaoLogAuditoria> findById(@PathVariable Long id) { return ResponseEntity.ok(service.findById(id)); }
    @PostMapping public ResponseEntity<DaoLogAuditoria> save(@RequestBody DaoLogAuditoria dao) { return ResponseEntity.ok(service.save(dao)); }
}