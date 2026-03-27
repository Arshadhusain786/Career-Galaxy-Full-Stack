package com.galaxy.career.carreergalaxyapp.controllers;


import com.galaxy.career.carreergalaxyapp.dtos.*;
import com.galaxy.career.carreergalaxyapp.services.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.Arrays;

@RestController
@RequestMapping("/api/profiles")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    // 1️⃣ Create Profile
    @PostMapping
    public ResponseEntity<String> createProfile(
            @RequestParam String email,
            @RequestBody CreateProfileRequestDto request) {

        profileService.createProfile(email, request);
        return ResponseEntity.ok("Profile created successfully");
    }

    // 2️⃣ View Profile
  //  @GetMapping
  //  public ResponseEntity<List<ProfileSummary>> getProfile(
   //         @RequestParam String email) {

   //     return ResponseEntity.ok(profileService.getAllProfiles());
  //  }
   @GetMapping
   public ResponseEntity<ProfileResponseDto> getProfile(@RequestParam String email) {
       return ResponseEntity.ok(profileService.getProfile(email));
   }

    // 3️⃣ Update Profile
    @PutMapping
    public ResponseEntity<String> updateProfile(
            @RequestParam String email,
            @RequestBody CreateProfileRequestDto request) {

        profileService.updateProfile(email, request);
        return ResponseEntity.ok("Profile updated successfully");
    }

    // get resume
    @GetMapping("/resume/byuseremail")
    public ResponseEntity<byte[]> getResumeByUserEmail(@RequestParam String email) {
        // Remove spaces and duplicates
        String cleanEmail = Arrays.stream(email.split(","))
                .map(String::trim)
                .findFirst() // take first valid email
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid email"));

        byte[] resume = profileService.getResumeByUserEmail(cleanEmail);
        String key = profileService.getProfile(cleanEmail).getResumeFileName();

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + key + "\"")
                .contentType(MediaType.APPLICATION_PDF)
                .body(resume);
    }

    // 4️⃣ Upload Resume
    @PostMapping("/resume")
    public ResponseEntity<String> uploadResume(
            @RequestParam("email") String email,
            @RequestParam("file") MultipartFile file) {

        profileService.uploadResume(email, file);
        return ResponseEntity.ok("Resume uploaded successfully");
    }

    // 5️⃣ Update Resume
    @PutMapping("/resume")
    public ResponseEntity<String> updateResume(
            @RequestParam String email,
            @RequestParam("resume") MultipartFile resume) {

        profileService.updateResume(email, resume);
        return ResponseEntity.ok("Resume updated successfully");
    }

    // 6️⃣ Upload Profile Picture
    @PostMapping("/profile-picture")
    public ResponseEntity<String> uploadProfilePicture(
            @RequestParam String email,
            @RequestParam("file") MultipartFile imageFile) throws IOException {

        profileService.uploadProfilePicture(email, imageFile);
        return ResponseEntity.ok("Profile picture uploaded successfully");
    }

    // 7️⃣ Update Skills
    @PutMapping("/skills")
    public ResponseEntity<String> updateSkills(
            @RequestParam String email,
            @RequestBody UpdateSkillsRequestDto request) {

        profileService.updateSkills(email, request);
        return ResponseEntity.ok("Skills updated successfully");
    }

    // 8️⃣ Update Professional Details
    @PutMapping("/professional")
    public ResponseEntity<String> updateProfessionalDetails(
            @RequestParam String email,
            @RequestBody UpdateProfessionalDto request) {

        profileService.updateProfessionalDetails(email, request);
        return ResponseEntity.ok("Professional details updated successfully");
    }

    // 9️⃣ Update Education Details
    @PutMapping("/education")
    public ResponseEntity<String> updateEducationDetails(
            @RequestParam String email,
            @RequestBody UpdateEducationDto request) {

        profileService.updateEducationDetails(email, request);
        return ResponseEntity.ok("Education details updated successfully");
    }
}