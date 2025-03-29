package com.empresa.motorapido.service;

import java.util.List;

import com.empresa.motorapido.model.Modelo;

public interface VeiculoModeloService {

    Modelo save(Modelo modelo);

    List<Modelo> findAll();

    void atualizaModelo(Modelo modelo);

    List<Modelo> findByLikeModelo(String strModelo);
}
