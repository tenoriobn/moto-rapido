package com.empresa.motorapido.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.empresa.motorapido.model.Modelo;

public interface VeiculoModeloRepository extends JpaRepository<Modelo, Integer> {

    List<Modelo> findByModeloContaining(String modelo);

    Modelo findByModelo(String modelo);
}
