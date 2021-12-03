package hr.project.api.services;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import hr.project.api.exceptions.ParentNotFoundException;
import hr.project.api.models.Image;
import hr.project.api.models.Restaurant;
import hr.project.api.models.Review;
import hr.project.api.models.ReviewDto;
import hr.project.api.models.User;
import hr.project.api.repositories.RestaurantRepository;
import hr.project.api.repositories.ReviewRepository;

@Service
public class RestaurantService {

    @Autowired
    RestaurantRepository restaurantRepository;
    @Autowired
    FileLocationService fileLocationService;
    @Autowired
    ReviewRepository reviewRepository;

    @Autowired
    UserService userService;

    public Restaurant updateRestaurant(Restaurant restaurant, Restaurant dto) {
        Image image = restaurant.getImageObject();
        if(image.getId() != dto.getImage()) {
            restaurant.setImageObject(null);
            restaurant.setImage(dto.getImage());
            Restaurant saved = this.saveRestaurant(restaurant);
            this.fileLocationService.remove(image.getId(), image.getLocation()); 
            return saved;
        } else {
            return this.saveRestaurant(restaurant);
        }
    }

    public Restaurant saveRestaurant(Restaurant restaurant) {
        Image image = new Image();
        image.setId(restaurant.getImage());
        restaurant.setImageObject(image);
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

    public Page<Restaurant> getRestaurants(Pageable paegable, String query) {
        if(query != null) {
            return restaurantRepository.findByNameContaining(query, paegable);
        } else {
            return restaurantRepository.findAll(paegable);
        }
    }

    public Page<Restaurant> findHighRatedRestaurants(Pageable pageable) {
        return restaurantRepository.findHighRatedRestaurants(pageable);
    }

    public Review createReview(Long restaurantId, ReviewDto dto) {
        Restaurant restaurant = this.getRestaurant(restaurantId);
        if(restaurant == null)
            throw new ParentNotFoundException();
        Review review = new Review();
        if(dto.getUserId() != null) {
            User user = this.userService.getUser(dto.getUserId());
            review.setUser( user );
        } else {
            review.setUser(userService.getCurrentUser());
        }
        review.setContent(dto.getContent());
        review.setRating(dto.getRating());
        review.setRestaurant(restaurant);
        review.setDateOfVisit(dto.getDateOfVisit());
        review.setCreationDate(new Date());
        return reviewRepository.save(review);
    }
}
