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

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "ManutencaoTipo")
public class ManutencaoTipo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idmanutencaotipo")
    private Integer idManutencaoTipo;

    @Column(name = "tipodemanutencao", nullable = false)
    private String tipoDeManutencao;

    // Getters e Setters

}
