package com.sonorasync.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PagoMensualidadRequestDTO {

    @NotNull(message = "El ID del estado de cuenta es obligatorio")
    private Long idEstadoCuenta;

    @NotNull(message = "El ID del método de pago es obligatorio")
    private Long idMetodoPago;

    @NotNull(message = "El ID del usuario que registra es obligatorio")
    private Long idUsuarioRegistra;

    private LocalDateTime fechaPago;

    @NotNull(message = "El monto pagado es obligatorio")
    @Positive(message = "El monto pagado debe ser mayor a cero")
    private BigDecimal montoPagado;

    @Size(max = 120, message = "La referencia no puede exceder 120 caracteres")
    private String referencia;

    @Size(max = 300, message = "Las observaciones no pueden exceder 300 caracteres")
    private String observaciones;
}
