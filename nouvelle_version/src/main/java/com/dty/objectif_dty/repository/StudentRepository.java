package com.dty.objectif_dty.repository;

import com.dty.objectif_dty.domain.Student;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the Student entity.
 */
@SuppressWarnings("unused")
public interface StudentRepository extends JpaRepository<Student,Long> {

    @Query("select student from Student student where student.user.login = ?#{principal.username}")
    List<Student> findByUserIsCurrentUser();

    @Query("select distinct student from Student student left join fetch student.owned_badges")
    List<Student> findAllWithEagerRelationships();

    @Query("select student from Student student left join fetch student.owned_badges where student.id =:id")
    Student findOneWithEagerRelationships(@Param("id") Long id);

}
