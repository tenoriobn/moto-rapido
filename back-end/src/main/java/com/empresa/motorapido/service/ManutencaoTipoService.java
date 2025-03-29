package com.empresa.motorapido.service;

import java.util.List;

import com.empresa.motorapido.model.ManutencaoTipo;

public interface ManutencaoTipoService {

    ManutencaoTipo save(ManutencaoTipo manutencaoTipo);

    List<ManutencaoTipo> findAll();

}
