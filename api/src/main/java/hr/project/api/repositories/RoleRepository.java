package hr.project.api.repositories;

import org.springframework.data.repository.CrudRepository;

import hr.project.api.models.Role;

public interface RoleRepository extends CrudRepository<Role, Long> {
    Role findByName(String name);
}
