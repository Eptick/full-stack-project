package hr.project.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hr.project.api.dto.BulkDeleteIds;
import hr.project.api.models.Restaurant;
import hr.project.api.models.Review;
import hr.project.api.services.RestaurantService;
import hr.project.api.services.ReviewService;

@RestController
@RequestMapping("/restaurants")
public class RestaurantController {
    @Autowired
    RestaurantService restaurantService;
    @Autowired
    ReviewService reviewSerview;
    
    @GetMapping()
    public ResponseEntity<Page<Restaurant>> Index(@PageableDefault(sort = "id", direction = Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok().body(restaurantService.getRestaurants(pageable));
    }
    @DeleteMapping()
    public ResponseEntity<String> BulkDeleteRestaurants(@RequestBody BulkDeleteIds body) {
        restaurantService.deleteRestaurants(body.getIds());
        return ResponseEntity.ok().body(null);
    }

    @PostMapping()
    public ResponseEntity<Restaurant> Index(@RequestBody Restaurant restaurant) {
        return ResponseEntity.ok().body(this.restaurantService.createRestaurant(restaurant));
    }

    @PostMapping("/{restaurantId}/review")
    public ResponseEntity<Review> addReview(@PathVariable("restaurantId") Long restaurantId, @RequestBody Review review) {
        return ResponseEntity.ok().body(this.restaurantService.createReview(restaurantId, review));
    }

    @DeleteMapping("/{restaurantId}")
    public ResponseEntity<String> deleteRestaurant(@PathVariable("restaurantId") Long restaurantId) {
        this.restaurantService.deleteRestaurant(restaurantId);
        return ResponseEntity.ok().body(null);
    }
}