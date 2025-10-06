package com.agrihelp.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {

    @Id
    private String id;
    private String username;
    private String email;     // for students
    private String password;
    private String role;      // ROLE_FARMER or ROLE_STUDENT or ROLE_ADMIN
    private Boolean approved = true;
    private String aadhaar;   // for farmers
    private String mobile;    // for farmers

    public User() {}

    // Constructor for student
    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = "ROLE_STUDENT";
        this.approved = true;
    }

    // Constructor for farmer
    public User(String username, String password, String mobile, String aadhaar) {
        this.username = username;
        this.password = password;
        this.mobile = mobile;
        this.aadhaar = aadhaar;
        this.role = "ROLE_FARMER";
        this.approved = true;
    }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public Boolean getApproved() { return approved; }
    public void setApproved(Boolean approved) { this.approved = approved; }

    public String getAadhaar() { return aadhaar; }
    public void setAadhaar(String aadhaar) { this.aadhaar = aadhaar; }

    public String getMobile() { return mobile; }
    public void setMobile(String mobile) { this.mobile = mobile; }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

}
