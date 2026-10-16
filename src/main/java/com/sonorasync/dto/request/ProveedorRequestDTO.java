package com.sonorasync.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProveedorRequestDTO {

    @NotBlank(message = "El nombre de la empresa es obligatorio")
    @Size(max = 180, message = "El nombre de la empresa no puede exceder 180 caracteres")
    private String empresa;

    @Size(max = 13, message = "El RFC no puede exceder 13 caracteres")
    private String rfc;

    @Size(max = 25, message = "El teléfono no puede exceder 25 caracteres")
    private String tel;

    @Email(message = "El correo del proveedor no tiene un formato válido")
    @Size(max = 150, message = "El correo no puede exceder 150 caracteres")
    private String correo;

    @Size(max = 250, message = "La dirección no puede exceder 250 caracteres")
    private String direccion;

    @Size(max = 200, message = "Las condiciones de pago no pueden exceder 200 caracteres")
    private String condicionesPago;

    private Boolean activo;
}
