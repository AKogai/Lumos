package com.example.backend.dto;

public class OpenAIPromptResponse {
    private String finalPrompt;
    private String openaiResponse;

    public OpenAIPromptResponse() {
    }

    public OpenAIPromptResponse(String finalPrompt, String openaiResponse) {
        this.finalPrompt = finalPrompt;
        this.openaiResponse = openaiResponse;
    }

    public String getFinalPrompt() {
        return finalPrompt;
    }

    public void setFinalPrompt(String finalPrompt) {
        this.finalPrompt = finalPrompt;
    }

    public String getOpenaiResponse() {
        return openaiResponse;
    }

    public void setOpenaiResponse(String openaiResponse) {
        this.openaiResponse = openaiResponse;
    }
}
