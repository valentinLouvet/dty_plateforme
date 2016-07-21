package com.dty.objectif_dty.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dty.objectif_dty.domain.Lesson_done;
import com.dty.objectif_dty.repository.Lesson_doneRepository;
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
 * REST controller for managing Lesson_done.
 */
@RestController
@RequestMapping("/api")
public class Lesson_doneResource {

    private final Logger log = LoggerFactory.getLogger(Lesson_doneResource.class);
        
    @Inject
    private Lesson_doneRepository lesson_doneRepository;
    
    /**
     * POST  /lesson-dones : Create a new lesson_done.
     *
     * @param lesson_done the lesson_done to create
     * @return the ResponseEntity with status 201 (Created) and with body the new lesson_done, or with status 400 (Bad Request) if the lesson_done has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/lesson-dones",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Lesson_done> createLesson_done(@RequestBody Lesson_done lesson_done) throws URISyntaxException {
        log.debug("REST request to save Lesson_done : {}", lesson_done);
        if (lesson_done.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("lesson_done", "idexists", "A new lesson_done cannot already have an ID")).body(null);
        }
        Lesson_done result = lesson_doneRepository.save(lesson_done);
        return ResponseEntity.created(new URI("/api/lesson-dones/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("lesson_done", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /lesson-dones : Updates an existing lesson_done.
     *
     * @param lesson_done the lesson_done to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated lesson_done,
     * or with status 400 (Bad Request) if the lesson_done is not valid,
     * or with status 500 (Internal Server Error) if the lesson_done couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/lesson-dones",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Lesson_done> updateLesson_done(@RequestBody Lesson_done lesson_done) throws URISyntaxException {
        log.debug("REST request to update Lesson_done : {}", lesson_done);
        if (lesson_done.getId() == null) {
            return createLesson_done(lesson_done);
        }
        Lesson_done result = lesson_doneRepository.save(lesson_done);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("lesson_done", lesson_done.getId().toString()))
            .body(result);
    }

    /**
     * GET  /lesson-dones : get all the lesson_dones.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of lesson_dones in body
     * @throws URISyntaxException if there is an error to generate the pagination HTTP headers
     */
    @RequestMapping(value = "/lesson-dones",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<List<Lesson_done>> getAllLesson_dones(Pageable pageable)
        throws URISyntaxException {
        log.debug("REST request to get a page of Lesson_dones");
        Page<Lesson_done> page = lesson_doneRepository.findAll(pageable); 
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/lesson-dones");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /lesson-dones/:id : get the "id" lesson_done.
     *
     * @param id the id of the lesson_done to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the lesson_done, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/lesson-dones/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Lesson_done> getLesson_done(@PathVariable Long id) {
        log.debug("REST request to get Lesson_done : {}", id);
        Lesson_done lesson_done = lesson_doneRepository.findOneWithEagerRelationships(id);
        return Optional.ofNullable(lesson_done)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /lesson-dones/:id : delete the "id" lesson_done.
     *
     * @param id the id of the lesson_done to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/lesson-dones/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteLesson_done(@PathVariable Long id) {
        log.debug("REST request to delete Lesson_done : {}", id);
        lesson_doneRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("lesson_done", id.toString())).build();
    }

}
