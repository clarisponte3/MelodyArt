package com.sonorasync.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "rol")
public class Rol {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_rol")
    private Long idRol;

    @Column(nullable = false, unique = true, length = 50)
    private String nombre;

    @Column(length = 250)
    private String descripcion;

    @Column(nullable = false)
    private Boolean activo = true;
}