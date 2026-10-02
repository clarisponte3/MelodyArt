package com.sonorasync.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Entity
@Table(name = "usuario_rol")
public class UsuarioRol {

    @EmbeddedId
    private UsuarioRolId id;

    @ManyToOne
    @MapsId("idUsuario")
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;

    @ManyToOne
    @MapsId("idRol")
    @JoinColumn(name = "id_rol")
    private Rol rol;

    @Column(name = "asignado_en", nullable = false)
    private LocalDateTime asignadoEn = LocalDateTime.now();

    @Column(nullable = false)
    private Boolean activo = true;

    @Data
    @NoArgsConstructor
    @Embeddable
    public static class UsuarioRolId implements Serializable {
        @Column(name = "id_usuario")
        private Long idUsuario;
        
        @Column(name = "id_rol")
        private Long idRol;
    }
}