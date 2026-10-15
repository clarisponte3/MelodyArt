package com.sonorasync.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClaseMusicalRequestDTO {
    private String nombre;
    private String descripcion;
    private String horario;
    private Integer capacidadMaxima;
    private Double costo;
}
