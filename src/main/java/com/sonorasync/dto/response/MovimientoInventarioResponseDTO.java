package com.sonorasync.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MovimientoInventarioResponseDTO {
    private Long idMovimiento;
    private ProductoResponseDTO producto;
    private UsuarioResponseDTO usuario;
    private LocalDateTime fechaHora;
    private String tipoMovimiento;
    private Integer cantidad;
    private String motivo;
    private String referencia;
}
