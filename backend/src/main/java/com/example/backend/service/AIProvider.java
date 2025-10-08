package com.example.backend.service;

public interface AIProvider {
    String generateResponse(String prompt);
    String getProviderName();
}
