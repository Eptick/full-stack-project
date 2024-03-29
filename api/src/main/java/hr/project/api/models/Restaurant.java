package hr.project.api.models;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity(name = "Restaurant")
@Table(name = "restaurants")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Restaurant {

    public Restaurant() {}
    public Restaurant(String name) {
        this.name = name;
    }
    public Restaurant(String name, Long image) {
        this.name = name;
        this.image = image;
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

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER, optional = true, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "image")
    private Image imageObject;

    @Transient
    private Integer numberOfReviews;

    @Transient
    private double averageRating;

    @Transient
    private Long image;

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
        if(this.reviews == null) return 0;
        return this.reviews.size();
    }

    public double getAverageRating() {
        double r = this.reviews.stream().mapToDouble(d -> d.getRating()).average().orElse(0.0);
        BigDecimal bd = new BigDecimal(r).setScale(2, RoundingMode.HALF_UP);
        return bd.doubleValue();
    }

    public Long getImage() {
        if(this.imageObject == null) {
            return this.image;
        }
        return this.imageObject.id;
    }

    public Image getImageObject() {
        return this.imageObject;
    }
    public void setImageObject(Image imageObject) {
        this.imageObject = imageObject;
    }
    public void setImage(Long image) {
        this.image = image;
    }

}
