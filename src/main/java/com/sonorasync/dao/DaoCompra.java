package com.sonorasync.dao;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
public class DaoCompra {
    private Long idCompra;
    private String folio;
    private LocalDate fecha;
    private DaoProveedor proveedor;
    private DaoUsuario usuarioRegistra;
    private BigDecimal tasaIva;
    private String observaciones;
}