package com.example.backend.dto.room.response;

public class RoomTitleDTO {

    private String id;
    private String title;
    private Integer price;
    private Integer area;
    private String address;
    private String description;

    public RoomTitleDTO() {
    }

    public RoomTitleDTO(
            String id,
            String title,
            Integer price,
            Integer area,
            String address,
            String description) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.area = area;
        this.address = address;
        this.description = description;
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
}