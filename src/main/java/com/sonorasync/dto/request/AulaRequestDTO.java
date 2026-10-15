package com.sonorasync.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AulaRequestDTO {
    private String nombre;
    private Integer capacidad;
    private String ubicacion;
    private Boolean activo;
}
