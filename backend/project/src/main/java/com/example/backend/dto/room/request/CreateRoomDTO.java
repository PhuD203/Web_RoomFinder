package com.example.backend.dto.room.request;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.example.backend.dto.room.response.CoordinatesDTO;
import com.example.backend.dto.room.response.RoomInfoDTO;

public class CreateRoomDTO {

    private String title;
    private Integer price;
    private Integer area;
    private String location;
    private String address;
    private String description;

    private List<MultipartFile> images;

    private List<String> amenities;

    private RoomInfoDTO roomInfo;

    private CoordinatesDTO coordinates;

    public CreateRoomDTO() {
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

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<MultipartFile> getImages() {
        return images;
    }

    public void setImages(List<MultipartFile> images) {
        this.images = images;
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

    public CoordinatesDTO getCoordinates() {
        return coordinates;
    }

    public void setCoordinates(CoordinatesDTO coordinates) {
        this.coordinates = coordinates;
    }
}