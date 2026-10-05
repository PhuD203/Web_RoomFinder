package com.example.backend.repository;

import com.example.backend.dto.admin.AdminPostDTO;
import com.example.backend.dto.room.response.MyRoomPostDTO;
import com.example.backend.dto.room.response.RoomCartDTO;
import com.example.backend.dto.room.response.RoomInfoDTO;
import com.example.backend.dto.room.response.RoomTitleDTO;
import com.example.backend.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface RoomRepository extends JpaRepository<Room, String> {
    @Query("""
                SELECT new com.example.backend.dto.room.response.RoomCartDTO(
                    r.id,
                    r.title,
                    r.price,
                    r.area,
                    r.address,
                    ri.imageUrl
                )
                FROM Room r
                LEFT JOIN r.images ri
                    ON ri.imageIndex = 1
                  WHERE
                    r.status = 'approved'
                AND (:location IS NULL OR LOWER(r.address) LIKE LOWER(CONCAT('%', :location, '%')))
                AND (:minPrice IS NULL OR r.price >= :minPrice)
                AND (:maxPrice IS NULL OR r.price <= :maxPrice)
                AND (:minArea IS NULL OR r.area >= :minArea)
                AND (:maxArea IS NULL OR r.area <= :maxArea)
            """)
    List<RoomCartDTO> CardRooms(
            @Param("location") String location,
            @Param("minPrice") Integer minPrice,
            @Param("maxPrice") Integer maxPrice,
            @Param("minArea") Integer minArea,
            @Param("maxArea") Integer maxArea);

    @Query("""
                SELECT new com.example.backend.dto.room.response.RoomTitleDTO(
                    r.id,
                    r.title,
                    r.price,
                    r.area,
                    r.address,
                    r.description
                )
                FROM Room r
                WHERE r.id = :id
            """)
    RoomTitleDTO titleRoomID(
            @Param("id") String id);

    @Query("""
                SELECT new com.example.backend.dto.room.response.RoomInfoDTO(
                    r.type,
                    r.people,
                    r.furniture,
                    r.electricity,
                    r.water,
                    r.other
                )
                FROM Room r
                WHERE r.id = :id
            """)
    RoomInfoDTO InfoRoomID(
            @Param("id") String id);

    @Query("""
                SELECT r.coordinates.id
                FROM Room r
                WHERE r.id = :id
            """)
    String getCoordinatesId(@Param("id") String id);

    @Query("""
            SELECT r.owner.id
            FROM Room r
            WHERE r.id = :id
            """)
    String getOwnerId(@Param("id") String id);

    @Query("""
                SELECT new com.example.backend.dto.room.response.RoomCartDTO(
                    r.id,
                    r.title,
                    r.price,
                    r.area,
                    r.address,
                    ri.imageUrl
                )
                FROM Room r
                LEFT JOIN r.images ri
                    ON ri.imageIndex = 1
                LEFT JOIN Favorite f
                    ON f.room.id = r.id
                WHERE
                    r.status = 'approved'
                GROUP BY
                    r.id,
                    r.title,
                    r.price,
                    r.area,
                    r.address,
                    ri.imageUrl
                ORDER BY COUNT(f.id) DESC, r.id ASC
            """)
    List<RoomCartDTO> findFeaturedRooms();

    @Query(value = """
            SELECT
                r.id,
                r.title,
                r.price,
                r.area,
                r.address,
                ri.image_url
            FROM rooms r
            LEFT JOIN room_images ri
                ON ri.room_id = r.id
                AND ri.image_index = 1
            INNER JOIN favorites f
                ON f.room_id = r.id
            WHERE f.owner_id = :userId
            """, nativeQuery = true)
    List<RoomCartDTO> findFavoriteRooms(@Param("userId") String userId);

    @Query("""
                SELECT new com.example.backend.dto.room.response.MyRoomPostDTO(
                    r.id,
                    ri.imageUrl,
                    r.title,
                    r.area,
                    r.price,
                    r.status
                )
                FROM Room r
                LEFT JOIN r.images ri
                    ON ri.imageIndex = 1
                WHERE r.owner.id = :userId
                ORDER BY r.createdAt DESC
            """)
    List<MyRoomPostDTO> findMyRooms(
            @Param("userId") String userId);

    @Modifying
    @Transactional
    @Query("""
                DELETE FROM Room r
                WHERE r.id = :roomId
                AND r.owner.id = :ownerId
            """)
    int deleteMyRoom(
            @Param("roomId") String roomId,
            @Param("ownerId") String ownerId);

    @Query("""
                SELECT new com.example.backend.dto.admin.AdminPostDTO(
                    r.id,
                    rm.imageUrl,
                    r.title,
                    u.name,
                    r.price,
                    r.address,
                    r.createdAt
                )
                FROM Room r
                LEFT JOIN RoomImage rm
                    ON rm.room.id = r.id
                    AND rm.imageIndex = 1
                LEFT JOIN User u
                    ON u.id = r.owner.id
                WHERE r.status = :status
            """)
    List<AdminPostDTO> findPostsByStatus(@Param("status") String status);

}