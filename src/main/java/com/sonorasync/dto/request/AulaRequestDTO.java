package com.sonorasync.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AulaRequestDTO {

    @NotBlank(message = "El nombre del aula es obligatorio")
    @Size(max = 80, message = "El nombre del aula no puede exceder 80 caracteres")
    private String nombre;

    @NotNull(message = "La capacidad del aula es obligatoria")
    @Positive(message = "La capacidad debe ser mayor a cero")
    private Integer capacidad;

    @Size(max = 200, message = "La ubicación no puede exceder 200 caracteres")
    private String ubicacion;

    private Boolean activo;
}
