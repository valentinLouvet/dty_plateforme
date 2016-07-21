package com.dty.objectif_dty.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Lesson_done.
 */
@Entity
@Table(name = "lesson_done")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Lesson_done implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "note_init")
    private Integer note_init;

    @Column(name = "note_max")
    private Integer note_max;

    @ManyToOne
    private Student student;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "lesson_done_lesson",
               joinColumns = @JoinColumn(name="lesson_dones_id", referencedColumnName="ID"),
               inverseJoinColumns = @JoinColumn(name="lessons_id", referencedColumnName="ID"))
    private Set<Lesson> lessons = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNote_init() {
        return note_init;
    }

    public void setNote_init(Integer note_init) {
        this.note_init = note_init;
    }

    public Integer getNote_max() {
        return note_max;
    }

    public void setNote_max(Integer note_max) {
        this.note_max = note_max;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Set<Lesson> getLessons() {
        return lessons;
    }

    public void setLessons(Set<Lesson> lessons) {
        this.lessons = lessons;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Lesson_done lesson_done = (Lesson_done) o;
        if(lesson_done.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, lesson_done.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Lesson_done{" +
            "id=" + id +
            ", note_init='" + note_init + "'" +
            ", note_max='" + note_max + "'" +
            '}';
    }
}
