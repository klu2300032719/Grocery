package com.klef.fsd.springboot.controller;

import com.klef.fsd.springboot.model.Address;
import com.klef.fsd.springboot.model.User;
import com.klef.fsd.springboot.repository.AddressRepository;
import com.klef.fsd.springboot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/address")
public class AddressController {

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserRepository userRepository;

    // ✅ Add new address for a user
    @PostMapping("/add/{userId}")
    public ResponseEntity<?> addAddress(@PathVariable Long userId, @RequestBody Address address) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isPresent()) {
            address.setUser(userOpt.get());
            return ResponseEntity.ok(addressRepository.save(address));
        }
        return ResponseEntity.badRequest().body("User not found");
    }

    // ✅ Get all addresses for a user
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserAddresses(@PathVariable Long userId) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isPresent()) {
            List<Address> addresses = addressRepository.findByUser(userOpt.get());
            return ResponseEntity.ok(addresses);
        }
        return ResponseEntity.badRequest().body("User not found");
    }

    // ✅ Delete an address
    @DeleteMapping("/delete/{addressId}")
    public ResponseEntity<?> deleteAddress(@PathVariable Long addressId) {
        if (addressRepository.existsById(addressId)) {
            addressRepository.deleteById(addressId);
            return ResponseEntity.ok("Address deleted successfully");
        }
        return ResponseEntity.badRequest().body("Address not found");
    }
}
