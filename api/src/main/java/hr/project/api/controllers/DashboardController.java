package hr.project.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hr.project.api.models.Restaurant;
import hr.project.api.services.RestaurantService;

@RestController
@RequestMapping("dashboard")
public class DashboardController {
    @Autowired
    RestaurantService restaurantService;

    @GetMapping("/restaurants")
    public Page<Restaurant> findHighRatedRestaurants(Pageable pageable) {
        return restaurantService.findHighRatedRestaurants(pageable);
    }
}
