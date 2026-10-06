package com.fitLive.fitlive.userPanel.service;

import com.fitLive.fitlive.userPanel.dto.UserResponseDto;
import com.fitLive.fitlive.userPanel.model.User;
import com.fitLive.fitlive.userPanel.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthService {

    private static final int CODE_VALID_MINUTES = 2;
    private final UserRepository userRepository;
    private final JavaMailSender mailSender;
    private final PasswordEncoder passwordEncoder;
    private final SecureRandom random = new SecureRandom();

    @Transactional
    public String register(String username, String email, String password) {

        if (userRepository.existsByUsername(username)) {
            throw new IllegalArgumentException("Bu username band!");
        }
        if (userRepository.findByEmail(email).isPresent()) {
            throw new IllegalArgumentException("Bu email allaqachon ro'yxatdan o'tgan");
        }

        String code = String.valueOf(random.nextInt(90000) + 10000);

        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setVerificationCode(code);
        user.setVerificationExpiresAt(LocalDateTime.now().plusMinutes(CODE_VALID_MINUTES));
        user.setVerified(false);

        userRepository.save(user);

        // emailga kod yuborish (xato bo'lsa, saqlash ham bekor qilinadi)
        sendEmail(email, code);

        return "Ro'yxatdan o'tish muvaffaqiyatli yakunlandi.";
    }

    @Transactional
    public String verifyUser(String email, String code) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User topilmadi"));

        if (user.isVerified()) {
            return "User allaqachon tasdiqlangan";
        }

        if (user.getVerificationExpiresAt() == null
                || LocalDateTime.now().isAfter(user.getVerificationExpiresAt())) {
            throw new IllegalArgumentException("Kod muddati tugagan. Yangi kod so'rang.");
        }

        if (code != null && code.equals(user.getVerificationCode())) {
            user.setVerified(true);
            user.setVerificationCode("✓");
            user.setVerificationExpiresAt(null);
            userRepository.save(user);
            return "Hisob muvaffaqiyatli tasdiqlandi.";
        }
        throw new IllegalArgumentException("Tasdiqlash kodi noto'g'ri");
    }

    private void sendEmail(String email, String code) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setFrom("asilbekirgashaliyev42@gmail.com");
        message.setSubject("Tasdiqlash kodi");
        message.setText("Sizning tasdiqlash kodingiz: " + code);
        mailSender.send(message);
    }

    @Transactional
    public String resendCode(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User topilmadi"));

        if (user.isVerified()) {
            throw new IllegalArgumentException("User allaqachon tasdiqlangan");
        }

        String code = String.valueOf(random.nextInt(90000) + 1000);
        user.setVerificationCode(code);
        user.setVerificationExpiresAt(LocalDateTime.now().plusMinutes(CODE_VALID_MINUTES));
        userRepository.save(user);

        sendEmail(email, code);
        return "Yangi kod yuborildi.";
    }

    @Transactional(readOnly = true)
    public List<UserResponseDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map(u -> new UserResponseDto(
                        u.getId(),
                        u.getUsername(),
                        u.getEmail(),
                        u.isVerified()))
                .toList();
    }
}