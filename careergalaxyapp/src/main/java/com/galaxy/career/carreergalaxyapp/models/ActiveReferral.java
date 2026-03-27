package com.galaxy.career.carreergalaxyapp.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "active_referrals")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ActiveReferral {

    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "candidate_id", nullable = false)
    private User candidate;

    private UUID posterId;

    private String targetCompany;

    private String jobRole;

    private String resumeLink;

    @Column(length = 2000)
    private String description;

    @Enumerated(EnumType.STRING)
    private Status status = Status.ACTIVE;

    private LocalDateTime createdAt = LocalDateTime.now();

    public enum Status {
        ACTIVE,
        FULFILLED,
        INACTIVE
    }
}
