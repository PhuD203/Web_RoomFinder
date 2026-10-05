package com.example.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.admin.AdminPostDTO;
import com.example.backend.dto.admin.AdminUserListDTO;
import com.example.backend.dto.report.ReportResponseDTO;
import com.example.backend.service.Admin.AdminPostServies;
import com.example.backend.service.Admin.AdminUserServies;
import com.example.backend.service.Report.ReportServies;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminUserServies userservies;
    private final AdminPostServies postservies;
    private final ReportServies reportServies;

    // Query 1: Lấy danh sách phòng
    @GetMapping("/getUser")
    public List<AdminUserListDTO> getListUser_Admin() {
        return userservies.getListUser_Amin();
    }

    @GetMapping("/getUserReport")
    public AdminUserListDTO getUser_Report(@RequestParam String id) {
        return userservies.getUser_Report(id);
    }

    @PutMapping("/change_status/{userId}")
    public ResponseEntity<String> changeStatusUser(
            @PathVariable String userId,
            @RequestParam String status) {
        String result = userservies.changeStatusUser_Admin(userId, status);

        if (result.equals("Đổi trạng thái thành công")) {
            return ResponseEntity.ok(result);
        }

        return ResponseEntity.badRequest().body(result);
    }

    @GetMapping("/getPost")
    public List<AdminPostDTO> getPosts(
            @RequestParam String status) {
        return postservies.getPostsByStatus(status);
    }

    @GetMapping("/getReport")
    public List<ReportResponseDTO> getReports() {
        return reportServies.getReports();
    }

    @PutMapping("/updateReport/{id}")
    public ResponseEntity<String> updateReport(@PathVariable String id) {

        String result = reportServies.updateReport(id);

        if ("Không tìm thấy report".equals(result)) {
            return ResponseEntity.notFound().build();
        }

        if ("Có lỗi xảy ra khi cập nhật report".equals(result)) {
            return ResponseEntity.internalServerError().body(result);
        }

        return ResponseEntity.ok(result);
    }

}
