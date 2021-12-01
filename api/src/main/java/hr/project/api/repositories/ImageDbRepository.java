package hr.project.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import hr.project.api.models.Image;

@Repository
public interface ImageDbRepository extends JpaRepository<Image, Long> {}