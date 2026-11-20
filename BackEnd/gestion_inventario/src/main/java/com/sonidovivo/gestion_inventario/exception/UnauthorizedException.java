package com.sonidovivo.gestion_inventario.exception;

public class UnauthorizedException extends RuntimeException{
    public UnauthorizedException(String mensaje) {
        super(mensaje);
    }

}
