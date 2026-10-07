package com.sonorasync.service;

import com.sonorasync.dao.DaoInscripcion;
import com.sonorasync.dao.DaoUsuario;
import com.sonorasync.dao.DaoClaseMusical;
import com.sonorasync.model.Inscripcion;
import com.sonorasync.model.Usuario;
import com.sonorasync.model.ClaseMusical;
import com.sonorasync.repository.RepositoryInscripcion;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServiceInscripcion {

    @Autowired 
    private RepositoryInscripcion repository;

    public List<DaoInscripcion> findAll() { 
        return repository.findAll().stream().map(this::toDao).collect(Collectors.toList()); 
    }

    public DaoInscripcion findById(Long id) { 
        return repository.findById(id).map(this::toDao).orElse(null); 
    }

    public DaoInscripcion save(DaoInscripcion dao) { 
        return toDao(repository.save(toEntity(dao))); 
    }

    public DaoInscripcion update(Long id, DaoInscripcion dao) {
        if (repository.existsById(id)) { 
            Inscripcion entity = toEntity(dao); 
            entity.setIdInscripcion(id); 
            return toDao(repository.save(entity)); 
        } 
        return null;
    }

    public void delete(Long id) { 
        repository.deleteById(id); 
    }

    private DaoInscripcion toDao(Inscripcion entity) { 
        DaoInscripcion dao = new DaoInscripcion(); 
        BeanUtils.copyProperties(entity, dao); 
        return dao; 
    }

    private Inscripcion toEntity(DaoInscripcion dao) { 
        Inscripcion entity = new Inscripcion(); 
        BeanUtils.copyProperties(dao, entity); 
        return entity; 
    }

    // ==========================================
    // METODOS DE CONSULTAS CRUZADAS (JOINS)
    // ==========================================

    public List<DaoUsuario> obtenerUsuariosPorClase(Long idClase) {
        List<Usuario> usuarios = repository.findUsuariosByClaseId(idClase);
        
        return usuarios.stream().map(entidad -> {
            DaoUsuario dao = new DaoUsuario();
            // Mapeo exacto basado en Usuario.java y DaoUsuario.java
            dao.setIdUsuario(entidad.getIdUsuario());
            dao.setNombre(entidad.getNombre());
            dao.setApellidos(entidad.getApellidos());
            dao.setCorreo(entidad.getCorreo());
            return dao;
        }).collect(Collectors.toList());
    }

    public List<DaoClaseMusical> obtenerClasesPorUsuario(Long idUsuario) {
        List<ClaseMusical> clases = repository.findClasesByUsuarioId(idUsuario);
        
        return clases.stream().map(entidad -> {
            DaoClaseMusical dao = new DaoClaseMusical();
            // Mapeo exacto basado en ClaseMusical.java y DaoClaseMusical.java
            dao.setIdClase(entidad.getIdClaseMusical()); 
            dao.setMateria(entidad.getNombre());         
            dao.setDescripcion(entidad.getDescripcion());
            
            // Conversión de Double (Modelo) a BigDecimal (DAO) para el costo
            if(entidad.getCosto() != null) {
                dao.setCosto(java.math.BigDecimal.valueOf(entidad.getCosto()));
            }
            return dao;
        }).collect(Collectors.toList());
    }
}