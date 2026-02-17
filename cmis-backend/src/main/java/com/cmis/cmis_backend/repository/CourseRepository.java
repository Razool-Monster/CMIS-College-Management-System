package com.cmis.cmis_backend.repository;

import com.cmis.cmis_backend.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long> {
}
