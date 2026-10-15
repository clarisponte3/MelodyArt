package com.sonorasync.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductoRequestDTO {
    private String sku;
    private String nombre;
    private String descripcion;
    private String modelo;
    private String numeroSerie;
    private BigDecimal precioVenta;
    private Integer stock;
    private Integer stockMinimo;
    private Long idCategoria;
    private Long idMarca;
    private Boolean activo;
}
