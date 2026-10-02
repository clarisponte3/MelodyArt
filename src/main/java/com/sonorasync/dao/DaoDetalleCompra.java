package com.sonorasync.dao;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
public class DaoDetalleCompra {
    private Long idDetalleCompra;
    private DaoCompra compra;
    private DaoProducto producto;
    private Integer cantidad;
    private BigDecimal precioUnitario;
}