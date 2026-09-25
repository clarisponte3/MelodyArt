package com.sonorasync.dao;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class DaoUsuarioRol {
    private DaoUsuario usuario;
    private DaoRol rol;
    private LocalDateTime asignadoEn;
    private Boolean activo;
}