package com.empresa.motorapido.dto;

import java.time.LocalDate;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ManutencaoProgramadaDto {

    private Long id;

    private Long idVeiculo;

    private LocalDate dataManutencao;

    private LocalDate dataFeitoManutencao;

    private Integer kmManutencao;

    private Integer kmFeitoManutencao;

    private boolean manutencaoOk;

    private String placa;

    private Integer kmAtual;

    private String modelo;

    private String statusVeiculo;

    private String descricaoManutencao;

    public ManutencaoProgramadaDto(Long id, long idVeiculo,
            LocalDate dataManutencao, LocalDate dataFeitoManutencao,
            Integer kmManutencao, Integer kmFeitoManutencao, boolean manutencaoOk, String placa,
            Integer kmAtual, String modelo, String statusVeiculo, String descricaoManutencao) {
        this.id = id;
        this.idVeiculo = idVeiculo;
        this.dataManutencao = dataManutencao;
        this.dataFeitoManutencao = dataFeitoManutencao;
        this.kmManutencao = kmManutencao;
        this.kmFeitoManutencao = kmFeitoManutencao;
        this.manutencaoOk = manutencaoOk;
        this.placa = placa;
        this.kmAtual = kmAtual;
        this.modelo = modelo;
        this.statusVeiculo = statusVeiculo;
        this.descricaoManutencao = descricaoManutencao;
    }

}
