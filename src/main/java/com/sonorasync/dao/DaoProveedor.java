package com.sonorasync.dao;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DaoProveedor {
    private Long idProveedor;
    private String empresa;
    private String rfc;
    private String tel;
    private String correo;
    private String direccion;
    private String condicionesPago;
    private Boolean activo;
}