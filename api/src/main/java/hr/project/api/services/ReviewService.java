package hr.project.api.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import hr.project.api.dto.CreateOrUpdateReviewDto;
import hr.project.api.exceptions.NotFoundException;
import hr.project.api.exceptions.ParentNotFoundException;
import hr.project.api.models.Restaurant;
import hr.project.api.models.Review;
import hr.project.api.models.User;
import hr.project.api.repositories.RestaurantRepository;
import hr.project.api.repositories.ReviewRepository;
import hr.project.api.repositories.UserRepository;

@Service
public class ReviewService {
    @Autowired
    ReviewRepository reviewRepository; // use repository to prevent circular dependencies
    @Autowired
    RestaurantRepository restaurantRepository; // use repository to prevent circular dependencies
    @Autowired
    UserRepository userRepository; // use repository to prevent circular dependencies

    public Page<Review> getReviews(Pageable paegable) {
        return reviewRepository.findAll(paegable);
    }
    public Review getReview(Long id) {
        Optional<Review> review = reviewRepository.findById(id);
        if(!review.isPresent()) throw new NotFoundException();
        return review.get();
    }

    public void deleteReview(Long id) {
        this.reviewRepository.deleteById(id);
    }

    public Review updateReview(Long id, CreateOrUpdateReviewDto dto) {
        Review review = this.getReview(id);

        if(dto.getRestaurantId() != null && dto.getRestaurantId() != review.getRestaurant().getId()) {
            Optional<Restaurant> restaurant = restaurantRepository.findById(dto.getRestaurantId());
            if(!restaurant.isPresent()) throw new ParentNotFoundException();
            review.setRestaurant(restaurant.get());
        }
        if(dto.getUserId() != null && dto.getUserId() != review.getUser().getId()) {
            Optional<User> user = userRepository.findById(dto.getUserId());
            if(!user.isPresent()) throw new ParentNotFoundException();
            review.setUser(user.get());
        }
        review.setDateOfVisit(dto.getDateOfVisit());
        review.setRating(dto.getRating());
        review.setContent(dto.getContent());
        return this.saveReview(review);
    }

    public Review saveReview(Review review) {
        return this.reviewRepository.save(review);
    }
}
