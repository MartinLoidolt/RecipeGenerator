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
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @ResponseBody
    @GetMapping(path="/users/{username}", produces = "application/json")
    public ResponseEntity<User> TryLoginUser(@PathVariable String username, @PathParam("password") String password) {
        User user = userRepository.findByUsername(username);
        if(user != null && user.getUsername().equals(username) && new BCryptPasswordEncoder().matches(password, user.getPassword())) {
            return new ResponseEntity(user, HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    @ResponseBody
    @PostMapping(path="/users", produces = "application/json")
    public ResponseEntity<User> RegisterUser(@RequestBody User user) {
        return new ResponseEntity(user, HttpStatus.OK);
    }
}
