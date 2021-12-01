package hr.project.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import hr.project.api.dto.MediaResource;
import hr.project.api.services.FileLocationService;

@RestController
@RequestMapping("media")
class MediaController {

    @Autowired
    FileLocationService fileLocationService;

    @PostMapping("")
    public Long uploadImage(@RequestParam("file") MultipartFile media) throws Exception {
        return fileLocationService.save(media.getBytes(), media.getOriginalFilename(), media.getContentType());
    }

    @GetMapping(value = "image/{imageId}")
    public ResponseEntity<Resource> downloadImage(@PathVariable Long imageId) throws Exception {
        MediaResource mediaResource = fileLocationService.find(imageId);

        return ResponseEntity.ok().header("Content-Type", mediaResource.getImage().getContentType()).body( mediaResource.getFileSystemResource() );
    }
}