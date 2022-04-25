package at.kaindorf.ahif18.recipegenerator.controller;

import at.kaindorf.ahif18.recipegenerator.beans.entities.User;
import at.kaindorf.ahif18.recipegenerator.beans.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    private BCryptPasswordEncoder enocder = new BCryptPasswordEncoder();

    @GetMapping(path="/{username}", produces = "application/json")
    public ResponseEntity<User> TryLoginUser(@PathVariable String username, @PathParam("password") String password) {
        User user = userRepository.findByUsername(username);
        if(user != null && user.getUsername().equals(username) && enocder.matches(password, user.getPassword())) {
            return new ResponseEntity(user, HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping(produces = "application/json")
    public ResponseEntity<User> RegisterUser(@RequestBody User user) {
        try {
            user.setPassword(enocder.encode(user.getPassword()));
            userRepository.save(user);
            return ResponseEntity.ok().body(user);
        } catch (Exception ex) {
            return ResponseEntity.badRequest().build();
        }
    }
}
