package com.empresa.motorapido.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.empresa.motorapido.model.Modelo;
import com.empresa.motorapido.repository.VeiculoModeloRepository;

@Service
public class VeiculoModeloServiceImplement implements VeiculoModeloService {

    @Autowired
    private VeiculoModeloRepository veiculoModeloRepository;

    @Override
    public List<Modelo> findAll() {

        return veiculoModeloRepository.findAll();
    }

    @Override
    public Modelo save(Modelo modelo) {
        try {
            return veiculoModeloRepository.save(modelo);
        } catch (RuntimeException e) {
            throw new RuntimeException("Erro ao salvar modelo: " + e.getMessage(), e);
        }
    }

    @Override
    public void atualizaModelo(Modelo modelo) {
        try {
            Modelo conModelo = veiculoModeloRepository.findByModelo(modelo.getModelo());
            if (conModelo == null) {
                veiculoModeloRepository.save(modelo);
            } else {
                throw new RuntimeException("Modelo já cadastrado.");
            }
        } catch (RuntimeException e) {
            throw new RuntimeException("Erro ao atualizar modelo: " + e.getMessage(), e);
        }

    }

    @Override
    public List<Modelo> findByLikeModelo(String strModelo) {
        // TODO Auto-generated method stub
        return veiculoModeloRepository.findByModeloContaining(strModelo);
    }

}
