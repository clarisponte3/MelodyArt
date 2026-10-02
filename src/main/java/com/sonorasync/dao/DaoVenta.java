package com.sonorasync.dao;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class DaoVenta {
    private Long idVenta;
    private String folio;
    private LocalDateTime fechaHora;
    private DaoUsuario vendedor;
    private DaoUsuario cliente;
    private DaoMetodoPago metodoPago;
    private BigDecimal tasaIva;
    private String estado;
}