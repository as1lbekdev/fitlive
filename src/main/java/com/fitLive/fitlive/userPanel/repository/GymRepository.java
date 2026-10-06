package com.fitLive.fitlive.userPanel.repository;

import com.fitLive.fitlive.userPanel.model.Gym;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GymRepository extends JpaRepository<Gym, Long> {
    boolean existsByNameIgnoreCaseAndLocationIgnoreCase(String name, String location);
}
