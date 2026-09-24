package com.sonorasync.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Entity
@Table(name = "log_auditoria")
public class LogAuditoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_log")
    private Long idLog;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;

    @Column(name = "fecha_hora", nullable = false)
    private LocalDateTime fechaHora = LocalDateTime.now();

    @Column(name = "tipo_evento", nullable = false, length = 40)
    private String tipoEvento;

    @Column(length = 60)
    private String modulo;

    @Column(length = 80)
    private String accion;

    @Column(length = 80)
    private String entidad;

    @Column(name = "id_entidad")
    private Long idEntidad;

    @Column(name = "ip_origen")
    private String ipOrigen;

    @Column(name = "user_agent", length = 500)
    private String userAgent;

    @Column(columnDefinition = "JSONB")
    private String detalle;
}