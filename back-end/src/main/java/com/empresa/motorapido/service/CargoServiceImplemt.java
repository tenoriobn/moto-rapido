package com.empresa.motorapido.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.empresa.motorapido.model.Cargo;
import com.empresa.motorapido.repository.CargoRepository;

@Service
public class CargoServiceImplemt implements CargoService {

    @Autowired
    CargoRepository cargoRepository;

    @Override
    public List<Cargo> findAll() {

        return cargoRepository.findAll();
    }

    @Override
    public Cargo save(Cargo cargo) {

        return cargoRepository.save(cargo);
    }

}
