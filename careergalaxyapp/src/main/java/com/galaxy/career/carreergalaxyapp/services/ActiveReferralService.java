package com.galaxy.career.carreergalaxyapp.services;

import com.galaxy.career.carreergalaxyapp.dtos.ActiveReferralResponseDto;
import com.galaxy.career.carreergalaxyapp.models.ActiveReferral;
import com.galaxy.career.carreergalaxyapp.models.User;
import com.galaxy.career.carreergalaxyapp.repositories.ActiveReferralRepository;
import com.galaxy.career.carreergalaxyapp.repositories.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ActiveReferralService {
    private final ActiveReferralRepository activeReferralRepository;
    private final UserRepository userRepository;
    private final S3Service s3Service;

    public ActiveReferralService(ActiveReferralRepository activeReferralRepository, UserRepository userRepository, S3Service s3Service) {
        this.activeReferralRepository = activeReferralRepository;
        this.userRepository = userRepository;
        this.s3Service = s3Service;
    }

    public List<ActiveReferralResponseDto> getAllActiveReferrals(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return activeReferralRepository.findByPosterId(user.getId())
                .stream()
                .map(activeReferral -> {
                    ActiveReferralResponseDto dto = new ActiveReferralResponseDto();
                    dto.setId(activeReferral.getId());
                    if (activeReferral.getCandidate() != null) {
                        dto.setCandidateId(activeReferral.getCandidate().getId());
                        dto.setCandidateName(activeReferral.getCandidate().getName());
                        dto.setCandidateEmail(activeReferral.getCandidate().getEmail());
                    }
                    dto.setTargetCompany(activeReferral.getTargetCompany());
                    dto.setJobRole(activeReferral.getJobRole());
                    dto.setResumeLink(activeReferral.getResumeLink());
                    dto.setDescription(activeReferral.getDescription());
                    dto.setStatus(activeReferral.getStatus());
                    dto.setCreatedAt(activeReferral.getCreatedAt());
                    return dto;
                })
                .collect(Collectors.toList());
    }

    public String getResumeDownloadUrl(UUID referralId, String userEmail) {

        ActiveReferral referral = activeReferralRepository.findById(referralId)
                .orElseThrow(() -> new RuntimeException("Referral not found"));

        String userEmailAWS = userEmail.trim();

        User currentUser = userRepository.findByEmailIgnoreCase(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + userEmailAWS));

        // 🔒 SECURITY CHECK (VERY IMPORTANT)
        if (!referral.getPosterId().equals(currentUser.getId())) {
            throw new RuntimeException("Unauthorized access");
        }

        if (referral.getResumeLink() == null) {
            throw new RuntimeException("Resume not available");
        }

        return s3Service.generatePresignedUrl(referral.getResumeLink());
    }

    public void uploadResume(UUID referralId, byte[] file) throws IOException {

        // 1️⃣ Fetch referral
        ActiveReferral referral = activeReferralRepository.findById(referralId)
                .orElseThrow(() -> new RuntimeException("Referral not found"));

        // 2️⃣ Validate file
        if (file == null) {
            throw new RuntimeException("Please upload your resume in your profile before proceeding with this referral application.");
        }

//        if (!"application/pdf".equalsIgnoreCase(file.getContentType())) {
//            throw new RuntimeException("Only PDF files are allowed");
//        }

        // (Optional) Size limit: 5MB
        if (file.length > 5 * 1024 * 1024) {
            throw new RuntimeException("File size exceeds 5MB limit");
        }

        String contentType = "application/pdf";
        // 3️⃣ Generate S3 key
        String key = "resumes/" + referralId + ".pdf";

        // 4️⃣ Upload to S3
        s3Service.uploadFile(file, key, contentType);

        // 5️⃣ Save key in DB
        referral.setResumeLink(key); // ideally rename to resumeKey later
        activeReferralRepository.save(referral);
    }
}
