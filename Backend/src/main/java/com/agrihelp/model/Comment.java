package com.agrihelp.model;

import java.time.Instant;

public class Comment {

    private String authorUsername;
    private String text;
    private Instant createdAt = Instant.now();

    public Comment() {}

    public Comment(String authorUsername, String text) {
        this.authorUsername = authorUsername;
        this.text = text;
        this.createdAt = Instant.now();
    }

    // Getters & setters
    public String getAuthorUsername() { return authorUsername; }
    public void setAuthorUsername(String authorUsername) { this.authorUsername = authorUsername; }

    public String getText() { return text; }
    public void setText(String text) { this.text = text; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
