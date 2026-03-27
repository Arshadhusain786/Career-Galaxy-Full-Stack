package com.galaxy.career.carreergalaxyapp.dtos;


import java.util.UUID;

public class CreateApplicationRequestDto {

    private String applicantEmail;
    private UUID referralPostId;

    public String getApplicantEmail() {
        return applicantEmail;
    }

    public void setApplicantEmail(String applicantEmail) {
        this.applicantEmail = applicantEmail;
    }

    public UUID getReferralPostId() {
        return referralPostId;
    }

    public void setReferralPostId(UUID referralPostId) {
        this.referralPostId = referralPostId;
    }

    public CreateApplicationRequestDto(String applicantEmail, UUID referralPostId) {
        this.applicantEmail = applicantEmail;
        this.referralPostId = referralPostId;
    }



}

