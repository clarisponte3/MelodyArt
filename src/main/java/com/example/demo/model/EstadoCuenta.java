package com.sonorasync.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@Entity
@Table(name = "estado_cuenta")
public class EstadoCuenta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_estado_cuenta")
    private Long idEstadoCuenta;

    @ManyToOne
    @JoinColumn(name = "id_usuario_alumno", nullable = false)
    private Usuario alumno;

    @ManyToOne
    @JoinColumn(name = "id_concepto_pago", nullable = false)
    private ConceptoPago conceptoPago;

    @Column(nullable = false)
    private LocalDate periodo;

    @Column(name = "fecha_emision", nullable = false)
    private LocalDate fechaEmision = LocalDate.now();

    @Column(name = "fecha_vencimiento", nullable = false)
    private LocalDate fechaVencimiento;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal monto;

    @Column(nullable = false, length = 20)
    private String estado = "PENDIENTE";
}