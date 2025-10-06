package com.agrihelp.repository;

import com.agrihelp.model.ForumPost;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ForumPostRepository extends MongoRepository<ForumPost, String> {
}
