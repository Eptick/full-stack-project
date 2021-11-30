package hr.project.api.models;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity(name = "Restaurant")
@Table(name = "restaurants")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Restaurant {

    public Restaurant() {

    }

    public Restaurant(String name) {
        this.name = name;
    }

    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private long id;
    
    @Column(name= "name", length = 255, nullable = false)
    private String name;

    @OneToMany(
        mappedBy = "restaurant",
        cascade = CascadeType.REMOVE,
        orphanRemoval = true
    )
    @JsonIgnore
    private List<Review> reviews = new ArrayList<>();

    @Transient
    private Integer numberOfReviews;

    @Transient
    private double averageRating;

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Review> getReviews() {
        return this.reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }

    public Integer getNumberOfReviews() {
        return this.reviews.size();
    }

    public double getAverageRating() {
        return this.reviews.stream()
        .mapToDouble(d -> d.getRating())
        .average()
        .orElse(0.0);
    }
}
