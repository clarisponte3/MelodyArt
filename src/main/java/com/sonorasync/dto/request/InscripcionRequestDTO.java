package com.sonorasync.dto.request;

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
public class InscripcionRequestDTO {

    @NotNull(message = "El ID del alumno es obligatorio")
    private Long idUsuarioAlumno;

    @NotNull(message = "El ID de la clase es obligatorio")
    private Long idClase;

    private LocalDate fechaInscripcion;

    private LocalDate fechaBaja;

    @NotNull(message = "El costo acordado es obligatorio")
    @PositiveOrZero(message = "El costo acordado no puede ser negativo")
    private BigDecimal costoAcordado;

    @Size(max = 20, message = "El estado no puede exceder 20 caracteres")
    private String estado;

    public Long getIdAlumno() { return idUsuarioAlumno; }
    public void setIdAlumno(Long id) { this.idUsuarioAlumno = id; }
    public Long getIdClaseMusical() { return idClase; }
    public void setIdClaseMusical(Long id) { this.idClase = id; }
}
