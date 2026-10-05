package com.example.backend.dto.report;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ReportResponseDTO {

    private String id;
    private String IDtarget;
    private String reporter;
    private String target;
    private String reason;
    private String target_type;
    private String created_at;
    private String status;
}
