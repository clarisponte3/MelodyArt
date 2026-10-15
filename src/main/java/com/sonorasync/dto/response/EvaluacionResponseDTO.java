package com.sonorasync.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EvaluacionResponseDTO {
    private Long idEvaluacion;
    private InscripcionResponseDTO inscripcion;
    private UsuarioResponseDTO profesor;
    private LocalDate fechaEvaluacion;
    private String tipo;
    private BigDecimal calificacion;
    private String observaciones;
}
