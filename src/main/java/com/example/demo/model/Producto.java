package com.sonorasync.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@Entity
@Table(name = "producto")
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_producto")
    private Long idProducto;

    @Column(nullable = false, unique = true, length = 50)
    private String sku;

    @Column(nullable = false, length = 150)
    private String nombre;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    @Column(length = 100)
    private String modelo;

    @Column(name = "numero_serie", length = 100)
    private String numeroSerie;

    @Column(name = "precio_venta", nullable = false, precision = 12, scale = 2)
    private BigDecimal precioVenta;

    @Column(nullable = false)
    private Integer stock = 0;

    @Column(name = "stock_minimo", nullable = false)
    private Integer stockMinimo = 0;

    @ManyToOne
    @JoinColumn(name = "id_categoria", nullable = false)
    private Categoria categoria;

    @ManyToOne
    @JoinColumn(name = "id_marca")
    private Marca marca;

    @Column(nullable = false)
    private Boolean activo = true;
}