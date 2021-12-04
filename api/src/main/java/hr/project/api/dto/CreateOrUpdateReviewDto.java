package hr.project.api.dto;

import java.util.Date;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PastOrPresent;
import javax.validation.constraints.Size;

public class CreateOrUpdateReviewDto {

    @NotNull
    private Long restaurantId;
    private Long userId; // if it's null that save the current user
    @NotNull
    @PastOrPresent
    private Date dateOfVisit;
    @NotNull
    @Min(1)
    @Max(5)
    private short rating;
    @NotBlank
    @Size(min = 20, max = 1500)
    private String content;

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
