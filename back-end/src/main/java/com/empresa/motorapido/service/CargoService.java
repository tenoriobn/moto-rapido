package com.empresa.motorapido.service;

import java.util.List;

import com.empresa.motorapido.model.Cargo;

public interface CargoService {
    Cargo save(Cargo cargo);

    List<Cargo> findAll();

}
