package com.sonorasync.dao;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
public class DaoEstadoCuenta {
    private Long idEstadoCuenta;
    private DaoUsuario alumno;
    private DaoConceptoPago conceptoPago;
    private LocalDate periodo;
    private LocalDate fechaEmision;
    private LocalDate fechaVencimiento;
    private BigDecimal monto;
    private String estado;
}