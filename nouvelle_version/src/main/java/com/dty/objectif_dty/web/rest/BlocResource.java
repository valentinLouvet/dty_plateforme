package com.dty.objectif_dty.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.dty.objectif_dty.domain.Bloc;
import com.dty.objectif_dty.repository.BlocRepository;
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
 * REST controller for managing Bloc.
 */
@RestController
@RequestMapping("/api")
public class BlocResource {

    private final Logger log = LoggerFactory.getLogger(BlocResource.class);
        
    @Inject
    private BlocRepository blocRepository;
    
    /**
     * POST  /blocs : Create a new bloc.
     *
     * @param bloc the bloc to create
     * @return the ResponseEntity with status 201 (Created) and with body the new bloc, or with status 400 (Bad Request) if the bloc has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/blocs",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Bloc> createBloc(@RequestBody Bloc bloc) throws URISyntaxException {
        log.debug("REST request to save Bloc : {}", bloc);
        if (bloc.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("bloc", "idexists", "A new bloc cannot already have an ID")).body(null);
        }
        Bloc result = blocRepository.save(bloc);
        return ResponseEntity.created(new URI("/api/blocs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("bloc", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /blocs : Updates an existing bloc.
     *
     * @param bloc the bloc to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated bloc,
     * or with status 400 (Bad Request) if the bloc is not valid,
     * or with status 500 (Internal Server Error) if the bloc couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @RequestMapping(value = "/blocs",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Bloc> updateBloc(@RequestBody Bloc bloc) throws URISyntaxException {
        log.debug("REST request to update Bloc : {}", bloc);
        if (bloc.getId() == null) {
            return createBloc(bloc);
        }
        Bloc result = blocRepository.save(bloc);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("bloc", bloc.getId().toString()))
            .body(result);
    }

    /**
     * GET  /blocs : get all the blocs.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of blocs in body
     * @throws URISyntaxException if there is an error to generate the pagination HTTP headers
     */
    @RequestMapping(value = "/blocs",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<List<Bloc>> getAllBlocs(Pageable pageable)
        throws URISyntaxException {
        log.debug("REST request to get a page of Blocs");
        Page<Bloc> page = blocRepository.findAll(pageable); 
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/blocs");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /blocs/:id : get the "id" bloc.
     *
     * @param id the id of the bloc to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the bloc, or with status 404 (Not Found)
     */
    @RequestMapping(value = "/blocs/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Bloc> getBloc(@PathVariable Long id) {
        log.debug("REST request to get Bloc : {}", id);
        Bloc bloc = blocRepository.findOne(id);
        return Optional.ofNullable(bloc)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /blocs/:id : delete the "id" bloc.
     *
     * @param id the id of the bloc to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @RequestMapping(value = "/blocs/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteBloc(@PathVariable Long id) {
        log.debug("REST request to delete Bloc : {}", id);
        blocRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("bloc", id.toString())).build();
    }

}
