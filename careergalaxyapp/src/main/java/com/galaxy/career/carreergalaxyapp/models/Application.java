package com.galaxy.career.carreergalaxyapp.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "applications")
public class Application {

    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "applicant_id", nullable = false)
    private User applicant;

    @ManyToOne
    @JoinColumn(name = "referral_post_id", nullable = false)
    private ReferralPost referralPost;

    @Enumerated(EnumType.STRING)
    private Stage stage = Stage.APPLIED;

    private LocalDateTime createdAt = LocalDateTime.now();

    public enum Stage {
        APPLIED,
        REVIEWING,
        REFERRED,
        REJECTED
    }

    // getters & setters

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public User getApplicant() {
        return applicant;
    }

    public void setApplicant(User applicant) {
        this.applicant = applicant;
    }

    public ReferralPost getReferralPost() {
        return referralPost;
    }

    public void setReferralPost(ReferralPost referralPost) {
        this.referralPost = referralPost;
    }

    public Stage getStage() {
        return stage;
    }

    public void setStage(Stage stage) {
        this.stage = stage;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}