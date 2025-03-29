package com.empresa.motorapido.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.empresa.motorapido.dto.UsuarioPessoaDto;
import com.empresa.motorapido.security.UsuarioDetails;

/**
 * UserDetailsService é uma interface do Spring Security usada para recuperar
 * informações
 * de autenticação e autorização do usuário. Ela tem um único método:
 * 
 * UserDetails loadUserByUsername(String username) throws
 * UsernameNotFoundException;
 * 
 * Este método é usado pelo Spring Security para carregar detalhes do usuário
 * durante a autenticação e autorização.
 */
@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private final UsuarioService usuarioService;

    public CustomUserDetailsService(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        UsuarioPessoaDto usuario = usuarioService.findByLoginInfoPessoa(login)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + login));

        return new UsuarioDetails(usuario);
    }
}