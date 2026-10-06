package com.fitLive.fitlive.userPanel.controller;

import com.fitLive.fitlive.userPanel.dto.PartnerRequestDto;
import com.fitLive.fitlive.userPanel.dto.PartnerResponseDto;
import com.fitLive.fitlive.userPanel.model.Partner;
import com.fitLive.fitlive.userPanel.service.PartnerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/api/partners")
@RequiredArgsConstructor
public class PartnerController {

    private final PartnerService partnerService;

    @GetMapping
    public ResponseEntity<List<PartnerResponseDto>> getAll() {
        return ok(partnerService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PartnerResponseDto> getById(@PathVariable long id) {
        return ok(partnerService.getById(id));
    }

}
