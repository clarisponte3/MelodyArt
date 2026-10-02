package com.sonorasync.dao;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DaoMetodoPago {
    private Long idMetodoPago;
    private String nombre;
    private String descripcion;
    private Boolean activo;
}