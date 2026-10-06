package com.fitLive.fitlive.userPanel.dto;


import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class PartnerRequestDto {
    @NotBlank(message = "Hamkor nomi kiritilishi shart!")
    private String name;

    @NotBlank(message = "Joylashuv kiritilishi shart!")
    private String location;
}