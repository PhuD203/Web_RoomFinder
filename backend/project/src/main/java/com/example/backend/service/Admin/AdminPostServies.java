package com.example.backend.service.Admin;

import com.example.backend.dto.admin.AdminPostDTO;
import com.example.backend.repository.RoomRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AdminPostServies {

    private final RoomRepository roomRepository;

    public AdminPostServies(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    public List<AdminPostDTO> getPostsByStatus(String status) {
        return roomRepository.findPostsByStatus(status);
    }
}