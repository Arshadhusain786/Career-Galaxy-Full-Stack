package com.galaxy.career.carreergalaxyapp.serviceimpl;



import com.galaxy.career.carreergalaxyapp.dtos.*;
import com.galaxy.career.carreergalaxyapp.exceptions.ProfileAlreadyExistsException;
import com.galaxy.career.carreergalaxyapp.exceptions.ProfileNotFoundException;
import com.galaxy.career.carreergalaxyapp.models.Profile;
import com.galaxy.career.carreergalaxyapp.models.User;
import com.galaxy.career.carreergalaxyapp.repositories.ProfileRepository;
import com.galaxy.career.carreergalaxyapp.repositories.ProfileSummary;
import com.galaxy.career.carreergalaxyapp.repositories.UserRepository;
import com.galaxy.career.carreergalaxyapp.services.ActiveReferralService;
import com.galaxy.career.carreergalaxyapp.services.ProfileService;
import com.galaxy.career.carreergalaxyapp.services.S3Service;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {

    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;
    private final S3Service s3Service;

    // Create Profile

    @Override
    public void createProfile(String email, CreateProfileRequestDto request) {

        // Check if user exists
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));

        // Check if profile already exists
        Optional<Profile> existingProfile = profileRepository.findByUserEmail(email);
        if (existingProfile.isPresent()) {
            throw new ProfileAlreadyExistsException("Profile already exists for this user");
        }

        // Create profile
        Profile profile = Profile.builder()
                .user(user)
                .fullName(request.getFullName())
                .phoneNumber(request.getPhoneNumber())
                .summary(request.getSummary())
                .build();

        // Save profile
        profileRepository.save(profile);
    }

    @Override
    public ProfileResponseDto getProfile(String email) {
        Profile profile = profileRepository.findByUserEmail(email)
                .orElse(null);

        if (profile == null) {
            return null;
        }

        // Map entity to DTO


        return ProfileResponseDto.builder()
                .fullName(profile.getFullName())
                .phoneNumber(profile.getPhoneNumber())
                .technicalField(profile.getTechnicalField())
                .dateOfBirth(profile.getDateOfBirth())
                .currentJobTitle(profile.getCurrentJobTitle())
                .resumeFileName(profile.getResumeFileName())
                .resumeFileType(profile.getResumeFileType())
                .profileImageUrl(
                        s3Service.generateImageUrl(profile.getProfilePictureUrl())
                )
                .build();


    }

    @Override
    public byte[] getResumeByUserEmail(String email) {
        String cleanEmail = email.trim();

        Profile profile = profileRepository.findByUserEmail(cleanEmail)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "No profile found for email: " + cleanEmail
                ));

        if (profile.getResumeFile() == null || profile.getResumeFile().length == 0) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Resume not uploaded for email: " + cleanEmail
            );
        }

        return profile.getResumeFile();
    }   // View Profile
  //  @Override
 //   public ProfileResponseDto getProfile(String email) {

  //      Profile profile = profileRepository
   //             .findByUserEmail(email)
 //               .orElseThrow(() -> new ProfileNotFoundException("Profile not found"));

  //      return ProfileMapper.mapToResponse(profile);
//    }
    @Override
    @Transactional
    public List<ProfileSummary> getAllProfiles() {
        return profileRepository.findAllBy();
    }

    // Update Profile
    @Override
    public void updateProfile(String email, CreateProfileRequestDto request) {

        Profile profile = profileRepository
                .findByUserEmail(email)
                .orElseThrow(() -> new ProfileNotFoundException("Profile not found"));

        profile.setFullName(request.getFullName());
        profile.setPhoneNumber(request.getPhoneNumber());
        profile.setSummary(request.getSummary());
        profile.setDateOfBirth(request.getDateOfBirth());
        profile.setTechnicalField(request.getTechnicalField());

        profileRepository.save(profile);
    }

    // Upload Resume
    @Override
    @Transactional
    public void uploadResume(String email, MultipartFile file) {

        // 1️⃣ Check if user exists
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));

        // 2️⃣ Check if profile exists
        Profile profile = profileRepository.findByUserEmail(email)
                .orElseGet(() -> {
                    Profile newProfile = new Profile();
                    newProfile.setUser(user);
                    return newProfile;
                });

        try {

            profile.setResumeFile(file.getBytes());
            profile.setResumeFileName(file.getOriginalFilename());
            profile.setResumeFileType(file.getContentType());

            profileRepository.save(profile);

        } catch (IOException e) {
            throw new RuntimeException("Error uploading resume", e);
        }
    }

    // Update Resume
    @Override
    public void updateResume(String email, MultipartFile resumeFile) {

        Profile profile = profileRepository
                .findByUserEmail(email)
                .orElseThrow(() -> new ProfileNotFoundException("Profile not found"));

        profile.setResumeFile(resumeFile.getOriginalFilename().getBytes());

        profileRepository.save(profile);
    }

    // Upload Profile Picture
    @Override
    public void uploadProfilePicture(String email, MultipartFile imageFile) throws IOException {

        Profile profile = profileRepository
                .findByUserEmail(email)
                .orElseThrow(() -> new ProfileNotFoundException("Profile not found"));

        byte[] profileImageFile = imageFile.getBytes();

        String contentType = imageFile.getContentType() != null ? imageFile.getContentType() : "default";
        String type = null;
        if(contentType.equalsIgnoreCase("image/jpeg")){
            type = ".jpeg";
        }
        else if(contentType.equalsIgnoreCase("image/jpg")){
            type = ".jpg";
        }
        else if(contentType.equalsIgnoreCase("image/png")){
            type = ".png";
        }
        else{
            type = contentType;
        }

        String key = "profiles/" + profile.getId() + type;
        s3Service.uploadFile(profileImageFile, key, contentType);

        profile.setProfilePictureUrl(key);

        profileRepository.save(profile);
    }

    // Update Skills
    @Override
    public void updateSkills(String email, UpdateSkillsRequestDto request) {

        Profile profile = profileRepository
                .findByUserEmail(email)
                .orElseThrow(() -> new ProfileNotFoundException("Profile not found"));

        profile.setSkills(request.getSkills());

        profileRepository.save(profile);
    }

    // Update Professional Details
    @Override
    public void updateProfessionalDetails(String email, UpdateProfessionalDto request) {

        Profile profile = profileRepository
                .findByUserEmail(email)
                .orElseThrow(() -> new ProfileNotFoundException("Profile not found"));

        profile.setCurrentCompanyName(request.getCurrentCompany());
        profile.setCurrentJobTitle(request.getJobTitle());
        profile.setTotalExperienceYears(request.getYearsOfExperience());
      //  profile.setLinkedinUrl(request.getLinkedinUrl());

        profileRepository.save(profile);
    }

    // Update Education Details
    @Override
    public void updateEducationDetails(String email, UpdateEducationDto request) {

        Profile profile = profileRepository
                .findByUserEmail(email)
                .orElseThrow(() -> new ProfileNotFoundException("Profile not found"));

        profile.setCollegeName(request.getCollegeName());
        profile.setDegree(request.getDegree());
        profile.setSpecialization(request.getFieldOfStudy());
        profile.setGraduationYear(request.getGraduationYear());

        profileRepository.save(profile);
    }


  }