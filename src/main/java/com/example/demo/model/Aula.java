package com.sonorasync.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "aula")
public class Aula {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_aula")
    private Long idAula;

    @Column(nullable = false, unique = true, length = 80)
    private String nombre;

    @Column(nullable = false)
    private Integer capacidad;

    @Column(length = 200)
    private String ubicacion;

    @Column(nullable = false)
    private Boolean activo = true;
}