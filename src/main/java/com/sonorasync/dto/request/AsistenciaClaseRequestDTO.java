package com.sonorasync.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AsistenciaClaseRequestDTO {

    @NotNull(message = "El ID de inscripción es obligatorio")
    private Long idInscripcion;

    @NotNull(message = "La fecha de la clase es obligatoria")
    private LocalDate fechaClase;

    @NotBlank(message = "El estado es obligatorio")
    @Size(max = 20, message = "El estado no puede exceder 20 caracteres")
    private String estado;

    @Size(max = 300, message = "Las observaciones no pueden exceder 300 caracteres")
    private String observaciones;
}
