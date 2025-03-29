package com.empresa.motorapido.controller;

import org.springframework.stereotype.Component;

@Component
public class ControllerValidator {
    // retona verdadeiro se numerico
    public boolean isNumeric(Object value) {
        if (value == null)
            return false;

        String str = value.toString();
        if (str.isEmpty())
            return false;

        try {
            Double.valueOf(str);
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    // Retorna verdadeiro se o valor for nulo ou vazio
    public boolean isNullOrEmpty(Object value) {
        if (value == null)
            return true;
        String str = value.toString();
        return str.isEmpty();
    }

}
