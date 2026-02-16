package com.cmis.cmis_backend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuthRequest {

    private String name;
    private String email;
    private String password;
    private String registerNumber;
    private String course;
}
