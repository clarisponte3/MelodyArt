package com.sonorasync.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Entity
@Table(name = "asistencia_clase")
public class AsistenciaClase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_asistencia")
    private Long idAsistencia;

    @ManyToOne
    @JoinColumn(name = "id_inscripcion", nullable = false)
    private Inscripcion inscripcion;

    @Column(name = "fecha_clase", nullable = false)
    private LocalDate fechaClase;

    @Column(nullable = false, length = 20)
    private String estado;

    @Column(length = 300)
    private String observaciones;

    @Column(name = "registrada_en", nullable = false)
    private LocalDateTime registradaEn = LocalDateTime.now();
}