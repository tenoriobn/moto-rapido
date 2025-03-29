package com.empresa.motorapido.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Veiculo")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Veiculo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idveiculo")
    private Long idVeiculo;

    @Column(name = "ano", nullable = false)
    private Integer ano;

    @Column(name = "placa", nullable = false, unique = true)
    private String placa;

    @Column(name = "dataAquisicao", nullable = false)
    private LocalDate dataAquisicao;

    @Column(name = "distanciaDiaria", nullable = false)
    private Integer distanciaDiaria;

    @ManyToOne
    @JoinColumn(name = "modeloid", nullable = false)
    private Modelo modelo;

    @ManyToOne
    @JoinColumn(name = "veiculostatusid", nullable = false)
    private VeiculoStatus statusVeiculo;

    @ManyToOne
    @JoinColumn(name = "usuarioid", nullable = false)
    private Usuario usuario;

    @Column(name = "vidaUtilkm")
    private Integer vidaUtilKm;

    @Column(name = "kmAtual")
    private Integer kmAtual;

}
