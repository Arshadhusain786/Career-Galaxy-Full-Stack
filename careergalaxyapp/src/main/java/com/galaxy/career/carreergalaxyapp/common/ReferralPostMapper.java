package com.galaxy.career.carreergalaxyapp.common;


import com.galaxy.career.carreergalaxyapp.dtos.ReferralPostResponseDto;
import com.galaxy.career.carreergalaxyapp.models.ReferralPost;

public class ReferralPostMapper {
    public static ReferralPostResponseDto toDto(ReferralPost post) {

        ReferralPostResponseDto dto = new ReferralPostResponseDto();

        dto.setId(post.getId());
        dto.setProviderEmail(post.getProvider().getEmail());
        dto.setCompany(post.getCompany());
        dto.setJobRole(post.getJobRole());
        dto.setMinExperience(post.getMinExperience());
        dto.setMaxExperience(post.getMaxExperience());
        dto.setDomain(post.getDomain());
        dto.setDescription(post.getDescription());
        dto.setStatus(post.getStatus().name());
        dto.setCreatedAt(post.getCreatedAt());

        return dto;
    }
}