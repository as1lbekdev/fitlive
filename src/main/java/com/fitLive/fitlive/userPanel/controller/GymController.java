package com.fitLive.fitlive.userPanel.controller;

import com.fitLive.fitlive.userPanel.dto.GymResponseDto;
import com.fitLive.fitlive.userPanel.service.GymService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/gyms")
@RequiredArgsConstructor
public class GymController {

    private final GymService gymService;

    @GetMapping
    public ResponseEntity<List<GymResponseDto>> getAll() {
        return ResponseEntity.ok(gymService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<GymResponseDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(gymService.getById(id));
    }
}
