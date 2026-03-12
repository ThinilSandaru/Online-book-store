package com.example.backend.Controllers;

import com.example.backend.DTO.InventoryOneBookDTO;
import com.example.backend.Services.AdminGetInventory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping({"/owner/get", "/admin/get","/user/get"})
public class OwnerGetInventoryController {

@Autowired
private AdminGetInventory adminGetInventory;


@GetMapping("/inventory")
public List<InventoryOneBookDTO> getBooks() {
		return adminGetInventory.getBooks();
}



}
