package com.example.backend.Services;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class GetBookImageService {

	String uploadDir = "uploads/";

	public Resource getImage(String filename) throws MalformedURLException {
		Path file = Paths.get(uploadDir).resolve(filename);
		Resource resource = new UrlResource(file.toUri());
		return resource;
	}

	public String getContentType(Path file) {
		try {
			String contentType = Files.probeContentType(file);
			return contentType != null ? contentType : "application/octet-stream";
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	public Path getFilePath(String filename) {
		return Paths.get(uploadDir).resolve(filename);
	}
}
