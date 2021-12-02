package hr.project.api.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import hr.project.api.models.User;

public interface UserRepository extends PagingAndSortingRepository<User, Long> {
    User findByUsername(String username);
    Page<User> findByUsernameContaining(String name, Pageable pageable);

    User findById(long id);
}
