package com.example.backend.repository;

import com.example.backend.entity.RoomImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

public interface RoomImageRepository extends JpaRepository<RoomImage, String> {
    List<RoomImage> findByRoom_IdAndImageIndexIn(
            String roomId,
            List<Integer> imageIndexes);

    List<RoomImage> findByRoom_IdOrderByImageIndexAsc(String roomId);

    @Query("""
                SELECT r.imageUrl
                FROM RoomImage r
                WHERE r.room.id = :roomId
                ORDER BY r.imageUrl ASC
            """)
    List<String> getPicturesByRoomId(
            @Param("roomId") String roomId);

    @Modifying
    @Transactional
    @Query("""
                DELETE FROM RoomImage ri
                WHERE ri.room.id = :roomId
            """)
    void deleteByRoomId(@Param("roomId") String roomId);
}