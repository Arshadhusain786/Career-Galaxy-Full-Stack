package com.galaxy.career.carreergalaxyapp.models;

import jakarta.persistence.*;
import lombok.*;


import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.UUID;
@Builder
@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name="profile")
public class Profile {

    @Id
    @GeneratedValue
    private UUID id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(unique = true)
    private String email;

    private String fullName;
    private String phoneNumber;

    @Column(columnDefinition = "TEXT")
    private String summary;

    private String profilePictureUrl;

    private String currentCompanyName;
    private String currentJobTitle;
    private Integer totalExperienceYears;

    private String collegeName;
    private String degree;
    private String specialization;
    private Integer graduationYear;

    private LocalDate dateOfBirth;
    private String technicalField;


    // Resume stored inside DB

    @Basic(fetch = FetchType.LAZY)
    @Column(name = "resume_file", columnDefinition = "bytea")
    private byte[] resumeFile;

    private String resumeFileName;
    private String resumeFileType;


    @ElementCollection
    @CollectionTable(
            name = "profile_skills",
            joinColumns = @JoinColumn(name = "profile_id")
    )
    private List<String> skills;
}