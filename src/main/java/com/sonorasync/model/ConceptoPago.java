package com.sonorasync.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "concepto_pago")
public class ConceptoPago {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_concepto_pago")
    private Long idConceptoPago;

    @Column(nullable = false, unique = true, length = 100)
    private String nombre;

    @Column(length = 250)
    private String descripcion;

    @Column(nullable = false, length = 30)
    private String tipo = "MENSUALIDAD";

    @Column(nullable = false)
    private Boolean activo = true;
}