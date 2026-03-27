package com.galaxy.career.carreergalaxyapp.dtos;

import lombok.Data;

@Data
public class UpdateEducationDto {
    private String collegeName;

    private String degree;

    private String fieldOfStudy;

    private Integer graduationYear;
}
