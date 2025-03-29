package com.empresa.motorapido.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.empresa.motorapido.dto.VeiculoDto;
import com.empresa.motorapido.model.Veiculo;

@Repository
public interface VeiculoRepository extends JpaRepository<Veiculo, Long> {

        @Query("SELECT new com.empresa.motorapido.dto.VeiculoDto(v.idVeiculo, v.ano, v.placa, v.dataAquisicao, " +
                        "v.distanciaDiaria, m.idModelo, m.modelo, s.idVeiculoStatus, s.statusVeiculo, v.vidaUtilKm, v.kmAtual) "
                        +
                        "FROM Veiculo v " +
                        "JOIN v.modelo m " +
                        "JOIN v.statusVeiculo s " +
                        "WHERE LOWER(m.modelo) LIKE LOWER(CONCAT('%', :modelo, '%'))")
        List<VeiculoDto> findByModeloLike(@Param("modelo") String modelo);

        @Query("SELECT new com.empresa.motorapido.dto.VeiculoDto(v.idVeiculo, v.ano, v.placa, v.dataAquisicao, " +
                        "v.distanciaDiaria, m.idModelo, m.modelo, s.idVeiculoStatus, s.statusVeiculo, v.vidaUtilKm, v.kmAtual) "
                        +
                        "FROM Veiculo v " +
                        "JOIN v.modelo m " +
                        "JOIN v.statusVeiculo s " +
                        "WHERE LOWER(v.placa) LIKE LOWER(CONCAT('%', :placa, '%'))")
        List<VeiculoDto> findByPlacaLike(@Param("placa") String placaString);

        @Modifying
        @Transactional
        @Query("UPDATE Veiculo v SET v.ano = :ano, v.placa = :placa, v.dataAquisicao = :dataAquisicao, " +
                        "v.distanciaDiaria = :distanciaDiaria, v.modelo.idModelo = :idModelo, " +
                        "v.statusVeiculo.idVeiculoStatus = :idVeiculoStatus, v.vidaUtilKm = :vidaUtilKm, v.kmAtual = :kmAtual "
                        +
                        "WHERE v.idVeiculo = :idVeiculo")
        int atualizarVeiculo(
                        @Param("ano") Integer ano,
                        @Param("placa") String placa,
                        @Param("dataAquisicao") LocalDate dataAquisicao,
                        @Param("distanciaDiaria") Integer distanciaDiaria,
                        @Param("idModelo") Integer idModelo,
                        @Param("idVeiculoStatus") Integer idVeiculoStatus,
                        @Param("vidaUtilKm") Integer vidaUtilKm,
                        @Param("kmAtual") Integer kmAtual,
                        @Param("idVeiculo") Long idVeiculo);

        @Modifying
        @Transactional
        @Query("UPDATE Veiculo v SET v.statusVeiculo.idVeiculoStatus = :idVeiculoStatus WHERE v.idVeiculo = :idVeiculo")
        int atualizarStatusVeiculo(Long idVeiculo, Integer idVeiculoStatus);

        @Query("SELECT new com.empresa.motorapido.dto.VeiculoDto(m.modelo, v.placa, s.statusVeiculo) " +
                        "FROM Veiculo v " +
                        "JOIN v.modelo m " +
                        "JOIN v.statusVeiculo s")
        List<VeiculoDto> findAllVeiculoStatus();

        @Query("SELECT new com.empresa.motorapido.dto.VeiculoDto(m.modelo, v.placa, s.statusVeiculo) " +
                        "FROM Veiculo v " +
                        "JOIN v.modelo m " +
                        "JOIN v.statusVeiculo s " +
                        "WHERE s.idVeiculoStatus = :idStatus")
        List<VeiculoDto> findVeiculoByIdStatus(@Param("idStatus") Integer idVeiculoStatus);

}
