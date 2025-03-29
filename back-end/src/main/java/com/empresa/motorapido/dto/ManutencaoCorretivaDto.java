package com.empresa.motorapido.dto;

import java.time.LocalDate;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ManutencaoCorretivaDto {
    private Long id;
    private Long idVeiculo;
    private LocalDate dataManutencao;
    private LocalDate dataFeitoManutencao;
    private Integer kmAtual;
    private String placa;
    private String modelo;
    private String statusVeiculo;
    private String descricaoManutencao;
    private String nomeMecanico;
    private Long idMecanico;
    private String tipoManutencao;
    private Integer idTipoManutencao;
    private Long idUsuario;

    // Manually generated constructor
    public ManutencaoCorretivaDto(Long id, Long idVeiculo, LocalDate dataManutencao, LocalDate dataFeitoManutencao,
            Integer kmAtual, String placa, String modelo, String statusVeiculo,
            String descricaoManutencao, String nomeMecanico, String tipoManutencao) {
        this.id = id;
        this.idVeiculo = idVeiculo;
        this.dataManutencao = dataManutencao;
        this.dataFeitoManutencao = dataFeitoManutencao;
        this.kmAtual = kmAtual;
        this.placa = placa;
        this.modelo = modelo;
        this.statusVeiculo = statusVeiculo;
        this.descricaoManutencao = descricaoManutencao;
        this.nomeMecanico = nomeMecanico;
        this.tipoManutencao = tipoManutencao;
    }

    public ManutencaoCorretivaDto(Long id, Long idVeiculo, LocalDate dataManutencao, LocalDate dataFeitoManutencao,
            Integer kmAtual, String placa, String modelo, String statusVeiculo,
            String descricaoManutencao, String nomeMecanico, String tipoManutencao, Long idMecanico,
            Integer idTipoManutencao, Long idUsuario) {
        this.id = id;
        this.idVeiculo = idVeiculo;
        this.dataManutencao = dataManutencao;
        this.dataFeitoManutencao = dataFeitoManutencao;
        this.kmAtual = kmAtual;
        this.placa = placa;
        this.modelo = modelo;
        this.statusVeiculo = statusVeiculo;
        this.descricaoManutencao = descricaoManutencao;
        this.nomeMecanico = nomeMecanico;
        this.tipoManutencao = tipoManutencao;
        this.idMecanico = idMecanico;
        this.idTipoManutencao = idTipoManutencao;
        this.idUsuario = idUsuario;
    }

    public ManutencaoCorretivaDto(Long id, Long idVeiculo, LocalDate dataManutencao, LocalDate dataFeitoManutencao,
            Integer kmAtual, String placa, String modelo, String statusVeiculo,
            String descricaoManutencao, String nomeMecanico, String tipoManutencao, long idMecanico) {
        this.id = id;
        this.idVeiculo = idVeiculo;
        this.dataManutencao = dataManutencao;
        this.dataFeitoManutencao = dataFeitoManutencao;
        this.kmAtual = kmAtual;
        this.placa = placa;
        this.modelo = modelo;
        this.statusVeiculo = statusVeiculo;
        this.descricaoManutencao = descricaoManutencao;
        this.nomeMecanico = nomeMecanico;
        this.tipoManutencao = tipoManutencao;
        this.idMecanico = idMecanico;
    }
}
