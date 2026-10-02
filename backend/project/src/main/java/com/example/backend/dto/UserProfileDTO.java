package com.example.backend.dto;

public class UserProfileDTO {

    private String name;
    private String phone;
    private String email;
    private String joinedAt;
    private String avatar;
    private String status;
    private Integer postCount;
    private Integer favoriteCount;
    private Integer reportCount;

    public UserProfileDTO() {
    }

    public UserProfileDTO(
            String name,
            String phone,
            String email,
            String joinedAt,
            String avatar,
            String status,
            Integer postCount,
            Integer favoriteCount,
            Integer reportCount) {
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.joinedAt = joinedAt;
        this.avatar = avatar;
        this.status = status;
        this.postCount = postCount;
        this.favoriteCount = favoriteCount;
        this.reportCount = reportCount;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getJoinedAt() {
        return joinedAt;
    }

    public void setJoinedAt(String joinedAt) {
        this.joinedAt = joinedAt;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getPostCount() {
        return postCount;
    }

    public void setPostCount(Integer postCount) {
        this.postCount = postCount;
    }

    public Integer getFavoriteCount() {
        return favoriteCount;
    }

    public void setFavoriteCount(Integer favoriteCount) {
        this.favoriteCount = favoriteCount;
    }

    public Integer getReportCount() {
        return reportCount;
    }

    public void setReportCount(Integer reportCount) {
        this.reportCount = reportCount;
    }
}