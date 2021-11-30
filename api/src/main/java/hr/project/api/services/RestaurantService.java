package hr.project.api.services;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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

    public Restaurant createRestaurant(Restaurant restaurant) {
        return restaurantRepository.save(restaurant);
    }

    public Restaurant getRestaurant(Long id) {
        Optional<Restaurant> restaurant = this.restaurantRepository.findById(id);
        return restaurant.isPresent() ? restaurant.get() : null;
    }

    public List<Restaurant> getRestaurants(Integer pageNumber, Integer pageSize, String sortBy) {
        Pageable paging = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy));
 
        Page<Restaurant> pagedResult = restaurantRepository.findAll(paging);
         
        if(pagedResult.hasContent()) {
            return pagedResult.getContent();
        } else {
            return new ArrayList<Restaurant>();
        }
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
