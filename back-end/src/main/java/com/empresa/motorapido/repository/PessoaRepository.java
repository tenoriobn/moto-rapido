package com.empresa.motorapido.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.empresa.motorapido.dto.PessoaDto;
import com.empresa.motorapido.model.Pessoa;

public interface PessoaRepository extends JpaRepository<Pessoa, Long> {
        Optional<Pessoa> findByCpf(String cpf);

        List<Pessoa> findByCpfContaining(String cpf);

        List<Pessoa> findByNomeContaining(String nome); // equivalente a usar like
        // Long idPessoa, String nome, String cpf, String rg,
        // String cargo, Integer idCargo

        @Query("SELECT new com.empresa.motorapido.dto.PessoaDto(p.idPessoa, p.nome, " +
                        "p.cpf, p.rg, c.cargo, c.idCargo) " +
                        "FROM Pessoa p " +
                        "JOIN p.cargo c " +
                        "WHERE LOWER(p.cpf) LIKE LOWER(CONCAT('%', :cpf, '%'))")
        List<PessoaDto> findPessoaInfoByCpf(@Param("cpf") String cpf);

        @Query("SELECT new com.empresa.motorapido.dto.PessoaDto(p.idPessoa, p.nome, " +
                        "p.cpf, p.rg,c.cargo, c.idCargo) " +
                        "FROM Pessoa p " +
                        "JOIN p.cargo c " +
                        "WHERE LOWER(p.nome) LIKE LOWER(CONCAT('%', :nome, '%'))")
        List<PessoaDto> findPessoaInfoByNome(@Param("nome") String nome);
        //

        @Query("SELECT new com.empresa.motorapido.dto.PessoaDto(p.idPessoa, p.nome, " +
                        "p.cpf, p.rg,c.cargo, c.idCargo) " +
                        "FROM Pessoa p " +
                        "JOIN p.cargo c WHERE p.idPessoa = :idPessoa")
        Optional<PessoaDto> findByPessoaIdPessoa(@Param("idPessoa") Long idPessoa);

        @Query("SELECT new com.empresa.motorapido.dto.PessoaDto(p.idPessoa, p.nome, " +
                        "p.cpf, p.rg,c.cargo, c.idCargo) " +
                        "FROM Pessoa p " +
                        "JOIN p.cargo c " +
                        "WHERE c.idCargo = 2 AND LOWER(p.nome) LIKE LOWER(CONCAT('%', :nome, '%'))")
        List<PessoaDto> findPessoaInfoByMecanicoNome(@Param("nome") String nome);

}
