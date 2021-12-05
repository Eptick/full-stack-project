package hr.project.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import hr.project.api.dto.AdminOverviewDto;
import hr.project.api.models.Restaurant;
import hr.project.api.repositories.RestaurantRepository;
import hr.project.api.repositories.ReviewRepository;
import hr.project.api.repositories.UserRepository;

@Service
public class AdminOverviewService {
    @Autowired
    RestaurantRepository restaurantRepository;
    @Autowired
    ReviewRepository reviewRepository;
    @Autowired
    UserRepository userRepository;
    
    public AdminOverviewDto getOverview() {
        AdminOverviewDto overview = new AdminOverviewDto();
        overview.setNumberOfRestaurants(restaurantRepository.count());
        overview.setNumberOfReviews(reviewRepository.count());
        overview.setNumberOfUsers(userRepository.count());

        overview.setAverageReview(reviewRepository.findAverageReview());
        Pageable p = PageRequest.of(0, 1);
        Page<Restaurant> high = restaurantRepository.findHighRatedRestaurants(p);
        if(!high.isEmpty()) overview.setHighestRatedRestaurant(high.getContent().get(0));
        Page<Restaurant> low = restaurantRepository.findLowestRestaurants(p);
        if(!low.isEmpty()) overview.setLowestRatedRestaurant(low.getContent().get(0));
        return overview;
    }
}
