package com.example.backend.service;

import com.example.backend.entity.Favorite;
import com.example.backend.entity.Room;
import com.example.backend.entity.User;
import com.example.backend.repository.FavoriteRepository;
import com.example.backend.security.JwtService;
import org.springframework.stereotype.Service;
import com.example.backend.repository.UserRepository;
import com.example.backend.repository.RoomRepository;
import java.util.List;

@Service
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final RoomRepository roomRepository;

    public FavoriteService(
            FavoriteRepository favoriteRepository,
            JwtService jwtService,
            UserRepository userRepository,
            RoomRepository roomRepository) {
        this.favoriteRepository = favoriteRepository;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.roomRepository = roomRepository;
    }

    // Kiểm tra user hiện tại đã favorite phòng chưa
    public boolean checkFavorite(String roomId) {
        try {
            String ownerId = jwtService.getCurrentUserId();

            return favoriteRepository.existsByOwner_IdAndRoom_Id(
                    ownerId,
                    roomId);
        } catch (Exception e) {
            return false;
        }
    }

    // Thêm favorite
    public boolean addFavorite(String roomId) {
        try {
            String ownerId = jwtService.getCurrentUserId();

            // Đã tồn tại thì không thêm
            if (favoriteRepository.existsByOwner_IdAndRoom_Id(ownerId, roomId)) {
                return false;
            }

            User owner = userRepository.findById(ownerId)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy user"));

            Room room = roomRepository.findById(roomId)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy phòng"));

            Favorite favorite = new Favorite();
            favorite.setOwner(owner);
            favorite.setRoom(room);

            favoriteRepository.save(favorite);

            return true;

        } catch (Exception e) {
            return false;
        }
    }

    // Xóa favorite
    public boolean deleteFavorite(String roomId) {

        try {
            String ownerId = jwtService.getCurrentUserId();

            int deleted = favoriteRepository.deleteByOwner_IdAndRoom_Id(
                    ownerId,
                    roomId);

            return deleted > 0;

        } catch (Exception e) {
            return false;
        }
    }

    public List<String> getListFavorite() {
        try {
            String ownerId = jwtService.getCurrentUserId();

            return favoriteRepository.findFavoriteRoomIds(ownerId);

        } catch (Exception e) {
            return List.of();
        }
    }

}