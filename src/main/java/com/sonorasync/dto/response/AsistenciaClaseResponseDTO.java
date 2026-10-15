package com.sonorasync.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AsistenciaClaseResponseDTO {
    private Long idAsistencia;
    private InscripcionResponseDTO inscripcion;
    private LocalDate fechaClase;
    private String estado;
    private String observaciones;
    private LocalDateTime registradaEn;
}
