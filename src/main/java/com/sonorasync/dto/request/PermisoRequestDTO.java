package com.sonorasync.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PermisoRequestDTO {

    @NotBlank(message = "El código de permiso es obligatorio")
    @Size(max = 100, message = "El código no puede exceder 100 caracteres")
    private String codigo;

    @NotBlank(message = "El nombre de permiso es obligatorio")
    @Size(max = 120, message = "El nombre no puede exceder 120 caracteres")
    private String nombre;

    @NotBlank(message = "El módulo es obligatorio")
    @Size(max = 60, message = "El módulo no puede exceder 60 caracteres")
    private String modulo;

    @NotBlank(message = "La acción es obligatoria")
    @Size(max = 60, message = "La acción no puede exceder 60 caracteres")
    private String accion;

    @Size(max = 250, message = "La descripción no puede exceder 250 caracteres")
    private String descripcion;
}
