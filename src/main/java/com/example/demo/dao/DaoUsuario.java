package com.sonorasync.dao;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class DaoUsuario {
    private Long idUsuario;
    private String nombre;
    private String apellidos;
    private String correo;
    private String telefono;
    private String direccion;
    private LocalDate fechaNacimiento;
    private String curp;
    private String contrasenaHash;
    private Boolean activo;
    private Integer intentosFallidos;
    private LocalDateTime bloqueadoHasta;
    private LocalDateTime creadoEn;
    private LocalDateTime actualizadoEn;
}