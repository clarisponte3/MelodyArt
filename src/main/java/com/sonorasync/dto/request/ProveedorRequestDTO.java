package com.sonorasync.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProveedorRequestDTO {
    private String empresa;
    private String rfc;
    private String tel;
    private String correo;
    private String direccion;
    private String condicionesPago;
    private Boolean activo;
}
