package com.sonorasync.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioRolRequestDTO {
    private Long idUsuario;
    private Long idRol;
    private LocalDateTime asignadoEn;
    private Boolean activo;
}
