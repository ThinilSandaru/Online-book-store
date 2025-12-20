package com.example.backend.Controllers;

import com.example.backend.Services.GetBookImageService;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.MalformedURLException;
import java.nio.file.Path;

@RestController
@RequestMapping("/books")
public class GetBookImageController {

	private final GetBookImageService getBookImageService;

	public GetBookImageController(
		GetBookImageService getBookImageService
	){
		this.getBookImageService=getBookImageService;
	}

	@GetMapping("/images/{filename:.+}")
	public ResponseEntity<?> getImage(@PathVariable String filename) throws MalformedURLException {
		Resource resource = getBookImageService.getImage(filename);

		if (resource == null) {
			return ResponseEntity.notFound().build();
		}

		Path file = getBookImageService.getFilePath(filename);
		String contentType = getBookImageService.getContentType(file);

		return ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType)).body(resource);
	}
}
