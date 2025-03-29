package com.empresa.motorapido.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioPasswordUpdateDto {
    private String login;
    private String currentPassword;
    private String newPassword;

}
