package com.fitLive.fitlive.userPanel.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GymRequestDto {
    @NotBlank(message = "Zal nomi kiritilishi shart!")
    private String name;

    @NotBlank(message = "Joylashuv kiritilishi shart!")
    private String location;
}
