package com.empresa.motorapido.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioAuthentDto {

    private String usuario;
    private String cpf;
    private String token;
    private Long idUsuario;

}
