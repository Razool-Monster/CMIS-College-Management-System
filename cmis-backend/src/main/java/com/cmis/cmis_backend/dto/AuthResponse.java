package com.cmis.cmis_backend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponse {

    private String token;
    private String email;
    private String name;
    private String role;

    private String registerNumber;  // NEW
    private String course;          // NEW
}
