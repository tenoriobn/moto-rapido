package com.empresa.motorapido.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.empresa.motorapido.dto.UsuarioPessoaDto;
import com.empresa.motorapido.exception.UsuarioNotFoundException;
import com.empresa.motorapido.model.Cargo;
import com.empresa.motorapido.model.Pessoa;
import com.empresa.motorapido.model.Usuario;
import com.empresa.motorapido.repository.PessoaRepository;
import com.empresa.motorapido.repository.UsuarioRepository;

@Service
public class UsuarioServiceImplement implements UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private PessoaRepository pessoaRepository;

    @Override
    public List<Usuario> findAll() {
        return usuarioRepository.findAll();
    }

    @Override
    public Optional<Usuario> findById(Long id) {
        return usuarioRepository.findById(id);
    }

    @Override
    public Optional<UsuarioPessoaDto> findByLoginInfoPessoa(String login) {
        return usuarioRepository.findByLoginInfoPessoa(login);
    }

    @Override
    public List<UsuarioPessoaDto> findUsuarioInfoByNome(String nome) {
        return usuarioRepository.findUsuarioInfoByNome(nome);
    }

    @Override
    public Optional<UsuarioPessoaDto> findByUsuarioInfoIdPessoa(Long idPessoa) {
        return usuarioRepository.findByUsuarioInfoIdPessoa(idPessoa);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Usuario createUsuarioWithPessoa(UsuarioPessoaDto usuarioPessoaDto) {
        try {
            // consultar de pessoa
            Optional<Pessoa> consultPessoa = pessoaRepository.findByCpf(usuarioPessoaDto.getCpf());

            if (!consultPessoa.isEmpty()) {
                throw new RuntimeException("Não é possivel cadastrar, pessoa " + usuarioPessoaDto.getCpf()
                        + ". Pessoa já consta cadastrada.");
            }

            Cargo cargo = new Cargo();
            cargo.setIdCargo(1);

            // Criar e salvar a nova Pessoa
            Pessoa novaPessoa = new Pessoa();
            novaPessoa.setNome(usuarioPessoaDto.getNome());
            novaPessoa.setCpf(usuarioPessoaDto.getCpf());
            novaPessoa.setRg(usuarioPessoaDto.getRg());
            novaPessoa.setCargo(cargo);

            // Setar outros campos de Pessoa...

            Pessoa pessoaSalva = pessoaRepository.save(novaPessoa);

            // Criar e salvar o novo Usuario
            Usuario novoUsuario = new Usuario();
            novoUsuario.setPessoa(pessoaSalva);
            novoUsuario.setLogin(usuarioPessoaDto.getLogin());
            novoUsuario.setSenha(usuarioPessoaDto.getSenha());
            // Setar outros campos de Usuario...

            return usuarioRepository.save(novoUsuario);

        } catch (RuntimeException e) {
            // Lançar exceção para garantir o rollback
            throw new RuntimeException("Erro ao criar usuário: " + e.getMessage(), e);
        }
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void updatePassword(Long idUsuario, String novaSenha) throws UsuarioNotFoundException {
        try {
            Optional<Usuario> usuario = usuarioRepository.findById(idUsuario);
            if (!usuario.isPresent()) {
                throw new UsuarioNotFoundException("Usuário não encontrado com id: " + idUsuario);
            }
            usuarioRepository.updatePassword(idUsuario, novaSenha);
        } catch (UsuarioNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("Erro ao atualizar senha", e);
        }
    }

    @Override
    public Optional<Usuario> findByIdUsuario(Long idUsuario) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByIdUsuario(idUsuario);
        if (usuarioOpt.isPresent()) {
            return usuarioOpt;
        } else {
            return Optional.empty();
        }
    }

    @Override
    public Usuario save(Usuario usuario) {

        try {
            Optional<Usuario> usuOpt = usuarioRepository.findUsuarioByIdPessoa(usuario.getPessoa().getIdPessoa());
            if (usuOpt.isPresent()) {
                throw new RuntimeException("ja possui usuário cadastrado");
            }

            return usuarioRepository.save(usuario);

        } catch (RuntimeException e) {
            // Lançar exceção para garantir o rollback
            throw new RuntimeException("Erro ao criar usuário: " + e.getMessage(), e);
        }

    }

    @Override
    public Optional<Usuario> findUsuarioByIdPessoa(Long idPessoa) {
        return usuarioRepository.findUsuarioByIdPessoa(idPessoa)
                .or(() -> Optional.of(new Usuario())); // Retorna um usuário vazio se não encontrado
    }

}
