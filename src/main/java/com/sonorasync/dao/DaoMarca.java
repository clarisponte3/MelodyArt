package com.sonorasync.dao;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DaoMarca {
    private Long idMarca;
    private String nombre;
    private String descripcion;
    private Boolean activa;
}