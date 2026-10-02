package com.sonorasync.dao;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DaoRol {
    private Long idRol;
    private String nombre;
    private String descripcion;
    private Boolean activo;
}