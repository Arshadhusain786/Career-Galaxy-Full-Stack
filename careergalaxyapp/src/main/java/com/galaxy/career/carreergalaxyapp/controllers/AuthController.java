package com.galaxy.career.carreergalaxyapp.controllers;

import com.galaxy.career.carreergalaxyapp.dtos.LoginRequestDto;
import com.galaxy.career.carreergalaxyapp.dtos.LoginResponseDto;
import com.galaxy.career.carreergalaxyapp.dtos.RegisterRequestDto;
import com.galaxy.career.carreergalaxyapp.dtos.RegisterResponseDto;
import com.galaxy.career.carreergalaxyapp.models.User;
import com.galaxy.career.carreergalaxyapp.services.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private static final Logger log = LoggerFactory.getLogger(AuthController.class);
    private final AuthService authService;

    public AuthController(AuthService authService){
        this.authService = authService;
    }

    @PostMapping("/register")
    public RegisterResponseDto register(@RequestBody RegisterRequestDto request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public LoginResponseDto login(@RequestBody LoginRequestDto request) {
        log.info("Login request received: {}", request.toString());
        return authService.login(request);
    }
}
