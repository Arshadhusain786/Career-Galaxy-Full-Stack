package com.galaxy.career.carreergalaxyapp.services;

import org.springframework.stereotype.Service;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.secretsmanager.SecretsManagerClient;
import software.amazon.awssdk.services.secretsmanager.model.GetSecretValueRequest;
import software.amazon.awssdk.services.secretsmanager.model.GetSecretValueResponse;
import tools.jackson.databind.ObjectMapper;

import java.util.Map;

@Service
public class AwsSecretsService {

    private final SecretsManagerClient client;

    public AwsSecretsService() {
        this.client = SecretsManagerClient.builder()
                .region(Region.AP_SOUTH_1)
                .build(); // ✅ IAM role used automatically
    }

    public String getBucketName() {

        GetSecretValueRequest request = GetSecretValueRequest.builder()
                .secretId("career-galaxy/aws-config")
                .build();

        String secretJson = client.getSecretValue(request).secretString();

        try {
            ObjectMapper mapper = new ObjectMapper();
            Map<String, String> map = mapper.readValue(secretJson, Map.class);
            return map.get("bucketName");

        } catch (Exception e) {
            throw new RuntimeException("Failed to parse secret", e);
        }
    }
}
