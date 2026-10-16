package com.sonorasync.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LogAuditoriaRequestDTO {

    private Long idUsuario;

    private LocalDateTime fechaHora;

    @NotBlank(message = "El tipo de evento es obligatorio")
    @Size(max = 40, message = "El tipo de evento no puede exceder 40 caracteres")
    private String tipoEvento;

    @Size(max = 60, message = "El módulo no puede exceder 60 caracteres")
    private String modulo;

    @Size(max = 80, message = "La acción no puede exceder 80 caracteres")
    private String accion;

    @Size(max = 80, message = "La entidad no puede exceder 80 caracteres")
    private String entidad;

    private Long idEntidad;

    private String ipOrigen;

    @Size(max = 500, message = "El user agent no puede exceder 500 caracteres")
    private String userAgent;

    private String detalle;
}
