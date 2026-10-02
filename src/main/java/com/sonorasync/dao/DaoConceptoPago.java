package com.sonorasync.dao;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DaoConceptoPago {
    private Long idConceptoPago;
    private String nombre;
    private String descripcion;
    private String tipo;
    private Boolean activo;
}