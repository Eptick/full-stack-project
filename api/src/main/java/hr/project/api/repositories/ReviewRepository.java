package hr.project.api.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import hr.project.api.models.Review;

public interface ReviewRepository extends PagingAndSortingRepository<Review, Long> {
    Review findById(long id);

    @Query(value = "SELECT e.* from reviews e where e.restaurant_id =:restaurant_id order by e.rating desc limit 1", nativeQuery = true)
    Review findHighestRatedReviewForRestaurant(@Param("restaurant_id") Long restaurant_id);

    @Query(value = "SELECT e.* from reviews e where e.restaurant_id =:restaurant_id order by e.rating asc limit 1", nativeQuery = true)
    Review findLowestRatedReviewForRestaurant(@Param("restaurant_id") Long restaurant_id);

    @Query(value = "SELECT e.* from reviews e where e.restaurant_id =:restaurant_id order by e.creation_date desc limit 1", nativeQuery = true)
    Review findLatestReviewForRestaurant(@Param("restaurant_id") Long restaurant_id);

    @Query(value = "SELECT coalesce(avg(e.rating), 0) from reviews e", nativeQuery = true)
    double findAverageReview();
}
