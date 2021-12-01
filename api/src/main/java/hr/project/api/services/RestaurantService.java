package hr.project.api.services;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import hr.project.api.exceptions.ParentNotFoundException;
import hr.project.api.models.Restaurant;
import hr.project.api.models.Review;
import hr.project.api.repositories.RestaurantRepository;
import hr.project.api.repositories.ReviewRepository;

@Service
public class RestaurantService {

    @Autowired
    RestaurantRepository restaurantRepository;
    @Autowired
    ReviewRepository reviewRepository;

    @Autowired
    UserService userService;

    public Restaurant saveRestaurant(Restaurant restaurant) {
        return restaurantRepository.save(restaurant);
    }

    public Restaurant getRestaurant(Long id) {
        Optional<Restaurant> restaurant = this.restaurantRepository.findById(id);
        return restaurant.isPresent() ? restaurant.get() : null;
    }

    public void deleteRestaurant(Long id) {
        this.restaurantRepository.deleteById(id);
    }

    public void deleteRestaurants(List<Long> ids) {
        this.restaurantRepository.deleteAllById(ids);
    }

    public Page<Restaurant> getRestaurants(Pageable paegable) {
        return  restaurantRepository.findAll(paegable);
    }

    public Review createReview(Long restaurantId, Review dto) {
        Restaurant restaurant = this.getRestaurant(restaurantId);
        if(restaurant == null)
            throw new ParentNotFoundException();
        Review review = new Review();
        review.setContent(dto.getContent());
        review.setRating(dto.getRating());
        review.setUser(userService.getCurrentUser());
        review.setRestaurant(restaurant);
        review.setCreationDate(new Date());
        return reviewRepository.save(review);
    }
}
