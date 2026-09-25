package com.sonorasync.dao;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
public class DaoEvaluacion {
    private Long idEvaluacion;
    private DaoInscripcion inscripcion;
    private DaoUsuario profesor;
    private LocalDate fechaEvaluacion;
    private String tipo;
    private BigDecimal calificacion;
    private String observaciones;
}