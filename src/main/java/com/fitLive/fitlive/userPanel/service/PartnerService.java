package com.fitLive.fitlive.userPanel.service;

import com.fitLive.fitlive.userPanel.dto.PartnerRequestDto;
import com.fitLive.fitlive.userPanel.dto.PartnerResponseDto;
import com.fitLive.fitlive.userPanel.model.Partner;
import com.fitLive.fitlive.userPanel.repository.PartnerRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class PartnerService {

    private final PartnerRepository partnerRepository;


    @Transactional(readOnly = true)
    public List<PartnerResponseDto> getAll() {
        return partnerRepository.findAll().stream().map(this::toDto).toList();
    }

    public PartnerResponseDto getById(Long id) {
        return toDto(find(id));
    }

    @Transactional
    public PartnerResponseDto create(PartnerRequestDto p){
        if(partnerRepository.existsByNameIgnoreCase(p.getName())){
            throw new IllegalArgumentException("hamkor allaqachon mavjud");
        }

        Partner partner = new Partner();
        partner.setName(p.getName());
        partner.setLocation(p.getLocation().trim());
        return toDto(partnerRepository.save(partner));
    }
    @Transactional
    public PartnerResponseDto update(Long id, PartnerRequestDto dto) {
        Partner p=find(id);
        p.setName(dto.getName());
        p.setLocation(dto.getLocation());
        return toDto(partnerRepository.save(p));
    }

    @Transactional
    public void delete(Long id) {
        partnerRepository.deleteById(id);
    }

    private Partner find(Long id) {
        return partnerRepository.findById(id)
                .orElseThrow(()->new IllegalArgumentException("Hamkor topilmadi"));
    }
    private PartnerResponseDto toDto (Partner partner) {
        return new PartnerResponseDto(partner.getId(),partner.getName(),partner.getLocation());
    }

}
