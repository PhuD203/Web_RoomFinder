package com.example.backend.service.User;

import java.util.List;

import com.example.backend.dto.user.UserProfileDTO;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.security.JwtService;
import com.example.backend.utils.DateTimeUtil;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.example.backend.service.File.FileStorageService;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final FileStorageService fileStorageService;

    public UserService(
            UserRepository userRepository,
            JwtService jwtService,
            FileStorageService fileStorageService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.fileStorageService = fileStorageService;
    }

    public UserProfileDTO getUserProfile() {

        String userId = jwtService.getCurrentUserId();

        List<Object[]> rows = userRepository.getUserWithCount(userId);

        if (rows.isEmpty()) {
            return null;
        }

        Object[] row = rows.get(0);

        String name = (String) row[0];
        String email = (String) row[1];
        String phone = (String) row[2];

        // String joinedAt = "";

        // if (row[3] != null) {

        // LocalDateTime dateTime;

        // if (row[3] instanceof java.sql.Timestamp) {
        // dateTime = ((java.sql.Timestamp) row[3])
        // .toLocalDateTime();
        // } else {
        // dateTime = (LocalDateTime) row[3];
        // }

        // joinedAt = dateTime.format(
        // DateTimeFormatter.ofPattern("dd/MM/yyyy"));
        // }
        String joinedAt = DateTimeUtil.formatDate(row[3]);

        String status = (String) row[4];

        if ("active".equalsIgnoreCase(status)) {
            status = "Đang hoạt động";
        }

        String avatar = (String) row[5];

        Integer postCount = ((Number) row[6]).intValue();

        Integer favoriteCount = ((Number) row[7]).intValue();

        Integer reportCount = ((Number) row[8]).intValue();

        return new UserProfileDTO(
                name,
                phone,
                email,
                joinedAt,
                avatar,
                status,
                postCount,
                favoriteCount,
                reportCount);
    }

    public String updateUserProfile(
            String name,
            String phone,
            MultipartFile avatar) {

        try {

            String userId = jwtService.getCurrentUserId();

            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException(
                            "Không tìm thấy user"));
            // Cập nhật tên
            if (name != null) {
                user.setName(name);
            }
            // Cập nhật số điện thoại
            if (phone != null) {
                user.setPhone(phone);
            }
            // Cập nhật avatar
            if (avatar != null && !avatar.isEmpty()) {
                String oldAvatarPath = user.getAvatar();

                String avatarPath = fileStorageService.saveFile(
                        avatar,
                        "Avatar",
                        oldAvatarPath,
                        userId);
                user.setAvatar(avatarPath);
            }
            // Lưu User
            userRepository.save(user);
            return "Cập nhật thông tin thành công";
        } catch (Exception e) {
            throw new RuntimeException(
                    "Không thể cập nhật thông tin user",
                    e);
        }
    }

    public String blockUser() {
        try {
            String userId = jwtService.getCurrentUserId();
            User user = userRepository
                    .findById(userId)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy user"));
            user.setStatus("Block");
            userRepository.save(user);
            return "Khóa tài khoản thành công";
        } catch (Exception e) {
            return "Khóa tài khoản thất bại";
        }
    }

    public String getAvatar() {
        String userId = jwtService.getCurrentUserId();

        User user = userRepository
                .findById(userId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy user"));

        return user.getAvatar();
    }

    public String getType() {
        String userId = jwtService.getCurrentUserId();

        User user = userRepository
                .findById(userId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy user"));

        return user.getType();
    }

}