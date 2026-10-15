package com.sonorasync.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AulaResponseDTO {
    private Long idAula;
    private String nombre;
    private Integer capacidad;
    private String ubicacion;
    private Boolean activo;
}
