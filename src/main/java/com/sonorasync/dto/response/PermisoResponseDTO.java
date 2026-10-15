package com.sonorasync.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PermisoResponseDTO {
    private Long idPermiso;
    private String codigo;
    private String nombre;
    private String modulo;
    private String accion;
    private String descripcion;
}
