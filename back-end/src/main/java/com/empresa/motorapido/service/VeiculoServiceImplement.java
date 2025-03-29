package com.empresa.motorapido.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.orm.jpa.JpaSystemException;
import org.springframework.stereotype.Service;

import com.empresa.motorapido.dto.VeiculoDto;
import com.empresa.motorapido.model.Veiculo;
import com.empresa.motorapido.repository.VeiculoRepository;

@Service
public class VeiculoServiceImplement implements VeiculoService {

    @Autowired
    private VeiculoRepository veiculoRepository;

    @Override
    public List<Veiculo> findAll() {
        return veiculoRepository.findAll();
    }

    @Override
    public Optional<Veiculo> findById(Long id) {
        return veiculoRepository.findById(id);
    }

    @Override
    public Veiculo save(Veiculo veiculo) {
        try {
            // Tenta salvar o veículo no repositório
            return veiculoRepository.save(veiculo);
        } catch (DataIntegrityViolationException e) {
            // Retorna uma exceção personalizada em caso de violação de integridade (por
            // exemplo, constraint de chave)
            throw new RuntimeException("Violação de integridade: " + e.getMessage(), e);
        } catch (JpaSystemException e) {
            // Retorna uma exceção personalizada em caso de erro no sistema JPA
            throw new RuntimeException("Erro no sistema de persistência: " + e.getMessage(), e);
        } catch (Exception e) {
            // Lida com qualquer outra exceção genérica
            throw new RuntimeException("Erro ao salvar o veículo: " + e.getMessage(), e);
        }
    }

    @Override
    public void deleteById(Long id) {
        veiculoRepository.deleteById(id);
    }

    @Override
    public VeiculoDto atualizarVeiculo(VeiculoDto veiculoDto) {
        try {

            Optional<Veiculo> optionalVeiculo = veiculoRepository.findById(veiculoDto.getIdVeiculo());
            if (optionalVeiculo.isPresent()) {
                veiculoRepository.atualizarVeiculo(
                        veiculoDto.getAno(),
                        veiculoDto.getPlaca(),
                        veiculoDto.getDataAquisicao(),
                        veiculoDto.getDistanciaDiaria(),
                        veiculoDto.getIdModelo(),
                        veiculoDto.getIdVeiculoStatus(),
                        veiculoDto.getVidaUtilKm(),
                        veiculoDto.getKmAtual(),
                        veiculoDto.getIdVeiculo());
                return veiculoDto;
            } else {
                throw new RuntimeException("Veículo não encontrado");
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
            throw new RuntimeException("Erro ao atualizar o veículo: " + e.getMessage(), e);
        }
    }

    @Override
    public List<VeiculoDto> findByModeloLike(String nomeModelo) {
        return veiculoRepository.findByModeloLike(nomeModelo);
    }

    @Override
    public List<VeiculoDto> findByPlacaLike(String placaString) {
        return veiculoRepository.findByPlacaLike(placaString);
    }

    @Override
    public List<VeiculoDto> findAllVeiculoStatus() {

        return veiculoRepository.findAllVeiculoStatus();
    }

    @Override
    public List<VeiculoDto> findVeiculoByIdStatus(Integer idStatus) {

        return veiculoRepository.findVeiculoByIdStatus(idStatus);
    }

}