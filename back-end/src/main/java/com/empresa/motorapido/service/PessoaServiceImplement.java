package com.empresa.motorapido.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.empresa.motorapido.dto.PessoaDto;
import com.empresa.motorapido.model.Cargo;
import com.empresa.motorapido.model.Pessoa;
import com.empresa.motorapido.repository.PessoaRepository;

@Service
public class PessoaServiceImplement implements PessoaService {

    @Autowired
    private PessoaRepository pessoaRepository;

    @Override
    public Optional<Pessoa> findById(Long id) {
        return pessoaRepository.findById(id);
    }

    @Override
    public Optional<Pessoa> findByCpf(String cpf) {
        return pessoaRepository.findByCpf(cpf);
    }

    @Override
    public List<Pessoa> findAll() {
        return pessoaRepository.findAll();
    }

    @Override
    public List<Pessoa> findByCpfContaining(String cpf) {
        return pessoaRepository.findByCpfContaining(cpf);
    }

    @Override
    public List<Pessoa> findByNomeContaining(String nome) {
        return pessoaRepository.findByNomeContaining(nome);

    }

    @Override
    public Pessoa save(Pessoa pessoa) {
        try {

            return pessoaRepository.save(pessoa);
        } catch (Exception e) {
            throw new RuntimeException("Error saving Pessoa: " + e.getMessage(), e);
        }
    }

    @Override
    public void savePessoaDto(PessoaDto pessoaDto) {
        try {
            Cargo cargo = new Cargo();
            cargo.setIdCargo(pessoaDto.getIdCargo());
            // Criar e salvar a nova Pessoa
            Pessoa novaPessoa = new Pessoa();
            novaPessoa.setNome(pessoaDto.getNome());
            novaPessoa.setCpf(pessoaDto.getCpf());
            novaPessoa.setRg(pessoaDto.getRg());
            novaPessoa.setCargo(cargo);
            pessoaRepository.save(novaPessoa);
        } catch (Exception e) {
            throw new RuntimeException("Error saving Pessoa: " + e.getMessage(), e);
        }
    }

    @Override
    public void update(PessoaDto pessoaDto) {
        if (pessoaDto.getIdPessoa() == null) {
            throw new IllegalArgumentException("Cannot update Pessoa without an ID");
        }
        if (!pessoaRepository.existsById(pessoaDto.getIdPessoa())) {
            throw new EmptyResultDataAccessException("Pessoa not found with id: " + pessoaDto.getIdPessoa(), 1);
        }
        try {
            Cargo cargo = new Cargo();
            cargo.setIdCargo(pessoaDto.getIdCargo());
            // Criar e salvar a nova Pessoa
            Pessoa novaPessoa = new Pessoa();
            novaPessoa.setIdPessoa(pessoaDto.getIdPessoa());
            novaPessoa.setNome(pessoaDto.getNome());
            novaPessoa.setCpf(pessoaDto.getCpf());
            novaPessoa.setRg(pessoaDto.getRg());
            novaPessoa.setCargo(cargo);
            pessoaRepository.save(novaPessoa);
        } catch (Exception e) {
            throw new RuntimeException("Error updating Pessoa: " + e.getMessage(), e);
        }
    }

    @Override
    public void delete(long id) {
        try {
            pessoaRepository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            throw new EmptyResultDataAccessException("Pessoa not found with id: " + id, 1);
        } catch (Exception e) {
            throw new RuntimeException("Error deleting Pessoa: " + e.getMessage(), e);
        }
    }

    @Override
    public List<PessoaDto> findPessoaInfoByCpf(String cpf) {

        return pessoaRepository.findPessoaInfoByCpf(cpf);
    }

    @Override
    public List<PessoaDto> findPessoaInfoByNome(String nome) {

        return pessoaRepository.findPessoaInfoByNome(nome);
    }

    @Override
    public Optional<PessoaDto> findByPessoaIdPessoa(Long idPessoa) {

        return pessoaRepository.findByPessoaIdPessoa(idPessoa);
    }

    @Override
    public List<PessoaDto> findPessoaInfoByMecanicoNome(String nome) {

        return pessoaRepository.findPessoaInfoByMecanicoNome(nome);

    }

}