package com.galaxy.career.carreergalaxyapp.services;

import com.galaxy.career.carreergalaxyapp.common.UserMapper;
import com.galaxy.career.carreergalaxyapp.dtos.LoginRequestDto;
import com.galaxy.career.carreergalaxyapp.dtos.LoginResponseDto;
import com.galaxy.career.carreergalaxyapp.dtos.RegisterRequestDto;
import com.galaxy.career.carreergalaxyapp.dtos.RegisterResponseDto;
import com.galaxy.career.carreergalaxyapp.exceptions.DuplicateRegistrationException;
import com.galaxy.career.carreergalaxyapp.exceptions.InvalidLoginException;
import com.galaxy.career.carreergalaxyapp.models.User;
import com.galaxy.career.carreergalaxyapp.repositories.UserRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public RegisterResponseDto register(RegisterRequestDto request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new DuplicateRegistrationException("Email already exists");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        return UserMapper.toRegisterResponse(userRepository.save(user));
    }

    public LoginResponseDto login(LoginRequestDto request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new InvalidLoginException("Invalid credentials");
        }

        return UserMapper.toLoginResponse(user);
    }
}
