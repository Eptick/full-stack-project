package hr.project.api.repositories;

import org.springframework.data.repository.PagingAndSortingRepository;

import hr.project.api.models.Review;

public interface ReviewRepository extends PagingAndSortingRepository<Review, Long> {
    Review findById(long id);
}
