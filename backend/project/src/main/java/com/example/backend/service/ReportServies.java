package com.example.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import com.example.backend.dto.ReportRequestDTO;
import com.example.backend.dto.ReportResponseDTO;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.example.backend.entity.Report;
import com.example.backend.entity.Room;
import com.example.backend.repository.ReportRepository;
import com.example.backend.repository.RoomRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.security.JwtService;

import jakarta.transaction.Transactional;

import com.example.backend.entity.User;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReportServies {

    private final ReportRepository reportRepository;
    private final UserRepository userRepository;
    private final RoomRepository roomRepository;
    private final JwtService jwtService;

    public ResponseEntity<String> createReport(ReportRequestDTO request) {
        try {
            String userId = jwtService.getCurrentUserId();

            User owner = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));

            if (request.getReason() == null
                    || request.getReason().isBlank()) {

                return ResponseEntity
                        .badRequest()
                        .body("Lý do không được để trống");
            }

            Report report = new Report();

            report.setOwner(owner);
            report.setTargetType(request.getTargetType());
            report.setTargetId(request.getTargetId());
            report.setReason(request.getReason());
            report.setCreatedAt(LocalDateTime.now());
            report.setStatus("pending");

            reportRepository.save(report);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body("Gửi báo cáo thành công");

        } catch (Exception e) {

            return ResponseEntity
                    .badRequest()
                    .body("Gửi báo cáo thất bại: " + e.getMessage());
        }
    }

    public List<ReportResponseDTO> getReports() {
        List<ReportResponseDTO> reports = reportRepository.getReports();

        return reports.stream()
                .filter(report -> {
                    if ("orther".equals(report.getTarget_type())) {
                        return true;
                    }

                    if ("account".equals(report.getTarget_type())) {
                        return userRepository.findById(report.getTarget()).isPresent();
                    }

                    return roomRepository.findById(report.getTarget()).isPresent();
                })
                .map(report -> {

                    String target = report.getTarget();

                    if ("orther".equals(report.getTarget_type())) {
                        target = "Hệ thống";

                    } else if ("account".equals(report.getTarget_type())) {
                        target = userRepository
                                .findById(report.getTarget())
                                .map(User::getName)
                                .orElse(null);

                    } else {
                        target = roomRepository
                                .findById(report.getTarget())
                                .map(Room::getTitle)
                                .orElse(null);
                    }

                    return new ReportResponseDTO(
                            report.getId(),
                            report.getIDtarget(),
                            report.getReporter(),
                            target,
                            report.getReason(),
                            report.getTarget_type(),
                            report.getCreated_at(),
                            report.getStatus());
                })
                .toList();
    }

    @Transactional
    public String updateReport(String id) {
        try {
            int updated = reportRepository.updateReportStatus(id);
            if (updated == 0) {
                return "Không tìm thấy report";
            }
            return "Đã duyệt report thành công";
        } catch (Exception e) {
            System.err.println("Lỗi khi cập nhật report: " + e.getMessage());
            return "Có lỗi xảy ra khi cập nhật report";
        }
    }
}
