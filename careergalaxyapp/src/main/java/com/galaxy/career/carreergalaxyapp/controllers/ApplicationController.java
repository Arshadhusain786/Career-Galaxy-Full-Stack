package com.galaxy.career.carreergalaxyapp.controllers;

import com.galaxy.career.carreergalaxyapp.dtos.ApplicationResponseDto;
import com.galaxy.career.carreergalaxyapp.dtos.CreateApplicationRequestDto;
import com.galaxy.career.carreergalaxyapp.services.ApplicationService;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {
    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    // Apply to referral post
    @PostMapping
    public ApplicationResponseDto create(@RequestBody CreateApplicationRequestDto request) throws IOException {
        return applicationService.create(request);
    }

    // My applications
    @GetMapping("/my")
    public List<ApplicationResponseDto> getMyApplications(@RequestParam String email) {
        return applicationService.getMyApplications(email);
    }

    // Update stage
    @PutMapping("/{id}/stage")
    public ApplicationResponseDto updateStage(@PathVariable UUID id,
                                              @RequestParam String stage) {

        return applicationService.updateStage(id, stage);
    }

}
