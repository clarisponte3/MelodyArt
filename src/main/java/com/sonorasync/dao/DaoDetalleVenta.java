package com.sonorasync.dao;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
public class DaoDetalleVenta {
    private Long idDetalleVenta;
    private DaoVenta venta;
    private DaoProducto producto;
    private Integer cantidad;
    private BigDecimal precioUnitario;
}