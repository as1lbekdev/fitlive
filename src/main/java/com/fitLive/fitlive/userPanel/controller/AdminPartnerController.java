package com.fitLive.fitlive.userPanel.controller;

import com.fitLive.fitlive.userPanel.dto.PartnerRequestDto;
import com.fitLive.fitlive.userPanel.dto.PartnerResponseDto;
import com.fitLive.fitlive.userPanel.service.PartnerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/partners")
@RequiredArgsConstructor
public class AdminPartnerController {

    private final PartnerService partnerService;

    @PostMapping
    public ResponseEntity<PartnerResponseDto> create(@Valid @RequestBody PartnerRequestDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(partnerService.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PartnerResponseDto> update(@PathVariable Long id,
                                                     @Valid @RequestBody PartnerRequestDto dto) {
        return ResponseEntity.ok(partnerService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        partnerService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
