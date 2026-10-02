package com.example.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "coordinates")
public class Coordinate {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private Double latitude;

    private Double longitude;

    public Coordinate() {
    }

    // Getter & Setter
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }
}