package com.example.backend.dto.admin;

public class AdminUserListDTO {

    private String id;
    private String name;
    private String phone;
    private String email;
    private String joinedAt;
    private String avatar;
    private String status;
    private Long postCount;
    private Long favoriteCount;

    public AdminUserListDTO() {
    }

    public AdminUserListDTO(
            String id,
            String name,
            String phone,
            String email,
            String joinedAt,
            String avatar,
            String status,
            Long postCount,
            Long favoriteCount) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.joinedAt = joinedAt;
        this.avatar = avatar;
        this.status = status;
        this.postCount = postCount;
        this.favoriteCount = favoriteCount;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public Long getPostCount() {
        return postCount;
    }

    public void setPostCount(Long postCount) {
        this.postCount = postCount;
    }

    public Long getFavoriteCount() {
        return favoriteCount;
    }

    public void setFavoriteCount(Long favoriteCount) {
        this.favoriteCount = favoriteCount;
    }
}
