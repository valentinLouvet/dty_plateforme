package com.dty.objectif_dty.repository;

import com.dty.objectif_dty.domain.Lesson;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the Lesson entity.
 */
@SuppressWarnings("unused")
public interface LessonRepository extends JpaRepository<Lesson,Long> {

    //@Query("SELECT DISTINCT Num_lesson FROM Lesson WHERE Num_lesson = (SELECT MAX(Num_lesson) FROM Lesson WHERE Bloc_id = :id)")
    //Lesson findOneWithBlocId(@Param("id") Long id);

    //@Query("select max(l.num_lesson) from Lesson l where l.bloc.id = :id")
    //Integer findOneWithBlocId(@Param("id") Long id);

}
