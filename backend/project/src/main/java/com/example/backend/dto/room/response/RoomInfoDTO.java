package com.example.backend.dto.room.response;

public class RoomInfoDTO {

    private String type;
    private Integer people;
    private String furniture;
    private String electricity;
    private String water;
    private String other;

    public RoomInfoDTO() {
    }

    public RoomInfoDTO(
            String type,
            Integer people,
            String furniture,
            String electricity,
            String water,
            String other) {
        this.type = type;
        this.people = people;
        this.furniture = furniture;
        this.electricity = electricity;
        this.water = water;
        this.other = other;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getPeople() {
        return people;
    }

    public void setPeople(Integer people) {
        this.people = people;
    }

    public String getFurniture() {
        return furniture;
    }

    public void setFurniture(String furniture) {
        this.furniture = furniture;
    }

    public String getElectricity() {
        return electricity;
    }

    public void setElectricity(String electricity) {
        this.electricity = electricity;
    }

    public String getWater() {
        return water;
    }

    public void setWater(String water) {
        this.water = water;
    }

    public String getOther() {
        return other;
    }

    public void setOther(String other) {
        this.other = other;
    }
}