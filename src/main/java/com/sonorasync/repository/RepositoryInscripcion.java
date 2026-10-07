package com.sonorasync.repository;

import com.sonorasync.model.Inscripcion;
import com.sonorasync.model.Usuario;
import com.sonorasync.model.ClaseMusical;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

@Repository
public interface RepositoryInscripcion extends JpaRepository<Inscripcion, Long> {

    // Nota: Usamos i.alumno e i.clase porque así se llaman en tu modelo Inscripcion.java
    @Query("SELECT i.alumno FROM Inscripcion i WHERE i.clase.idClaseMusical = :idClase")
    List<Usuario> findUsuariosByClaseId(@Param("idClase") Long idClase);

    @Query("SELECT i.clase FROM Inscripcion i WHERE i.alumno.idUsuario = :idUsuario")
    List<ClaseMusical> findClasesByUsuarioId(@Param("idUsuario") Long idUsuario);

}