package com.sonorasync.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Entity
@Table(name = "usuario")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private Long idUsuario;

    @Column(nullable = false, length = 80)
    private String nombre;

    @Column(nullable = false, length = 120)
    private String apellidos;

    @Column(nullable = false, unique = true, length = 150)
    private String correo;

    @Column(length = 25)
    private String telefono;

    @Column(length = 250)
    private String direccion;

    @Column(name = "fecha_nacimiento")
    private LocalDate fechaNacimiento;

    @Column(unique = true, length = 18)
    private String curp;

    @Column(name = "contrasena_hash", nullable = false)
    private String contrasenaHash;

    @Column(nullable = false)
    private Boolean activo = true;

    @Column(name = "intentos_fallidos", nullable = false)
    private Integer intentosFallidos = 0;

    @Column(name = "bloqueado_hasta")
    private LocalDateTime bloqueadoHasta;

    @Column(name = "creado_en", nullable = false, updatable = false)
    private LocalDateTime creadoEn = LocalDateTime.now();

    @Column(name = "actualizado_en", nullable = false)
    private LocalDateTime actualizadoEn = LocalDateTime.now();
}