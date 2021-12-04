package hr.project.api;

import java.util.Arrays;
import java.util.Date;
import java.util.Random;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import hr.project.api.models.Image;
import hr.project.api.models.Restaurant;
import hr.project.api.models.Review;
import hr.project.api.models.Role;
import hr.project.api.models.User;
import hr.project.api.repositories.FileSystemRepository;
import hr.project.api.repositories.RoleRepository;
import hr.project.api.repositories.UserRepository;
import hr.project.api.services.FileLocationService;
import hr.project.api.services.RestaurantService;
import hr.project.api.services.ReviewService;

@Component
public class SetupDataLoader implements
  ApplicationListener<ContextRefreshedEvent> {

    boolean alreadySetup = false;

    @Autowired
    private UserRepository userRepository;
 
    @Autowired
    private RoleRepository roleRepository;
 
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private FileSystemRepository fileSystemRepository;

    @Autowired
    private FileLocationService fileLocationService;

    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private ReviewService reviewService;
 
    @Override
    @Transactional
    public void onApplicationEvent(ContextRefreshedEvent event) {
 
        if (alreadySetup) return;
 
        createRoleIfNotFound("ROLE_ADMIN");
        createRoleIfNotFound("ROLE_USER");

        Role adminRole = roleRepository.findByName("ROLE_ADMIN");
        Role userRole = roleRepository.findByName("ROLE_USER");
        User user = new User();
        user.setUsername("user");
        user.setPassword(passwordEncoder.encode("user"));
        user.setRoles(Arrays.asList(adminRole));
        user.setEnabled(true);
        userRepository.save(user);
        user = new User();
        user.setUsername("aaaa");
        user.setPassword(passwordEncoder.encode("aaaa"));
        user.setRoles(Arrays.asList(userRole));
        user.setEnabled(true);
        userRepository.save(user);

        Image image = new Image();
        try {
            byte[] imageBytes = fileSystemRepository.getImageFromMediaFolder("default.jpg").getInputStream().readAllBytes();
            Long imageId = fileLocationService.save(imageBytes, "default", "image/jpg");
            image.setId(imageId);
        } catch (Exception e) {
            e.printStackTrace();
        }

        Random rand = new Random();
        Date date = new Date();
        for(int i = 1; i < 12; i++) {
            Restaurant restaurant = new Restaurant();
            restaurant.setImageObject(image);
            restaurant.setName("Restaurant name " + i);
            restaurantService.saveRestaurant(restaurant);
            for(int j = 1; j < 12; j++) {
                Review review = new Review();
                review.setContent("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.");
                review.setRating((short)(rand.nextInt(5) + 1));
                review.setRestaurant(restaurant);
                review.setCreationDate(date);
                review.setDateOfVisit(date);
                review.setUser(user);
                reviewService.saveReview(review);
            }
        }


        alreadySetup = true;
    }

    @Transactional
    Role createRoleIfNotFound(String name) {
 
        Role role = roleRepository.findByName(name);
        if (role == null) {
            role = new Role(name);
            roleRepository.save(role);
        }
        return role;
    }
}