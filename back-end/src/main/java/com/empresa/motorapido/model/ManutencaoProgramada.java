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
@Table(name = "ManutencaoProgramada")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class ManutencaoProgramada {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idmanutencaoprogramada")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "veiculoid", nullable = false)
    private Veiculo veiculo;

    @Column(name = "datamanutencao")
    private LocalDate dataManutencao;

    @Column(name = "datafeitomanutencao")
    private LocalDate dataFeitoManutencao;

    @Column(name = "kmfeitomanutencao")
    private Integer kmFeitoManutencao;

    @Column(name = "kmmanutencao")
    private Integer kmManutencao;

    @Column(name = "manutencaook")
    private boolean manutencaoOk;

    @Column(name = "descricaomanutencao")
    private String descricaoManutencao;

}
