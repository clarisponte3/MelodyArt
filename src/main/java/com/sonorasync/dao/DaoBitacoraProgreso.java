package com.sonorasync.dao;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@NoArgsConstructor
public class DaoBitacoraProgreso {
    private Long idBitacora;
    private DaoInscripcion inscripcion;
    private DaoUsuario profesor;
    private LocalDate fechaSesion;
    private String temaTrabajado;
    private String comentariosPedagogicos;
    private String objetivosCumplidos;
    private String proximaMeta;
}