package com.galaxy.career.carreergalaxyapp.services;




import com.galaxy.career.carreergalaxyapp.dtos.*;
import com.galaxy.career.carreergalaxyapp.repositories.ProfileSummary;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface ProfileService {
    byte[] getResumeByUserEmail(String email);
    public List<ProfileSummary> getAllProfiles();

    void createProfile(String email, CreateProfileRequestDto request);

    ProfileResponseDto getProfile(String  email);

    void updateProfile(String email, CreateProfileRequestDto request);

    void uploadResume(String email, MultipartFile resumeFile);

    void updateResume(String email, MultipartFile resumeFile);

    void uploadProfilePicture(String email, MultipartFile imageFile) throws IOException;

    void updateSkills(String email, UpdateSkillsRequestDto request);

    void updateProfessionalDetails(String email, UpdateProfessionalDto request);

    void updateEducationDetails(String email, UpdateEducationDto request);
}