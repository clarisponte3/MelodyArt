package com.sonorasync.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MarcaRequestDTO {
    private String nombre;
    private String descripcion;
    private Boolean activa;
}
