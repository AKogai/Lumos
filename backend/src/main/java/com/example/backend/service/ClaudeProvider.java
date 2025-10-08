package com.example.backend.service;

import com.example.backend.dto.ClaudeRequest;
import com.example.backend.dto.ClaudeResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Component
public class ClaudeProvider implements AIProvider {

    @Value("${claude.api.key}")
    private String apiKey;

    @Value("${claude.api.url}")
    private String apiUrl;

    @Value("${claude.model}")
    private String model;

    @Value("${claude.api.version}")
    private String apiVersion;

    private final RestTemplate restTemplate;

    public ClaudeProvider() {
        this.restTemplate = new RestTemplate();
    }

    @Override
    public String generateResponse(String prompt) {
        if (apiKey == null || apiKey.isEmpty() || apiKey.equals("your-claude-api-key-here")) {
            throw new RuntimeException("Claude API key not configured");
        }

        ClaudeRequest request = new ClaudeRequest(
                model,
                List.of(new ClaudeRequest.Message("user", prompt)),
                4096,
                0.7
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("x-api-key", apiKey);
        headers.set("anthropic-version", apiVersion);

        HttpEntity<ClaudeRequest> entity = new HttpEntity<>(request, headers);

        ClaudeResponse response = restTemplate.postForObject(
                apiUrl,
                entity,
                ClaudeResponse.class
        );

        if (response != null && response.getContent() != null && !response.getContent().isEmpty()) {
            return response.getContent().get(0).getText();
        }

        throw new RuntimeException("No response from Claude");
    }

    @Override
    public String getProviderName() {
        return "Claude";
    }
}
