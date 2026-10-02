package com.example.backend.repository;

import com.example.backend.dto.CoordinatesDTO;
import com.example.backend.entity.Coordinate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CoordinateRepository extends JpaRepository<Coordinate, String> {

    @Query("""
                SELECT new com.example.backend.dto.CoordinatesDTO(
                    c.latitude,
                    c.longitude
                )
                FROM Coordinate c
                WHERE c.id = :id
            """)
    CoordinatesDTO getCoordinatesById(
            @Param("id") String id);
}