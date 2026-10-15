package com.sonorasync.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PagoMensualidadResponseDTO {
    private Long idPago;
    private EstadoCuentaResponseDTO estadoCuenta;
    private MetodoPagoResponseDTO metodoPago;
    private UsuarioResponseDTO usuarioRegistra;
    private LocalDateTime fechaPago;
    private BigDecimal montoPagado;
    private String referencia;
    private String observaciones;
}
