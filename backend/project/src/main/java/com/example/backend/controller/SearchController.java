package com.example.backend.controller;

import com.example.backend.dto.room.response.RoomCartDTO;
import com.example.backend.service.Room.CardRoomService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/search")
public class SearchController {

    private final CardRoomService roomService;

    public SearchController(CardRoomService roomService) {
        this.roomService = roomService;
    }

    // Query 1: Lấy danh sách phòng
    @GetMapping
    public List<RoomCartDTO> getRooms(@RequestParam(name = "location", required = false) String location,
            @RequestParam(name = "price", required = false) String price,
            @RequestParam(name = "area", required = false) String area) {
        return roomService.CardRoom(location, price, area);
    }

}