package com.sonorasync.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompraRequestDTO {

    @NotBlank(message = "El folio de compra es obligatorio")
    @Size(max = 50, message = "El folio no puede exceder 50 caracteres")
    private String folio;

    private LocalDate fecha;

    @NotNull(message = "El ID del proveedor es obligatorio")
    private Long idProveedor;

    @NotNull(message = "El ID del usuario que registra es obligatorio")
    private Long idUsuarioRegistra;

    @NotNull(message = "La tasa de IVA es obligatoria")
    @PositiveOrZero(message = "La tasa de IVA no puede ser negativa")
    private BigDecimal tasaIva;

    private String observaciones;
}
