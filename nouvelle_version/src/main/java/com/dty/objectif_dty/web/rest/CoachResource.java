package com.dty.objectif_dty.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dty.objectif_dty.domain.Coach;
import com.dty.objectif_dty.repository.CoachRepository;
import com.dty.objectif_dty.web.rest.util.HeaderUtil;
import com.dty.objectif_dty.web.rest.util.PaginationUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Coach.
 */
@RestController
@RequestMapping("/api")
public class CoachResource {

    private final Logger log = LoggerFactory.getLogger(CoachResource.class);
        
    @Inject
    private CoachRepository coachRepository;
    
    /**
     * POST  /coaches : Create a new coach.
     *
     * @param coach the coach to create
     * @return the ResponseEntity with status 201 (Created) and with body the new coach, or with status 400 (Bad Request) if the coach has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/coaches",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Coach> createCoach(@RequestBody Coach coach) throws URISyntaxException {
        log.debug("REST request to save Coach : {}", coach);
        if (coach.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("coach", "idexists", "A new coach cannot already have an ID")).body(null);
        }
        Coach result = coachRepository.save(coach);
        return ResponseEntity.created(new URI("/api/coaches/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("coach", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /coaches : Updates an existing coach.
     *
     * @param coach the coach to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated coach,
     * or with status 400 (Bad Request) if the coach is not valid,
     * or with status 500 (Internal Server Error) if the coach couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/coaches",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Coach> updateCoach(@RequestBody Coach coach) throws URISyntaxException {
        log.debug("REST request to update Coach : {}", coach);
        if (coach.getId() == null) {
            return createCoach(coach);
        }
        Coach result = coachRepository.save(coach);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("coach", coach.getId().toString()))
            .body(result);
    }

    /**
     * GET  /coaches : get all the coaches.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of coaches in body
     * @throws URISyntaxException if there is an error to generate the pagination HTTP headers
     */
    @RequestMapping(value = "/coaches",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<List<Coach>> getAllCoaches(Pageable pageable)
        throws URISyntaxException {
        log.debug("REST request to get a page of Coaches");
        Page<Coach> page = coachRepository.findAll(pageable); 
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/coaches");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /coaches/:id : get the "id" coach.
     *
     * @param id the id of the coach to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the coach, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/coaches/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Coach> getCoach(@PathVariable Long id) {
        log.debug("REST request to get Coach : {}", id);
        Coach coach = coachRepository.findOne(id);
        return Optional.ofNullable(coach)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /coaches/:id : delete the "id" coach.
     *
     * @param id the id of the coach to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/coaches/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteCoach(@PathVariable Long id) {
        log.debug("REST request to delete Coach : {}", id);
        coachRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("coach", id.toString())).build();
    }

}
