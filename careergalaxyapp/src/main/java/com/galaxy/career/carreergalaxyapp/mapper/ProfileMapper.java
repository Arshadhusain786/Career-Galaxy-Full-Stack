package com.galaxy.career.carreergalaxyapp.mapper;






import com.galaxy.career.carreergalaxyapp.dtos.ProfileResponseDto;
import com.galaxy.career.carreergalaxyapp.models.Profile;

import java.util.Collections;

public class ProfileMapper {

    public static ProfileResponseDto mapToResponse(Profile profile) {
        return ProfileResponseDto.builder()
                .fullName(profile.getFullName())
                .phoneNumber(profile.getPhoneNumber())
                .summary(profile.getSummary())
                .company(profile.getCurrentCompanyName())
                .jobTitle(profile.getCurrentJobTitle())
                .skills(profile.getSkills() != null ? profile.getSkills() : Collections.emptyList())
                .resumeFileName(profile.getResumeFileName())
                .resumeFileType(profile.getResumeFileType())
                .resumeDownloadUrl("/api/profiles/" + profile.getUser().getEmail() + "/resume")
                .build();
    }
}