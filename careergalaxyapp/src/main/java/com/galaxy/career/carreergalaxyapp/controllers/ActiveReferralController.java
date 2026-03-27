package com.galaxy.career.carreergalaxyapp.controllers;

import com.galaxy.career.carreergalaxyapp.dtos.ActiveReferralResponseDto;
import com.galaxy.career.carreergalaxyapp.dtos.ResumeDownloadResponse;
import com.galaxy.career.carreergalaxyapp.models.ActiveReferral;
import com.galaxy.career.carreergalaxyapp.services.ActiveReferralService;
import com.galaxy.career.carreergalaxyapp.services.S3Service;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/active-referrals")
public class ActiveReferralController {

    private final ActiveReferralService activeReferralService;


    public ActiveReferralController(ActiveReferralService activeReferralService) {
        this.activeReferralService = activeReferralService;
    }

    @GetMapping("/get-all")
    public List<ActiveReferralResponseDto> getAll(@RequestParam String email) {
        return activeReferralService.getAllActiveReferrals(email);
    }

    @GetMapping("/{id}/resume-url")
    public ResponseEntity<ResumeDownloadResponse> getResumeUrl(
            @PathVariable UUID id,
            @RequestParam String userEmail) {

        String url = activeReferralService.getResumeDownloadUrl(id, userEmail);

        return ResponseEntity.ok(new ResumeDownloadResponse(url));
    }

    @PostMapping("/{id}/upload-resume")
    public ResponseEntity<String> uploadResume(
            @PathVariable UUID id,
            @RequestParam("file") byte[] file) throws IOException {

        activeReferralService.uploadResume(id, file);

        return ResponseEntity.ok("Resume uploaded successfully");
    }
}
