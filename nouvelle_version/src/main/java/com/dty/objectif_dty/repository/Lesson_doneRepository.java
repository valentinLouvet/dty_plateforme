package com.dty.objectif_dty.repository;

import com.dty.objectif_dty.domain.Lesson_done;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the Lesson_done entity.
 */
@SuppressWarnings("unused")
public interface Lesson_doneRepository extends JpaRepository<Lesson_done,Long> {

    @Query("select distinct lesson_done from Lesson_done lesson_done left join fetch lesson_done.lessons")
    List<Lesson_done> findAllWithEagerRelationships();

    @Query("select lesson_done from Lesson_done lesson_done left join fetch lesson_done.lessons where lesson_done.id =:id")
    Lesson_done findOneWithEagerRelationships(@Param("id") Long id);

}
