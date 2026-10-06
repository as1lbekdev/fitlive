package com.fitLive.fitlive.userPanel.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginDto {
    @NotBlank(message = "Email yoki username kiritilishi shart!")
    private String emailOrUsername;

    @NotBlank(message = "Parol kiritilishi shart!")
    private String password;
}
