package com.agrihelp.controller;

import com.agrihelp.model.ForumPost;
import com.agrihelp.service.ForumPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/forum")
@CrossOrigin(origins = "*") // Allow frontend
public class ForumPostController {

    @Autowired
    private ForumPostService service;

    @PostMapping("/create")
    public ResponseEntity<?> createPost(@RequestBody ForumPost post) {
        try {
            ForumPost saved = service.createPost(post);
            return ResponseEntity.ok(saved);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Title and content required");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Could not create post");
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllPosts() {
        try {
            List<ForumPost> posts = service.getAllPosts();
            return ResponseEntity.ok(posts);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Something went wrong");
        }
    }
}
