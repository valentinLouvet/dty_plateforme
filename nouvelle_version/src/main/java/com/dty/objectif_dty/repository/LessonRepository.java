package com.dty.objectif_dty.repository;

import com.dty.objectif_dty.domain.Lesson;

import com.dty.objectif_dty.domain.Lesson_done;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the Lesson entity.
 */
@SuppressWarnings("unused")
public interface LessonRepository extends JpaRepository<Lesson,Long> {

    //@Query("SELECT DISTINCT NUM_LESSON FROM LESSON WHERE NUM_LESSON=(SELECT max(NUM_LESSON) FROM LESSON WHERE BLOC_ID = id)")
    //Lesson findOneWithBlocId(@Param("id") Long id);

}
