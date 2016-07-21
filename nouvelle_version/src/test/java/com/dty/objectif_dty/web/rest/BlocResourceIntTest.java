package com.dty.objectif_dty.web.rest;

import com.dty.objectif_dty.ObjectifDtyApp;
import com.dty.objectif_dty.domain.Bloc;
import com.dty.objectif_dty.repository.BlocRepository;

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
 * Test class for the BlocResource REST controller.
 *
 * @see BlocResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = ObjectifDtyApp.class)
@WebAppConfiguration
@IntegrationTest
public class BlocResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAA";
    private static final String UPDATED_NAME = "BBBBB";
    private static final String DEFAULT_LOGO = "AAAAA";
    private static final String UPDATED_LOGO = "BBBBB";
    private static final String DEFAULT_DESCRIPTION = "AAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBB";

    @Inject
    private BlocRepository blocRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    private MockMvc restBlocMockMvc;

    private Bloc bloc;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        BlocResource blocResource = new BlocResource();
        ReflectionTestUtils.setField(blocResource, "blocRepository", blocRepository);
        this.restBlocMockMvc = MockMvcBuilders.standaloneSetup(blocResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        bloc = new Bloc();
        bloc.setName(DEFAULT_NAME);
        bloc.setLogo(DEFAULT_LOGO);
        bloc.setDescription(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createBloc() throws Exception {
        int databaseSizeBeforeCreate = blocRepository.findAll().size();

        // Create the Bloc

        restBlocMockMvc.perform(post("/api/blocs")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(bloc)))
                .andExpect(status().isCreated());

        // Validate the Bloc in the database
        List<Bloc> blocs = blocRepository.findAll();
        assertThat(blocs).hasSize(databaseSizeBeforeCreate + 1);
        Bloc testBloc = blocs.get(blocs.size() - 1);
        assertThat(testBloc.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testBloc.getLogo()).isEqualTo(DEFAULT_LOGO);
        assertThat(testBloc.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void getAllBlocs() throws Exception {
        // Initialize the database
        blocRepository.saveAndFlush(bloc);

        // Get all the blocs
        restBlocMockMvc.perform(get("/api/blocs?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.[*].id").value(hasItem(bloc.getId().intValue())))
                .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
                .andExpect(jsonPath("$.[*].logo").value(hasItem(DEFAULT_LOGO.toString())))
                .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }

    @Test
    @Transactional
    public void getBloc() throws Exception {
        // Initialize the database
        blocRepository.saveAndFlush(bloc);

        // Get the bloc
        restBlocMockMvc.perform(get("/api/blocs/{id}", bloc.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(bloc.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.logo").value(DEFAULT_LOGO.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingBloc() throws Exception {
        // Get the bloc
        restBlocMockMvc.perform(get("/api/blocs/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBloc() throws Exception {
        // Initialize the database
        blocRepository.saveAndFlush(bloc);
        int databaseSizeBeforeUpdate = blocRepository.findAll().size();

        // Update the bloc
        Bloc updatedBloc = new Bloc();
        updatedBloc.setId(bloc.getId());
        updatedBloc.setName(UPDATED_NAME);
        updatedBloc.setLogo(UPDATED_LOGO);
        updatedBloc.setDescription(UPDATED_DESCRIPTION);

        restBlocMockMvc.perform(put("/api/blocs")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(updatedBloc)))
                .andExpect(status().isOk());

        // Validate the Bloc in the database
        List<Bloc> blocs = blocRepository.findAll();
        assertThat(blocs).hasSize(databaseSizeBeforeUpdate);
        Bloc testBloc = blocs.get(blocs.size() - 1);
        assertThat(testBloc.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testBloc.getLogo()).isEqualTo(UPDATED_LOGO);
        assertThat(testBloc.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void deleteBloc() throws Exception {
        // Initialize the database
        blocRepository.saveAndFlush(bloc);
        int databaseSizeBeforeDelete = blocRepository.findAll().size();

        // Get the bloc
        restBlocMockMvc.perform(delete("/api/blocs/{id}", bloc.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<Bloc> blocs = blocRepository.findAll();
        assertThat(blocs).hasSize(databaseSizeBeforeDelete - 1);
    }
}
