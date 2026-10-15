package com.sonorasync.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MovimientoInventarioRequestDTO {
    private Long idProducto;
    private Long idUsuario;
    private LocalDateTime fechaHora;
    private String tipoMovimiento;
    private Integer cantidad;
    private String motivo;
    private String referencia;
}
