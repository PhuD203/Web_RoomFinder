package com.example.backend.controller;

import com.example.backend.dto.auth.LoginRequestDTO;
import com.example.backend.dto.auth.LoginResponseDTO;
import com.example.backend.dto.auth.RegisterRequestDTO;
import com.example.backend.service.AuthService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(
            @RequestBody LoginRequestDTO request) {
        return ResponseEntity.ok(
                authService.login(request));
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(
            @RequestBody RegisterRequestDTO request) {
        authService.register(request);

        return ResponseEntity.ok("Đăng ký thành công");
    }
}