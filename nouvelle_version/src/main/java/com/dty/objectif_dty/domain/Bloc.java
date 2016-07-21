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
 * A Bloc.
 */
@Entity
@Table(name = "bloc")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Bloc implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "logo")
    private String logo;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "bloc")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Lesson> lessons = new HashSet<>();

    @OneToMany(mappedBy = "is_son_of")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Bloc> is_father_offs = new HashSet<>();

    @ManyToOne
    private Bloc is_son_of;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Lesson> getLessons() {
        return lessons;
    }

    public void setLessons(Set<Lesson> lessons) {
        this.lessons = lessons;
    }

    public Set<Bloc> getIs_father_offs() {
        return is_father_offs;
    }

    public void setIs_father_offs(Set<Bloc> blocs) {
        this.is_father_offs = blocs;
    }

    public Bloc getIs_son_of() {
        return is_son_of;
    }

    public void setIs_son_of(Bloc bloc) {
        this.is_son_of = bloc;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Bloc bloc = (Bloc) o;
        if(bloc.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, bloc.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Bloc{" +
            "id=" + id +
            ", name='" + name + "'" +
            ", logo='" + logo + "'" +
            ", description='" + description + "'" +
            '}';
    }
}
