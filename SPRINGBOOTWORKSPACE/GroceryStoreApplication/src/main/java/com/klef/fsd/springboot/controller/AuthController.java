package com.klef.fsd.springboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.klef.fsd.springboot.model.RoleType;
import com.klef.fsd.springboot.model.User;
import com.klef.fsd.springboot.repository.UserRepository;

import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    // ✅ Register new user
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists");
        }
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists");
        }
        if (user.getRole() == null) {
            user.setRole(RoleType.USER); // default role
        }
        return ResponseEntity.ok(userRepository.save(user));
    }

    // ✅ Login with email + password (JSON body)
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        Optional<User> userOpt = userRepository.findByEmail(loginRequest.getEmail());
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (user.getPassword().equals(loginRequest.getPassword())) {
                return ResponseEntity.ok(user); // send full user object
            }
            return ResponseEntity.badRequest().body("Invalid password");
        }
        return ResponseEntity.badRequest().body("User not found");
    }
}
