package com.empresa.motorapido.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.empresa.motorapido.model.Cargo;

public interface CargoRepository extends JpaRepository<Cargo, Integer> {

}
