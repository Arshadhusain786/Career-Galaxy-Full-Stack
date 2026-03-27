package com.galaxy.career.carreergalaxyapp.repositories;




import com.galaxy.career.carreergalaxyapp.dtos.ProfileResponseDto;
import com.galaxy.career.carreergalaxyapp.models.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProfileRepository extends JpaRepository<Profile, UUID> {


    List<ProfileSummary> findAllBy();
    Optional<Profile> findByUserEmail(String email);
}
