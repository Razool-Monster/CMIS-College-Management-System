package com.cmis.cmis_backend.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MarkResponse {

    private Long id;
    private String studentName;
    private String studentEmail;
    private String subject;
    private int score;
}
