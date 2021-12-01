package hr.project.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import hr.project.api.dto.MediaResource;
import hr.project.api.models.Image;
import hr.project.api.repositories.FileSystemRepository;
import hr.project.api.repositories.ImageDbRepository;

@Service
public class FileLocationService {

    @Autowired
    FileSystemRepository fileSystemRepository;
    @Autowired
    ImageDbRepository imageDbRepository;

    public Long save(byte[] bytes, String imageName, String contentType) throws Exception {
        String location = fileSystemRepository.save(bytes, imageName);

        return imageDbRepository.save(new Image(imageName, location, contentType)).getId();
    }

    public MediaResource find(Long imageId) {
        Image image = imageDbRepository.findById(imageId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        return new MediaResource(fileSystemRepository.findInFileSystem(image.getLocation()), image);
    }
}