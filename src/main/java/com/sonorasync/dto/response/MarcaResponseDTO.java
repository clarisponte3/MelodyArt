package com.sonorasync.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MarcaResponseDTO {
    private Long idMarca;
    private String nombre;
    private String descripcion;
    private Boolean activa;
}
