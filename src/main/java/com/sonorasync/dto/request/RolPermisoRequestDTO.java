package com.sonorasync.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RolPermisoRequestDTO {

    @NotNull(message = "El ID del rol es obligatorio")
    private Long idRol;

    @NotNull(message = "El ID del permiso es obligatorio")
    private Long idPermiso;
}
