package com.empresa.motorapido.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.empresa.motorapido.dto.UsuarioPessoaDto;
import com.empresa.motorapido.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

       @Query("SELECT new com.empresa.motorapido.dto.UsuarioPessoaDto(p.nome, p.cpf, p.rg, u.login, u.senha,u.idUsuario) "
                     +
                     "FROM Usuario u JOIN u.pessoa p " +
                     "WHERE LOWER(u.login) = LOWER(:login)")
       Optional<UsuarioPessoaDto> findByLoginInfoPessoa(@Param("login") String login);

       @Query("SELECT new com.empresa.motorapido.dto.UsuarioPessoaDto(p.nome, p.cpf, p.rg, u.login, u.senha, u.idUsuario) "
                     +
                     "FROM Usuario u JOIN u.pessoa p " +
                     "WHERE p.idPessoa = :idPessoa")
       Optional<UsuarioPessoaDto> findByUsuarioInfoIdPessoa(@Param("idPessoa") Long idPessoa);

       @Query("SELECT new com.empresa.motorapido.dto.UsuarioPessoaDto(p.nome, p.cpf, p.rg, u.login, u.senha) " +
                     "FROM Usuario u JOIN u.pessoa p " +
                     "WHERE LOWER(p.nome) LIKE LOWER(CONCAT('%', :nome, '%'))")
       List<UsuarioPessoaDto> findUsuarioInfoByNome(@Param("nome") String nome);

       @Modifying
       @Query("UPDATE Usuario u SET u.senha = :senha WHERE u.idUsuario = :idUsuario")
       void updatePassword(@Param("idUsuario") Long idUsuario, @Param("senha") String senha);

       Optional<Usuario> findByIdUsuario(Long idUsuario);

       @Query("SELECT u FROM Usuario u WHERE u.pessoa.idPessoa = :idPessoa")
       Optional<Usuario> findUsuarioByIdPessoa(@Param("idPessoa") Long idPessoa);

}