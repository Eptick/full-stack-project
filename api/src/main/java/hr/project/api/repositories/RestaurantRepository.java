package hr.project.api.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import hr.project.api.models.Restaurant;

public interface RestaurantRepository extends PagingAndSortingRepository<Restaurant, Long> {
    Restaurant findByName(String name);
    Restaurant findById(long id);
    Page<Restaurant> findByNameContainingIgnoreCase(String name, Pageable pageable);

    @Query(value = " select r.* from restaurants r, coalesce((select avg(rating) from reviews re where re.restaurant_id = r.id), 1) average order by average desc", nativeQuery = true)
    Page<Restaurant> findHighRatedRestaurants(Pageable pageable);

    @Query(value = " select r.* from restaurants r, coalesce((select avg(rating) from reviews re where re.restaurant_id = r.id), 1) average order by average asc", nativeQuery = true)
    Page<Restaurant> findLowestRestaurants(Pageable pageable);
}
