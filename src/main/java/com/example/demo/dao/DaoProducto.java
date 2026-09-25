package com.sonorasync.dao;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
public class DaoProducto {
    private Long idProducto;
    private String sku;
    private String nombre;
    private String descripcion;
    private String modelo;
    private String numeroSerie;
    private BigDecimal precioVenta;
    private Integer stock;
    private Integer stockMinimo;
    private DaoCategoria categoria;
    private DaoMarca marca;
    private Boolean activo;
}