package com.empresa.motorapido.controller;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.empresa.motorapido.dto.UsuarioAuthentDto;
import com.empresa.motorapido.dto.UsuarioIdDto;
import com.empresa.motorapido.dto.UsuarioPasswordUpdateDto;
import com.empresa.motorapido.dto.UsuarioPessoaDto;
import com.empresa.motorapido.exception.UsuarioNotFoundException;
import com.empresa.motorapido.model.Pessoa;
import com.empresa.motorapido.model.Usuario;
import com.empresa.motorapido.security.JwtUtil;
import com.empresa.motorapido.security.UsuarioDetails;
import com.empresa.motorapido.service.PessoaService;
import com.empresa.motorapido.service.TokenBlacklistService;
import com.empresa.motorapido.service.UsuarioService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;
    @Autowired
    private PessoaService pessoaService;
    @Autowired
    private ControllerValidator controllerValidator;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private TokenBlacklistService tokenBlacklistService; // lista negra lista de tokeens logout

    @GetMapping("/search/name")
    public ResponseEntity<List<UsuarioPessoaDto>> searchUsuariosByNome(@RequestParam String nome) {
        if (controllerValidator.isNullOrEmpty(nome)) {
            return ResponseEntity.badRequest().body(null);
        }
        if (nome.length() < 3) {
            return ResponseEntity.badRequest().body(Collections.emptyList());// retona uma colecao vazia
        }

        List<UsuarioPessoaDto> usuarios;
        usuarios = usuarioService.findUsuarioInfoByNome(nome);
        return ResponseEntity.ok(usuarios);
    }

    @GetMapping("/search/idpessoa/{idPessoa}")
    public ResponseEntity<?> getUsuarioByIdPessoa(@PathVariable Long idPessoa) {
        Optional<Usuario> usuario = usuarioService.findUsuarioByIdPessoa(idPessoa);
        if (!usuario.isEmpty()) {
            UsuarioIdDto usuarioIdDto = new UsuarioIdDto(usuario.get().getIdUsuario());
            return ResponseEntity.ok(usuarioIdDto);
        } else {
            return ResponseEntity.ok(Collections.emptyList());

        }

    }

    @PostMapping("/create/idpessoa")
    public ResponseEntity<?> createUsuarioIdPessoa(@RequestBody Pessoa pessoaRequest) {
        Usuario usuario = new Usuario();

        Optional<Pessoa> pessoaOpt = pessoaService.findById(pessoaRequest.getIdPessoa());

        if (!pessoaOpt.isPresent()) {
            return ResponseEntity.badRequest().body("Pessoa não encontrada");
        }

        Pessoa pessoa = pessoaOpt.get();

        usuario.setPessoa(pessoa);
        usuario.setSenha(passwordEncoder.encode(pessoa.getCpf()));
        usuario.setLogin(pessoa.getCpf());
        usuarioService.save(usuario);

        return ResponseEntity.ok(usuario);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createUsuario(@RequestBody UsuarioPessoaDto usuarioPessoaDto) {

        try {
            if (controllerValidator.isNullOrEmpty(usuarioPessoaDto.getNome()) ||
                    controllerValidator.isNullOrEmpty(usuarioPessoaDto.getCpf()) ||
                    controllerValidator.isNullOrEmpty(usuarioPessoaDto.getRg())) {
                return ResponseEntity.badRequest().body("Rg, CPF e nome são obrigatórios");
            }
            UsuarioPessoaDto usuarioPessoaDtoInsert = new UsuarioPessoaDto();
            usuarioPessoaDtoInsert.setNome(usuarioPessoaDto.getNome());
            usuarioPessoaDtoInsert.setCpf(usuarioPessoaDto.getCpf());
            usuarioPessoaDtoInsert.setRg(usuarioPessoaDto.getRg());
            usuarioPessoaDtoInsert.setLogin(usuarioPessoaDto.getCpf());
            usuarioPessoaDtoInsert.setSenha(passwordEncoder.encode(usuarioPessoaDto.getCpf()));
            Usuario novoUsuario = usuarioService.createUsuarioWithPessoa(usuarioPessoaDtoInsert);
            return ResponseEntity.status(HttpStatus.CREATED).body(novoUsuario);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro: " + e.getMessage());
        }
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> validaUsuario(@RequestBody Usuario usuario) {
        // Verificação de login e senha
        if (controllerValidator.isNullOrEmpty(usuario.getLogin())) {
            return ResponseEntity.badRequest().body(null);
        }
        if (controllerValidator.isNullOrEmpty(usuario.getSenha())) {
            return ResponseEntity.badRequest().body(null);
        }

        // Busca o usuário pelo login
        Optional<UsuarioPessoaDto> usuarioLogin = usuarioService.findByLoginInfoPessoa(usuario.getLogin());

        // Se o usuário for encontrado
        if (usuarioLogin.isPresent()) {
            // Verifica se a senha digitada corresponde à senha criptografada
            if (passwordEncoder.matches(usuario.getSenha(), usuarioLogin.get().getSenha())) {
                // Converte Usuario para UserDetails
                UsuarioDetails usuarioDetails = new UsuarioDetails(usuarioLogin.get());
                String token = jwtUtil.generateToken(usuarioDetails);

                UsuarioAuthentDto usuarioAuthentDto = new UsuarioAuthentDto(usuarioLogin.get().getNome(),
                        usuarioLogin.get().getCpf(), token, usuarioLogin.get().getIdUsuario());
                // Retorna o token no corpo da resposta
                return ResponseEntity.ok(usuarioAuthentDto);
            } else {
                // Retorna um código de erro se a senha estiver incorreta
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Senha incorreta");
            }
        } else {
            // Se o usuário não for encontrado, retorna uma resposta com status "não
            // encontrado"
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser(HttpServletRequest request) {
        String jwt = extractJwtFromRequest(request);

        if (jwt != null) {
            // Obtenha o nome de usuário do JWT
            String username = jwtUtil.extractUsername(jwt);

            // Busque o usuário usando seu método existente
            Optional<UsuarioPessoaDto> usuarioLogin = usuarioService.findByLoginInfoPessoa(username);

            if (usuarioLogin.isPresent()) {
                UserDetails userDetails = new UsuarioDetails(usuarioLogin.get());

                // Verifique se o token é válido
                if (jwtUtil.validateToken(jwt, userDetails)) {
                    tokenBlacklistService.blacklistToken(jwt);
                    return ResponseEntity.ok("Logout successful");
                }
            }
        }
        return ResponseEntity.badRequest().body("Invalid token");
    }

    private String extractJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    @PostMapping("/update-password")
    public ResponseEntity<?> updatePassword(@RequestBody UsuarioPasswordUpdateDto request) {
        try {
            if (controllerValidator.isNullOrEmpty(request.getLogin()) ||
                    controllerValidator.isNullOrEmpty(request.getCurrentPassword()) ||
                    controllerValidator.isNullOrEmpty(request.getNewPassword())) {
                return ResponseEntity.badRequest().body("Todos os campos são obrigatórios");
            }

            Optional<UsuarioPessoaDto> usuario = usuarioService.findByLoginInfoPessoa(request.getLogin());
            if (!usuario.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Login não localizado");
            }

            if (!passwordEncoder.matches(request.getCurrentPassword(), usuario.get().getSenha())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Senha atual não confere");
            }

            String encodedNewPassword = passwordEncoder.encode(request.getNewPassword());
            usuarioService.updatePassword(usuario.get().getIdUsuario(), encodedNewPassword);

            return ResponseEntity.ok("Senha atualizada");
        } catch (UsuarioNotFoundException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocorreu um erro ao atualizar a senha");
        }
    }

    @PostMapping("/resetpassword")
    public ResponseEntity<?> updatePassword(@RequestBody Pessoa pessoa) {
        try {

            Optional<UsuarioPessoaDto> usuario = usuarioService.findByUsuarioInfoIdPessoa(pessoa.getIdPessoa());
            if (!usuario.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não localizado");
            }

            String encodedNewPassword = passwordEncoder.encode(usuario.get().getCpf());
            usuarioService.updatePassword(usuario.get().getIdUsuario(), encodedNewPassword);

            return ResponseEntity.ok("Senha atualizada");
        } catch (UsuarioNotFoundException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ocorreu um erro ao atualizar a senha");
        }
    }

}
