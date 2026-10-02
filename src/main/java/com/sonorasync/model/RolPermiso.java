package com.sonorasync.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.io.Serializable;

@Data
@NoArgsConstructor
@Entity
@Table(name = "rol_permiso")
public class RolPermiso {

    @EmbeddedId
    private RolPermisoId id;

    @ManyToOne
    @MapsId("idRol")
    @JoinColumn(name = "id_rol")
    private Rol rol;

    @ManyToOne
    @MapsId("idPermiso")
    @JoinColumn(name = "id_permiso")
    private Permiso permiso;

    @Data
    @NoArgsConstructor
    @Embeddable
    public static class RolPermisoId implements Serializable {
        @Column(name = "id_rol")
        private Long idRol;
        
        @Column(name = "id_permiso")
        private Long idPermiso;
    }
}