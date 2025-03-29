package com.empresa.motorapido.service;

import java.util.List;
import java.util.Optional;

import com.empresa.motorapido.dto.PessoaDto;
import com.empresa.motorapido.model.Pessoa;

public interface PessoaService {

    Optional<Pessoa> findById(Long id);

    Optional<Pessoa> findByCpf(String cpf);

    List<Pessoa> findByCpfContaining(String cpf);

    List<Pessoa> findByNomeContaining(String nome);

    List<Pessoa> findAll();

    Pessoa save(Pessoa pessoa);

    void savePessoaDto(PessoaDto pessoaDto);

    void update(PessoaDto pessoaDto);

    void delete(long Id);

    List<PessoaDto> findPessoaInfoByCpf(String cpf);

    List<PessoaDto> findPessoaInfoByNome(String nome);

    List<PessoaDto> findPessoaInfoByMecanicoNome(String nome);

    Optional<PessoaDto> findByPessoaIdPessoa(Long idPessoa);

}
