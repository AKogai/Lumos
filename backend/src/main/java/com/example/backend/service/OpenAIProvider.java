package com.example.backend.service;

import com.example.backend.dto.OpenAIRequest;
import com.example.backend.dto.OpenAIResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Component
public class OpenAIProvider implements AIProvider {

    @Value("${openai.api.key}")
    private String apiKey;

    @Value("${openai.api.url}")
    private String apiUrl;

    @Value("${openai.model}")
    private String model;

    private final RestTemplate restTemplate;

    public OpenAIProvider() {
        this.restTemplate = new RestTemplate();
    }

    @Override
    public String generateResponse(String prompt) {
        if (apiKey == null || apiKey.isEmpty() || apiKey.equals("your-api-key-here")) {
            throw new RuntimeException("OpenAI API key not configured");
        }

        OpenAIRequest request = new OpenAIRequest(
                model,
                List.of(new OpenAIRequest.Message("user", prompt)),
                0.7
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        HttpEntity<OpenAIRequest> entity = new HttpEntity<>(request, headers);

        OpenAIResponse response = restTemplate.postForObject(
                apiUrl,
                entity,
                OpenAIResponse.class
        );

        if (response != null && response.getChoices() != null && !response.getChoices().isEmpty()) {
            return response.getChoices().get(0).getMessage().getContent();
        }

        throw new RuntimeException("No response from OpenAI");
    }

    @Override
    public String getProviderName() {
        return "OpenAI";
    }
}
