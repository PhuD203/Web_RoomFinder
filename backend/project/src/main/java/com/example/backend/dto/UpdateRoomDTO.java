package com.example.backend.dto;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public class UpdateRoomDTO {

    private String roomId;
    private String title;
    private Integer price;
    private Integer area;
    private String description;
    private String address;

    private CoordinatesDTO coordinates;

    private List<String> amenities;

    private RoomInfoDTO roomInfo;

    private List<MultipartFile> images;

    // private List<Integer> imageIndexes;

    private List<Integer> deletedIndexes;

    // =========================
    // GETTER / SETTER
    // =========================

    public String getRoomId() {
        return roomId;
    }

    public void setRoomId(String roomId) {
        this.roomId = roomId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Integer getArea() {
        return area;
    }

    public void setArea(Integer area) {
        this.area = area;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public CoordinatesDTO getCoordinates() {
        return coordinates;
    }

    public void setCoordinates(CoordinatesDTO coordinates) {
        this.coordinates = coordinates;
    }

    public List<String> getAmenities() {
        return amenities;
    }

    public void setAmenities(List<String> amenities) {
        this.amenities = amenities;
    }

    public RoomInfoDTO getRoomInfo() {
        return roomInfo;
    }

    public void setRoomInfo(RoomInfoDTO roomInfo) {
        this.roomInfo = roomInfo;
    }

    public List<MultipartFile> getImages() {
        return images;
    }

    public void setImages(List<MultipartFile> images) {
        this.images = images;
    }

    // public List<Integer> getImageIndexes() {
    // return imageIndexes;
    // }

    // public void setImageIndexes(List<Integer> imageIndexes) {
    // this.imageIndexes = imageIndexes;
    // }

    public List<Integer> getDeletedIndexes() {
        return deletedIndexes;
    }

    public void setDeletedIndexes(List<Integer> deletedIndexes) {
        this.deletedIndexes = deletedIndexes;
    }
}