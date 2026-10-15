package com.sonorasync.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PermisoRequestDTO {
    private String codigo;
    private String nombre;
    private String modulo;
    private String accion;
    private String descripcion;
}
