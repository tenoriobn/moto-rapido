package com.empresa.motorapido.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.empresa.motorapido.model.ManutencaoTipo;
import com.empresa.motorapido.repository.ManutencaoTipoRepository;

@Service
public class ManutencaoTipoServiceImplement implements ManutencaoTipoService {
    @Autowired
    ManutencaoTipoRepository manutencaoTipoRepository;

    @Override
    public List<ManutencaoTipo> findAll() {
        return manutencaoTipoRepository.findAll();
    }

    @Override
    public ManutencaoTipo save(ManutencaoTipo manutencaoTipo) {
        return manutencaoTipoRepository.save(manutencaoTipo);
    }

}
