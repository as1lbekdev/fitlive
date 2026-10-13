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
public class LoginDto {
    @NotBlank(message = "Email yoki username kiritilishi shart!")
    private String username;

    @NotBlank(message = "Parol kiritilishi shart!")
    private String password;
}
