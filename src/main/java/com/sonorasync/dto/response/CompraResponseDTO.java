package com.sonorasync.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompraResponseDTO {
    private Long idCompra;
    private String folio;
    private LocalDate fecha;
    private ProveedorResponseDTO proveedor;
    private UsuarioResponseDTO usuarioRegistra;
    private BigDecimal tasaIva;
    private String observaciones;
}
