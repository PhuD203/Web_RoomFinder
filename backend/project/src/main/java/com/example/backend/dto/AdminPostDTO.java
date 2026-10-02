package com.example.backend.dto;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class AdminPostDTO {

    private String id;
    private String imageUrl;
    private String title;
    private String ownerName;
    private Integer price;
    private String address;
    private String createdAt;

    public AdminPostDTO(
            String id,
            String imageUrl,
            String title,
            String ownerName,
            Integer price,
            String address,
            LocalDateTime createdAt) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.address = address;
        this.imageUrl = imageUrl;
        this.ownerName = ownerName;
        setCreatedAt(createdAt);
    }

    public String getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public Integer getPrice() {
        return price;
    }

    public String getAddress() {
        return address;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt != null
                ? createdAt.format(DateTimeFormatter.ofPattern("dd/MM/yyyy"))
                : null;
    }
}