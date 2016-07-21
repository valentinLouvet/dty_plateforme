package com.dty.objectif_dty.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Response.
 */
@Entity
@Table(name = "response")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Response implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "text")
    private String text;

    @Column(name = "veracity")
    private Boolean veracity;

    @ManyToOne
    private Question question;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Boolean isVeracity() {
        return veracity;
    }

    public void setVeracity(Boolean veracity) {
        this.veracity = veracity;
    }

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Response response = (Response) o;
        if(response.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, response.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Response{" +
            "id=" + id +
            ", text='" + text + "'" +
            ", veracity='" + veracity + "'" +
            '}';
    }
}
