package com.example.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "room_images")
public class RoomImage {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false, length = 500)
    private String imageUrl;

    @Column(nullable = false)
    private Integer imageIndex;

    @ManyToOne
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;

    public RoomImage() {
    }
    // Getter & Setter

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Integer getImageIndex() {
        return imageIndex;
    }

    public void setImageIndex(Integer imageIndex) {
        this.imageIndex = imageIndex;
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }
}