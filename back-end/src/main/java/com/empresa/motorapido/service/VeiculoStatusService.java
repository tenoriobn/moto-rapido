package com.empresa.motorapido.service;

import java.util.List;

import com.empresa.motorapido.model.VeiculoStatus;

public interface VeiculoStatusService {

    VeiculoStatus save(VeiculoStatus veiculoStatus);

    List<VeiculoStatus> findAll();
}
