package com.sonorasync.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EvaluacionRequestDTO {
    private Long idInscripcion;
    private Long idProfesor;
    private LocalDate fechaEvaluacion;
    private String tipo;
    private BigDecimal calificacion;
    private String observaciones;

    public Long getIdUsuarioProfesor() { return idProfesor; }
    public void setIdUsuarioProfesor(Long id) { this.idProfesor = id; }
}
