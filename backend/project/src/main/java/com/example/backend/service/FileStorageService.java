package com.example.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class FileStorageService {

    public String saveFile(
            MultipartFile file,
            String folder,
            String oldFilePath,
            String Id_Name) {

        if (file == null || file.isEmpty()) {
            return null;
        }

        try {
            // backend/project/
            Path projectPath = Paths.get("backend", "project").toAbsolutePath();
            // backend/project/images/Avatar/
            Path uploadPath = projectPath.resolve("images").resolve(folder);

            // Tạo thư mục nếu chưa có
            Files.createDirectories(uploadPath);

            System.out.println("THƯ MỤC LƯU: " + uploadPath.toAbsolutePath());
            // Xóa ảnh cũ
            if (oldFilePath != null && !oldFilePath.isBlank()) {
                String oldFileName = Paths.get(oldFilePath).getFileName().toString();
                Path oldFile = uploadPath.resolve(oldFileName);
                if (Files.exists(oldFile)) {
                    Files.delete(oldFile);
                    System.out.println("Đã xóa ảnh cũ: " + oldFile);
                }
            }
            // Tên file mới
            String originalName = file.getOriginalFilename();

            if (originalName == null || originalName.isBlank()) {
                originalName = "image";
            }
            String extension = "";
            int dotIndex = originalName.lastIndexOf(".");
            if (dotIndex != -1) {
                extension = originalName.substring(dotIndex);
            }

            String fileName = Id_Name + "_" + folder + extension;

            // Lưu file
            Path filePath = uploadPath.resolve(fileName);

            Files.write(filePath, file.getBytes());
            System.out.println("ĐÃ LƯU FILE: " + filePath.toAbsolutePath());

            // Path lưu database
            return "/images/" + folder + "/" + fileName;

        } catch (IOException e) {
            throw new RuntimeException("Không thể lưu file", e);
        }
    }
}