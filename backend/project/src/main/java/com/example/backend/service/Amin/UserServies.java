package com.example.backend.service.Amin;

import java.util.List;
import org.springframework.stereotype.Service;
import com.example.backend.dto.UserList_AminDTO;
import com.example.backend.repository.UserRepository;
import com.example.backend.entity.User;
import com.example.backend.security.JwtService;
// import com.example.backend.service.FileStorageService;

@Service
public class UserServies {
    private final UserRepository userRepository;
    private final JwtService jwtService;

    public UserServies(
            UserRepository userRepository,
            JwtService jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    public List<UserList_AminDTO> getListUser_Amin() {
        List<UserList_AminDTO> results = userRepository.getListUser_Amin();
        return results;
    }

    public UserList_AminDTO getUser_Report(String IdUser) {
        UserList_AminDTO results = userRepository.getUser_Report(IdUser);
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
