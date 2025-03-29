package com.empresa.motorapido.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor

public class PessoaDto {
    private Long idPessoa;
    private String nome;
    private String cpf;
    private String rg;
    private String login;
    private String senha;
    private String cargo; // Field for p.cargo.cargo (Job Title or Position)
    private Integer idCargo; // Field for p.cargo.idCargo (Cargo ID)

    public PessoaDto(Long idPessoa, String nome, String cpf, String rg, String login,
            String senha, String cargo, Integer idCargo) {
        this.idPessoa = idPessoa;
        this.nome = nome;
        this.cpf = cpf;
        this.rg = rg;
        this.login = login;
        this.senha = senha;
        this.cargo = cargo;
        this.idCargo = idCargo;
    }

    public PessoaDto(Long idPessoa, String nome, String cpf, String rg,
            String cargo, Integer idCargo) {
        this.idPessoa = idPessoa;
        this.nome = nome;
        this.cpf = cpf;
        this.rg = rg;
        this.cargo = cargo;
        this.idCargo = idCargo;
    }

}
