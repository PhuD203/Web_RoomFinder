package com.example.backend.service.Admin;

import java.util.List;
import org.springframework.stereotype.Service;

import com.example.backend.repository.UserRepository;
import com.example.backend.dto.admin.AdminUserListDTO;
import com.example.backend.entity.User;
import com.example.backend.security.JwtService;
// import com.example.backend.service.FileStorageService;

@Service
public class AdminUserServies {
    private final UserRepository userRepository;
    private final JwtService jwtService;

    public AdminUserServies(
            UserRepository userRepository,
            JwtService jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    public List<AdminUserListDTO> getListUser_Amin() {
        List<AdminUserListDTO> results = userRepository.getListUser_Amin();
        return results;
    }

    public AdminUserListDTO getUser_Report(String IdUser) {
        AdminUserListDTO results = userRepository.getUser_Report(IdUser);
        return results;
    }

    public String changeStatusUser_Admin(String userId, String status) {
        try {
            String userAdmin = jwtService.getCurrentUserId();
            if (userAdmin.equals(userId)) {
                return "Tài khoản này không thể đổi";
            }
            User user = userRepository
                    .findById(userId)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy user"));
            user.setStatus(status);
            userRepository.save(user);
            return "Đổi trạng thái thành công";
        } catch (Exception e) {
            return "Đổi trạng thái thất bại";
        }
    }
}
