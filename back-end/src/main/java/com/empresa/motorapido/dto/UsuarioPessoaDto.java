package com.empresa.motorapido.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioPessoaDto {
    private Long idUsuario;
    private Long idPessoa;
    private String nome;
    private String cpf;
    private String rg;
    private String login;
    private String senha;
    private String cargo; // Field for p.cargo.cargo (Job Title or Position)
    private Integer idCargo; // Field for p.cargo.idCargo (Cargo ID)

    public UsuarioPessoaDto(String nome, String cpf, String rg, String login, String senha) {
        this.nome = nome;
        this.cpf = cpf;
        this.rg = rg;
        this.login = login;
        this.senha = senha;
    }

    // Add this constructor to match the query
    public UsuarioPessoaDto(String nome, String cpf, String rg, String login, String senha, Long idUsuario) {
        this.nome = nome;
        this.cpf = cpf;
        this.rg = rg;
        this.login = login;
        this.senha = senha;
        this.idUsuario = idUsuario;
    }

    public UsuarioPessoaDto(Long idPessoa, String nome, String cpf, String rg, String login, String senha) {
        this.idPessoa = idPessoa;
        this.nome = nome;
        this.cpf = cpf;
        this.rg = rg;
        this.login = login;
        this.senha = senha;

    }

    // Add this constructor to match the query fields
    public UsuarioPessoaDto(String nome, String cpf, String rg, String login, String senha, String cargo,
            Integer idCargo) {
        this.nome = nome;
        this.cpf = cpf;
        this.rg = rg;
        this.login = login;
        this.senha = senha;
        this.cargo = cargo;
        this.idCargo = idCargo;
    }
}