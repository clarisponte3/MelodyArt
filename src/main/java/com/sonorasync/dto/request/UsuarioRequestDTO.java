package com.sonorasync.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioRequestDTO {
    private String nombre;
    private String apellidos;
    private String correo;
    private String telefono;
    private String direccion;
    private LocalDate fechaNacimiento;
    private String curp;
    private String contrasena;
    private Boolean activo;

    public String getContrasenaHash() { return contrasena; }
    public void setContrasenaHash(String hash) { this.contrasena = hash; }
}
