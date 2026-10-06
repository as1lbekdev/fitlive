package com.fitLive.fitlive.userPanel.repository;

import com.fitLive.fitlive.userPanel.model.Partner;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PartnerRepository extends JpaRepository<Partner, Long> {
    boolean existsByNameIgnoreCase(String name);

}
