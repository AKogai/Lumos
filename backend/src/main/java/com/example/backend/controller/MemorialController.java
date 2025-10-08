package com.example.backend.controller;

import com.example.backend.dto.OpenAIPromptRequest;
import com.example.backend.dto.OpenAIPromptResponse;
import com.example.backend.entity.Memorial;
import com.example.backend.service.MemorialService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/memorial")
@CrossOrigin(origins = "*")
public class MemorialController {

    private final MemorialService memorialService;

    public MemorialController(MemorialService memorialService) {
        this.memorialService = memorialService;
    }

    @GetMapping
    public ResponseEntity<List<Memorial>> getAllMemorials() {
        List<Memorial> memorials = memorialService.findAll();
        return ResponseEntity.ok(memorials);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Memorial> getMemorialById(@PathVariable Long id) {
        try {
            Memorial memorial = memorialService.findById(id);
            return ResponseEntity.ok(memorial);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{id}/openai")
    public ResponseEntity<?> callOpenAI(
            @PathVariable Long id,
            @RequestBody OpenAIPromptRequest request) {
        try {
            OpenAIPromptResponse response = memorialService.callOpenAI(id, request.getVariables());
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}
