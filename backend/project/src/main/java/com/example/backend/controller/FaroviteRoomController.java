package com.example.backend.controller;

import com.example.backend.dto.room.response.RoomCartDTO;
import com.example.backend.service.Room.CardRoomService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favoritesroom")
public class FaroviteRoomController {

    private final CardRoomService cardroomservice;

    public FaroviteRoomController(CardRoomService cardroomservice) {
        this.cardroomservice = cardroomservice;
    }

    @PostMapping("")
    public List<RoomCartDTO> getFavoriteRoom() {
        return cardroomservice.getFavoriteRoom();
    }

}