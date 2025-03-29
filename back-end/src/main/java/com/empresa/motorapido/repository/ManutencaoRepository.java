package com.empresa.motorapido.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.empresa.motorapido.dto.ManutencaoCorretivaDto;
import com.empresa.motorapido.model.Manutencao;

public interface ManutencaoRepository extends JpaRepository<Manutencao, Long> {

        @Query("SELECT new com.empresa.motorapido.dto.ManutencaoCorretivaDto(" +
                        "m.idManutencao, m.veiculo.idVeiculo, m.dataEntrada, m.dataSaida, " +
                        "m.veiculo.kmAtual, m.veiculo.placa, mod.modelo, " +
                        "v.statusVeiculo.statusVeiculo, m.descricao, " +
                        "p.nome,   " +
                        "t.tipoDeManutencao,p.idPessoa) " +
                        "FROM Manutencao m " +
                        "INNER JOIN m.veiculo v " +
                        "INNER JOIN v.modelo mod " +
                        "INNER JOIN m.mecanico p " +
                        "INNER JOIN m.tipoManutencao t " +
                        "WHERE v.idVeiculo = :idveiculo")
        List<ManutencaoCorretivaDto> findByManutencaoByIdVeiculo(@Param("idveiculo") Long idveiculo);

        @Query("SELECT new com.empresa.motorapido.dto.ManutencaoCorretivaDto(" +
                        "m.idManutencao, m.veiculo.idVeiculo, m.dataEntrada, m.dataSaida, " +
                        "m.veiculo.kmAtual, m.veiculo.placa, mod.modelo, " +
                        "v.statusVeiculo.statusVeiculo, m.descricao, " +
                        "p.nome, " +
                        "t.tipoDeManutencao) " +
                        "FROM Manutencao m " +
                        "INNER JOIN m.veiculo v " +
                        "INNER JOIN v.modelo mod " +
                        "INNER JOIN m.mecanico p " +
                        "INNER JOIN m.tipoManutencao t " +
                        "WHERE v.idVeiculo = :idveiculo " +
                        "AND m.dataEntrada BETWEEN :dataInicial AND :dataFinal " +
                        "ORDER BY m.dataEntrada DESC")
        List<ManutencaoCorretivaDto> findByManutencaoByIdVeiculoAndPeriodo(
                        @Param("idveiculo") Long idveiculo,
                        @Param("dataInicial") LocalDate dataInicial,
                        @Param("dataFinal") LocalDate dataFinal);

        @Query("SELECT new com.empresa.motorapido.dto.ManutencaoCorretivaDto(" +
                        "m.idManutencao, m.veiculo.idVeiculo, m.dataEntrada, m.dataSaida, " +
                        "m.veiculo.kmAtual, m.veiculo.placa, mod.modelo, " +
                        "v.statusVeiculo.statusVeiculo, m.descricao, " +
                        "p.nome, " +
                        "t.tipoDeManutencao) " +
                        "FROM Manutencao m " +
                        "INNER JOIN m.veiculo v " +
                        "INNER JOIN v.modelo mod " +
                        "INNER JOIN m.mecanico p " +
                        "INNER JOIN m.tipoManutencao t " +
                        "WHERE m.dataEntrada BETWEEN :dataInicial AND :dataFinal " +
                        "ORDER BY m.dataEntrada DESC") // Adicionado WHERE aqui
        List<ManutencaoCorretivaDto> findByManutencaoVeiculoPeriodo(
                        @Param("dataInicial") LocalDate dataInicial,
                        @Param("dataFinal") LocalDate dataFinal);

        @Modifying
        @Transactional
        @Query("UPDATE Manutencao m SET m.dataSaida = :dataSaida WHERE m.idManutencao = :idManutencao")
        void updateDataSaidaById(@Param("idManutencao") Long idManutencao, @Param("dataSaida") LocalDate dataSaida);
}