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
@Table(name = "Manutencao")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Manutencao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idmanutencaro")
    private Long idManutencao;

    @ManyToOne
    @JoinColumn(name = "idveiculo", nullable = false)
    private Veiculo veiculo;

    @ManyToOne
    @JoinColumn(name = "idtipomanutencao", nullable = false)
    private ManutencaoTipo tipoManutencao;

    @Column(name = "dataentrada")
    private LocalDate dataEntrada;

    @Column(name = "datasaida")
    private LocalDate dataSaida;

    @Column(name = "descricao")
    private String descricao;

    @ManyToOne
    @JoinColumn(name = "idusuariom", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "mecanicoidpessoa", nullable = false)
    private Pessoa mecanico;

    // Getters e Setters

}
