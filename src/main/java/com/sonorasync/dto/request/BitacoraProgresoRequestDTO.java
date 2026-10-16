package com.sonorasync.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BitacoraProgresoRequestDTO {

    @NotNull(message = "El ID de inscripción es obligatorio")
    private Long idInscripcion;

    @NotNull(message = "El ID del profesor es obligatorio")
    private Long idProfesor;

    @NotNull(message = "La fecha de sesión es obligatoria")
    private LocalDate fechaSesion;

    @Size(max = 200, message = "El tema trabajado no puede exceder 200 caracteres")
    private String temaTrabajado;

    private String comentariosPedagogicos;

    private String objetivosCumplidos;

    private String proximaMeta;

    public Long getIdUsuarioProfesor() { return idProfesor; }
    public void setIdUsuarioProfesor(Long id) { this.idProfesor = id; }
}
