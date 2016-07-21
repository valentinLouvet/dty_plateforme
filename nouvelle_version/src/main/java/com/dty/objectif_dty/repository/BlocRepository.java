package com.dty.objectif_dty.repository;

import com.dty.objectif_dty.domain.Bloc;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Bloc entity.
 */
@SuppressWarnings("unused")
public interface BlocRepository extends JpaRepository<Bloc,Long> {

}
