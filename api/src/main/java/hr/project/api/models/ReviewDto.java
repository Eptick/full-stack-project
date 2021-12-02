package hr.project.api.models;

import java.util.Date;

public class ReviewDto {
    private long id;
    private short rating;
    private String content;
    private Long userId;
    private Long restaurantId;
    private Date dateOfVisit;


    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public short getRating() {
        return this.rating;
    }

    public void setRating(short rating) {
        this.rating = rating;
    }

    public String getContent() {
        return this.content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Long getUserId() {
        return this.userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Date getDateOfVisit() {
        return this.dateOfVisit;
    }

    public void setDateOfVisit(Date dateOfVisit) {
        this.dateOfVisit = dateOfVisit;
    }

    public Long getRestaurantId() {
        return this.restaurantId;
    }

    public void setRestaurantId(Long restaurantId) {
        this.restaurantId = restaurantId;
    }

}
