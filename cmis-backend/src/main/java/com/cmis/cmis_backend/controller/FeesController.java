package com.cmis.cmis_backend.controller;

import com.cmis.cmis_backend.dto.FeeResponse;
import com.cmis.cmis_backend.model.Fee;
import com.cmis.cmis_backend.model.User;
import com.cmis.cmis_backend.repository.FeeRepository;
import com.cmis.cmis_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fees")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class FeesController {

    private final FeeRepository feeRepository;
    private final UserRepository userRepository;

    // 🔹 GET FEES (ROLE BASED + SHOW STUDENT NAME)
    @GetMapping
    public ResponseEntity<List<FeeResponse>> getFees(Authentication authentication) {

        String email = authentication.getName();

        boolean isStudent = authentication.getAuthorities()
                .stream()
                .anyMatch(role -> role.getAuthority().equals("ROLE_STUDENT"));

        List<Fee> fees;

        if (isStudent) {
            fees = feeRepository.findByStudentEmail(email);
        } else {
            fees = feeRepository.findAll();
        }

        List<FeeResponse> response = fees.stream().map(fee -> {

            User student = userRepository.findByEmail(fee.getStudentEmail())
                    .orElse(null);

            return FeeResponse.builder()
                    .id(fee.getId())
                    .studentName(student != null ? student.getName() : "Unknown")
                    .amount(fee.getAmount())
                    .status(fee.getStatus())
                    .build();

        }).toList();

        return ResponseEntity.ok(response);
    }

    // 🔹 ADD FEE (ADMIN ONLY - secured in SecurityConfig)
    @PostMapping
    public ResponseEntity<Fee> addFee(@RequestBody Fee fee) {
        return ResponseEntity.ok(feeRepository.save(fee));
    }

    // 🔹 UPDATE FEE (ADMIN ONLY)
    @PutMapping("/{id}")
    public ResponseEntity<Fee> updateFee(@PathVariable Long id,
                                         @RequestBody Fee updatedFee) {

        Fee existingFee = feeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Fee not found"));

        existingFee.setStudentEmail(updatedFee.getStudentEmail());
        existingFee.setAmount(updatedFee.getAmount());
        existingFee.setStatus(updatedFee.getStatus());

        return ResponseEntity.ok(feeRepository.save(existingFee));
    }

    // 🔹 DELETE FEE (ADMIN ONLY)
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFee(@PathVariable Long id) {

        if (!feeRepository.existsById(id)) {
            throw new RuntimeException("Fee not found");
        }

        feeRepository.deleteById(id);

        return ResponseEntity.ok("Fee deleted successfully");
    }
}
