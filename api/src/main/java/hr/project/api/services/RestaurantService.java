package hr.project.api.services;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import hr.project.api.dto.CreateOrUpdateRestaurantDto;
import hr.project.api.dto.CreateOrUpdateReviewDto;
import hr.project.api.dto.RestaurantReviewReport;
import hr.project.api.exceptions.NotFoundException;
import hr.project.api.models.Image;
import hr.project.api.models.Restaurant;
import hr.project.api.models.Review;
import hr.project.api.models.User;
import hr.project.api.repositories.RestaurantRepository;
import hr.project.api.repositories.ReviewRepository;

@Service
public class RestaurantService {

    Logger logger = LoggerFactory.getLogger(RestaurantService.class);
    @Autowired
    RestaurantRepository restaurantRepository;
    @Autowired
    FileLocationService fileLocationService;
    @Autowired
    ReviewRepository reviewRepository;

    @Autowired
    UserService userService;

    public Restaurant updateRestaurant(Long restaurantId, CreateOrUpdateRestaurantDto dto) {
        return this.updateRestaurant(this.getRestaurant(restaurantId), dto.toRestaurant());
    }

    public Restaurant updateRestaurant(Restaurant restaurant, Restaurant dto) {
        Image image = restaurant.getImageObject();
        if(image.getId() != dto.getImage()) {
            restaurant.setImageObject(null);
            restaurant.setImage(dto.getImage());
            try {
                this.fileLocationService.remove(image.getId(), image.getLocation()); 
            } catch (Exception e) {
                logger.info("Could not delete the image, it's probably tied to another restaurant");
            }
        }
        restaurant.setName(dto.getName().trim());
        return this.saveRestaurant(restaurant);
    }

    public Restaurant saveRestaurant(CreateOrUpdateRestaurantDto dto) {
        return this.saveRestaurant(dto.toRestaurant());
    }

    public Restaurant saveRestaurant(Restaurant restaurant) {
        Image image = new Image();
        image.setId(restaurant.getImage());
        restaurant.setImageObject(image);
        return restaurantRepository.save(restaurant);
    }

    public Restaurant getRestaurant(Long id) {
        Optional<Restaurant> restaurant = this.restaurantRepository.findById(id);
        if(!restaurant.isPresent()) throw new NotFoundException();
        return restaurant.get();
    }

    public void deleteRestaurant(Long id) {
        this.restaurantRepository.deleteById(id);
    }

    public void deleteRestaurants(List<Long> ids) {
        this.restaurantRepository.deleteAllById(ids);
    }

    public Page<Restaurant> getRestaurants(Pageable paegable, String query) {
        if(query != null) {
            return restaurantRepository.findByNameContainingIgnoreCase(query, paegable);
        } else {
            return restaurantRepository.findAll(paegable);
        }
    }

    public Page<Restaurant> findHighRatedRestaurants(Pageable pageable) {
        return restaurantRepository.findHighRatedRestaurants(pageable);
    }

    public RestaurantReviewReport restaurantReview(Long restaurantId) {
        Review highest = reviewRepository.findHighestRatedReviewForRestaurant(restaurantId);
        Review lowest = reviewRepository.findLowestRatedReviewForRestaurant(restaurantId);
        Review latest = reviewRepository.findLatestReviewForRestaurant(restaurantId);
        return new RestaurantReviewReport(highest, lowest, latest);
    }

    public Review createReview(Long restaurantId, CreateOrUpdateReviewDto dto) {
        Restaurant restaurant = this.getRestaurant(restaurantId);

        Review review = new Review();
        if(dto.getUserId() != null && userService.currentUserHasRole("ROLE_ADMIN")) {
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
