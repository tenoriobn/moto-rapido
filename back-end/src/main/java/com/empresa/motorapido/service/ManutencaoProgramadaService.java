package com.empresa.motorapido.service;

import java.time.LocalDate;
import java.util.List;

import com.empresa.motorapido.dto.ManutencaoProgramadaDto;

public interface ManutencaoProgramadaService {

        List<ManutencaoProgramadaDto> findByManutencaoLikeModelo(String nomemodelo);

        List<ManutencaoProgramadaDto> findByManutencaoLikePlaca(String nomeplaca);

        List<ManutencaoProgramadaDto> findByManutencaoIdVeiculo(Long idveiculo);

        Void save(ManutencaoProgramadaDto manutencaoProgramadaDto);

        Void atualizarManutencao(ManutencaoProgramadaDto manutencaoProgramadaDto);

        Void baixarManutencao(ManutencaoProgramadaDto manutencaoProgramadaDto);

        List<ManutencaoProgramadaDto> findByManutencaoProgPeriodo(
                        LocalDate dataInicial,
                        LocalDate dataFinal);

        List<ManutencaoProgramadaDto> findByManutencaoProgIdVeiculoPeriodo(
                        Long idveiculo,
                        LocalDate dataInicial,
                        LocalDate dataFinal);
}
