package com.sonorasync.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@Entity
@Table(name = "bitacora_progreso")
public class BitacoraProgreso {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_bitacora")
    private Long idBitacora;

    @ManyToOne
    @JoinColumn(name = "id_inscripcion", nullable = false)
    private Inscripcion inscripcion;

    @ManyToOne
    @JoinColumn(name = "id_profesor", nullable = false)
    private Usuario profesor;

    @Column(name = "fecha_sesion", nullable = false)
    private LocalDate fechaSesion = LocalDate.now();

    @Column(name = "tema_trabajado", length = 200)
    private String temaTrabajado;

    @Column(name = "comentarios_pedagogicos", columnDefinition = "TEXT")
    private String comentariosPedagogicos;

    @Column(name = "objetivos_cumplidos", columnDefinition = "TEXT")
    private String objetivosCumplidos;

    @Column(name = "proxima_meta", columnDefinition = "TEXT")
    private String proximaMeta;
}