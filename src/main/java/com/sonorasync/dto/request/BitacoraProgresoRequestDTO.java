package com.sonorasync.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BitacoraProgresoRequestDTO {
    private Long idInscripcion;
    private Long idProfesor;
    private LocalDate fechaSesion;
    private String temaTrabajado;
    private String comentariosPedagogicos;
    private String objetivosCumplidos;
    private String proximaMeta;

    public Long getIdUsuarioProfesor() { return idProfesor; }
    public void setIdUsuarioProfesor(Long id) { this.idProfesor = id; }
}
