package com.empresa.motorapido.service;

import java.time.LocalDate;
import java.util.List;

import com.empresa.motorapido.dto.ManutencaoCorretivaDto;

public interface ManutencaoCorretivaService {
    void save(ManutencaoCorretivaDto manutencaoCorretivaDto);

    // Optional<Manutencao> findById(Long id);

    List<ManutencaoCorretivaDto> findByManutencaoByIdVeiculo(Long idveiculo);

    List<ManutencaoCorretivaDto> findByManutencaoCoretByIdVeiculoAndPeriodo(Long idveiculo, LocalDate dataInicial,
            LocalDate dataFinal);

    List<ManutencaoCorretivaDto> findByManutencaoCoretVeiculoPeriodo(LocalDate dataInicial, LocalDate dataFinal);

    Void baixarManutencaoCorretiva(ManutencaoCorretivaDto manutencaoCorretivaDto);

}
