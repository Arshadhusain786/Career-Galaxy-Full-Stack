package com.galaxy.career.carreergalaxyapp.models;


import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "user_skills")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserSkill {

    @Id
    @GeneratedValue
    private UUID id;

    private String skillName;

    @ManyToOne
    @JoinColumn(name = "profile_id")
    private Profile profile;
}
