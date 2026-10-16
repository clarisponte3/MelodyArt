package com.sonorasync.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClaseMusicalRequestDTO {

    @NotBlank(message = "El nombre de la clase musical es obligatorio")
    @Size(max = 100, message = "El nombre no puede exceder 100 caracteres")
    private String nombre;

    @Size(max = 255, message = "La descripción no puede exceder 255 caracteres")
    private String descripcion;

    @Size(max = 100, message = "El horario no puede exceder 100 caracteres")
    private String horario;

    @Positive(message = "La capacidad máxima debe ser mayor a cero")
    private Integer capacidadMaxima;

    @PositiveOrZero(message = "El costo no puede ser negativo")
    private Double costo;
}
