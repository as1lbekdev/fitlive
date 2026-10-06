package com.fitLive.fitlive.userPanel.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.Map;
import java.util.UUID;

@Service
public class FileStorageService {

    private static final Map<String, String> ALLOWED = Map.of(
            "image/jpeg", ".jpg",
            "image/png", ".png",
            "image/webp", ".webp");

    private final Path root;

    public FileStorageService(@Value("${app.upload-dir:uploads}") String uploadDir) throws IOException {
        this.root = Path.of(uploadDir).toAbsolutePath().normalize();
        Files.createDirectories(root.resolve("gyms"));
    }

    public Path getRoot() {
        return root;
    }

    public String saveGymImage(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Rasm tanlanmagan!");
        }
        String ext = ALLOWED.get(file.getContentType());
        if (ext == null) {
            throw new IllegalArgumentException("Faqat JPG, PNG yoki WEBP rasm yuklash mumkin!");
        }
        String filename = UUID.randomUUID() + ext;
        try (InputStream in = file.getInputStream()) {
            Files.copy(in, root.resolve("gyms").resolve(filename), StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new IllegalStateException("Rasmni saqlab bo'lmadi", e);
        }
        return "/uploads/gyms/" + filename;
    }

    public void delete(String imageUrl) {
        if (imageUrl == null || !imageUrl.startsWith("/uploads/")) return;
        Path p = root.resolve(imageUrl.substring("/uploads/".length())).normalize();
        if (!p.startsWith(root)) return;
        try {
            Files.deleteIfExists(p);
        } catch (IOException ignored) {
        }
    }
}