package com.sonorasync.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioRolResponseDTO {
    private Long idUsuario;
    private Long idRol;
    private UsuarioResponseDTO usuario;
    private RolResponseDTO rol;
    private LocalDateTime asignadoEn;
    private Boolean activo;
}
