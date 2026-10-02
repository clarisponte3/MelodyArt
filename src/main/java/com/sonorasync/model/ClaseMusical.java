package com.sonorasync.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "clase_musical")
public class ClaseMusical {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_clase_musical")
    private Long idClaseMusical;

    @Column(name = "nombre", nullable = false, length = 100)
    private String nombre; // Ej: Taller de Guitarra, Taller de Ukelele

    @Column(name = "descripcion", length = 255)
    private String descripcion;

    @Column(name = "horario", length = 100)
    private String horario;

    @Column(name = "capacidad_maxima")
    private Integer capacidadMaxima;

    @Column(name = "costo")
    private Double costo;
}