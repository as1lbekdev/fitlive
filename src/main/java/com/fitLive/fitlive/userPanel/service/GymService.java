package com.fitLive.fitlive.userPanel.service;

import com.fitLive.fitlive.userPanel.dto.GymRequestDto;
import com.fitLive.fitlive.userPanel.dto.GymResponseDto;
import com.fitLive.fitlive.userPanel.model.Gym;
import com.fitLive.fitlive.userPanel.repository.GymRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GymService {

    private final GymRepository gymRepository;
    private final FileStorageService fileStorageService;

    // ---- User panel ----
    @Transactional(readOnly = true)
    public List<GymResponseDto> getAll() {
        return gymRepository.findAll().stream().map(this::toDto).toList();
    }

    @Transactional(readOnly = true)
    public GymResponseDto getById(Long id) {
        return toDto(find(id));
    }

    // ---- Admin panel ----
    @Transactional
    public GymResponseDto create(GymRequestDto dto) {
        if (gymRepository.existsByNameIgnoreCaseAndLocationIgnoreCase(dto.getName(), dto.getLocation())) {
            throw new IllegalArgumentException("Bu zal allaqachon mavjud!");
        }
        Gym g = new Gym();
        g.setName(dto.getName().trim());
        g.setLocation(dto.getLocation().trim());
        return toDto(gymRepository.save(g));
    }

    @Transactional
    public GymResponseDto update(Long id, GymRequestDto dto) {
        Gym g = find(id);
        g.setName(dto.getName().trim());
        g.setLocation(dto.getLocation().trim());
        return toDto(gymRepository.save(g));
    }

    @Transactional
    public void delete(Long id) {
        gymRepository.delete(find(id));
    }

    private Gym find(Long id) {
        return gymRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Zal topilmadi"));
    }

    private GymResponseDto toDto(Gym g) {
        return new GymResponseDto(g.getId(), g.getName(), g.getLocation(),g.getImageUrl());
    }


    @Transactional
    public GymResponseDto updateImage(Long id, MultipartFile image) {
        Gym g = find(id);
        String oldUrl=g.getImageUrl();
        g.setImageUrl(fileStorageService.saveGymImage(image));
        gymRepository.save(g);
        fileStorageService.delete(oldUrl);
        return toDto(g);
    }

    @Transactional
    public void remove(Long id) {
        Gym g = find(id);
        gymRepository.delete(g);
        fileStorageService.delete(g.getImageUrl()); // zal o'chsa, rasmi ham o'chadi
    }

}
