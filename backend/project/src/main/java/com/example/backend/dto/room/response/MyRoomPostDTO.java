package com.example.backend.dto.room.response;

public class MyRoomPostDTO {

    private String id;
    private String image;
    private String title;
    private Integer area;
    private Integer price;
    private String status;

    public MyRoomPostDTO() {
    }

    public MyRoomPostDTO(
            String id,
            String image,
            String title,
            Integer area,
            Integer price,
            String status) {
        this.id = id;
        this.image = image;
        this.title = title;
        this.area = area;
        this.price = price;
        this.status = status;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getArea() {
        return area;
    }

    public void setArea(Integer area) {
        this.area = area;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}