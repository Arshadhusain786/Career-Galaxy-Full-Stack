package com.galaxy.career.carreergalaxyapp.dtos;


import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
public class ProfileResponseDto {
    private String fullName;
    private String phoneNumber;
    private String summary;
    private String company;
    private String jobTitle;
    private List<String> skills;

    // Metadata for resume
    private String resumeFileName;
    private String resumeFileType;
    private String resumeDownloadUrl;
    private String profileImageUrl;
    private String currentJobTitle;
    private LocalDate dateOfBirth;
    private String technicalField;

}