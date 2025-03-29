package com.empresa.motorapido.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.empresa.motorapido.model.VeiculoStatus;
import com.empresa.motorapido.repository.VeiculoStatusRepository;

@Service
public class VeiculoStatusServiceImplement implements VeiculoStatusService {

    @Autowired
    private VeiculoStatusRepository veiculoStatusRepository;

    @Override
    public List<VeiculoStatus> findAll() {
        return veiculoStatusRepository.findAll();
    }

    @Override
    public VeiculoStatus save(VeiculoStatus veiculoStatus) {
        return veiculoStatusRepository.save(veiculoStatus);
    }

}
