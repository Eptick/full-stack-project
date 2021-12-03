package hr.project.api.repositories;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.stereotype.Repository;

import hr.project.api.config.StorageProperties;

@Repository
public class FileSystemRepository {
    private final Path rootLocation;

    @Autowired
    public FileSystemRepository(StorageProperties properties) {
        this.rootLocation = Paths.get(properties.getLocation());
    }

    public String save(byte[] content, String imageName) throws Exception {
        Path destinationFile = this.rootLocation.resolve(
                Paths.get(new Date().getTime() + "-" + imageName))
                .normalize().toAbsolutePath();

        Files.createDirectories(destinationFile.getParent());

        Files.write(destinationFile, content);

        return destinationFile.toAbsolutePath().toString();
    }

    public void remove(String path) throws Exception {
        Path filePath = Paths.get(path);
        if( Files.exists(filePath) ) {
            Files.delete(filePath);
        }
    }

    public FileSystemResource getImageFromMediaFolder(String name) {
        Path destinationFile = this.rootLocation.resolve(Paths.get(name).normalize());
        return this.findInFileSystem(destinationFile.toString());
    }

    public FileSystemResource findInFileSystem(String location) {
        try {
            return new FileSystemResource(Paths.get(location));
        } catch (Exception e) {
            // Handle access or file not found problems.
            throw new RuntimeException();
        }
    }
}