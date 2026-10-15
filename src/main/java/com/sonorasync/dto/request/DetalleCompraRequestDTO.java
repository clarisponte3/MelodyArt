package com.sonorasync.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DetalleCompraRequestDTO {
    private Long idCompra;
    private Long idProducto;
    private Integer cantidad;
    private BigDecimal precioUnitario;
}
