package com.sonorasync.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@Entity
@Table(name = "compra")
public class Compra {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_compra")
    private Long idCompra;

    @Column(nullable = false, unique = true, length = 50)
    private String folio;

    @Column(nullable = false)
    private LocalDate fecha = LocalDate.now();

    @ManyToOne
    @JoinColumn(name = "id_proveedor", nullable = false)
    private Proveedor proveedor;

    @ManyToOne
    @JoinColumn(name = "id_usuario_registra", nullable = false)
    private Usuario usuarioRegistra;

    @Column(name = "tasa_iva", nullable = false, precision = 5, scale = 2)
    private BigDecimal tasaIva = new BigDecimal("16.00");

    @Column(columnDefinition = "TEXT")
    private String observaciones;
}