package com.example.backend.dto;

public class RoomCartDTO {

    private String id;
    private String title;
    private Integer price;
    private Integer area;
    private String location;
    private String image;
    private Boolean isFavorite;

    public RoomCartDTO(
            String id,
            String title,
            Integer price,
            Integer area,
            String location,
            String image) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.area = area;
        this.location = location;
        this.image = image;
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

    public Integer getArea() {
        return area;
    }

    public String getLocation() {
        return location;
    }

    public String getImage() {
        return image;
    }

    public Boolean getIsFavorite() {
        return isFavorite;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}