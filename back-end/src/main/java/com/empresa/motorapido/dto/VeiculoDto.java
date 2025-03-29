package com.empresa.motorapido.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class VeiculoDto {

    private Long idVeiculo;
    private Integer ano;
    private String placa;
    private LocalDate dataAquisicao;
    private Integer distanciaDiaria;
    private Integer idModelo;
    private String modelo;
    private Integer idVeiculoStatus;
    private String statusVeiculo;
    private Integer vidaUtilKm;
    private Integer kmAtual;
    private Long idUsuario;

    public VeiculoDto(Long idVeiculo, Integer ano, String placa, LocalDate dataAquisicao,
            Integer distanciaDiaria, Integer idModelo, String modelo,
            Integer idVeiculoStatus, String statusVeiculo,
            Integer vidaUtilKm, Integer kmAtual) {

        this.idVeiculo = idVeiculo;
        this.ano = ano;
        this.placa = placa;
        this.dataAquisicao = dataAquisicao;
        this.distanciaDiaria = distanciaDiaria;
        this.idModelo = idModelo;
        this.modelo = modelo;
        this.idVeiculoStatus = idVeiculoStatus;
        this.statusVeiculo = statusVeiculo;
        this.vidaUtilKm = vidaUtilKm;
        this.kmAtual = kmAtual;
    }

    public VeiculoDto(String modelo, String placa, String statusVeiculo) {
        this.modelo = modelo;
        this.placa = placa;
        this.statusVeiculo = statusVeiculo;
    }

}
