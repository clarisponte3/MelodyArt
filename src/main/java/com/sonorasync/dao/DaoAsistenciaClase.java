package com.sonorasync.dao;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class DaoAsistenciaClase {
    private Long idAsistencia;
    private DaoInscripcion inscripcion;
    private LocalDate fechaClase;
    private String estado;
    private String observaciones;
    private LocalDateTime registradaEn;
}