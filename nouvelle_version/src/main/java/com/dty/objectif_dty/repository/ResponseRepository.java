package com.dty.objectif_dty.repository;

import com.dty.objectif_dty.domain.Response;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Response entity.
 */
@SuppressWarnings("unused")
public interface ResponseRepository extends JpaRepository<Response,Long> {

}
