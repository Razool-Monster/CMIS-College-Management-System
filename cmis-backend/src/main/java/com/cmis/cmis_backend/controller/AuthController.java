package com.cmis.cmis_backend.controller;

import com.cmis.cmis_backend.dto.AuthRequest;
import com.cmis.cmis_backend.dto.AuthResponse;
import com.cmis.cmis_backend.model.Role;
import com.cmis.cmis_backend.model.User;
import com.cmis.cmis_backend.repository.UserRepository;
import com.cmis.cmis_backend.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    // 🔹 REGISTER
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AuthRequest request) {

        if (request.getName() == null ||
            request.getEmail() == null ||
            request.getPassword() == null ||
            request.getRegisterNumber() == null ||
            request.getCourse() == null) {

            return ResponseEntity.badRequest().body("All fields are required");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .registerNumber(request.getRegisterNumber())
                .course(request.getCourse())
                .role(Role.STUDENT)
                .build();

        userRepository.save(user);

        return ResponseEntity.ok("Student registered successfully");
    }

    // 🔹 LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElse(null);

        if (user == null ||
            !passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return ResponseEntity.badRequest().body("Invalid email or password");
        }

        String token = jwtService.generateToken(
                user.getEmail(),
                user.getRole().name()
        );

       AuthResponse response = AuthResponse.builder()
        .token(token)
        .email(user.getEmail())
        .name(user.getName())
        .role(user.getRole().name())
        .registerNumber(user.getRegisterNumber())   // NEW
        .course(user.getCourse())                   // NEW
        .build();


        return ResponseEntity.ok(response);
    }
}
