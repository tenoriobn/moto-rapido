package com.empresa.motorapido.service;

import java.util.List;
import java.util.Optional;

import com.empresa.motorapido.dto.UsuarioPessoaDto;
import com.empresa.motorapido.exception.UsuarioNotFoundException;
import com.empresa.motorapido.model.Usuario;

public interface UsuarioService {

    List<Usuario> findAll();

    Optional<Usuario> findById(Long id);

    Optional<UsuarioPessoaDto> findByLoginInfoPessoa(String login);

    Optional<UsuarioPessoaDto> findByUsuarioInfoIdPessoa(Long idPessoa);

    List<UsuarioPessoaDto> findUsuarioInfoByNome(String nome);

    Usuario createUsuarioWithPessoa(UsuarioPessoaDto usuarioPessoaDTO);

    void updatePassword(Long idUsuario, String novaSenha) throws UsuarioNotFoundException;

    Optional<Usuario> findByIdUsuario(Long idUsuario);

    Usuario save(Usuario usuario);

    Optional<Usuario> findUsuarioByIdPessoa(Long idPessoa);

}
