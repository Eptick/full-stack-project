package hr.project.api.controllers;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import hr.project.api.dto.BulkDeleteIds;
import hr.project.api.dto.CreateOrUpdateRestaurantDto;
import hr.project.api.dto.RestaurantReviewReport;
import hr.project.api.models.Restaurant;
import hr.project.api.models.Review;
import hr.project.api.models.ReviewDto;
import hr.project.api.services.RestaurantService;
import hr.project.api.services.ReviewService;

@PreAuthorize("hasRole('ROLE_ADMIN')")
@RestController
@RequestMapping("/restaurants")
public class RestaurantController {
    @Autowired
    RestaurantService restaurantService;
    @Autowired
    ReviewService reviewService;

    @GetMapping()
    public ResponseEntity<Page<Restaurant>> Index(
            @PageableDefault(sort = "id", direction = Direction.DESC) Pageable pageable,
            @RequestParam(required = false) String query) {
        return ResponseEntity.ok().body(restaurantService.getRestaurants(pageable, query));
    }

    @DeleteMapping()
    public ResponseEntity<String> BulkDeleteRestaurants(@Valid @RequestBody BulkDeleteIds body) {
        restaurantService.deleteRestaurants(body.getIds());
        return ResponseEntity.ok().body(null);
    }

    @PreAuthorize("permitAll()")
    @GetMapping("/{restaurantId}")
    public ResponseEntity<Restaurant> getSingleRestaurant(@PathVariable("restaurantId") Long restaurantId) {
        return ResponseEntity.ok().body(restaurantService.getRestaurant(restaurantId));
    }

    @PatchMapping("/{restaurantId}")
    public ResponseEntity<Restaurant> updateARestaurant(@PathVariable("restaurantId") Long restaurantId,
            @Valid @RequestBody CreateOrUpdateRestaurantDto dto) {
        return ResponseEntity.ok().body(restaurantService.updateRestaurant(restaurantId, dto));
    }

    @PostMapping()
    public ResponseEntity<Restaurant> Index(@Valid @RequestBody CreateOrUpdateRestaurantDto restaurant) {
        return ResponseEntity.ok().body(this.restaurantService.saveRestaurant(restaurant));
    }

    @PreAuthorize("permitAll()")
    @GetMapping("/{restaurantId}/reviews")
    public ResponseEntity<RestaurantReviewReport> getReviews(@PathVariable("restaurantId") Long restaurantId) {
        return ResponseEntity.ok().body(this.restaurantService.restaurantReview(restaurantId));
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping("/{restaurantId}/review")
    public ResponseEntity<Review> addReview(@PathVariable("restaurantId") Long restaurantId,
            @RequestBody ReviewDto review) {
        // TODO secure this
        return ResponseEntity.ok().body(this.restaurantService.createReview(restaurantId, review));
    }

    @DeleteMapping("/{restaurantId}")
    public ResponseEntity<String> deleteRestaurant(@PathVariable("restaurantId") Long restaurantId) {
        this.restaurantService.deleteRestaurant(restaurantId);
        return ResponseEntity.ok().body(null);
    }
}
