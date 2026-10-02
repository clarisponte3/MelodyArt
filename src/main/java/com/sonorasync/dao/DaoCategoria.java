package com.sonorasync.dao;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DaoCategoria {
    private Long idCategoria;
    private String nombre;
    private String tipo;
    private String descripcion;
}