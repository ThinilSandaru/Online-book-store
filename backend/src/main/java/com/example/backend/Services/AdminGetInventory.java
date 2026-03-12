package com.example.backend.Services;

import com.example.backend.DTO.InventoryOneBookDTO;
import com.example.backend.Repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminGetInventory {


@Autowired
private BookRepository bookRepository;

	public List<InventoryOneBookDTO> getBooks() {
		return bookRepository.getAllBooksWithCopyCount();
	}


}
