package com.example.backend.repository;

import com.example.backend.dto.report.ReportResponseDTO;
import com.example.backend.entity.Report;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
// import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

// import java.util.Optional;

public interface ReportRepository extends JpaRepository<Report, String> {

    @Query(value = """
            SELECT
                rp.id,
                rp.target_id,
                u.name,
                rp.target_id AS target,
                rp.reason,
                rp.target_type,
                DATE_FORMAT(rp.created_at, '%d/%m/%Y') AS created_at,
                rp.status
            FROM reports rp
            LEFT JOIN users u
                ON u.id = rp.owner_id
            """, nativeQuery = true)
    List<ReportResponseDTO> getReports();

    @Modifying
    @Query("""
                UPDATE Report  r
                SET r.status = 'approved'
                WHERE r.id = :id
            """)
    int updateReportStatus(@Param("id") String id);
}