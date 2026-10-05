package com.example.backend.service.Auth;

import com.example.backend.dto.auth.LoginRequestDTO;
import com.example.backend.dto.auth.LoginResponseDTO;
import com.example.backend.dto.auth.RegisterRequestDTO;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.security.JwtService;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public LoginResponseDTO login(LoginRequestDTO request) {

        User user = userRepository
                .findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Email không tồn tại"));
        if (!"Active".equals(user.getStatus())) {
            throw new RuntimeException("Tài khoản đã bị khóa");
        }
        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {
            throw new RuntimeException("Mật khẩu không đúng");
        }

        String token = jwtService.generateToken(user.getEmail(), user.getId());

        return new LoginResponseDTO(
                token,
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getType());
    }

    public void register(RegisterRequestDTO request) {
        System.out.println(
                passwordEncoder.matches(
                        "123456",
                        "$2a$10$ycnPihYzwhh2p0TUtyDknOmUqUhcBwWe5KdR7uAcruPSMn1EIfq72"));

        System.out.println(
                passwordEncoder.matches(
                        "123456",
                        "$2a$10$.2ppW2oZ4y9mUtFv.SOMJuMOiemrEIR6LuRSAmP1HKsSdK40xy7DW."));

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email đã tồn tại");
        }

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setType(request.getType());
        user.setStatus("Active");

        // Mã hóa password trước khi lưu DB
        user.setPassword(
                passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);
    }

}