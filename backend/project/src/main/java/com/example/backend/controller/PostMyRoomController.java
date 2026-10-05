package com.example.backend.controller;

import com.example.backend.dto.room.response.MyRoomPostDTO;
import com.example.backend.service.Room.MyPostRoomService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/mypostroom")
public class PostMyRoomController {

    private final MyPostRoomService myPostRommService;

    public PostMyRoomController(MyPostRoomService myPostRommService) {
        this.myPostRommService = myPostRommService;
    }

    @GetMapping("")
    public List<MyRoomPostDTO> getMyRooms() {
        return myPostRommService.getMyRooms();
    }

    @PostMapping("/delete")
    public boolean deleteMyRoom(@RequestParam String roomId) {
        return myPostRommService.deleteMyRoom(roomId);
    }
}