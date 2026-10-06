package com.fitLive.fitlive.userPanel.dto;



public record UserResponseDto(
        Long id,
        String username,
        String email,
        boolean verified

) {}
