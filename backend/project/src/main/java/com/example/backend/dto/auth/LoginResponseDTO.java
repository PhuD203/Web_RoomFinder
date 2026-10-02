package com.example.backend.dto.auth;

public class LoginResponseDTO {

    private String token;
    private String userId;
    private String name;
    private String email;
    private String type;

    public LoginResponseDTO(
            String token,
            String userId,
            String name,
            String email,
            String type) {
        this.token = token;
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.type = type;
    }

    public String getToken() {
        return token;
    }

    public String getUserId() {
        return userId;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getType() {
        return type;
    }
}