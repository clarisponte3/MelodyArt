package com.sonorasync.repository;

import com.sonorasync.model.Inscripcion;
import com.sonorasync.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

@Repository
public interface RepositoryInscripcion extends JpaRepository<Inscripcion, Long> {

    @Query("SELECT i.usuario FROM Inscripcion i WHERE i.claseMusical.idClase = :idClase")
    List<Usuario> findUsuariosByClaseId(@Param("idClase") Long idClase);

}