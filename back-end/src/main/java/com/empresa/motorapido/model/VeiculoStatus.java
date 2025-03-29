package com.empresa.motorapido.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "VeiculoStatus")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class VeiculoStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idveiculostatus")
    private Integer idVeiculoStatus;

    @Column(name = "statusveiculo")
    private String statusVeiculo;

}
