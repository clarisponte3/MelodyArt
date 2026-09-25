package com.sonorasync.dao;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class DaoLogAuditoria {
    private Long idLog;
    private DaoUsuario usuario;
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