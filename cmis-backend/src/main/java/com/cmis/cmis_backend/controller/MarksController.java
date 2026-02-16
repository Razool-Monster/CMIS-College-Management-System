package com.cmis.cmis_backend.controller;

import com.cmis.cmis_backend.dto.MarkResponse;
import com.cmis.cmis_backend.model.Mark;
import com.cmis.cmis_backend.model.User;
import com.cmis.cmis_backend.repository.MarkRepository;
import com.cmis.cmis_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/marks")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class MarksController {

    private final MarkRepository markRepository;
    private final UserRepository userRepository;

    // 🔹 GET MARKS (ROLE BASED + SHOW STUDENT NAME)
    @GetMapping
    public ResponseEntity<List<MarkResponse>> getMarks(Authentication authentication) {

        String email = authentication.getName();

        boolean isStudent = authentication.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .anyMatch(role -> role.equals("ROLE_STUDENT"));

        List<Mark> marks;

        if (isStudent) {
            marks = markRepository.findByStudentEmail(email);
        } else {
            marks = markRepository.findAll();
        }

        List<MarkResponse> response = marks.stream().map(mark -> {

            User student = userRepository.findByEmail(mark.getStudentEmail())
                    .orElse(null);

            return MarkResponse.builder()
                    .id(mark.getId())
                    .studentName(student != null ? student.getName() : "Unknown")
                    .studentEmail(mark.getStudentEmail())
                    .subject(mark.getSubject())
                    .score(mark.getScore())
                    .build();

        }).collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }

    // 🔹 ADD MARK
    @PostMapping
    public ResponseEntity<Mark> addMark(@RequestBody Mark mark) {
        return ResponseEntity.ok(markRepository.save(mark));
    }

    // 🔹 UPDATE MARK
    @PutMapping("/{id}")
    public ResponseEntity<Mark> updateMark(@PathVariable Long id,
                                           @RequestBody Mark updatedMark) {

        Mark existingMark = markRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mark not found"));

        existingMark.setStudentEmail(updatedMark.getStudentEmail());
        existingMark.setSubject(updatedMark.getSubject());
        existingMark.setScore(updatedMark.getScore());

        return ResponseEntity.ok(markRepository.save(existingMark));
    }

    // 🔹 DELETE MARK
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMark(@PathVariable Long id) {

        if (!markRepository.existsById(id)) {
            throw new RuntimeException("Mark not found");
        }

        markRepository.deleteById(id);

        return ResponseEntity.ok("Mark deleted successfully");
    }
}
