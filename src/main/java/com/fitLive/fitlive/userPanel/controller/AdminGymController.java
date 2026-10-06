package com.fitLive.fitlive.userPanel.controller;

import com.fitLive.fitlive.userPanel.dto.GymRequestDto;
import com.fitLive.fitlive.userPanel.dto.GymResponseDto;
import com.fitLive.fitlive.userPanel.service.GymService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.Part;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/admin/gyms")
@RequiredArgsConstructor
public class AdminGymController {

    private final GymService gymService;

    @PostMapping
    public ResponseEntity<GymResponseDto> create(@Valid @RequestBody GymRequestDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(gymService.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<GymResponseDto> update(@PathVariable Long id,
                                                 @Valid @RequestBody GymRequestDto dto) {
        return ResponseEntity.ok(gymService.update(id, dto));
    }

    @PostMapping(value = "/debug-upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> debugUpload(HttpServletRequest request) throws Exception {
        StringBuilder sb = new StringBuilder("Content-Type: " + request.getContentType() + "\n");
        for (Part p : request.getParts()) {
            sb.append(p.getName()).append(" | ")
                    .append(p.getSubmittedFileName()).append(" | ")
                    .append(p.getSize()).append(" bayt\n");
        }
        return ResponseEntity.ok(sb.toString());
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        gymService.delete(id);
        return ResponseEntity.noContent().build();
    }
    @PostMapping(value = "/{id}/image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<GymResponseDto> uploadImage(@PathVariable Long id,
                                                      @RequestParam("image") MultipartFile image) {
        return ResponseEntity.ok(gymService.updateImage(id, image));
    }
}