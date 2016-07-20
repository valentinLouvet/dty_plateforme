package com.dty.objectif_dty.repository;

import com.dty.objectif_dty.domain.Badge;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Badge entity.
 */
@SuppressWarnings("unused")
public interface BadgeRepository extends JpaRepository<Badge,Long> {

}
