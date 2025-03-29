package com.empresa.motorapido.service;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.orm.jpa.JpaSystemException;
import org.springframework.stereotype.Service;

import com.empresa.motorapido.dto.ManutencaoProgramadaDto;
import com.empresa.motorapido.model.ManutencaoProgramada;
import com.empresa.motorapido.model.Veiculo;
import com.empresa.motorapido.repository.ManutencaoProgramadaRepository;
import com.empresa.motorapido.repository.VeiculoRepository;

@Service
public class ManutencaoProgramadaServiceImplement implements ManutencaoProgramadaService {
    @Autowired
    ManutencaoProgramadaRepository manutencaoProgramadaRepository;

    @Autowired
    VeiculoRepository veiculoRepository;

    @Override
    public List<ManutencaoProgramadaDto> findByManutencaoLikeModelo(String nomemodelo) {
        List<ManutencaoProgramadaDto> manutProgRet = manutencaoProgramadaRepository
                .findByManutencaoLikeModelo(nomemodelo);
        if (manutProgRet.isEmpty()) {
            return Collections.emptyList();
        } else {
            return manutProgRet;
        }
    }

    public Void save(ManutencaoProgramadaDto manutencaoProgramadaDto) {

        try {
            ManutencaoProgramada manutProgramada = new ManutencaoProgramada();
            Veiculo veiculo = new Veiculo();
            veiculo.setIdVeiculo(manutencaoProgramadaDto.getIdVeiculo());
            manutProgramada.setVeiculo(veiculo);
            manutProgramada.setDataManutencao(manutencaoProgramadaDto.getDataManutencao());
            manutProgramada.setDescricaoManutencao(manutencaoProgramadaDto.getDescricaoManutencao());
            manutProgramada.setKmManutencao(manutencaoProgramadaDto.getKmManutencao());
            manutProgramada.setManutencaoOk(false);

            manutencaoProgramadaRepository.save(manutProgramada);

        } catch (DataIntegrityViolationException e) {
            // Retorna uma exceção personalizada em caso de violação de integridade
            throw new RuntimeException("Violação de integridade: " + e.getMessage(), e);
        } catch (JpaSystemException e) {
            // Retorna uma exceção personalizada em caso de erro no sistema JPA
            throw new RuntimeException("Erro no sistema de persistência: " +
                    e.getMessage(), e);
        } catch (Exception e) {
            // Lida com qualquer outra exceção genérica
            throw new RuntimeException("Erro ao salvar o manutencao programada: " + e.getMessage(), e);
        }
        return null;

    }

    @Override
    public Void baixarManutencao(ManutencaoProgramadaDto manutencaoProgramadaDto) {
        try {
            Optional<ManutencaoProgramada> manutencaoProgramadaId = manutencaoProgramadaRepository
                    .findById(manutencaoProgramadaDto.getId());
            if (manutencaoProgramadaId.isPresent()) {

                manutencaoProgramadaRepository.baixarManutencao(manutencaoProgramadaDto.getDataFeitoManutencao(),
                        manutencaoProgramadaDto.getKmFeitoManutencao(), true,
                        manutencaoProgramadaDto.getId());
                veiculoRepository.atualizarStatusVeiculo(manutencaoProgramadaDto.getIdVeiculo(), 4);
                return null;
            } else {
                throw new RuntimeException("Manutenção Progrmada não encontrada");
            }

        } catch (DataIntegrityViolationException e) {
            // Retorna uma exceção personalizada em caso de violação de integridade (por
            // exemplo, constraint de chave)
            throw new RuntimeException("Violação de integridade: " + e.getMessage(), e);
        } catch (JpaSystemException e) {
            // Retorna uma exceção personalizada em caso de erro no sistema JPA
            throw new RuntimeException("Erro no sistema de persistência: " + e.getMessage(), e);
        } catch (RuntimeException e) {
            // Lida com qualquer outra exceção genérica
            throw new RuntimeException("Erro ao atualizar Manutenção programada: " + e.getMessage(), e);
        }
    }

    @Override
    public List<ManutencaoProgramadaDto> findByManutencaoLikePlaca(String nomeplaca) {
        List<ManutencaoProgramadaDto> manutProgRet = manutencaoProgramadaRepository
                .findByManutencaoLikePlaca(nomeplaca);
        if (manutProgRet.isEmpty()) {
            return Collections.emptyList();
        } else {
            return manutProgRet;
        }
    }

    @Override
    public Void atualizarManutencao(ManutencaoProgramadaDto manutencaoProgramadaDto) {
        try {

            Optional<ManutencaoProgramada> manutencaoProgramadaId = manutencaoProgramadaRepository
                    .findById(manutencaoProgramadaDto.getId());
            if (manutencaoProgramadaId.isPresent()) {

                Veiculo veiculo = new Veiculo();
                veiculo.setIdVeiculo(manutencaoProgramadaDto.getIdVeiculo());
                ManutencaoProgramada manutencaoProgramada = new ManutencaoProgramada();
                manutencaoProgramada.setId(manutencaoProgramadaDto.getId());
                manutencaoProgramada.setDataFeitoManutencao(manutencaoProgramadaDto.getDataFeitoManutencao());
                manutencaoProgramada.setDataManutencao(manutencaoProgramadaDto.getDataManutencao());
                manutencaoProgramada.setDescricaoManutencao(manutencaoProgramadaDto.getDescricaoManutencao());
                manutencaoProgramada.setKmFeitoManutencao(manutencaoProgramadaDto.getKmFeitoManutencao());
                manutencaoProgramada.setVeiculo(veiculo);
                manutencaoProgramadaRepository.save(manutencaoProgramada);

                return null;
            } else {
                throw new RuntimeException("Manutenção Progrmada não encontrada");
            }

        } catch (DataIntegrityViolationException e) {
            // Retorna uma exceção personalizada em caso de violação de integridade (por
            // exemplo, constraint de chave)
            throw new RuntimeException("Violação de integridade: " + e.getMessage(), e);
        } catch (JpaSystemException e) {
            // Retorna uma exceção personalizada em caso de erro no sistema JPA
            throw new RuntimeException("Erro no sistema de persistência: " + e.getMessage(), e);
        } catch (RuntimeException e) {
            // Lida com qualquer outra exceção genérica
            throw new RuntimeException("Erro ao atualizar Manutenção programada: " + e.getMessage(), e);
        }
    }

    @Override
    public List<ManutencaoProgramadaDto> findByManutencaoIdVeiculo(Long idveiculo) {
        List<ManutencaoProgramadaDto> manutProgRet = manutencaoProgramadaRepository
                .findByManutencaoIdVeiculo(idveiculo);
        if (manutProgRet.isEmpty()) {
            return Collections.emptyList();
        } else {
            return manutProgRet;
        }
    }

    @Override
    public List<ManutencaoProgramadaDto> findByManutencaoProgIdVeiculoPeriodo(
            Long idveiculo,
            LocalDate dataInicial,
            LocalDate dataFinal) {
        List<ManutencaoProgramadaDto> manut = manutencaoProgramadaRepository
                .findByManutencaoProgIdVeiculoPeriodo(idveiculo, dataInicial, dataFinal);
        if (manut.isEmpty()) {
            return Collections.emptyList();
        } else {
            return manut;
        }
    }

    @Override
    public List<ManutencaoProgramadaDto> findByManutencaoProgPeriodo(
            LocalDate dataInicial,
            LocalDate dataFinal) {
        List<ManutencaoProgramadaDto> manut = manutencaoProgramadaRepository.findByManutencaoProgPeriodo(dataInicial,
                dataFinal);
        if (manut.isEmpty()) {
            return Collections.emptyList();
        } else {
            return manut;
        }
    }

}
