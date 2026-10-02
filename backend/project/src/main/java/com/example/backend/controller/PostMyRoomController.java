package com.example.backend.controller;

import com.example.backend.dto.MyRoomPostDTO;
import com.example.backend.service.MyPostRommService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/mypostroom")
public class PostMyRoomController {

    private final MyPostRommService myPostRommService;

    public PostMyRoomController(MyPostRommService myPostRommService) {
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