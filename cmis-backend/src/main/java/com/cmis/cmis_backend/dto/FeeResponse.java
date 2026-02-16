package com.cmis.cmis_backend.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FeeResponse {

    private Long id;
    private String studentName;
    private double amount;
    private String status;
}
