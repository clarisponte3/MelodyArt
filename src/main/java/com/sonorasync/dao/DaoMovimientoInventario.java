package com.sonorasync.dao;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class DaoMovimientoInventario {
    private Long idMovimiento;
    private DaoProducto producto;
    private DaoUsuario usuario;
    private LocalDateTime fechaHora;
    private String tipoMovimiento;
    private Integer cantidad;
    private String motivo;
    private String referencia;
}