package com.sonorasync.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InscripcionRequestDTO {
    private Long idUsuarioAlumno;
    private Long idClase;
    private LocalDate fechaInscripcion;
    private LocalDate fechaBaja;
    private BigDecimal costoAcordado;
    private String estado;

    public Long getIdAlumno() { return idUsuarioAlumno; }
    public void setIdAlumno(Long id) { this.idUsuarioAlumno = id; }
    public Long getIdClaseMusical() { return idClase; }
    public void setIdClaseMusical(Long id) { this.idClase = id; }
}
