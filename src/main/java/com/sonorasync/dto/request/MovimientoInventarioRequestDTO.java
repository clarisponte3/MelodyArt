package com.sonorasync.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MovimientoInventarioRequestDTO {

    @NotNull(message = "El ID del producto es obligatorio")
    private Long idProducto;

    @NotNull(message = "El ID del usuario es obligatorio")
    private Long idUsuario;

    private LocalDateTime fechaHora;

    @NotBlank(message = "El tipo de movimiento es obligatorio")
    @Size(max = 30, message = "El tipo de movimiento no puede exceder 30 caracteres")
    private String tipoMovimiento;

    @NotNull(message = "La cantidad es obligatoria")
    @Positive(message = "La cantidad debe ser mayor a cero")
    private Integer cantidad;

    @Size(max = 250, message = "El motivo no puede exceder 250 caracteres")
    private String motivo;

    @Size(max = 100, message = "La referencia no puede exceder 100 caracteres")
    private String referencia;
}
