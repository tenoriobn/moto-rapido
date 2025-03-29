package com.empresa.motorapido.model;

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
@Table(name = "Pessoa")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pessoa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idPessoa")
    private Long idPessoa;

    @Column(name = "nome", nullable = false)
    private String nome;

    @Column(name = "rg")
    private String rg;

    @Column(name = "cpf", nullable = false, unique = true)
    private String cpf;

    @ManyToOne
    @JoinColumn(name = "idCargo", nullable = false)
    private Cargo cargo;

}
