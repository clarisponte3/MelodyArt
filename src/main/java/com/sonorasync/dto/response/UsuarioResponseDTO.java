package com.sonorasync.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioResponseDTO {
    private Long idUsuario;
    private String nombre;
    private String apellidos;
    private String correo;
    private String telefono;
    private String direccion;
    private LocalDate fechaNacimiento;
    private String curp;
    private Boolean activo;
    private Integer intentosFallidos;
    private LocalDateTime bloqueadoHasta;
    private LocalDateTime creadoEn;
    private LocalDateTime actualizadoEn;
}
