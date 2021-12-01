package hr.project.api.config;


import java.io.File;
import java.net.URL;
import java.nio.file.Paths;

import org.springframework.stereotype.Component;

@Component
public class StorageProperties {

    StorageProperties() {
        try {
            URL res = getClass().getClassLoader().getResource("");
            File file = Paths.get(res.toURI() ).toFile();
            String absolutePath = file.getAbsolutePath();
            this.location = absolutePath +  System.getProperty("file.separator") + "media";
        } catch (Exception e) {
            this.location = "media";
        }
    }

	/**
	 * Folder location for storing files
	 */
	private String location = "media";

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

}