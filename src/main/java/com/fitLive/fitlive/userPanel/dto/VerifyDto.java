package com.fitLive.fitlive.userPanel.dto;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class VerifyDto {
    @NotBlank(message = "Email kiritilishi shart!")
    @Email(message = "Noto'g'ri email formati!")
    private String email;

    @NotBlank(message = "Tasdiqlash kodi kiritilishi shart!")
    @Size(min = 5, max = 5, message = "Tasdiqlash kodi 5 xonali bo'lishi kerak!")
    private String code;


}
