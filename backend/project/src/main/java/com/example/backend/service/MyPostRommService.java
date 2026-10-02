package com.example.backend.service;

import com.example.backend.dto.MyRoomPostDTO;
import com.example.backend.repository.AmenityRepository;
import com.example.backend.repository.CoordinateRepository;
import com.example.backend.repository.FavoriteRepository;
import com.example.backend.repository.RoomImageRepository;
import com.example.backend.repository.RoomRepository;
import com.example.backend.security.JwtService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class MyPostRommService {

    private final RoomRepository roomRepository;
    private final JwtService jwtService;
    private final FavoriteRepository favoriteRepository;
    private final RoomImageRepository roomImageRepository;
    private final AmenityRepository amenityRepository;
    private final CoordinateRepository coordinateRepository;

    public MyPostRommService(
            RoomRepository roomRepository,
            FavoriteRepository favoriteRepository,
            RoomImageRepository roomImageRepository,
            AmenityRepository amenityRepository,
            CoordinateRepository coordinateRepository,
            JwtService jwtService) {
        this.roomRepository = roomRepository;
        this.favoriteRepository = favoriteRepository;
        this.roomImageRepository = roomImageRepository;
        this.amenityRepository = amenityRepository;
        this.coordinateRepository = coordinateRepository;
        this.jwtService = jwtService;
    }

    public List<MyRoomPostDTO> getMyRooms() {
        // Lấy userId từ JWT
        String userId = jwtService.getCurrentUserId();
        // Lấy tất cả phòng của user đó
        return roomRepository.findMyRooms(userId);
    }

    @Transactional
    public boolean deleteMyRoom(String roomId) {

        String ownerId = jwtService.getCurrentUserId();
        // Kiểm tra chủ phòng
        String roomOwnerId = roomRepository.getOwnerId(roomId);

        if (roomOwnerId == null || !roomOwnerId.equals(ownerId)) {
            return false;
        }

        // Lấy coordinates trước khi xóa room
        String coordinatesId = roomRepository.getCoordinatesId(roomId);
        // Xóa bảng liên quan
        favoriteRepository.deleteByRoomId(roomId);
        roomImageRepository.deleteByRoomId(roomId);
        amenityRepository.deleteByRoomId(roomId);
        // Xóa room
        roomRepository.deleteById(roomId);
        // Xóa coordinates
        if (coordinatesId != null) {
            coordinateRepository.deleteById(coordinatesId);
        }
        return true;
    }
}