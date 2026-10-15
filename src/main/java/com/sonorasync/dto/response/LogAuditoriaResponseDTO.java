package com.sonorasync.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LogAuditoriaResponseDTO {
    private Long idLog;
    private UsuarioResponseDTO usuario;
    private LocalDateTime fechaHora;
    private String tipoEvento;
    private String modulo;
    private String accion;
    private String entidad;
    private Long idEntidad;
    private String ipOrigen;
    private String userAgent;
    private String detalle;
}
