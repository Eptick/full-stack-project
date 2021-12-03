package hr.project.api.dto;

import hr.project.api.models.Review;

public class RestaurantReviewReport {
    Review highest;
    Review lowest;
    Review latest;

    public RestaurantReviewReport(Review highest, Review lowest, Review latest) {
        this.highest = highest;
        this.lowest = lowest;
        this.latest = latest;
    }

    public Review getHighest() {
        return this.highest;
    }

    public void setHighest(Review highest) {
        this.highest = highest;
    }

    public Review getLowest() {
        return this.lowest;
    }

    public void setLowest(Review lowest) {
        this.lowest = lowest;
    }

    public Review getLatest() {
        return this.latest;
    }

    public void setLatest(Review latest) {
        this.latest = latest;
    }

}
