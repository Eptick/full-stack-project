package hr.project.api.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import hr.project.api.models.Review;
import hr.project.api.repositories.ReviewRepository;

@Service
public class ReviewService {

    @Autowired
    ReviewRepository reviewRepository;

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

    public Review updateReview(Long id, Review dto) {
        Optional<Review> review = reviewRepository.findById(id);
        if(!review.isPresent()) return null;
        review.get().setContent(dto.getContent());
        review.get().setRating(dto.getRating());
        return this.saveReview(review.get());
    }

    public Review saveReview(Review review) {
        return this.reviewRepository.save(review);
    }
}
