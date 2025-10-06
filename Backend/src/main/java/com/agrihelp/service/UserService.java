package com.agrihelp.service;

import com.agrihelp.model.User;
import com.agrihelp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public boolean userExists(String username, String emailOrMobile) {
        boolean usernameExists = userRepository.findByUsername(username).isPresent();
        boolean emailExists = userRepository.findByEmail(emailOrMobile).isPresent();
        return usernameExists || emailExists;
    }

    public User registerUser(String username, String email, String password) {
        String hashed = passwordEncoder.encode(password);
        User user = new User(username, email, hashed);
        user.setApproved(true); // optional: false if admin approval is required
        return userRepository.save(user);
    }

    public User saveUser(User user) {
        // Hash password if not already hashed
        if (user.getPassword() != null && !user.getPassword().startsWith("$2a$")) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        return userRepository.save(user);
    }

    public Optional<User> authenticate(String username, String rawPassword) {
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (!Boolean.TRUE.equals(user.getApproved())) {
                throw new RuntimeException("User is not approved yet");
            }
            if (passwordEncoder.matches(rawPassword, user.getPassword())) {
                return Optional.of(user);
            }
        }
        return Optional.empty();
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
