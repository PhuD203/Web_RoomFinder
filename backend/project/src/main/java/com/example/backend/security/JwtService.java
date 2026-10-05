package com.example.backend.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import org.springframework.beans.factory.annotation.Value;

@Service
public class JwtService {

    @Value("${JWT_SECRET}")
    private String secret;

    @Value("${JWT_EXPIRATION}")
    private long expiration;

    // private final String secret =
    // "trofinder-secret-key-trofinder-secret-key-123456";

    // private final long expiration = 1000 * 60 * 60 * 12; // 1 giờ

    private SecretKey getKey() {
        return Keys.hmacShaKeyFor(
                secret.getBytes(StandardCharsets.UTF_8));
    }

    // Tạo JWT
    public String generateToken(String email, String userId) {

        Date now = new Date();

        return Jwts.builder()
                .subject(email)
                .claim("userId", userId)
                .issuedAt(now)
                .expiration(new Date(now.getTime() + expiration))
                .signWith(getKey())
                .compact();
    }

    // Lấy email từ JWT
    public String extractEmail(String token) {

        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    // Lấy userId từ JWT
    public String extractUserId(String token) {

        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .get("userId", String.class);
    }

    // Kiểm tra JWT
    public boolean isValid(String token) {

        try {

            Jwts.parser()
                    .verifyWith(getKey())
                    .build()
                    .parseSignedClaims(token);

            return true;

        } catch (Exception e) {

            return false;
        }
    }

    // Lấy ID user hiện tại
    public String getCurrentUserId() {

        Authentication authentication = SecurityContextHolder.getContext()
                .getAuthentication();

        return authentication.getName();
    }

    // Lấy email user hiện tại
    public String getCurrentUserEmail() {

        Authentication authentication = SecurityContextHolder.getContext()
                .getAuthentication();

        return (String) authentication.getDetails();
    }
}