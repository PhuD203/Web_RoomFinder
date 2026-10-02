package com.example.backend.service.Amin;

import com.example.backend.dto.AdminPostDTO;
import com.example.backend.repository.RoomRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PostServies {

    private final RoomRepository roomRepository;

    public PostServies(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    public List<AdminPostDTO> getPostsByStatus(String status) {
        return roomRepository.findPostsByStatus(status);
    }
}