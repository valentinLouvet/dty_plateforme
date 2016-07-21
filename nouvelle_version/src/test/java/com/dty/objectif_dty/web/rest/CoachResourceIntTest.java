package com.dty.objectif_dty.web.rest;

import com.dty.objectif_dty.ObjectifDtyApp;
import com.dty.objectif_dty.domain.Coach;
import com.dty.objectif_dty.repository.CoachRepository;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import static org.hamcrest.Matchers.hasItem;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


/**
 * Test class for the CoachResource REST controller.
 *
 * @see CoachResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = ObjectifDtyApp.class)
@WebAppConfiguration
@IntegrationTest
public class CoachResourceIntTest {


    @Inject
    private CoachRepository coachRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    private MockMvc restCoachMockMvc;

    private Coach coach;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        CoachResource coachResource = new CoachResource();
        ReflectionTestUtils.setField(coachResource, "coachRepository", coachRepository);
        this.restCoachMockMvc = MockMvcBuilders.standaloneSetup(coachResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        coach = new Coach();
    }

    @Test
    @Transactional
    public void createCoach() throws Exception {
        int databaseSizeBeforeCreate = coachRepository.findAll().size();

        // Create the Coach

        restCoachMockMvc.perform(post("/api/coaches")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(coach)))
                .andExpect(status().isCreated());

        // Validate the Coach in the database
        List<Coach> coaches = coachRepository.findAll();
        assertThat(coaches).hasSize(databaseSizeBeforeCreate + 1);
        Coach testCoach = coaches.get(coaches.size() - 1);
    }

    @Test
    @Transactional
    public void getAllCoaches() throws Exception {
        // Initialize the database
        coachRepository.saveAndFlush(coach);

        // Get all the coaches
        restCoachMockMvc.perform(get("/api/coaches?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.[*].id").value(hasItem(coach.getId().intValue())));
    }

    @Test
    @Transactional
    public void getCoach() throws Exception {
        // Initialize the database
        coachRepository.saveAndFlush(coach);

        // Get the coach
        restCoachMockMvc.perform(get("/api/coaches/{id}", coach.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(coach.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingCoach() throws Exception {
        // Get the coach
        restCoachMockMvc.perform(get("/api/coaches/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCoach() throws Exception {
        // Initialize the database
        coachRepository.saveAndFlush(coach);
        int databaseSizeBeforeUpdate = coachRepository.findAll().size();

        // Update the coach
        Coach updatedCoach = new Coach();
        updatedCoach.setId(coach.getId());

        restCoachMockMvc.perform(put("/api/coaches")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(updatedCoach)))
                .andExpect(status().isOk());

        // Validate the Coach in the database
        List<Coach> coaches = coachRepository.findAll();
        assertThat(coaches).hasSize(databaseSizeBeforeUpdate);
        Coach testCoach = coaches.get(coaches.size() - 1);
    }

    @Test
    @Transactional
    public void deleteCoach() throws Exception {
        // Initialize the database
        coachRepository.saveAndFlush(coach);
        int databaseSizeBeforeDelete = coachRepository.findAll().size();

        // Get the coach
        restCoachMockMvc.perform(delete("/api/coaches/{id}", coach.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<Coach> coaches = coachRepository.findAll();
        assertThat(coaches).hasSize(databaseSizeBeforeDelete - 1);
    }
}
