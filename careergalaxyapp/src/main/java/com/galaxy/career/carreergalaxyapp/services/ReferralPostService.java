package com.galaxy.career.carreergalaxyapp.services;

import com.galaxy.career.carreergalaxyapp.common.ReferralPostMapper;
import com.galaxy.career.carreergalaxyapp.dtos.CreateReferralPostRequestDto;
import com.galaxy.career.carreergalaxyapp.dtos.ReferralPostResponseDto;
import com.galaxy.career.carreergalaxyapp.models.ReferralPost;
import com.galaxy.career.carreergalaxyapp.models.User;
import com.galaxy.career.carreergalaxyapp.repositories.ReferralPostRepository;
import com.galaxy.career.carreergalaxyapp.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReferralPostService {
    private final ReferralPostRepository referralPostRepository;
    private final UserRepository userRepository;

    public ReferralPostService(ReferralPostRepository referralPostRepository,
                               UserRepository userRepository) {
        this.referralPostRepository = referralPostRepository;
        this.userRepository = userRepository;
    }

    public ReferralPostResponseDto create(CreateReferralPostRequestDto request) {

        User provider = userRepository.findByEmail(request.getProviderEmail())
                .orElseThrow(() -> new RuntimeException("Provider Email not found"));

        ReferralPost post = new ReferralPost();
        post.setProvider(provider);
        post.setCompany(request.getCompany());
        post.setJobRole(request.getJobRole());
        post.setMinExperience(request.getMinExperience());
        post.setMaxExperience(request.getMaxExperience());
        post.setDomain(request.getDomain());
        post.setDescription(request.getDescription());

        ReferralPost saved = referralPostRepository.save(post);

        return ReferralPostMapper.toDto(saved);
    }

    public List<ReferralPostResponseDto> getAll() {

        return referralPostRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(ReferralPostMapper::toDto)
                .toList();
    }
}
