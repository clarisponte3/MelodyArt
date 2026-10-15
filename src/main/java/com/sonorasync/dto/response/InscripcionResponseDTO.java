package com.sonorasync.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InscripcionResponseDTO {
    private Long idInscripcion;
    private UsuarioResponseDTO alumno;
    private ClaseMusicalResponseDTO clase;
    private LocalDate fechaInscripcion;
    private LocalDate fechaBaja;
    private BigDecimal costoAcordado;
    private String estado;
}
