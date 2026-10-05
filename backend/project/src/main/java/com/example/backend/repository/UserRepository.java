package com.example.backend.repository;

import java.util.List;
import java.util.Optional;

import com.example.backend.dto.admin.AdminUserListDTO;
import com.example.backend.dto.user.OwnerDTO;
import com.example.backend.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, String> {

    Optional<User> findByEmail(String email);

    @Query("""
                SELECT new com.example.backend.dto.user.OwnerDTO(
                    r.id,
                    r.name,
                    r.phone,
                    r.avatar
                )
                FROM User r
                WHERE r.id = :id
            """)
    OwnerDTO getUser(
            @Param("id") String id);

    @Query(value = """
                SELECT
                    u.name,
                    u.email,
                    u.phone,
                    u.joined_at,
                    u.status,
                    u.avatar,
                    COUNT(DISTINCT r.id) AS postCount,
                    COUNT(DISTINCT f.id) AS favoriteCount,
                    COUNT(DISTINCT rp.id) AS reportCount
                FROM users u
                LEFT JOIN rooms r
                    ON r.owner_id = u.id
                LEFT JOIN favorites f
                    ON f.owner_id = u.id
                LEFT JOIN reports rp
                    ON rp.owner_id = u.id
                WHERE u.id = :userId
                GROUP BY
                    u.id,
                    u.name,
                    u.email,
                    u.phone,
                    u.joined_at,
                    u.status,
                    u.avatar
            """, nativeQuery = true)
    List<Object[]> getUserWithCount(
            @Param("userId") String userId);

    @Query(value = """
            SELECT
                u.id AS id,
                u.name AS name,
                u.email AS email,
                u.phone AS phone,
                DATE_FORMAT(u.joined_at, '%d/%m/%Y') AS joinedAt,
                u.avatar AS avatar,
                u.status AS status,
                COUNT(DISTINCT r.id) AS postCount,
                COUNT(DISTINCT f.id) AS favoriteCount
            FROM users u
            LEFT JOIN rooms r
                ON r.owner_id = u.id
            LEFT JOIN favorites f
                ON f.owner_id = u.id
            GROUP BY
                u.id,
                u.name,
                u.email,
                u.phone,
                u.joined_at,
                u.status,
                u.avatar
            """, nativeQuery = true)
    List<AdminUserListDTO> getListUser_Amin();

    @Query(value = """
            SELECT
                u.id AS id,
                u.name AS name,
                u.email AS email,
                u.phone AS phone,
                DATE_FORMAT(u.joined_at, '%d/%m/%Y') AS joinedAt,
                u.avatar AS avatar,
                u.status AS status,
                COUNT(DISTINCT r.id) AS postCount,
                COUNT(DISTINCT f.id) AS favoriteCount
            FROM users u
            LEFT JOIN rooms r
                ON r.owner_id = u.id
            LEFT JOIN favorites f
                ON f.owner_id = u.id
            WHERE u.id = :id
            GROUP BY
                u.id,
                u.name,
                u.email,
                u.phone,
                u.joined_at,
                u.status,
                u.avatar
            """, nativeQuery = true)
    AdminUserListDTO getUser_Report(@Param("id") String id);
}
