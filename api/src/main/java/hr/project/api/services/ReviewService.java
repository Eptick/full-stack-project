package hr.project.api.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import hr.project.api.exceptions.ParentNotFoundException;
import hr.project.api.models.Restaurant;
import hr.project.api.models.Review;
import hr.project.api.models.ReviewDto;
import hr.project.api.models.User;
import hr.project.api.repositories.RestaurantRepository;
import hr.project.api.repositories.ReviewRepository;
import hr.project.api.repositories.UserRepository;

@Service
public class ReviewService {

    @Autowired
    ReviewRepository reviewRepository;
    @Autowired
    RestaurantRepository restaurantRepository;
    @Autowired
    UserRepository userRepository;

    public Page<Review> getReviews(Pageable paegable) {
        return reviewRepository.findAll(paegable);
    }
    public Review getReview(Long id) {
        Optional<Review> review = reviewRepository.findById(id);
        return review.isPresent() ? review.get() : null;
    }

    public void deleteReviews(List<Long> ids) {
        for (Long id : ids) {
            try {
                System.out.println(id);
                this.reviewRepository.deleteById(id);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
    public void deleteReview(Long id) {
        this.reviewRepository.deleteById(id);
    }

    public Review updateReview(Long id, ReviewDto dto) {
        Optional<Review> oReview = reviewRepository.findById(id);
        if(!oReview.isPresent()) return null;
        Review review = oReview.get();
        if(dto.getRestaurantId() != null && dto.getRestaurantId() != review.getRestaurant().getId()) {
            Restaurant restaurant = restaurantRepository.findById(dto.getId());
            if(restaurant == null) throw new ParentNotFoundException();
            review.setRestaurant(restaurant);
        }
        if(dto.getUserId() != null && dto.getRestaurantId() != review.getUser().getId()) {
            User user = userRepository.findById(dto.getId());
            if(user == null) throw new ParentNotFoundException();
            review.setUser(user);
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
