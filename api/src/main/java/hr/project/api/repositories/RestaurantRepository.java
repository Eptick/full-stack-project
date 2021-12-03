package hr.project.api.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import hr.project.api.models.Restaurant;

public interface RestaurantRepository extends PagingAndSortingRepository<Restaurant, Long> {
    Restaurant findByName(String name);
    Restaurant findById(long id);
    Page<Restaurant> findByNameContaining(String name, Pageable pageable);

    @Query(value = "SELECT r.* FROM restaurants r ORDER BY (select avg(re.rating) from reviews re where r.id = re.restaurant_id) desc", nativeQuery = true)
    Page<Restaurant> findHighRatedRestaurants(Pageable pageable);
}
