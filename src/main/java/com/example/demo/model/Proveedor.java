package com.sonorasync.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "proveedor")
public class Proveedor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_proveedor")
    private Long idProveedor;

    @Column(nullable = false, length = 180)
    private String empresa;

    @Column(unique = true, length = 13)
    private String rfc;

    @Column(length = 25)
    private String tel;

    @Column(length = 150)
    private String correo;

    @Column(length = 250)
    private String direccion;

    @Column(name = "condiciones_pago", length = 200)
    private String condicionesPago;

    @Column(nullable = false)
    private Boolean activo = true;
}