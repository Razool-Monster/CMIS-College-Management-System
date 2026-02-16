package com.cmis.cmis_backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "fees")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Fee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String studentEmail;

    private double amount;

    private String status;
}
