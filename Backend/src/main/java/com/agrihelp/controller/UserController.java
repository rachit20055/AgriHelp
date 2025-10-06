package com.agrihelp.controller;

import com.agrihelp.model.User;
import com.agrihelp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users") // matches your frontend calls
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");
        String role = body.get("role");
        String contact = body.get("contact");
        String aadhaar = body.get("aadhaar");

        if ("ROLE_STUDENT".equals(role) && !contact.endsWith("@gmail.com")) {
            return ResponseEntity.badRequest()
                    .body(Map.of("success", false, "message", "Student email must end with @gmail.com"));
        }

        if (userService.userExists(username, contact)) {
            return ResponseEntity.badRequest()
                    .body(Map.of("success", false, "message", "User already exists"));
        }

        User user;
        if ("ROLE_FARMER".equals(role)) {
            user = userService.registerUser(username, null, password); // email null
            user.setMobile(contact);
            user.setAadhaar(aadhaar);
        } else {
            user = userService.registerUser(username, contact, password);
        }
        user.setRole(role);

        userService.saveUser(user); // make sure you have saveUser(User) in UserService

        return ResponseEntity.ok(Map.of("success", true));
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");

        Optional<User> userOpt = userService.authenticate(username, password);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            // generate token here if you have JWT
            String token = "dummy-token";
            return ResponseEntity.ok(Map.of(
                    "token", token,
                    "username", user.getUsername(),
                    "email", user.getEmail(),
                    "role", user.getRole(),
                    "id", user.getId()
            ));
        } else {
            return ResponseEntity.status(401).body(Map.of("message", "Invalid credentials"));
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }
}
