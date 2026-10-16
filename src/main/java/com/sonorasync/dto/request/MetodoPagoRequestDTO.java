package com.sonorasync.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MetodoPagoRequestDTO {

    @NotBlank(message = "El nombre del método de pago es obligatorio")
    @Size(max = 60, message = "El nombre no puede exceder 60 caracteres")
    private String nombre;

    @Size(max = 200, message = "La descripción no puede exceder 200 caracteres")
    private String descripcion;

    private Boolean activo;
}
