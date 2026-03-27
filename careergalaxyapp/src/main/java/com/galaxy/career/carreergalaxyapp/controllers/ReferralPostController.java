package com.galaxy.career.carreergalaxyapp.controllers;

import com.galaxy.career.carreergalaxyapp.dtos.CreateReferralPostRequestDto;
import com.galaxy.career.carreergalaxyapp.dtos.ReferralPostResponseDto;
import com.galaxy.career.carreergalaxyapp.services.ReferralPostService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/referral-posts")
public class ReferralPostController {
    private final ReferralPostService referralPostService;

    public ReferralPostController(ReferralPostService referralPostService) {
        this.referralPostService = referralPostService;
    }

    @PostMapping("/create")
    public ReferralPostResponseDto create(@RequestBody CreateReferralPostRequestDto request) {
        return referralPostService.create(request);
    }

    @GetMapping("/get-all")
    public List<ReferralPostResponseDto> getAll() {
        return referralPostService.getAll();
    }
}
