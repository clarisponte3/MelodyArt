package com.sonorasync.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VentaRequestDTO {
    private String folio;
    private LocalDateTime fechaHora;
    private Long idUsuarioVendedor;
    private Long idUsuarioCliente;
    private Long idMetodoPago;
    private BigDecimal tasaIva;
    private String estado;

    public Long getIdVendedor() { return idUsuarioVendedor; }
    public void setIdVendedor(Long id) { this.idUsuarioVendedor = id; }
    public Long getIdCliente() { return idUsuarioCliente; }
    public void setIdCliente(Long id) { this.idUsuarioCliente = id; }
}
