package com.sonorasync.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompraRequestDTO {
    private String folio;
    private LocalDate fecha;
    private Long idProveedor;
    private Long idUsuarioRegistra;
    private BigDecimal tasaIva;
    private String observaciones;
}
