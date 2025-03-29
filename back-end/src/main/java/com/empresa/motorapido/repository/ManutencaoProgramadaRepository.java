package com.empresa.motorapido.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.empresa.motorapido.dto.ManutencaoProgramadaDto;
import com.empresa.motorapido.model.Manutencao;
import com.empresa.motorapido.model.ManutencaoProgramada;

public interface ManutencaoProgramadaRepository extends JpaRepository<ManutencaoProgramada, Long> {
        @Query("SELECT new com.empresa.motorapido.dto.ManutencaoProgramadaDto("
                        + "m.id, v.idVeiculo, m.dataManutencao,m.dataFeitoManutencao, m.kmManutencao, " +
                        "m.kmFeitoManutencao,m.manutencaoOk, v.placa, v.kmAtual, mo.modelo, " +
                        "s.statusVeiculo,m.descricaoManutencao) " +
                        "FROM ManutencaoProgramada m " +
                        "JOIN m.veiculo v " +
                        "JOIN v.statusVeiculo s " +
                        "JOIN v.modelo mo " +
                        "WHERE LOWER(mo.modelo) LIKE LOWER(CONCAT('%', :nomemodelo, '%'))")
        List<ManutencaoProgramadaDto> findByManutencaoLikeModelo(@Param("nomemodelo") String nomemodelo);

        @Query("SELECT new com.empresa.motorapido.dto.ManutencaoProgramadaDto("
                        + "m.id, v.idVeiculo, m.dataManutencao,m.dataFeitoManutencao, m.kmManutencao, " +
                        "m.kmFeitoManutencao,m.manutencaoOk, v.placa, v.kmAtual, mo.modelo, " +
                        "s.statusVeiculo,m.descricaoManutencao) " +
                        "FROM ManutencaoProgramada m " +
                        "JOIN m.veiculo v " +
                        "JOIN v.statusVeiculo s " +
                        "JOIN v.modelo mo " +
                        "WHERE LOWER(v.placa) LIKE LOWER(CONCAT('%', :nomeplaca, '%')) ORDER BY m.dataManutencao DESC")
        List<ManutencaoProgramadaDto> findByManutencaoLikePlaca(@Param("nomeplaca") String nomeplaca);

        @Query("SELECT new com.empresa.motorapido.dto.ManutencaoProgramadaDto("
                        + "m.id, v.idVeiculo, m.dataManutencao,m.dataFeitoManutencao, m.kmManutencao, " +
                        "m.kmFeitoManutencao,m.manutencaoOk, v.placa, v.kmAtual, mo.modelo, " +
                        "s.statusVeiculo,m.descricaoManutencao) " +
                        "FROM ManutencaoProgramada m " +
                        "JOIN m.veiculo v " +
                        "JOIN v.statusVeiculo s " +
                        "JOIN v.modelo mo " +
                        "WHERE v.idVeiculo = :idveiculo ORDER BY m.dataManutencao DESC")
        List<ManutencaoProgramadaDto> findByManutencaoIdVeiculo(@Param("idveiculo") Long idveiculo);

        @Modifying
        @Transactional
        @Query("UPDATE ManutencaoProgramada m " +
                        "SET m.dataFeitoManutencao = :dataFeitoManutencao, " +
                        "m.kmFeitoManutencao = :kmFeitoManutencao, " +
                        "m.manutencaoOk = :manutencaook " +
                        "WHERE m.id = :idmanutencaoprogramada")
        void baixarManutencao(
                        @Param("dataFeitoManutencao") LocalDate dataFeitoManutencao,
                        @Param("kmFeitoManutencao") Integer kmFeitoManutencao,
                        @Param("manutencaook") boolean manutencaook,
                        @Param("idmanutencaoprogramada") Long idmanutencaoprogramada);

        void save(Manutencao manutencao);

        @Query("SELECT new com.empresa.motorapido.dto.ManutencaoProgramadaDto("
                        + "m.id, v.idVeiculo, m.dataManutencao,m.dataFeitoManutencao, m.kmManutencao, " +
                        "m.kmFeitoManutencao,m.manutencaoOk, v.placa, v.kmAtual, mo.modelo, " +
                        "s.statusVeiculo,m.descricaoManutencao) " +
                        "FROM ManutencaoProgramada m " +
                        "JOIN m.veiculo v " +
                        "JOIN v.statusVeiculo s " +
                        "JOIN v.modelo mo " +
                        "WHERE m.dataManutencao BETWEEN :dataInicial AND :dataFinal " +
                        "ORDER BY m.dataManutencao desc")
        List<ManutencaoProgramadaDto> findByManutencaoProgPeriodo(
                        @Param("dataInicial") LocalDate dataInicial,
                        @Param("dataFinal") LocalDate dataFinal);

        @Query("SELECT new com.empresa.motorapido.dto.ManutencaoProgramadaDto("
                        + "m.id, v.idVeiculo, m.dataManutencao,m.dataFeitoManutencao, m.kmManutencao, " +
                        "m.kmFeitoManutencao,m.manutencaoOk, v.placa, v.kmAtual, mo.modelo, " +
                        "s.statusVeiculo,m.descricaoManutencao) " +
                        "FROM ManutencaoProgramada m " +
                        "JOIN m.veiculo v " +
                        "JOIN v.statusVeiculo s " +
                        "JOIN v.modelo mo " +
                        "WHERE v.idVeiculo = :idveiculo " +
                        "AND m.dataManutencao BETWEEN :dataInicial AND :dataFinal " +
                        "ORDER BY m.dataManutencao desc")
        List<ManutencaoProgramadaDto> findByManutencaoProgIdVeiculoPeriodo(
                        @Param("idveiculo") Long idveiculo,
                        @Param("dataInicial") LocalDate dataInicial,
                        @Param("dataFinal") LocalDate dataFinal);

}
