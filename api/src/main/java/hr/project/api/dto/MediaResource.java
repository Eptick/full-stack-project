package hr.project.api.dto;

import org.springframework.core.io.FileSystemResource;

import hr.project.api.models.Image;

public class MediaResource {
    FileSystemResource fileSystemResource;
    Image image;

    public MediaResource(FileSystemResource fileSystemResource, Image image) {
        this.fileSystemResource = fileSystemResource;
        this.image = image;
    }

    public FileSystemResource getFileSystemResource() {
        return this.fileSystemResource;
    }

    public void setFileSystemResource(FileSystemResource fileSystemResource) {
        this.fileSystemResource = fileSystemResource;
    }

    public Image getImage() {
        return this.image;
    }

    public void setImage(Image image) {
        this.image = image;
    }

}
