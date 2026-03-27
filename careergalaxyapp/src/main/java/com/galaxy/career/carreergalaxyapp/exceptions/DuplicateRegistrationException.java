package com.galaxy.career.carreergalaxyapp.exceptions;

public class DuplicateRegistrationException extends RuntimeException{
    public DuplicateRegistrationException(String message){
        super(message);
    }
}
