package com.dty.objectif_dty.web.rest;

import com.dty.objectif_dty.ObjectifDtyApp;
import com.dty.objectif_dty.domain.Lesson_done;
import com.dty.objectif_dty.repository.Lesson_doneRepository;

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
 * Test class for the Lesson_doneResource REST controller.
 *
 * @see Lesson_doneResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = ObjectifDtyApp.class)
@WebAppConfiguration
@IntegrationTest
public class Lesson_doneResourceIntTest {


    private static final Integer DEFAULT_NOTE_INIT = 1;
    private static final Integer UPDATED_NOTE_INIT = 2;

    private static final Integer DEFAULT_NOTE_MAX = 1;
    private static final Integer UPDATED_NOTE_MAX = 2;

    @Inject
    private Lesson_doneRepository lesson_doneRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    private MockMvc restLesson_doneMockMvc;

    private Lesson_done lesson_done;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        Lesson_doneResource lesson_doneResource = new Lesson_doneResource();
        ReflectionTestUtils.setField(lesson_doneResource, "lesson_doneRepository", lesson_doneRepository);
        this.restLesson_doneMockMvc = MockMvcBuilders.standaloneSetup(lesson_doneResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        lesson_done = new Lesson_done();
        lesson_done.setNote_init(DEFAULT_NOTE_INIT);
        lesson_done.setNote_max(DEFAULT_NOTE_MAX);
    }

    @Test
    @Transactional
    public void createLesson_done() throws Exception {
        int databaseSizeBeforeCreate = lesson_doneRepository.findAll().size();

        // Create the Lesson_done

        restLesson_doneMockMvc.perform(post("/api/lesson-dones")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(lesson_done)))
                .andExpect(status().isCreated());

        // Validate the Lesson_done in the database
        List<Lesson_done> lesson_dones = lesson_doneRepository.findAll();
        assertThat(lesson_dones).hasSize(databaseSizeBeforeCreate + 1);
        Lesson_done testLesson_done = lesson_dones.get(lesson_dones.size() - 1);
        assertThat(testLesson_done.getNote_init()).isEqualTo(DEFAULT_NOTE_INIT);
        assertThat(testLesson_done.getNote_max()).isEqualTo(DEFAULT_NOTE_MAX);
    }

    @Test
    @Transactional
    public void getAllLesson_dones() throws Exception {
        // Initialize the database
        lesson_doneRepository.saveAndFlush(lesson_done);

        // Get all the lesson_dones
        restLesson_doneMockMvc.perform(get("/api/lesson-dones?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.[*].id").value(hasItem(lesson_done.getId().intValue())))
                .andExpect(jsonPath("$.[*].note_init").value(hasItem(DEFAULT_NOTE_INIT)))
                .andExpect(jsonPath("$.[*].note_max").value(hasItem(DEFAULT_NOTE_MAX)));
    }

    @Test
    @Transactional
    public void getLesson_done() throws Exception {
        // Initialize the database
        lesson_doneRepository.saveAndFlush(lesson_done);

        // Get the lesson_done
        restLesson_doneMockMvc.perform(get("/api/lesson-dones/{id}", lesson_done.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(lesson_done.getId().intValue()))
            .andExpect(jsonPath("$.note_init").value(DEFAULT_NOTE_INIT))
            .andExpect(jsonPath("$.note_max").value(DEFAULT_NOTE_MAX));
    }

    @Test
    @Transactional
    public void getNonExistingLesson_done() throws Exception {
        // Get the lesson_done
        restLesson_doneMockMvc.perform(get("/api/lesson-dones/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLesson_done() throws Exception {
        // Initialize the database
        lesson_doneRepository.saveAndFlush(lesson_done);
        int databaseSizeBeforeUpdate = lesson_doneRepository.findAll().size();

        // Update the lesson_done
        Lesson_done updatedLesson_done = new Lesson_done();
        updatedLesson_done.setId(lesson_done.getId());
        updatedLesson_done.setNote_init(UPDATED_NOTE_INIT);
        updatedLesson_done.setNote_max(UPDATED_NOTE_MAX);

        restLesson_doneMockMvc.perform(put("/api/lesson-dones")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(updatedLesson_done)))
                .andExpect(status().isOk());

        // Validate the Lesson_done in the database
        List<Lesson_done> lesson_dones = lesson_doneRepository.findAll();
        assertThat(lesson_dones).hasSize(databaseSizeBeforeUpdate);
        Lesson_done testLesson_done = lesson_dones.get(lesson_dones.size() - 1);
        assertThat(testLesson_done.getNote_init()).isEqualTo(UPDATED_NOTE_INIT);
        assertThat(testLesson_done.getNote_max()).isEqualTo(UPDATED_NOTE_MAX);
    }

    @Test
    @Transactional
    public void deleteLesson_done() throws Exception {
        // Initialize the database
        lesson_doneRepository.saveAndFlush(lesson_done);
        int databaseSizeBeforeDelete = lesson_doneRepository.findAll().size();

        // Get the lesson_done
        restLesson_doneMockMvc.perform(delete("/api/lesson-dones/{id}", lesson_done.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<Lesson_done> lesson_dones = lesson_doneRepository.findAll();
        assertThat(lesson_dones).hasSize(databaseSizeBeforeDelete - 1);
    }
}
