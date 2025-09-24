package com.klef.fsd.springboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.klef.fsd.springboot.model.User;
import com.klef.fsd.springboot.service.SellerService;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/sellers")
public class SellerController {

    @Autowired
    private SellerService sellerService;

    // Get all sellers
    @GetMapping("/")
    public ResponseEntity<List<User>> getAllSellers() {
        List<User> sellers = sellerService.getAllSellers();
        return ResponseEntity.ok(sellers);
    }

    // Get a seller by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getSellerById(@PathVariable Long id) {
        User seller = sellerService.getSellerById(id);
        if (seller != null) {
            return ResponseEntity.ok(seller);
        }
        return ResponseEntity.badRequest().body("Seller not found");
    }

    // Add a new seller
    @PostMapping("/")
    public ResponseEntity<User> addSeller(@RequestBody User seller) {
        User addedSeller = sellerService.addSeller(seller);
        return ResponseEntity.ok(addedSeller);
    }

    // Update a seller
    @PutMapping("/{id}")
    public ResponseEntity<?> updateSeller(@PathVariable Long id, @RequestBody User seller) {
        User existingSeller = sellerService.getSellerById(id);
        if (existingSeller != null) {
            seller.setId(id);
            User updatedSeller = sellerService.updateSeller(seller);
            return ResponseEntity.ok(updatedSeller);
        }
        return ResponseEntity.badRequest().body("Seller not found");
    }

    // Delete a seller
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSeller(@PathVariable Long id) {
        User existingSeller = sellerService.getSellerById(id);
        if (existingSeller != null) {
            sellerService.deleteSeller(id);
            return ResponseEntity.ok("Seller deleted successfully");
        }
        return ResponseEntity.badRequest().body("Seller not found");
    }
}
