package com.example.backend.repository;

import com.example.backend.entity.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
// import java.util.Optional;

public interface FavoriteRepository extends JpaRepository<Favorite, String> {
        boolean existsByOwner_IdAndRoom_Id(String ownerId, String roomId);

        @Transactional
        @Modifying
        @Query("DELETE FROM Favorite f WHERE f.owner.id = :ownerId AND f.room.id = :roomId")
        int deleteByOwner_IdAndRoom_Id(
                        @Param("ownerId") String ownerId,
                        @Param("roomId") String roomId);

        @Query("""
                        SELECT f.room.id
                        FROM Favorite f
                        WHERE f.owner.id = :ownerId
                        """)
        List<String> findFavoriteRoomIds(@Param("ownerId") String ownerId);

        @Modifying
        @Transactional
        @Query("""
                        DELETE FROM Favorite f
                        WHERE f.room.id = :roomId
                        """)
        void deleteByRoomId(@Param("roomId") String roomId);
}