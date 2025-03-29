package com.empresa.motorapido.service;

import java.util.HashSet;
import java.util.Set;

import org.springframework.stereotype.Service;

//para colocar o token em um blacklist no coso de logout para que o token nao seja mais valido
@Service
public class TokenBlacklistService {
    private final Set<String> blacklistedTokens = new HashSet<>();

    public void blacklistToken(String token) {
        blacklistedTokens.add(token);
    }

    public boolean isTokenBlacklisted(String token) {
        return blacklistedTokens.contains(token);
    }
}
