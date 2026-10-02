package com.sonorasync.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@Entity
@Table(name = "inscripcion")
public class Inscripcion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_inscripcion")
    private Long idInscripcion;

    @ManyToOne
    @JoinColumn(name = "id_usuario_alumno", nullable = false)
    private Usuario alumno;

    @ManyToOne
    @JoinColumn(name = "id_clase", nullable = false)
    private ClaseMusical clase;

    @Column(name = "fecha_inscripcion", nullable = false)
    private LocalDate fechaInscripcion = LocalDate.now();

    @Column(name = "fecha_baja")
    private LocalDate fechaBaja;

    @Column(name = "costo_acordado", nullable = false, precision = 12, scale = 2)
    private BigDecimal costoAcordado;

    @Column(nullable = false, length = 20)
    private String estado = "ACTIVA";
}