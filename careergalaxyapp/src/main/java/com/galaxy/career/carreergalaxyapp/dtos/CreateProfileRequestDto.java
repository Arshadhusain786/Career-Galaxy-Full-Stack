package com.galaxy.career.carreergalaxyapp.dtos;

import lombok.Data;

import java.time.LocalDate;

@Data
public class CreateProfileRequestDto {
    private String fullName;
    private String phoneNumber;
    private String summary;
    private LocalDate dateOfBirth;
    private String technicalField;
}
