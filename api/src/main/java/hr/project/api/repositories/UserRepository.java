package hr.project.api.repositories;

import org.springframework.data.repository.CrudRepository;

import hr.project.api.models.User;

public interface UserRepository extends CrudRepository<User, Long> {
    User findByUsername(String username);

    User findById(long id);
}
