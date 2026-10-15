package com.sonorasync.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProveedorResponseDTO {
    private Long idProveedor;
    private String empresa;
    private String rfc;
    private String tel;
    private String correo;
    private String direccion;
    private String condicionesPago;
    private Boolean activo;
}
