package com.example.backend.repository;

import com.example.backend.entity.Amenity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
// import java.util.Optional;

public interface AmenityRepository extends JpaRepository<Amenity, String> {
    void deleteByRoom_Id(String roomId);

    @Query("""
               SELECT a.name
                FROM Amenity a
                WHERE a.room.id = :roomId
            """)
    List<String> getAmenitiesByRoomId(
            @Param("roomId") String roomId);

    @Modifying
    @Transactional
    @Query("""
                DELETE FROM Amenity a
                WHERE a.room.id = :roomId
            """)
    void deleteByRoomId(@Param("roomId") String roomId);
}