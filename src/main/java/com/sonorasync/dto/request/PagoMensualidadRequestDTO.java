package com.sonorasync.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PagoMensualidadRequestDTO {
    private Long idEstadoCuenta;
    private Long idMetodoPago;
    private Long idUsuarioRegistra;
    private LocalDateTime fechaPago;
    private BigDecimal montoPagado;
    private String referencia;
    private String observaciones;
}
