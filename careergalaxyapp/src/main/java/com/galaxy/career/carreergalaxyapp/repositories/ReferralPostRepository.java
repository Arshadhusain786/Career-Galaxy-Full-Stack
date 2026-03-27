package com.galaxy.career.carreergalaxyapp.repositories;

import com.galaxy.career.carreergalaxyapp.models.ReferralPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ReferralPostRepository extends JpaRepository<ReferralPost, UUID> {
    List<ReferralPost> findByStatus(ReferralPost.Status status);

    List<ReferralPost> findByProviderId(UUID providerId);

    List<ReferralPost> findAllByOrderByCreatedAtDesc();
}
