package com.example.backend.controller;

import com.example.backend.dto.report.ReportRequestDTO;
import com.example.backend.service.Report.ReportServies;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/report")
@RequiredArgsConstructor
public class ReportController {

    private final ReportServies reportServices;

    @PostMapping
    public ResponseEntity<String> addReport(
            @RequestBody ReportRequestDTO request) {

        return reportServices.createReport(request);
    }

}