package com.sonorasync.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AsistenciaClaseRequestDTO {
    private Long idInscripcion;
    private LocalDate fechaClase;
    private String estado;
    private String observaciones;
}
