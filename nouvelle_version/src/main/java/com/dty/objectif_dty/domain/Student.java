package com.dty.objectif_dty.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Student.
 */
@Entity
@Table(name = "student")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Student implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "nb_lesson_today")
    private Integer nb_lesson_today;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "student_owned_badge",
               joinColumns = @JoinColumn(name="students_id", referencedColumnName="ID"),
               inverseJoinColumns = @JoinColumn(name="owned_badges_id", referencedColumnName="ID"))
    private Set<Badge> owned_badges = new HashSet<>();

    @ManyToOne
    private User user;

    @ManyToOne
    private Lesson todo_lesson;

    @OneToMany(mappedBy = "student")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Lesson_done> lesson_dones = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNb_lesson_today() {
        return nb_lesson_today;
    }

    public void setNb_lesson_today(Integer nb_lesson_today) {
        this.nb_lesson_today = nb_lesson_today;
    }

    public Set<Badge> getOwned_badges() {
        return owned_badges;
    }

    public void setOwned_badges(Set<Badge> badges) {
        this.owned_badges = badges;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Lesson getTodo_lesson() {
        return todo_lesson;
    }

    public void setTodo_lesson(Lesson lesson) {
        this.todo_lesson = lesson;
    }

    public Set<Lesson_done> getLesson_dones() {
        return lesson_dones;
    }

    public void setLesson_dones(Set<Lesson_done> lesson_dones) {
        this.lesson_dones = lesson_dones;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Student student = (Student) o;
        if(student.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, student.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Student{" +
            "id=" + id +
            ", nb_lesson_today='" + nb_lesson_today + "'" +
            '}';
    }
}
