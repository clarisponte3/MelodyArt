package com.sonorasync.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BitacoraProgresoResponseDTO {
    private Long idBitacora;
    private InscripcionResponseDTO inscripcion;
    private UsuarioResponseDTO profesor;
    private LocalDate fechaSesion;
    private String temaTrabajado;
    private String comentariosPedagogicos;
    private String objetivosCumplidos;
    private String proximaMeta;
}
