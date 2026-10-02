package com.example.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(
            JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())

                // Bật CORS
                .cors(cors -> {
                })

                .sessionManagement(session -> session.sessionCreationPolicy(
                        SessionCreationPolicy.STATELESS))

                .authorizeHttpRequests(auth -> auth

                        // Cho phép CORS preflight
                        .requestMatchers(
                                HttpMethod.OPTIONS,
                                "/**")
                        .permitAll()

                        .requestMatchers(
                                "/api/auth/**")
                        .permitAll()

                        .requestMatchers(
                                "/api/rooms/**")
                        .permitAll()
                        .requestMatchers(
                                "/api/featuredrooms/**")
                        .permitAll()
                        .requestMatchers(
                                "/api/search/**")
                        .permitAll()
                        // .requestMatchers(
                        // "/api/admin/**"
                        // ).permitAll()
                        .requestMatchers("/images/**").permitAll()
                        .anyRequest().authenticated())

                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}