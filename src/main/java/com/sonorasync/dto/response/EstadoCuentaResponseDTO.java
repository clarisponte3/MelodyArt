package com.sonorasync.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EstadoCuentaResponseDTO {
    private Long idEstadoCuenta;
    private UsuarioResponseDTO alumno;
    private ConceptoPagoResponseDTO conceptoPago;
    private LocalDate periodo;
    private LocalDate fechaEmision;
    private LocalDate fechaVencimiento;
    private BigDecimal monto;
    private String estado;
}
