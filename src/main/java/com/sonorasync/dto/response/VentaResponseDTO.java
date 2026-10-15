package com.sonorasync.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VentaResponseDTO {
    private Long idVenta;
    private String folio;
    private LocalDateTime fechaHora;
    private UsuarioResponseDTO vendedor;
    private UsuarioResponseDTO cliente;
    private MetodoPagoResponseDTO metodoPago;
    private BigDecimal tasaIva;
    private String estado;
}
