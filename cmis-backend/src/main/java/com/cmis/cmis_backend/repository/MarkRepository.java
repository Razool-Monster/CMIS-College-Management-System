package com.cmis.cmis_backend.repository;

import com.cmis.cmis_backend.model.Mark;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MarkRepository extends JpaRepository<Mark, Long> {
    List<Mark> findByStudentEmail(String studentEmail);
}
