package com.example.backend.controller;

import com.example.backend.dto.CreateRoomDTO;
import com.example.backend.dto.RoomDetailDTO;
import com.example.backend.dto.UpdateRoomDTO;
import com.example.backend.service.RoomService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    // Query 1: Lấy danh sách phòng
    @GetMapping("/{id}")
    public RoomDetailDTO getRoomDetail(
            @PathVariable String id) {
        return roomService.getRoomDetail(id);
    }

    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String createRoom(@ModelAttribute CreateRoomDTO dto) {

        return roomService.createRommDetail(dto);
    }

    @PutMapping(value = "/update", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateRoomDetail(
            @ModelAttribute UpdateRoomDTO dto) {
        String result = roomService.UpdateRoomDetail(dto);

        return ResponseEntity.ok(result);
    }

    @PutMapping("/changestatus/{roomId}")
    public ResponseEntity<String> changeStatus(
            @PathVariable String roomId,
            @RequestParam String status) {
        try {
            return ResponseEntity.ok(
                    roomService.changeStatus(roomId, status));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}