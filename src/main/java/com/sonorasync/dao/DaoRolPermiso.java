package com.sonorasync.dao;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DaoRolPermiso {
    private DaoRol rol;
    private DaoPermiso permiso;
}