package com.fitLive.fitlive.userPanel.dto;


import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequestDto {

    @NotBlank(message = "Username bo'sh bo'lishi mumkin emas")
    private String username;
    @NotBlank(message = "parol kirit gandon")
    private String password;
}