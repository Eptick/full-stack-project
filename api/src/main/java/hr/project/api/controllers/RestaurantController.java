package hr.project.api.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
    public ResponseEntity<List<Restaurant>> Index(
        @RequestParam(defaultValue = "0") Integer pageNumber, 
        @RequestParam(defaultValue = "10") Integer pageSize,
        @RequestParam(defaultValue = "id") String sortBy
    ) {
        List<Restaurant> list = restaurantService.getRestaurants(pageNumber, pageSize, sortBy);
        return ResponseEntity.ok().body(list);
    }

    @PostMapping()
    public ResponseEntity<Restaurant> Index(@RequestBody Restaurant restaurant) {
        return ResponseEntity.ok().body(this.restaurantService.createRestaurant(restaurant));
    }

    @PostMapping("/{restaurantId}/review")
    public ResponseEntity<Review> addReview(@PathVariable("restaurantId") Long restaurantId, @RequestBody Review review) {
        return ResponseEntity.ok().body(this.restaurantService.createReview(restaurantId, review));
    }
}
