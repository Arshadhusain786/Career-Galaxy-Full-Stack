package com.galaxy.career.carreergalaxyapp.dtos;

import lombok.Data;

@Data
public class UpdateProfessionalDto {
    private String currentCompany;

    private String jobTitle;

    private Integer yearsOfExperience;

    private String linkedinUrl;

}
