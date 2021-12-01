package hr.project.api.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import hr.project.api.models.Restaurant;

public interface RestaurantRepository extends PagingAndSortingRepository<Restaurant, Long> {
    Restaurant findByName(String name);
    Restaurant findById(long id);
    Page<Restaurant> findByNameContaining(String name, Pageable pageable);
}
