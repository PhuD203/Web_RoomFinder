package com.example.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import com.example.backend.dto.RoomCartDTO;
import com.example.backend.service.CardRoomService;

@RestController
@RequestMapping("/api/featuredrooms")
public class FeaturedRoomsController {

    private final CardRoomService roomService;

    public FeaturedRoomsController(CardRoomService roomService) {
        this.roomService = roomService;
    }

    // Query 1: Lấy danh sách phòng
    @GetMapping
    public List<RoomCartDTO> getFeaturedRooms() {
        return roomService.FeaturedRooms();
    }

}