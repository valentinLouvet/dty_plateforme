package com.dty.objectif_dty.web.rest;

import com.dty.objectif_dty.ObjectifDtyApp;
import com.dty.objectif_dty.domain.Response;
import com.dty.objectif_dty.repository.ResponseRepository;

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
 * Test class for the ResponseResource REST controller.
 *
 * @see ResponseResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = ObjectifDtyApp.class)
@WebAppConfiguration
@IntegrationTest
public class ResponseResourceIntTest {

    private static final String DEFAULT_TEXT = "AAAAA";
    private static final String UPDATED_TEXT = "BBBBB";

    private static final Boolean DEFAULT_VERACITY = false;
    private static final Boolean UPDATED_VERACITY = true;

    @Inject
    private ResponseRepository responseRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    private MockMvc restResponseMockMvc;

    private Response response;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        ResponseResource responseResource = new ResponseResource();
        ReflectionTestUtils.setField(responseResource, "responseRepository", responseRepository);
        this.restResponseMockMvc = MockMvcBuilders.standaloneSetup(responseResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        response = new Response();
        response.setText(DEFAULT_TEXT);
        response.setVeracity(DEFAULT_VERACITY);
    }

    @Test
    @Transactional
    public void createResponse() throws Exception {
        int databaseSizeBeforeCreate = responseRepository.findAll().size();

        // Create the Response

        restResponseMockMvc.perform(post("/api/responses")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(response)))
                .andExpect(status().isCreated());

        // Validate the Response in the database
        List<Response> responses = responseRepository.findAll();
        assertThat(responses).hasSize(databaseSizeBeforeCreate + 1);
        Response testResponse = responses.get(responses.size() - 1);
        assertThat(testResponse.getText()).isEqualTo(DEFAULT_TEXT);
        assertThat(testResponse.isVeracity()).isEqualTo(DEFAULT_VERACITY);
    }

    @Test
    @Transactional
    public void getAllResponses() throws Exception {
        // Initialize the database
        responseRepository.saveAndFlush(response);

        // Get all the responses
        restResponseMockMvc.perform(get("/api/responses?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.[*].id").value(hasItem(response.getId().intValue())))
                .andExpect(jsonPath("$.[*].text").value(hasItem(DEFAULT_TEXT.toString())))
                .andExpect(jsonPath("$.[*].veracity").value(hasItem(DEFAULT_VERACITY.booleanValue())));
    }

    @Test
    @Transactional
    public void getResponse() throws Exception {
        // Initialize the database
        responseRepository.saveAndFlush(response);

        // Get the response
        restResponseMockMvc.perform(get("/api/responses/{id}", response.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(response.getId().intValue()))
            .andExpect(jsonPath("$.text").value(DEFAULT_TEXT.toString()))
            .andExpect(jsonPath("$.veracity").value(DEFAULT_VERACITY.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingResponse() throws Exception {
        // Get the response
        restResponseMockMvc.perform(get("/api/responses/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateResponse() throws Exception {
        // Initialize the database
        responseRepository.saveAndFlush(response);
        int databaseSizeBeforeUpdate = responseRepository.findAll().size();

        // Update the response
        Response updatedResponse = new Response();
        updatedResponse.setId(response.getId());
        updatedResponse.setText(UPDATED_TEXT);
        updatedResponse.setVeracity(UPDATED_VERACITY);

        restResponseMockMvc.perform(put("/api/responses")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(updatedResponse)))
                .andExpect(status().isOk());

        // Validate the Response in the database
        List<Response> responses = responseRepository.findAll();
        assertThat(responses).hasSize(databaseSizeBeforeUpdate);
        Response testResponse = responses.get(responses.size() - 1);
        assertThat(testResponse.getText()).isEqualTo(UPDATED_TEXT);
        assertThat(testResponse.isVeracity()).isEqualTo(UPDATED_VERACITY);
    }

    @Test
    @Transactional
    public void deleteResponse() throws Exception {
        // Initialize the database
        responseRepository.saveAndFlush(response);
        int databaseSizeBeforeDelete = responseRepository.findAll().size();

        // Get the response
        restResponseMockMvc.perform(delete("/api/responses/{id}", response.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<Response> responses = responseRepository.findAll();
        assertThat(responses).hasSize(databaseSizeBeforeDelete - 1);
    }
}
