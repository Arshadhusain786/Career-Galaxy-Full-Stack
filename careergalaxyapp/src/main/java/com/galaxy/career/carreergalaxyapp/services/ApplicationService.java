package com.galaxy.career.carreergalaxyapp.services;


import com.galaxy.career.carreergalaxyapp.common.ApplicationMapper;
import com.galaxy.career.carreergalaxyapp.dtos.ApplicationResponseDto;
import com.galaxy.career.carreergalaxyapp.dtos.CreateApplicationRequestDto;
import com.galaxy.career.carreergalaxyapp.models.ActiveReferral;
import com.galaxy.career.carreergalaxyapp.models.Application;
import com.galaxy.career.carreergalaxyapp.models.ReferralPost;
import com.galaxy.career.carreergalaxyapp.models.User;
import com.galaxy.career.carreergalaxyapp.repositories.ActiveReferralRepository;
import com.galaxy.career.carreergalaxyapp.repositories.ApplicationRepository;
import com.galaxy.career.carreergalaxyapp.repositories.ReferralPostRepository;
import com.galaxy.career.carreergalaxyapp.repositories.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class ApplicationService {
    private final ApplicationRepository applicationRepository;
    private final UserRepository userRepository;
    private final ReferralPostRepository referralPostRepository;
    private final EmailNotificationService emailService;
    private final ActiveReferralRepository activeReferralRepository;
    private final S3Service s3Service;

    public ApplicationService(ApplicationRepository applicationRepository,
                              UserRepository userRepository,
                              ReferralPostRepository referralPostRepository,
                              EmailNotificationService emailService,
                              ActiveReferralRepository activeReferralRepository,
                              S3Service s3Service) {

        this.applicationRepository = applicationRepository;
        this.userRepository = userRepository;
        this.referralPostRepository = referralPostRepository;
        this.emailService = emailService;
        this.activeReferralRepository = activeReferralRepository;
        this.s3Service = s3Service;
    }

    // POST /api/applications
    public ApplicationResponseDto create(CreateApplicationRequestDto request) throws IOException {

        User applicant = userRepository.findByEmail(request.getApplicantEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        ReferralPost post = referralPostRepository.findById(request.getReferralPostId())
                .orElseThrow(() -> new RuntimeException("Referral post not found"));

        User poster = post.getProvider();

        byte[] fileArray = applicant.getProfile().getResumeFile();

        String contentType = "application/pdf";

        String key = "resumes/" + request.getReferralPostId() + ".pdf";

        // 4️⃣ Upload to S3
        s3Service.uploadFile(fileArray, key, contentType);


        ActiveReferral activeReferral = ActiveReferral.builder()
                .description(post.getDescription())
                .status(ActiveReferral.Status.ACTIVE)
                .candidate(applicant)
                .posterId(poster.getId())
                .jobRole(post.getJobRole())
                .targetCompany(post.getCompany())
                .resumeLink(key)
                .build();

        activeReferralRepository.save(activeReferral);

        Application application = new Application();
        application.setApplicant(applicant);
        application.setReferralPost(post);

        Application saved = applicationRepository.save(application);

        // send emails
        emailService.sendApplicationConfirmation(
                applicant.getEmail(),
                post.getCompany(),
                post.getJobRole()
        );

        emailService.notifyProvider(
                post.getProvider().getEmail(),
                applicant.getEmail(),
                post.getCompany(),
                post.getJobRole()
        );

        return ApplicationMapper.toDto(saved);
    }

    // GET /api/applications/my
    public List<ApplicationResponseDto> getMyApplications(String userEmail) {

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return applicationRepository.findByApplicantId(user.getId())
                .stream()
                .map(ApplicationMapper::toDto)
                .toList();
    }

    // PUT /api/applications/{id}/stage
    public ApplicationResponseDto updateStage(UUID id, String stage) {

        Application app = applicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        app.setStage(Application.Stage.valueOf(stage));

        Application saved = applicationRepository.save(app);

        return ApplicationMapper.toDto(saved);
    }
}
