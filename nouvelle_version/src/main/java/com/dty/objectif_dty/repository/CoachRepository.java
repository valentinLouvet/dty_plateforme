package com.dty.objectif_dty.repository;

import com.dty.objectif_dty.domain.Coach;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Coach entity.
 */
@SuppressWarnings("unused")
public interface CoachRepository extends JpaRepository<Coach,Long> {

    @Query("select coach from Coach coach where coach.user.login = ?#{principal.username}")
    List<Coach> findByUserIsCurrentUser();

}
