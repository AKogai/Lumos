package com.example.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.Map;

public class OpenAIPromptRequest {

    @Schema(description = "Variables for the condolence message template",
            example = "{\"TONE\": \"warm and compassionate\", \"LANGUAGE\": \"English\", \"USER_INFO\": \"I was a former student and colleague\"}")
    private Map<String, String> variables;

    public OpenAIPromptRequest() {
    }

    public OpenAIPromptRequest(Map<String, String> variables) {
        this.variables = variables;
    }

    public Map<String, String> getVariables() {
        return variables;
    }

    public void setVariables(Map<String, String> variables) {
        this.variables = variables;
    }
}
