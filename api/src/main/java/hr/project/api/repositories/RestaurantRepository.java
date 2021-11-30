package hr.project.api.repositories;

import org.springframework.data.repository.PagingAndSortingRepository;

import hr.project.api.models.Restaurant;

public interface RestaurantRepository extends PagingAndSortingRepository<Restaurant, Long> {
    Restaurant findByName(String name);
    Restaurant findById(long id);
}
