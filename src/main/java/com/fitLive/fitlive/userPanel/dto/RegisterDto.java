package com.fitLive.fitlive.userPanel.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class RegisterDto {


    @NotBlank(message=" username bo'sh bulishi mumkin emas!")
    private String username;

    @NotBlank(message= " Email bo'sh bulishi mumkin emas")
    @Email(message = "Notugri email formati")
    private String email;

    @NotBlank(message = "parol 6 tadan kam bulishi mumkin emas")
    @Size(min=6,message = "parol kamida 6 ta belgidan iborat bulish kerak ")
    private String password;


}
