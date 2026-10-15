package com.sonorasync.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConceptoPagoResponseDTO {
    private Long idConceptoPago;
    private String nombre;
    private String descripcion;
    private String tipo;
    private Boolean activo;
}
