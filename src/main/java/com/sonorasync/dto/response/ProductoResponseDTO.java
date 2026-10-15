package com.sonorasync.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductoResponseDTO {
    private Long idProducto;
    private String sku;
    private String nombre;
    private String descripcion;
    private String modelo;
    private String numeroSerie;
    private BigDecimal precioVenta;
    private Integer stock;
    private Integer stockMinimo;
    private CategoriaResponseDTO categoria;
    private MarcaResponseDTO marca;
    private Boolean activo;
}
