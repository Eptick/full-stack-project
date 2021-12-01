package hr.project.api.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Image {

    @Id
    @GeneratedValue()
    Long id;

    String name;
    @JsonIgnore
    String location;
    @JsonIgnore
    String contentType;

    public Image() {}

    public Image(String name, String location, String contentType) {
        this.name = name;
        this.location = location;
        this.contentType = contentType;
    }
    

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return this.location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getContentType() {
        return this.contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

}