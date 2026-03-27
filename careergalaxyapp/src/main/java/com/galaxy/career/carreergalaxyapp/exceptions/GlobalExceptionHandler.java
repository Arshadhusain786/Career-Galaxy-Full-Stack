package com.galaxy.career.carreergalaxyapp.exceptions;


import com.galaxy.career.carreergalaxyapp.dtos.ApiResponse;
import org.springframework.web.bind.annotation.*;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ProfileNotFoundException.class)
    public ApiResponse<String> handleProfileNotFound(ProfileNotFoundException ex) {

        return ApiResponse.error(ex.getMessage());
    }

}
