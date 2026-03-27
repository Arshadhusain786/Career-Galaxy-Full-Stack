package com.galaxy.career.carreergalaxyapp.services;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailNotificationService {
    private final JavaMailSender mailSender;

    public EmailNotificationService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendApplicationConfirmation(String applicantEmail, String company, String role) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(applicantEmail);
        message.setSubject("Application Submitted Successfully");

        message.setText(
                "Your application for " + role +
                        " at " + company +
                        " has been submitted successfully."
        );

        mailSender.send(message);
    }

    public void notifyProvider(String providerEmail, String applicantEmail, String company, String role) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(providerEmail);
        message.setSubject("New Referral Application");

        message.setText(
                "Hello,\n\n" +
                        "You have received a new referral application.\n\n" +
                        "Company: " + company + "\n" +
                        "Role: " + role + "\n" +
                        "Applicant Email: " + applicantEmail + "\n\n" +

                        "To review and download the candidate's resume, please follow these steps:\n" +
                        "1. Log in to your Career Galaxy account.\n" +
                        "2. Go to the Active Referrals section in the left sidebar.\n" +
                        "3. Check the card corresponding to their email address.\n" +
                        "4. Click on 'Download Resume'.\n" +
                        "5. Go to your company specific portal, apply and update the status." +

                        "Please review the candidate and proceed with the referral if suitable.\n\n" +
                        "Best regards,\n" +
                        "Career Galaxy Team"
        );

        mailSender.send(message);
    }

}

