package com.sonorasync.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VentaRequestDTO {

    @NotBlank(message = "El folio de la venta es obligatorio")
    @Size(max = 50, message = "El folio no puede exceder 50 caracteres")
    private String folio;

    private LocalDateTime fechaHora;

    @NotNull(message = "El ID del vendedor es obligatorio")
    private Long idUsuarioVendedor;

    private Long idUsuarioCliente;

    @NotNull(message = "El ID del método de pago es obligatorio")
    private Long idMetodoPago;

    @NotNull(message = "La tasa de IVA es obligatoria")
    @PositiveOrZero(message = "La tasa de IVA no puede ser negativa")
    private BigDecimal tasaIva;

    @Size(max = 20, message = "El estado no puede exceder 20 caracteres")
    private String estado;

    public Long getIdVendedor() { return idUsuarioVendedor; }
    public void setIdVendedor(Long id) { this.idUsuarioVendedor = id; }
    public Long getIdCliente() { return idUsuarioCliente; }
    public void setIdCliente(Long id) { this.idUsuarioCliente = id; }
}
