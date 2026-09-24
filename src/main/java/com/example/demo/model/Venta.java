package com.sonorasync.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Entity
@Table(name = "venta")
public class Venta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_venta")
    private Long idVenta;

    @Column(nullable = false, unique = true, length = 50)
    private String folio;

    @Column(name = "fecha_hora", nullable = false)
    private LocalDateTime fechaHora = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "id_usuario_vendedor", nullable = false)
    private Usuario vendedor;

    @ManyToOne
    @JoinColumn(name = "id_usuario_cliente")
    private Usuario cliente;

    @ManyToOne
    @JoinColumn(name = "id_metodo_pago", nullable = false)
    private MetodoPago metodoPago;

    @Column(name = "tasa_iva", nullable = false, precision = 5, scale = 2)
    private BigDecimal tasaIva = new BigDecimal("16.00");

    @Column(nullable = false, length = 20)
    private String estado = "COMPLETADA";
}