package com.sonorasync.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RolPermisoResponseDTO {
    private Long idRol;
    private Long idPermiso;
    private RolResponseDTO rol;
    private PermisoResponseDTO permiso;
}
