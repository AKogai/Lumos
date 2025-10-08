package com.example.backend.service;

import com.example.backend.dto.OpenAIPromptResponse;
import com.example.backend.dto.OpenAIRequest;
import com.example.backend.dto.OpenAIResponse;
import com.example.backend.entity.Memorial;
import com.example.backend.repository.MemorialRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MemorialService {

    private final MemorialRepository memorialRepository;
    private final RestTemplate restTemplate;

    @Value("${openai.api.key}")
    private String openAiApiKey;

    @Value("${openai.api.url}")
    private String openAiApiUrl;

    @Value("${openai.model}")
    private String openAiModel;

    @Value("${openai.prompt.template}")
    private String promptTemplate;

    public MemorialService(MemorialRepository memorialRepository) {
        this.memorialRepository = memorialRepository;
        this.restTemplate = new RestTemplate();
    }

    public List<Memorial> findAll() {
        return memorialRepository.findAll();
    }

    public Memorial findById(Long id) {
        return memorialRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Memorial not found with id: " + id));
    }

    public OpenAIPromptResponse callOpenAI(Long memorialId, Map<String, String> customVariables) {
        Memorial memorial = findById(memorialId);

        // Build deceased info from memorial data
        String deceasedInfo = buildDeceasedInfo(memorial);

        // Build variables map
        Map<String, String> variables = new HashMap<>();
        variables.put("DECEASED_INFO", deceasedInfo);

        // Add custom variables from request (TONE, LANGUAGE, USER_INFO)
        if (customVariables != null) {
            variables.putAll(customVariables);
        }

        // Replace placeholders in template
        String finalPrompt = replacePlaceholders(promptTemplate, variables);

        // Call OpenAI API
        OpenAIRequest request = new OpenAIRequest(
                openAiModel,
                List.of(new OpenAIRequest.Message("user", finalPrompt)),
                0.7
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(openAiApiKey);

        HttpEntity<OpenAIRequest> entity = new HttpEntity<>(request, headers);

        OpenAIResponse response = restTemplate.postForObject(
                openAiApiUrl,
                entity,
                OpenAIResponse.class
        );

        String openaiResponse = "No response from OpenAI";
        if (response != null && response.getChoices() != null && !response.getChoices().isEmpty()) {
            openaiResponse = response.getChoices().get(0).getMessage().getContent();
        }

        return new OpenAIPromptResponse(finalPrompt, openaiResponse);
    }

    private String buildDeceasedInfo(Memorial memorial) {
        StringBuilder info = new StringBuilder();

        String fullName = memorial.getFirstName();
        if (memorial.getMiddleName() != null && !memorial.getMiddleName().isEmpty()) {
            fullName += " " + memorial.getMiddleName();
        }
        fullName += " " + memorial.getLastName();

        info.append("Name: ").append(fullName).append("\n");
        info.append("Born: ").append(memorial.getBornDate()).append("\n");
        info.append("Passed Away: ").append(memorial.getDeathDate()).append("\n");

        if (memorial.getPlaceOfBirth() != null) {
            info.append("Place of Birth: ").append(memorial.getPlaceOfBirth()).append("\n");
        }
        if (memorial.getPlaceOfDeath() != null) {
            info.append("Place of Death: ").append(memorial.getPlaceOfDeath()).append("\n");
        }
        if (memorial.getBiography() != null) {
            info.append("Biography: ").append(memorial.getBiography()).append("\n");
        }

        return info.toString();
    }

    private String replacePlaceholders(String template, Map<String, String> variables) {
        String result = template;
        for (Map.Entry<String, String> entry : variables.entrySet()) {
            String placeholder = "{" + entry.getKey() + "}";
            result = result.replace(placeholder, entry.getValue() != null ? entry.getValue() : "");
        }
        return result;
    }
}
