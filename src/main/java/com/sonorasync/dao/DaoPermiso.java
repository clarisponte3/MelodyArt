package com.sonorasync.dao;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DaoPermiso {
    private Long idPermiso;
    private String codigo;
    private String nombre;
    private String modulo;
    private String accion;
    private String descripcion;
}