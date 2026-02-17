package com.cmis.cmis_backend.controller;

import com.cmis.cmis_backend.model.Course;
import com.cmis.cmis_backend.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CourseController {

    private final CourseRepository courseRepository;

    // GET ALL COURSES
    @GetMapping
    public List<Course> getCourses() {
        return courseRepository.findAll();
    }

    // ADD COURSE (Admin Only - secured in SecurityConfig)
    @PostMapping
    public Course addCourse(@RequestBody Course course) {
        return courseRepository.save(course);
    }

    // DELETE COURSE (Admin Only)
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCourse(@PathVariable Long id) {
        courseRepository.deleteById(id);
        return ResponseEntity.ok("Course deleted");
    }
}
