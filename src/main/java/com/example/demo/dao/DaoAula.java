package com.sonorasync.dao;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DaoAula {
    private Long idAula;
    private String nombre;
    private Integer capacidad;
    private String ubicacion;
    private Boolean activo;
}