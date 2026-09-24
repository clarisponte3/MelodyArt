package com.sonorasync.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@Entity
@Table(name = "evaluacion")
public class Evaluacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_evaluacion")
    private Long idEvaluacion;

    @ManyToOne
    @JoinColumn(name = "id_inscripcion", nullable = false)
    private Inscripcion inscripcion;

    @ManyToOne
    @JoinColumn(name = "id_profesor", nullable = false)
    private Usuario profesor;

    @Column(name = "fecha_evaluacion", nullable = false)
    private LocalDate fechaEvaluacion = LocalDate.now();

    @Column(nullable = false, length = 60)
    private String tipo;

    @Column(precision = 5, scale = 2)
    private BigDecimal calificacion;

    @Column(columnDefinition = "TEXT")
    private String observaciones;
}