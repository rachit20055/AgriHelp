package com.agrihelp.service;

import com.agrihelp.model.ForumPost;
import com.agrihelp.repository.ForumPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ForumPostService {

    @Autowired
    private ForumPostRepository repo;

    public ForumPost createPost(ForumPost post) {
        if (post.getTitle() == null || post.getContent() == null) {
            throw new IllegalArgumentException("Title and content cannot be null");
        }
        return repo.save(post);
    }

    public List<ForumPost> getAllPosts() {
        return repo.findAll();
    }
}
