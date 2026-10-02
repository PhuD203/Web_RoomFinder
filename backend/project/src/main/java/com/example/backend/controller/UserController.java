package com.example.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.backend.dto.UserProfileDTO;
import com.example.backend.service.UserService;

@RestController
@RequestMapping("/api/userprofile")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("")
    public UserProfileDTO getProfile() {
        System.out.println(">>> ĐÃ VÀO USER PROFILE");
        return userService.getUserProfile();
    }

    @PutMapping("/update")
    public String updateProfile(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String phone,
            @RequestParam(required = false) MultipartFile avatar) {
        return userService.updateUserProfile(
                name,
                phone,
                avatar);
    }

    @GetMapping("/block")
    public String blockProfile() {
        return userService.blockUser();
    }

    @GetMapping("/avatar")
    public String getAvatar() {
        return userService.getAvatar();
    }

    @GetMapping("/type")
    public String getType() {
        return userService.getType();
    }
}
