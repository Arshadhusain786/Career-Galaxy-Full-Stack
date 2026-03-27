package com.galaxy.career.carreergalaxyapp.dtos;


import java.time.LocalDateTime;
import java.util.UUID;

public class ApplicationResponseDto {

    private UUID id;
    private UUID applicantId;
    private UUID referralPostId;
    private String company;
    private String jobRole;
    private String stage;
    private LocalDateTime createdAt;

    // getters & setters

    public ApplicationResponseDto(){}

    public ApplicationResponseDto(UUID id, UUID applicantId, UUID referralPostId, String company, String jobRole, String stage, LocalDateTime createdAt) {
        this.id = id;
        this.applicantId = applicantId;
        this.referralPostId = referralPostId;
        this.company = company;
        this.jobRole = jobRole;
        this.stage = stage;
        this.createdAt = createdAt;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getApplicantId() {
        return applicantId;
    }

    public void setApplicantId(UUID applicantId) {
        this.applicantId = applicantId;
    }

    public UUID getReferralPostId() {
        return referralPostId;
    }

    public void setReferralPostId(UUID referralPostId) {
        this.referralPostId = referralPostId;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getJobRole() {
        return jobRole;
    }

    public void setJobRole(String jobRole) {
        this.jobRole = jobRole;
    }

    public String getStage() {
        return stage;
    }

    public void setStage(String stage) {
        this.stage = stage;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
