package com.sonorasync.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClaseMusicalResponseDTO {
    private Long idClaseMusical;
    private String nombre;
    private String descripcion;
    private String horario;
    private Integer capacidadMaxima;
    private Double costo;
}
