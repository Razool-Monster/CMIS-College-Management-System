package com.cmis.cmis_backend.repository;

import com.cmis.cmis_backend.model.Fee;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FeeRepository extends JpaRepository<Fee, Long> {
    List<Fee> findByStudentEmail(String studentEmail);
}
