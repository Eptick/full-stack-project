package hr.project.api.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import hr.project.api.models.Restaurant;

public class CreateOrUpdateRestaurantDto {

    @NotBlank
    @Size(min = 4, max = 255)
    private String name;
    @NotNull
    private Long image;

    public CreateOrUpdateRestaurantDto() { }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getImage() {
        return this.image;
    }

    public void setImage(Long image) {
        this.image = image;
    }

    public Restaurant toRestaurant() {
        return new Restaurant(name, image);
    }

}
