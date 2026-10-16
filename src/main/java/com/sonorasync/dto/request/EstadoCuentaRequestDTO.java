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
public class EstadoCuentaRequestDTO {

    @NotNull(message = "El ID del alumno es obligatorio")
    private Long idUsuarioAlumno;

    @NotNull(message = "El ID del concepto de pago es obligatorio")
    private Long idConceptoPago;

    @NotNull(message = "El periodo es obligatorio")
    private LocalDate periodo;

    private LocalDate fechaEmision;

    @NotNull(message = "La fecha de vencimiento es obligatoria")
    private LocalDate fechaVencimiento;

    @NotNull(message = "El monto es obligatorio")
    @PositiveOrZero(message = "El monto no puede ser negativo")
    private BigDecimal monto;

    @Size(max = 20, message = "El estado no puede exceder 20 caracteres")
    private String estado;

    public Long getIdAlumno() { return idUsuarioAlumno; }
    public void setIdAlumno(Long id) { this.idUsuarioAlumno = id; }
}
