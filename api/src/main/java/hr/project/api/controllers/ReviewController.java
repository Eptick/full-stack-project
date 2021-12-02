package hr.project.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hr.project.api.dto.BulkDeleteIds;
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
    public ResponseEntity<Review> getSingleRestaurant(@PathVariable("reviewId") Long reviewId) {
        Review review = reviewService.getReview(reviewId);
        if(review == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        return ResponseEntity.ok().body(review);
    }
    @PatchMapping("/{reviewId}")
    public ResponseEntity<Review> updateARestaurant(@PathVariable("reviewId") Long reviewId, @RequestBody Review dto) {
        Review review = reviewService.getReview(reviewId);
        if(review == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        review = reviewService.updateReview(reviewId, dto);
        return ResponseEntity.ok().body(review);
    }
    
    @DeleteMapping()
    public ResponseEntity<String> BulkDeleteRestaurants(@RequestBody BulkDeleteIds body) {
        reviewService.deleteReviews(body.getIds());
        return ResponseEntity.ok().body(null);
    }
    @DeleteMapping("/{reviewId}")
    public ResponseEntity<String> deleteRestaurant(@PathVariable("reviewId") Long reviewId) {
        this.reviewService.deleteReview(reviewId);
        return ResponseEntity.ok().body(null);
    }
}
