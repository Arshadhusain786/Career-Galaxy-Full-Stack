package com.galaxy.career.carreergalaxyapp.common;

import com.galaxy.career.carreergalaxyapp.dtos.LoginResponseDto;
import com.galaxy.career.carreergalaxyapp.dtos.RegisterResponseDto;
import com.galaxy.career.carreergalaxyapp.models.User;

public class UserMapper {

    public static RegisterResponseDto toRegisterResponse(User user) {

        RegisterResponseDto dto = new RegisterResponseDto();
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());

        return dto;
    }

    public static LoginResponseDto toLoginResponse(User user) {

        LoginResponseDto dto = new LoginResponseDto();
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());

        return dto;
    }
}
