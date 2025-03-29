package com.empresa.motorapido.service;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.orm.jpa.JpaSystemException;
import org.springframework.stereotype.Service;

import com.empresa.motorapido.dto.ManutencaoCorretivaDto;
import com.empresa.motorapido.model.Manutencao;
import com.empresa.motorapido.model.ManutencaoTipo;
import com.empresa.motorapido.model.Pessoa;
import com.empresa.motorapido.model.Usuario;
import com.empresa.motorapido.model.Veiculo;
import com.empresa.motorapido.repository.ManutencaoRepository;
import com.empresa.motorapido.repository.VeiculoRepository;

@Service
public class ManutencaoCorretivaServiceImplement implements ManutencaoCorretivaService {

    @Autowired
    ManutencaoRepository manutencaoRepository;

    @Autowired
    VeiculoRepository veiculoRepository;

    @Override
    public List<ManutencaoCorretivaDto> findByManutencaoByIdVeiculo(Long idveiculo) {
        List<ManutencaoCorretivaDto> manut = manutencaoRepository.findByManutencaoByIdVeiculo(idveiculo);
        if (manut.isEmpty()) {
            return Collections.emptyList();
        } else {
            return manut;
        }
    }

    @Override
    public List<ManutencaoCorretivaDto> findByManutencaoCoretByIdVeiculoAndPeriodo(
            Long idveiculo, LocalDate dataInicial, LocalDate dataFinal) {
        List<ManutencaoCorretivaDto> manut = manutencaoRepository.findByManutencaoByIdVeiculoAndPeriodo(idveiculo,
                dataInicial, dataFinal);
        if (manut.isEmpty()) {
            return Collections.emptyList();
        } else {
            return manut;
        }

    }

    @Override
    public List<ManutencaoCorretivaDto> findByManutencaoCoretVeiculoPeriodo(LocalDate dataInicial,
            LocalDate dataFinal) {
        List<ManutencaoCorretivaDto> manut = manutencaoRepository.findByManutencaoVeiculoPeriodo(dataInicial,
                dataFinal);
        if (manut.isEmpty()) {
            return Collections.emptyList();
        } else {
            return manut;
        }
    }

    @Override
    public void save(ManutencaoCorretivaDto manutencaoCorretivaDto) {
        try {

            Pessoa pessoa = new Pessoa();
            pessoa.setIdPessoa(manutencaoCorretivaDto.getIdMecanico());
            Usuario usuario = new Usuario();
            usuario.setIdUsuario(manutencaoCorretivaDto.getIdUsuario());
            ManutencaoTipo manutencaoTipo = new ManutencaoTipo();
            manutencaoTipo.setIdManutencaoTipo(8);
            Veiculo veiculo = new Veiculo();
            veiculo.setIdVeiculo(manutencaoCorretivaDto.getIdVeiculo());
            Manutencao manutencao = new Manutencao();
            manutencao.setDataEntrada(manutencaoCorretivaDto.getDataManutencao());
            manutencao.setDescricao(manutencaoCorretivaDto.getDescricaoManutencao());
            manutencao.setMecanico(pessoa);
            manutencao.setTipoManutencao(manutencaoTipo);
            manutencao.setUsuario(usuario);
            manutencao.setVeiculo(veiculo);

            manutencaoRepository.save(manutencao);
            veiculoRepository.atualizarStatusVeiculo(manutencaoCorretivaDto.getIdVeiculo(), 2);

        } catch (Exception e) {
            throw new RuntimeException("Error saving Manutencao: " + e.getMessage(), e);
        }

    }

    @Override
    public Void baixarManutencaoCorretiva(ManutencaoCorretivaDto manutencaoCorretivaDto) {
        try {
            Optional<Manutencao> manutencao = manutencaoRepository.findById(manutencaoCorretivaDto.getId());
            if (manutencao.isPresent()) {

                manutencaoRepository.updateDataSaidaById(manutencaoCorretivaDto.getId(),
                        manutencaoCorretivaDto.getDataFeitoManutencao());
                veiculoRepository.atualizarStatusVeiculo(manutencaoCorretivaDto.getIdVeiculo(), 4);

                return null;
            } else {
                throw new RuntimeException("Manutenção Corretiva não encontrada");
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

}
