package com.example.backend.dto;

import java.util.List;

public class RoomDetailDTO {

    private String id;
    private String title;
    private Integer price;
    private Integer area;
    private String location;
    private String address;
    private String description;

    private List<String> images;
    private List<String> amenities;

    private OwnerDTO owner;
    private RoomInfoDTO roomInfo;
    private CoordinatesDTO coordinates;

    public RoomDetailDTO() {
    }

    public RoomDetailDTO(
            String id,
            String title,
            Integer price,
            Integer area,
            String location,
            String address,
            String description,
            List<String> images,
            List<String> amenities,
            OwnerDTO owner,
            RoomInfoDTO roomInfo,
            CoordinatesDTO coordinates) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.area = area;
        this.location = location;
        this.address = address;
        this.description = description;
        this.images = images;
        this.amenities = amenities;
        this.owner = owner;
        this.roomInfo = roomInfo;
        this.coordinates = coordinates;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }

    public List<String> getAmenities() {
        return amenities;
    }

    public void setAmenities(List<String> amenities) {
        this.amenities = amenities;
    }

    public OwnerDTO getOwner() {
        return owner;
    }

    public void setOwner(OwnerDTO owner) {
        this.owner = owner;
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