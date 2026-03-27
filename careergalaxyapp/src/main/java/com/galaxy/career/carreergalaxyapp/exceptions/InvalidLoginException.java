package com.galaxy.career.carreergalaxyapp.exceptions;

public class InvalidLoginException extends RuntimeException{
    public InvalidLoginException(String message){
        super(message);
    }
}
