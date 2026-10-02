package com.sonorasync.dao;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalTime;

@Data
@NoArgsConstructor
public class DaoClaseMusical {
    private Long idClase;
    private String materia;
    private String instrumento;
    private String nivel;
    private String descripcion;
    private Integer diaSemana;
    private LocalTime horaInicio;
    private LocalTime horaFin;
    private Integer cupoMaximo;
    private BigDecimal costo;
    private DaoUsuario profesor;
    private DaoAula aula;
    private Boolean activa;
    private Boolean publicada;
}