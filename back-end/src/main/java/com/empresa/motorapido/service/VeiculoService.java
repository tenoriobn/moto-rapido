package com.empresa.motorapido.service;

import java.util.List;
import java.util.Optional;

import com.empresa.motorapido.dto.VeiculoDto;
import com.empresa.motorapido.model.Veiculo;

public interface VeiculoService {

    Veiculo save(Veiculo veiculo);

    Optional<Veiculo> findById(Long id);

    void deleteById(Long Id);

    VeiculoDto atualizarVeiculo(VeiculoDto veiculoDto);

    List<Veiculo> findAll();

    List<VeiculoDto> findByModeloLike(String nomeModelo);

    List<VeiculoDto> findByPlacaLike(String placaString);

    List<VeiculoDto> findAllVeiculoStatus();

    List<VeiculoDto> findVeiculoByIdStatus(Integer idStatus);

}
