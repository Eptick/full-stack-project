package hr.project.api.controllers;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hr.project.api.dto.CreateOrUpdateReviewDto;
import hr.project.api.models.Review;
import hr.project.api.services.ReviewService;

@RestController
@RequestMapping("/reviews")
public class ReviewController {
    @Autowired
    ReviewService reviewService;

    @GetMapping()
    public ResponseEntity<Page<Review>> Index(
            @PageableDefault(sort = "id", direction = Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok().body(reviewService.getReviews(pageable));
    }

    @GetMapping("/{reviewId}")
    public ResponseEntity<Review> getSingleReview(@PathVariable("reviewId") Long reviewId) {
        return ResponseEntity.ok().body(reviewService.getReview(reviewId));
    }

    @PatchMapping("/{reviewId}")
    public ResponseEntity<Review> updateAReview(@PathVariable("reviewId") Long reviewId,
            @Valid @RequestBody CreateOrUpdateReviewDto dto) {
        return ResponseEntity.ok().body(reviewService.updateReview(reviewId, dto));
    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<Void> deleteRestaurant(@PathVariable("reviewId") Long reviewId) {
        this.reviewService.deleteReview(reviewId);
        return ResponseEntity.ok().body(null);
    }
}
