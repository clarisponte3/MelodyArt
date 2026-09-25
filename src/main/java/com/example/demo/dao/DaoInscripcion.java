package com.sonorasync.dao;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
public class DaoInscripcion {
    private Long idInscripcion;
    private DaoUsuario alumno;
    private DaoClaseMusical clase;
    private LocalDate fechaInscripcion;
    private LocalDate fechaBaja;
    private BigDecimal costoAcordado;
    private String estado;
}