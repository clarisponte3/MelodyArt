package com.sonorasync.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EstadoCuentaRequestDTO {
    private Long idUsuarioAlumno;
    private Long idConceptoPago;
    private LocalDate periodo;
    private LocalDate fechaEmision;
    private LocalDate fechaVencimiento;
    private BigDecimal monto;
    private String estado;

    public Long getIdAlumno() { return idUsuarioAlumno; }
    public void setIdAlumno(Long id) { this.idUsuarioAlumno = id; }
}
