package com.galaxy.career.carreergalaxyapp.common;

import com.galaxy.career.carreergalaxyapp.dtos.ApplicationResponseDto;
import com.galaxy.career.carreergalaxyapp.models.Application;

public class ApplicationMapper {

    public static ApplicationResponseDto toDto(Application app) {

        ApplicationResponseDto dto = new ApplicationResponseDto();

        dto.setId(app.getId());
        dto.setApplicantId(app.getApplicant().getId());
        dto.setReferralPostId(app.getReferralPost().getId());
        dto.setCompany(app.getReferralPost().getCompany());
        dto.setJobRole(app.getReferralPost().getJobRole());
        dto.setStage(app.getStage().name());
        dto.setCreatedAt(app.getCreatedAt());

        return dto;
    }

}
