package com.sonorasync.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EvaluacionRequestDTO {

    @NotNull(message = "El ID de inscripción es obligatorio")
    private Long idInscripcion;

    @NotNull(message = "El ID del profesor es obligatorio")
    private Long idProfesor;

    private LocalDate fechaEvaluacion;

    @NotBlank(message = "El tipo de evaluación es obligatorio")
    @Size(max = 60, message = "El tipo no puede exceder 60 caracteres")
    private String tipo;

    @PositiveOrZero(message = "La calificación no puede ser negativa")
    private BigDecimal calificacion;

    private String observaciones;

    public Long getIdUsuarioProfesor() { return idProfesor; }
    public void setIdUsuarioProfesor(Long id) { this.idProfesor = id; }
}
