package com.empresa.motorapido.dto;

import lombok.Data;

@Data
public class UsuarioIdDto {
    private Long idUsuario;

    public UsuarioIdDto(Long idUsuario) {
        this.idUsuario = idUsuario;
    }

    public Long getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }
}
