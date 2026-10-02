package com.sonorasync.dao;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class DaoPagoMensualidad {
    private Long idPago;
    private DaoEstadoCuenta estadoCuenta;
    private DaoMetodoPago metodoPago;
    private DaoUsuario usuarioRegistra;
    private LocalDateTime fechaPago;
    private BigDecimal montoPagado;
    private String referencia;
    private String observaciones;
}