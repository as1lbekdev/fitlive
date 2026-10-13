package com.fitLive.fitlive.userPanel.controller;


import com.fitLive.fitlive.userPanel.dto.LoginDto;
import com.fitLive.fitlive.userPanel.dto.RegisterDto;
import com.fitLive.fitlive.userPanel.dto.UserResponseDto;
import com.fitLive.fitlive.userPanel.dto.VerifyDto;
import com.fitLive.fitlive.userPanel.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@Valid @RequestBody RegisterDto registerDto) {
        String response=authService.register(registerDto.getUsername(), registerDto.getEmail(), registerDto.getPassword());
        return ResponseEntity.ok(response);
    }
    @PostMapping("/login")
    public ResponseEntity<String> login(@Valid @RequestBody LoginDto loginDto) {
        String response= String.valueOf(authService.login(loginDto));
        return ResponseEntity.ok(response);

    }

    @PostMapping("/verify")
    public ResponseEntity<String> verify(@Valid @RequestBody VerifyDto verfiyDto) {
    String response=authService.verifyUser(verfiyDto.getEmail(),verfiyDto.getCode());
    return ResponseEntity.ok(response);
    }

    @PostMapping("/resend")
    public ResponseEntity<String> resend(@RequestParam String email) {
        return ResponseEntity.ok(authService.resendCode(email));
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserResponseDto>> getAllUsers() {
        return ResponseEntity.ok(authService.getAllUsers());
    }

}
