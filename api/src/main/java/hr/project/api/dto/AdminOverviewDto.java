package hr.project.api.dto;

import hr.project.api.models.Restaurant;

public class AdminOverviewDto {
    private Long numberOfRestaurants;
    private Long numberOfReviews;
    private Long numberOfUsers;
    private double averageReview;
    private Restaurant highestRatedRestaurant;
    private Restaurant lowestRatedRestaurant;

    public AdminOverviewDto() {}

    public Long getNumberOfRestaurants() {
        return this.numberOfRestaurants;
    }

    public void setNumberOfRestaurants(Long numberOfRestaurants) {
        this.numberOfRestaurants = numberOfRestaurants;
    }

    public Long getNumberOfReviews() {
        return this.numberOfReviews;
    }

    public void setNumberOfReviews(Long numberOfReviews) {
        this.numberOfReviews = numberOfReviews;
    }

    public Long getNumberOfUsers() {
        return this.numberOfUsers;
    }

    public void setNumberOfUsers(Long numberOfUsers) {
        this.numberOfUsers = numberOfUsers;
    }

    public double getAverageReview() {
        return this.averageReview;
    }

    public void setAverageReview(double averageReview) {
        this.averageReview = averageReview;
    }

    public Restaurant getHighestRatedRestaurant() {
        return this.highestRatedRestaurant;
    }

    public void setHighestRatedRestaurant(Restaurant highestRatedRestaurant) {
        this.highestRatedRestaurant = highestRatedRestaurant;
    }

    public Restaurant getLowestRatedRestaurant() {
        return this.lowestRatedRestaurant;
    }

    public void setLowestRatedRestaurant(Restaurant lowestRatedRestaurant) {
        this.lowestRatedRestaurant = lowestRatedRestaurant;
    }

}
